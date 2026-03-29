import numpy as np

def compute_similarity(state1, state2):
    min_dim = min(len(state1), len(state2))
    state1 = state1[:min_dim]
    state2 = state2[:min_dim]

    inner_product = np.vdot(state1, state2)
    return float(abs(inner_product) ** 2)