from pydantic import BaseModel, EmailStr
from typing import Optional

class UserRegister(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TravelRequest(BaseModel):
    destination: str
    days: int
    budget: int

class ItinerarySaveRequest(BaseModel):
    destination: str
    days: int
    budget: float
    itinerary: str