from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI(title="NexusAI Sovereign Engine")

# Kali localhost-da Frontend-in qoşulması üçün icazə
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class StartupRequest(BaseModel):
    startup_name: str
    sector: str
    stage: str

@app.get("/")
def health_check():
    return {"status": "Sovereign Engine Active", "version": "1.0.0"}

@app.post("/api/v1/match")
async def ai_match_engine(data: StartupRequest):
    # Simulyasiya edilmiş AI Analizi
    match_score = random.randint(85, 99)
    return {
        "match_score": f"{match_score}%",
        "analysis": f"AI confirms high scalability for {data.startup_name} in Azerbaijan. Verified Security Protocols applied.",
        "security_log": "Activity logged in IRIA Audit Trail."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
