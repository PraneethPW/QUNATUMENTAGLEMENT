import numpy as np

def generate_quantum_state(text: str, dim: int = 16):

    np.random.seed(abs(hash(text)) % (10**6))

    vec = np.random.rand(dim)

    complex_vec = vec.astype(np.complex128)

    return complex_vec / np.linalg.norm(complex_vec)