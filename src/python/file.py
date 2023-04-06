import pickle
import sys
import numpy as np
import json

# Charger le modèle depuis un fichier pkl
with open("src/python/MLModel.pkl", "rb") as f:
    modele = pickle.load(f)

input_data = sys.argv[1]
X_dict = json.loads(input_data)
X = np.array(list(X_dict.values()), dtype=np.float32).reshape(1, -1)

predictions = modele.predict(X)
print(predictions[0])
