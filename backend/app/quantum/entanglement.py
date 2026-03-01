import numpy as np
from app.quantum.embedding import generate_quantum_state

def entangle_sentence(sentence: str):
    words = sentence.split()[:3]  # limit to 3 words (safe tensor size)

    state = generate_quantum_state(words[0])

    for word in words[1:]:
        next_state = generate_quantum_state(word)
        state = np.kron(state, next_state)

    return state / np.linalg.norm(state)