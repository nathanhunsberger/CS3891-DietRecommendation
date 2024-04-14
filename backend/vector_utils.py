from gensim.models.doc2vec import Doc2Vec
import numpy as np
import re
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
import sklearn as sk
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

def get_d2v_model():
    desc_model = Doc2Vec.load('./data/models/recipe_desc_vec.bin')
    return desc_model

def get_tfidf_df(df):
    corpus = df['Name'].tolist()

    vectorizer = TfidfVectorizer(stop_words='english', use_idf=True)
    corpus_mod = vectorizer.fit_transform(corpus)

    df_tfidf = pd.DataFrame(corpus_mod.toarray(), columns=vectorizer.get_feature_names_out())

    return df_tfidf