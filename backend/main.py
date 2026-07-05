from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import homestays_collection

app = FastAPI()

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