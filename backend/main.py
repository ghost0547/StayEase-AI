from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

homestays = [
    {
        "id": 1,
        "name": "Mountain View Homestay",
        "location": "Nainital",
        "price": 1500
    },
    {
        "id": 2,
        "name": "Lake Side Cottage",
        "location": "Bhimtal",
        "price": 2000
    }
]

@app.get("/")
def home():
    return {"message": "StayEase AI Backend Running"}

@app.get("/homestays")
def get_homestays():
    return homestays

@app.get("/homestays/{homestay_id}")
def get_homestay(homestay_id: int):
    for h in homestays:
        if h["id"] == homestay_id:
            return h
    raise HTTPException(status_code=404, detail="Homestay not found")

@app.post("/homestays")
def create_homestay(homestay: dict):
    homestays.append(homestay)
    return {"message": "Homestay added"}

@app.put("/homestays/{homestay_id}")
def update_homestay(homestay_id: int, updated_data: dict):
    for h in homestays:
        if h["id"] == homestay_id:
            h.update(updated_data)
            return {"message": "Homestay updated"}
    raise HTTPException(status_code=404, detail="Homestay not found")

@app.delete("/homestays/{homestay_id}")
def delete_homestay(homestay_id: int):
    for h in homestays:
        if h["id"] == homestay_id:
            homestays.remove(h)
            return {"message": "Homestay deleted"}
    raise HTTPException(status_code=404, detail="Homestay not found")

@app.get("/search")
def search_homestay(name: str):
    result = [
        h for h in homestays
        if name.lower() in h["name"].lower()
    ]
    return result