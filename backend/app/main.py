from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine
from app.models.db_models import Base
# from app.routes.qa_routes import router as qa_router
from app.routes.sentiment_routes import router as sentiment_router



# --------------------------------------------------
# FastAPI App Initialization
# --------------------------------------------------
app = FastAPI(
    title="Quantum Intelligence API",
    description="Hybrid Semantic Ranking + Generative AI Backend",
    version="1.0.0",
)


# --------------------------------------------------
# CORS Configuration (Frontend Access)
# --------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # local frontend
        "https://qunatumentagelment.vercel.app",  # deployed frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Startup Event - Ensure Tables Exist
# --------------------------------------------------
@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# --------------------------------------------------
# Root Health Check
# --------------------------------------------------
@app.get("/")
async def root():
    return {
        "status": "running",
        "message": "Quantum Intelligence Backend is live 🚀",
    }


# --------------------------------------------------
# Include Routers
# --------------------------------------------------
# app.include_router(qa_router)
app.include_router(sentiment_router)