from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.service_container import llm_service

# Import and include routers
from app.api.routes import models
from app.api.routes.v1.endpoints import generate

app = FastAPI(
    title="Mimiq API", description="Backend API for Mimiq application", version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "https://mimiq.onrender.com",
        "https://mimiq-test.onrender.com",
        "https://mimiq-dev.onrender.com",
        "https://mimiq-api.onrender.com",
    ],  # Explicitly allow frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


app.include_router(generate.router, prefix="/api/v1", tags=["generate"])
app.include_router(models.router, prefix="/api/v1", tags=["models"])


@app.get("/")
async def root():
    return {"message": "Welcome to Mimiq API"}


@app.on_event("shutdown")
async def shutdown_event():
    await llm_service.close()
