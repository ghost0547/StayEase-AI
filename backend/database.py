from pymongo import MongoClient
from dotenv import load_dotenv
import os
import google.generativeai as genai
load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client["stayease"]
homestays_collection = db["homestays"]
users_collection = db["users"]
favorites_collection = db["favorites"]