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

  needed_cols = ['RecipeId', 'Name', 'RecipeCategory', 'Calories', 'ProteinContent', 'FatContent', 'CarbohydrateContent', 'Description']

  filtered_data = df[needed_cols]

  filtered_data[['Calories', 'ProteinContent', 'FatContent', 'CarbohydrateContent']] = fScaler.fit_transform(filtered_data[['Calories', 'ProteinContent', 'FatContent', 'CarbohydrateContent']])

  return filtered_data, fScaler

def remove_non_alphabetic(input_string):
  # Using regular expression to replace non-alphabetic characters (except spaces) with an empty string
  return re.sub(r'[^a-zA-Z\s]', '', input_string)


def get_seed_recipes(input, free_input, df, scaler, topn, df_tfidf, desc_model):
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
  return seeds