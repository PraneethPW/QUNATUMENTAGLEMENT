from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncEngine

from app.core.database import engine
from app.models.db_models import Base
from app.routes.qa_routes import router as qa_router


# --------------------------------------------------
# Create FastAPI App
# --------------------------------------------------
app = FastAPI(
    title="Quantum Language Model API",
    description="Quantum-inspired QA system with embedding-based ranking + Gemini generation",
    version="1.0.0"
)


# --------------------------------------------------
# CORS Configuration (React Frontend Support)
# --------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠ Change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Startup Event - Create Tables Automatically
# --------------------------------------------------
@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# --------------------------------------------------
# Health Check Endpoint
# --------------------------------------------------
@app.get("/")
async def root():
    return {
        "message": "Quantum QA Engine is running 🚀",
        "status": "healthy"
    }


# --------------------------------------------------
# Include Routers
# --------------------------------------------------
app.include_router(qa_router)