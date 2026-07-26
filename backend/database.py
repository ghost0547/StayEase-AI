from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017/stayease"))

db = client["stayease"]
homestays_collection = db["homestays"]
users_collection = db["users"]
favorites_collection = db["favorites"]
itineraries_collection = db["itineraries"]