from pymongo import MongoClient
from  dotenv import load_dotenv
import os

load_dotenv()

mongo_uri = os.getenv('MONGODB_URI')
secret_key = os.getenv('SECRET_KEY')

client = MongoClient(mongo_uri)
db = client["findle"]

cases_col = db["missing_cases"]