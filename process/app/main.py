from fastapi import FastAPI, UploadFile , File



import pandas as pd;

def dataframe_to_objects(df):
    """
    Convert a pandas DataFrame into a list of dictionaries (objects),
    where each row becomes a dictionary.
    """
    array_of_objects = []

    for _, row in df.iterrows():
        obj = {
            "Date": row["Date"],
            "Lecture Name": row["Lecture Name"],
            "Day": row["Day"],
            "Time": row["Time"]
        }
        array_of_objects.append(obj)
    return array_of_objects


app = FastAPI()

@app.get("/")
async def root():

    return "<h1>Hello World Madarhod</h1>"



@app.post("/data")
async def process_excel(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        return {"error": "Please upload a CSV file"}
    
    # Correct: pass the file object directly
    df = pd.read_csv(file.file)

    result = dataframe_to_objects(df)
    return result

  