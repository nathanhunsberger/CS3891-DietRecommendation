from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix, vstack, hstack
import pandas as pd
import numpy as np

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

def update_user_similarity(new_user_vector, user_recipe_matrix):
  # Calculate cosine similarity between the new user and all existing users
  new_user_similarity = cosine_similarity(new_user_vector, user_recipe_matrix, dense_output=False)

  updated_similarity_matrix = vstack([user_recipe_matrix, new_user_similarity], format='csr')
  new_user_similarity_transpose = new_user_similarity.transpose()

  # Ensure we add this as a new column to all rows, including the newly added row.
  # Create a zero-element for the diagonal element for the new user (similarity with self)
  zero_self_similarity = csr_matrix((1, 1), dtype=np.float64)
  new_user_col = vstack([new_user_similarity_transpose, zero_self_similarity], format='csr')

  # Now stack this updated column to the updated similarity matrix
  updated_similarity_matrix = hstack([updated_similarity_matrix, new_user_col], format='csr')

  return updated_similarity_matrix

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

  new_user_vector = csr_matrix((new_user_data, (np.zeros(len(new_user_data)), new_user_indices)), shape=(1, user_recipe_matrix.shape[1]))
  updated_user_recipe_matrix = vstack([user_recipe_matrix, new_user_vector], format='csr')

  # Update similarity matrix with the new user
  updated_user_similarity = update_user_similarity(new_user_vector, user_recipe_matrix)

  return updated_user_similarity, updated_user_recipe_matrix, all_recipes

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
  print("STARTING NEW COSINE SIM FUNC")
  new_user_similarity, new_user_recipe_matrix, all_recipes_df = new_user_similarity_creation(seed_ids, user_ratings, reviews_df, old_user_recipe_matrix)
  print("ENDING NEW COSINE SIM FUNC")
  # Assuming the new user is the last added
  # See new_user_similarity_creation() for why this should be true
  new_user_index = new_user_recipe_matrix.shape[0] - 1
  print("STARTING RECOMMEND HELPER")
  recommendations = recommend_helper(new_user_index, new_user_similarity, new_user_recipe_matrix, top_n=5)
  print("ENDING RECOMMEND HELPER")
  # Create a mapping from recipe IDs to new index values
  recipe_to_index = {id: idx for idx, id in enumerate(all_recipes_df.cat.categories)}

  # Use recipe_to_index to create a reverse mapping from indices back to recipe IDs
  recipe_id_mapping = {idx: id for id, idx in recipe_to_index.items()}

  # Finally map back to recipe IDs and names
  recommendation_ids = [recipe_id_mapping[idx] for idx in recommendations]

  return recommendation_ids