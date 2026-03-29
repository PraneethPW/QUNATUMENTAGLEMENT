from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")

def generate_embedding(text: str):
    vec = model.encode(text)
    vec = np.array(vec)

    norm = np.linalg.norm(vec)
    return vec if norm == 0 else vec / norm