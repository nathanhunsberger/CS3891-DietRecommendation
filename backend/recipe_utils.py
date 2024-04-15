from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from nltk.tokenize import word_tokenize
import nltk
import pandas as pd
import numpy as np
import re

nltk.download('punkt')

def get_necessary_data(df):

  fScaler = MinMaxScaler()

  needed_cols = ['RecipeId', 'Images', 'Name', 'RecipeCategory', 'Calories', 'ProteinContent', 'FatContent', 'CarbohydrateContent', 'Description']

  filtered_data = df[needed_cols]

  filtered_data[['Calories', 'ProteinContent', 'FatContent', 'CarbohydrateContent']] = fScaler.fit_transform(filtered_data[['Calories', 'ProteinContent', 'FatContent', 'CarbohydrateContent']])

  return filtered_data, fScaler

def remove_non_alphabetic(input_string):
  # Using regular expression to replace non-alphabetic characters (except spaces) with an empty string
  return re.sub(r'[^a-zA-Z\s]', '', input_string)


def get_recipes_for_seed(input, free_input, df, scaler, topn, desc_model, df_tfidf):
  scaled_input = scaler.transform([input])

  sim_scores = cosine_similarity(df[['Calories', 'ProteinContent', 'FatContent', 'CarbohydrateContent']],
                                 scaled_input).flatten()

  tokenized_input = word_tokenize(free_input.lower())
  inference_desc = desc_model.infer_vector(tokenized_input)
  descriptions = desc_model.dv.most_similar([inference_desc], topn=desc_model.corpus_count)

  description_scores = pd.DataFrame(descriptions, columns=['RecipeId', 'DescriptionScore'])

  cleaned_input = remove_non_alphabetic(free_input).lower()
  words = cleaned_input.split()
  in_data = []
  for word in words:
    if word in df_tfidf:
      in_data.append(word)

  search_df = pd.DataFrame([df_tfidf[word] for word in in_data]).T
  search_df['NameScore'] = search_df.sum(axis=1)
  name_scores = search_df['NameScore'].tolist()

  all_scores_recipes = df.assign(MacroScore=sim_scores)
  all_scores_recipes = all_scores_recipes.assign(NameScore=name_scores)
  all_scores_recipes = all_scores_recipes.merge(description_scores, on='RecipeId')

  all_scores_recipes['TotalScore'] = 1 * all_scores_recipes['MacroScore'] + 0.1 * all_scores_recipes[
    'NameScore'] + 0.75 * all_scores_recipes['DescriptionScore']

  sorted_scores = all_scores_recipes.sort_values('TotalScore', ascending=False)

  seeds = sorted_scores.head(topn)

  seeds[['Calories', 'ProteinContent', 'FatContent', 'CarbohydrateContent']] = scaler.inverse_transform(seeds[['Calories', 'ProteinContent', 'FatContent', 'CarbohydrateContent']])
  return seeds


def get_recipes_from_seeds(seed_ids, ratings, df, scaler, desc_model, df_tfidf):
  needed_ids = [seed_ids[i] for i in range(len(seed_ids)) if ratings[i] > 3.0]

  all_recs = pd.DataFrame()

  for id in needed_ids:
    recipe = df[df['RecipeId'] == id]
    if len(recipe['Description'].tolist()) > 0:
      description = recipe['Description'].tolist()[0]
    else:
      description = ""

    sim_scores = cosine_similarity(df[['Calories', 'ProteinContent', 'FatContent', 'CarbohydrateContent']], recipe[
      ['Calories', 'ProteinContent', 'FatContent', 'CarbohydrateContent']]).flatten()

    curr_recipe_scores = df.assign(MacroScore=sim_scores)
    curr_recipe_scores = curr_recipe_scores.sort_values('MacroScore', ascending=False)

    tokenized_input = word_tokenize(description.lower())
    inference_desc = desc_model.infer_vector(tokenized_input)
    descriptions = desc_model.dv.most_similar([inference_desc], topn=desc_model.corpus_count)

    description_scores = pd.DataFrame(descriptions, columns=['RecipeId', 'DescriptionScore'])

    name = recipe['Name'].tolist()[0]
    cleaned_input = remove_non_alphabetic(name).lower()
    words = cleaned_input.split()
    in_data = []
    for word in words:
      if word in df_tfidf:
        in_data.append(word)

    search_df = pd.DataFrame([df_tfidf[word] for word in in_data]).T
    search_df['NameScore'] = search_df.sum(axis=1)
    name_scores = search_df['NameScore'].tolist()

    all_scores_recipes = df.assign(MacroScore=sim_scores)
    all_scores_recipes = all_scores_recipes.assign(NameScore=name_scores)
    all_scores_recipes = all_scores_recipes.merge(description_scores, on='RecipeId')

    all_scores_recipes['TotalScore'] = 1 * all_scores_recipes['MacroScore'] + 0.05 * all_scores_recipes[
      'NameScore'] + 0.75 * all_scores_recipes['DescriptionScore']

    sorted_scores = all_scores_recipes.sort_values('TotalScore', ascending=False)
    if not all_recs.empty:
      sorted_scores = sorted_scores[~sorted_scores['RecipeId'].isin(all_recs['RecipeId'])]
    recs = sorted_scores.head(3)

    recs[['Calories', 'ProteinContent', 'FatContent', 'CarbohydrateContent']] = scaler.inverse_transform(
      recs[['Calories', 'ProteinContent', 'FatContent', 'CarbohydrateContent']])

    all_recs = pd.concat([all_recs, recs])

  return all_recs