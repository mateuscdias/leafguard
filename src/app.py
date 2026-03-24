from fastapi import FastAPI
from pydantic import BaseModel
from typing import List,Optional
from src.plant_diagnosis import PlantDiagnoser
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

diagnoser = PlantDiagnoser("src/diagnoser.pl")

#Request Class

class DiagnoseRequest(BaseModel):
    symptoms: List[str]
    environmental_factors:Optional[List[str]] = []

# Routes

@app.get("/")
def root():
    return {"message": "LeafGuard API Running"}

@app.post("/diagnose")
def diagnose(request: DiagnoseRequest):
    result = diagnoser.diagnose(
        request.symptoms,
        request.environmental_factors
    )

    return {"results":result}

@app.get("/symptoms")
def get_symptoms():
    return diagnoser.get_available_symptoms()

@app.get("/diseases")
def get_diseases():
    return diagnoser.list_all_diseases()
