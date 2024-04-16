import pandas as pd

def get_recipe_data():

    recipe_cols = ['RecipeId', 'Name', 'RecipeCategory', 'Description', 'Calories',
                   'ProteinContent', 'FatContent', 'CarbohydrateContent', 'Images', 'RecipeInstructions']

    data_path = './Data/recipes.csv'

    recipes = pd.read_csv(data_path)[recipe_cols]
    recipes = recipes.dropna(subset='Images')
    recipes = recipes[recipes['Images'] != "character(0)"]
    print(recipes['Images'].head(50))
    recipes.dropna()

    review_cols = ['RecipeId', 'AuthorId', 'Rating', 'Review']
    data_path = './Data/reviews.csv'

    reviews = pd.read_csv(data_path)[review_cols]
    reviews = reviews[reviews['RecipeId'].isin(recipes['RecipeId'])]

    return recipes, reviews