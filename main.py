from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class UserInput(BaseModel):
    name: str
    birthdate: str


@app.get("/")
def home():
    return {"message": "Backend is working"}


@app.post("/reading")
def get_reading(data: UserInput):
    return {
        "reading": f"{data.name}, your destiny is unfolding..."
    }