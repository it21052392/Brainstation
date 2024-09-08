# tests/test_main.py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Test root route
def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Ontology Mindmap Generator API"}

# Test mindmap generation
def test_generate_mindmap():
    response = client.post("/generate-mindmap/", json={
        "slides": [
            {"id": 1, "title": "K8s Components & Architecture", "content": "Kubernetes consists of master and node components."},
            {"id": 2, "title": "What is an OS?", "content": "An operating system manages hardware and software."}
        ]
    })
    assert response.status_code == 200
    assert "mindmap" in response.json()
