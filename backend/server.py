from flask import Flask, jsonify, request
from load_data import get_recipe_data
from vector_utils import get_d2v_model, get_tfidf_df
from recipe_utils import get_necessary_data, get_seed_recipes
from sklearn.feature_extraction.text import TfidfVectorizer
import re

app = Flask(__name__)

recipes, reviews = get_recipe_data()

desc_model, name_model = get_d2v_model()

filtered_data, scaler = get_necessary_data(recipes)

df_tfidf = get_tfidf_df(recipes)

@app.route('/get-seeds', methods=['GET'])
def get_seed_recipes():
    calories = request.args.get('calories')
    protein = request.args.get('protein')
    fat = request.args.get('fat')
    carbs = request.args.get('carbs')
    free_input = request.args.get('free_input')

    seeds = get_seed_recipes([], free_input, filtered_data, scaler, 10, desc_model, df_tfidf)

    return seeds.to_json()

@app.route('/get-all-recommendations', methods=['GET'])
def get_recommendations():

    print("Here")


