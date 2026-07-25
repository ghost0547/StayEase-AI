from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from database import homestays_collection, users_collection, favorites_collection
import bcrypt
import jwt
import os
from models import UserLogin,TravelRequest,UserRegister
import google.generativeai as genai

from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)





app = FastAPI()

def verify_token(authorization):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Token missing"
        )

    token = authorization.split(" ")[1]

    try:
        payload = jwt.decode(
            token,
            os.getenv("JWT_SECRET"),
            algorithms=["HS256"]
        )

        return payload

    except Exception:
        raise HTTPException(
        status_code=401,
        detail="Invalid token"
        )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "StayEase AI Backend Running"}

@app.get("/homestays")
def get_homestays():
    homestays = list(homestays_collection.find({}, {"_id": 0}))
    return homestays

@app.get("/homestays/{homestay_id}")
def get_homestay(homestay_id: int):
    homestay = homestays_collection.find_one(
        {"id": homestay_id},
        {"_id": 0}
    )

    if not homestay:
        raise HTTPException(status_code=404, detail="Homestay not found")

    return homestay

@app.post("/homestays")
def create_homestay(homestay: dict):
    homestays_collection.insert_one(homestay)
    return {"message": "Homestay added"}

@app.put("/homestays/{homestay_id}")
def update_homestay(homestay_id: int, updated_data: dict):
    result = homestays_collection.update_one(
        {"id": homestay_id},
        {"$set": updated_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Homestay not found")

    return {"message": "Homestay updated"}

@app.delete("/homestays/{homestay_id}")
def delete_homestay(homestay_id: int):
    result = homestays_collection.delete_one(
        {"id": homestay_id}
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Homestay not found")

    return {"message": "Homestay deleted"}

@app.get("/search")
def search_homestay(name: str):
    homestays = list(
        homestays_collection.find(
            {"name": {"$regex": name, "$options": "i"}},
            {"_id": 0}
        )
    )

    return homestays


@app.post("/api/auth/register")
def register(user: UserRegister):

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        return {"message": "Email already exists"}

    hashed_password = bcrypt.hashpw(
        user.password.encode(),
        bcrypt.gensalt()
    )

    users_collection.insert_one({
        "email": user.email,
        "password": hashed_password.decode()
    })

    return {
        "message": "User registered successfully"
    }
    
@app.post("/api/auth/login")
def login(user: UserLogin):

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not bcrypt.checkpw(
        user.password.encode(),
        existing_user["password"].encode()
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = jwt.encode(
        {"email": user.email},
        os.getenv("JWT_SECRET"),
        algorithm="HS256"
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
    
@app.get("/api/profile")
def profile(
    authorization: str = Header(None)
):

    user = verify_token(authorization)

    return {
        "message": "Protected route accessed",
        "user": user
    }
    
@app.post("/api/ai/itinerary")
def generate_itinerary(data: TravelRequest):

    model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

    prompt = f"""
    Create a travel itinerary.

    Destination: {data.destination}
    Days: {data.days}
    Budget: ₹{data.budget}

    Give:
    - Day wise plan
    - Recommended activities
    - Travel tips
    """

    response = model.generate_content(
        prompt
    )

    return {
        "itinerary": response.text
    }

# Favorites API Endpoints
@app.post("/api/favorites/{homestay_id}")
def add_favorite(homestay_id: str, authorization: str = Header(None)):
    user = verify_token(authorization)
    email = user["email"]
    str_id = str(homestay_id)

    existing = favorites_collection.find_one({
        "user_email": email,
        "homestay_id": str_id
    })

    if not existing:
        favorites_collection.insert_one({
            "user_email": email,
            "homestay_id": str_id
        })

    return {"message": "Favorite added", "homestay_id": str_id}

@app.delete("/api/favorites/{homestay_id}")
def remove_favorite(homestay_id: str, authorization: str = Header(None)):
    user = verify_token(authorization)
    email = user["email"]
    str_id = str(homestay_id)

    favorites_collection.delete_one({
        "user_email": email,
        "homestay_id": str_id
    })

    return {"message": "Favorite removed", "homestay_id": str_id}

@app.get("/api/favorites")
def get_favorites(authorization: str = Header(None)):
    user = verify_token(authorization)
    email = user["email"]

    user_favs = list(favorites_collection.find({"user_email": email}, {"_id": 0}))
    fav_ids = [str(fav["homestay_id"]) for fav in user_favs]

    return {"favorites": fav_ids}