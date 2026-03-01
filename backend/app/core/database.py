from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import declarative_base
from app.core.config import settings


# --------------------------------------------------
# Create Async Engine (Production Safe)
# --------------------------------------------------
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,              # Disable SQL logs in production
    pool_pre_ping=True,      # Prevent "connection is closed" errors
    pool_size=5,
    max_overflow=10,
)


# --------------------------------------------------
# Session Factory
# --------------------------------------------------
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


# --------------------------------------------------
# Base Model
# --------------------------------------------------
Base = declarative_base()


# --------------------------------------------------
# Dependency for FastAPI
# --------------------------------------------------
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()