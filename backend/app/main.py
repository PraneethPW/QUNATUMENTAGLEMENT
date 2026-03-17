from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.sentiment_routes import router as sentiment_router
from app.routes.qa_routes import router as qa_router

app = FastAPI(
    title="Quantum AI Backend",
    description="Aspect Sentiment + Quantum QA",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Backend running 🚀"}

app.include_router(sentiment_router)
app.include_router(qa_router)