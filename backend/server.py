from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from load_data import get_recipe_data
from vector_utils import get_d2v_model, get_tfidf_df
from recipe_utils import get_necessary_data, get_recipes_for_seed, get_recipes_from_seeds
from review_utils import old_user_similarity_creation, new_user_similarity_creation, recommend_new_ratings, recommend_helper

app = Flask(__name__)
CORS(app)

recipes, reviews = get_recipe_data()

desc_model = get_d2v_model()

filtered_data, scaler = get_necessary_data(recipes)

df_tfidf = get_tfidf_df(recipes)

old_user_sim = old_user_similarity_creation(reviews)

@app.route('/get-seeds', methods=['GET'])
def get_seed_recipes():
    calories = int(request.args.get('calories'))
    protein = int(request.args.get('protein'))
    fat = int(request.args.get('fat'))
    carbs = int(request.args.get('carbs'))
    free_input = request.args.get('free_input')

    seeds = get_recipes_for_seed([calories, protein, fat, carbs], free_input, filtered_data, scaler, 10, desc_model,
                                 df_tfidf)

    return seeds.to_json(orient='records')

@app.route('/get-all-recommendations', methods=['GET'])
def get_all_recommendations():
    user_ratings = request.args.getlist('ratings')
    user_ratings = [int(i) for i in user_ratings]
    print(user_ratings)
    seed_ids = request.args.getlist('seed_ids')
    print(seed_ids)
    seed_ids = [int(i) for i in seed_ids]
    # user_ratings = [5,4,5]
    # seed_ids = [79979,94387,78287]
    print("STARTING USER BASED")
    rating_recommendations = recommend_new_ratings(recipes, reviews, old_user_sim, seed_ids, user_ratings)
    rating_recommendations = recipes[recipes['RecipeId'].isin(set(rating_recommendations))]
    print("DONE WITH USER BASED")
    from_seed_recommendations = get_recipes_from_seeds(seed_ids, user_ratings, filtered_data, scaler, desc_model, df_tfidf)

    all_recs = pd.concat([from_seed_recommendations, rating_recommendations.head(3)])

    return all_recs.to_json(orient='records')


if __name__ == '__main__':
    app.run(debug=True, port=8081)