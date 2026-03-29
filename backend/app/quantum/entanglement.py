import numpy as np
from app.quantum.embedding import generate_quantum_state


def entangle_two_inputs(text1: str, text2: str):
    """
    Create quantum entangled state from two inputs
    """

    state1 = generate_quantum_state(text1)
    state2 = generate_quantum_state(text2)

    # Tensor product (entanglement)
    entangled = np.kron(state1, state2)

    return entangled / np.linalg.norm(entangled)