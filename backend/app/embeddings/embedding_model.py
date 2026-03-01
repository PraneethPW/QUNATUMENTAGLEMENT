from sentence_transformers import SentenceTransformer
import numpy as np

# Load model once globally
_model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embedding(text: str) -> np.ndarray:
    """
    Generate normalized semantic embedding (quantum state |psi>)
    """

    vector = _model.encode(text)
    vector = np.array(vector, dtype=np.float64)

    norm = np.linalg.norm(vector)

    if norm == 0:
        return vector

    return vector / norm