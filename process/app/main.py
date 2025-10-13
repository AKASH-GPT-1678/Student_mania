from fastapi import FastAPI, UploadFile, File, HTTPException
import pandas as pd
from typing import List, Dict

app = FastAPI()

def dataframe_to_objects(df: pd.DataFrame) -> List[Dict]:
    """
    Convert a pandas DataFrame into a list of dictionaries.
    Each row becomes a dictionary with keys: Date, Lecture Name, Day, Time
    """
    array_of_objects = []
    for _, row in df.iterrows():
        obj = {
            "Date": row.get("Date"),
            "Lecture": row.get("Lecture Name"),
            "Day": row.get("Day"),
            "Time": row.get("Time")
        }
        array_of_objects.append(obj)
    return array_of_objects


@app.get("/")
async def root():
    return {"message": "Hello World!"}


@app.post("/data")
async def process_csv(file: UploadFile = File(...)) -> List[Dict]:
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Please upload a CSV file")

    try:
        # Read CSV into pandas DataFrame
        df = pd.read_csv(file.file)

        # Convert DataFrame to list of objects
        result = dataframe_to_objects(df)
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
