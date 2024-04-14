from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from scipy.sparse import csr_matrix, vstack, hstack
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

  cleaned_input = remove_non_alphabetic(free_input)
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

def old_user_similarity_creation(reviews_df):
  # Create a sparse matrix (recipes x users)
  user_ids = reviews_df['AuthorId'].astype('category').cat.codes
  recipe_ids = reviews_df['RecipeId'].astype('category').cat.codes
  sparse_matrix = csr_matrix((reviews_df['Rating'], (recipe_ids, user_ids)), shape=(recipe_ids.max() + 1, user_ids.max() + 1))

  # Transpose the matrix to make it users x recipes, thus we can perform user-based CF
  user_recipe_matrix = sparse_matrix.T

  # Compute cosine similarity between users
  user_similarity = cosine_similarity(user_recipe_matrix, dense_output=False)
  return user_similarity

def new_user_similarity_creation(seed_ids, ratings, reviews_df, user_recipe_matrix):

  new_user_ratings = pd.DataFrame({
    'RecipeId': seed_ids,
    'Rating': ratings
  })

  all_recipes = pd.concat([reviews_df['RecipeId'], new_user_ratings['RecipeId']]).astype('category')

  recipe_to_index = {id: idx for idx, id in enumerate(all_recipes.cat.categories)}

  # There are recipes in recipes_df not in reviews_df (recipes without reviewers)
  # If this happens, needs to account for it
  new_columns_needed = len(recipe_to_index) - user_recipe_matrix.shape[1]
  if new_columns_needed > 0:
      # Add new columns to the matrix as zeros for existing users (ie, not reviewed)
      extension = csr_matrix((user_recipe_matrix.shape[0], new_columns_needed))
      user_recipe_matrix = hstack([user_recipe_matrix, extension], format='csr')

  new_user_indices = [recipe_to_index[id] for id in new_user_ratings['RecipeId']]
  new_user_data = new_user_ratings['Rating'].tolist()

  # Create the new user's sparse rating vector
  new_user_vector = csr_matrix((new_user_data, (np.zeros(len(new_user_data)), new_user_indices)),
                              shape=(1, user_recipe_matrix.shape[1]))

  # Append this new user vector to the existing user-recipe matrix
  updated_user_recipe_matrix = vstack([user_recipe_matrix, new_user_vector], format='csr')

  # Compute cosine similarity (including the new user)
  user_similarity = cosine_similarity(updated_user_recipe_matrix, dense_output=False)

  return user_similarity, updated_user_recipe_matrix, all_recipes

# Given user index, perform user-based CF to get new recommendations
def recommend_helper(user_index, user_similarity, sparse_matrix, top_n=5):

    similarity_scores = user_similarity[user_index].toarray().flatten()
    similarity_scores[user_index] = -1

    similar_users = similarity_scores.argsort()[-top_n:]

    # Fetch rows for similar users, focusing on all recipes
    similar_users_matrix = sparse_matrix[similar_users, :]

    # Calculate weighted scores for recipes
    recipe_scores = similar_users_matrix.sum(axis=0).A1

    # Find recipes already rated by the user to exclude them from recommendations
    user_rated_recipes = sparse_matrix.getrow(user_index).nonzero()[1]

    # Ensure recipe_scores has enough entries to cover all recipes
    # If this fails, there is an error in new_user_similarity_creation()
    if len(recipe_scores) != sparse_matrix.shape[1]:
        raise ValueError("Recipe scores array does not match the number of recipes in the matrix.")

    # Mask already rated recipes
    recipe_scores[user_rated_recipes] = -1

    # Recommend recipes with the highest scores
    recommended_recipes = recipe_scores.argsort()[-top_n:][::-1]

    return recommended_recipes

def recommend_new_ratings(recipes_df, reviews_df, old_user_recipe_matrix, seed_ids, user_ratings):

  new_user_similarity, new_user_recipe_matrix, all_recipes_df = new_user_similarity_creation(seed_ids, user_ratings, reviews_df, old_user_recipe_matrix)

  # Assuming the new user is the last added
  # See new_user_similarity_creation() for why this should be true
  new_user_index = new_user_recipe_matrix.shape[0] - 1

  recommendations = recommend_helper(new_user_index, new_user_similarity, new_user_recipe_matrix, top_n=5)

  # Create a mapping from recipe IDs to new index values
  recipe_to_index = {id: idx for idx, id in enumerate(all_recipes_df.cat.categories)}

  # Use recipe_to_index to create a reverse mapping from indices back to recipe IDs
  recipe_id_mapping = {idx: id for id, idx in recipe_to_index.items()}

  # Finally map back to recipe IDs and names
  recommendation_ids = [recipe_id_mapping[idx] for idx in recommendations]
  
  return recommendation_ids