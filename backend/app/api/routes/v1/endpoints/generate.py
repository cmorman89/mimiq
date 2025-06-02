from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
from fastapi.responses import StreamingResponse
from app.langchain.chains.generate_blog import (
    generate_blog,
    generate_blog_topic_ideas,
    BlogTopicIdeasResponse,
)
from app.utils.stream_response import stream_response

router = APIRouter()


class BlogRequest(BaseModel):
    topic: str
    keywords: Optional[List[str]] = None
    details: Optional[str] = None


@router.post("/generate")
async def generate(request: BlogRequest) -> StreamingResponse:
    return StreamingResponse(
        stream_response(
            generate_blog(
                request.topic,
                request.keywords,
                request.details,
                stream=True,
            ),
            stream_type="text",
        ),
        media_type="text/plain",
    )

class BlogTopicRequest(BaseModel):
    direction: Optional[str] = None

@router.post("/generate/topics")
@router.get("/generate/topics")
async def generate_topics(request: BlogTopicRequest = None, direction: str = None) -> BlogTopicIdeasResponse:
    direction = request.direction if request else direction if direction else "Benefits of AI"
    return generate_blog_topic_ideas(direction)
