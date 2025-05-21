"""
Stream response g for FastAPI endpoints.
"""


def stream_response(response, stream_type="text"):
    if stream_type == "text":
        for chunk in response:
            yield chunk or ""
    elif stream_type == "sse":
        for chunk in response:
            yield f"data: {chunk}\n\n"
    else:
        raise ValueError(f"Invalid stream type: {stream_type}")
