from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.llm_service import LLMService
from app.global_settings import API_BASE_URL

app = FastAPI(
    title="Mimiq API",
    description="Backend API for Mimiq application",
    version="1.0.0"
)

# Initialize LLMService
llm_service = LLMService(api_base_url=API_BASE_URL)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],  # Explicitly allow frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Import and include routers
from app.api.routes import models

app.include_router(models.router, prefix="/api/v1", tags=["models"])

@app.get("/")
async def root():
    return {"message": "Welcome to Mimiq API"}

@app.on_event("shutdown")
async def shutdown_event():
    await llm_service.close() 