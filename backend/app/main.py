from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Mimiq API",
    description="Backend API for Mimiq application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Change to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import and include routers
from app.api.routes import models

app.include_router(models.router, prefix="/api/v1", tags=["models"])



@app.get("/")
async def root():
    return {"message": "Welcome to Mimiq API"} 