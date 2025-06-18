Modèles
=======

ExamGuard Pro utilise plusieurs modèles d'intelligence artificielle pour détecter les comportements de triche. Cette section détaille les modèles disponibles, leur configuration et leur personnalisation.

Vue d'ensemble
--------------

Le système intègre différents types de modèles :

- **Détection de visages** : Identification et vérification d'identité
- **Détection d'objets** : Reconnaissance d'objets interdits
- **Suivi oculaire** : Analyse des mouvements des yeux
- **Analyse audio** : Détection de voix et bruits suspects
- **Classification comportementale** : Évaluation des patterns suspects

Architecture des modèles
------------------------

.. code-block:: text

    ┌─────────────────────┐
    │   Flux Vidéo        │
    │   (Webcam)          │
    └─────────────────────┘
              │
    ┌─────────────────────┐
    │   Préprocessing     │
    │   - Redimensionnement│
    │   - Normalisation   │
    │   - Augmentation    │
    └─────────────────────┘
              │
    ┌─────────────────────┐
    │   Modèles IA        │
    │   - Face Detection  │
    │   - Object Detection│
    │   - Eye Tracking    │
    └─────────────────────┘
              │
    ┌─────────────────────┐
    │   Post-processing   │
    │   - Filtrage        │
    │   - Fusion          │
    │   - Classification  │
    └─────────────────────┘
              │
    ┌─────────────────────┐
    │   Résultats         │
    │   (Détections)      │
    └─────────────────────┘

Modèles de détection faciale
----------------------------

Haar Cascade (Par défaut)
~~~~~~~~~~~~~~~~~~~~~~~~~

**Caractéristiques :**

- Rapide et léger
- Faible consommation CPU
- Bonne précision pour la détection frontale
- Pré-entraîné sur des milliers d'images

**Configuration :**

.. code-block:: python

    FACE_DETECTION = {
        'model': 'haarcascade',
        'cascade_file': 'models/haarcascade_frontalface_default.xml',
        'scale_factor': 1.1,
        'min_neighbors': 5,
        'min_size': (30, 30),
        'max_size': (300, 300)
    }

**Avantages :**

- Temps de traitement rapide
- Faible utilisation mémoire
- Stable et fiable

**Inconvénients :**

- Moins précis avec des visages en angle
- Sensible aux conditions d'éclairage

MTCNN (Multi-task CNN)
~~~~~~~~~~~~~~~~~~~~~~

**Caractéristiques :**

- Détection multi-étapes
- Localisation précise des points faciaux
- Robuste aux rotations et éclairage
- Meilleure qualité de détection

**Configuration :**

.. code-block:: python

    FACE_DETECTION = {
        'model': 'mtcnn',
        'min_face_size': 40,
        'threshold': [0.6, 0.7, 0.7],
        'factor': 0.709,
        'post_process': True
    }

**Installation :**

.. code-block:: bash

    pip install mtcnn

**Utilisation :**

.. code-block:: python

    from mtcnn import MTCNN
    
    detector = MTCNN()
    faces = detector.detect_faces(image)

MediaPipe Face Detection
~~~~~~~~~~~~~~~~~~~~~~~~

**Caractéristiques :**

- Optimisé pour le temps réel
- Haute précision
- Support GPU/CPU
- Points de repère faciaux inclus

**Configuration :**

.. code-block:: python

    FACE_DETECTION = {
        'model': 'mediapipe',
        'model_selection': 0,  # 0 ou 1
        'min_detection_confidence': 0.7
    }

**Utilisation :**

.. code-block:: python

    import mediapipe as mp
    
    mp_face_detection = mp.solutions.face_detection
    mp_drawing = mp.solutions.drawing_utils
    
    with mp_face_detection.FaceDetection(
        model_selection=0, 
        min_detection_confidence=0.7
    ) as face_detection:
        results = face_detection.process(image)

Modèles de détection d'objets
-----------------------------

YOLO (You Only Look Once)
~~~~~~~~~~~~~~~~~~~~~~~~~

**YOLOv5 (Recommandé)**

.. code-block:: python

    OBJECT_DETECTION = {
        'model': 'yolo_v5',
        'weights': 'models/yolov5s.pt',
        'confidence_threshold': 0.7,
        'iou_threshold': 0.45,
        'classes': [67, 73, 76],  # phone, book, laptop
        'device': 'cpu'  # ou 'cuda:0'
    }

**Classes détectées :**

+-------+---------------+------------------+
| ID    | Nom           | Description      |
+=======+===============+==================+
| 67    | cell phone    | Téléphone mobile |
+-------+---------------+------------------+
| 73    | book          | Livre/cahier     |
+-------+---------------+------------------+
| 76    | laptop        | Ordinateur       |
+-------+---------------+------------------+
| 63    | couch         | Canapé           |
+-------+---------------+------------------+
| 0     | person        | Personne         |
+-------+---------------+------------------+

**Installation et utilisation :**

.. code-block:: bash

    pip install ultralytics

.. code-block:: python

    from ultralytics import YOLO
    
    model = YOLO('yolov5s.pt')
    results = model(image)

**YOLOv8 (Plus récent)**

.. code-block:: python

    OBJECT_DETECTION = {
        'model': 'yolo_v8',
        'weights': 'models/yolov8n.pt',
        'confidence_threshold': 0.7,
        'iou_threshold': 0.45
    }

TensorFlow Object Detection
~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Modèles disponibles :**

- SSD MobileNet (Rapide)
- SSD ResNet (Précis)
- Faster R-CNN (Très précis)

**Configuration SSD MobileNet :**

.. code-block:: python

    OBJECT_DETECTION = {
        'model': 'ssd_mobilenet',
        'model_path': 'models/ssd_mobilenet_v2/frozen_inference_graph.pb',
        'config_path': 'models/ssd_mobilenet_v2/config.pbtxt',
        'confidence_threshold': 0.7,
        'input_size': 300
    }

Modèles de suivi oculaire
-------------------------

MediaPipe Face Mesh
~~~~~~~~~~~~~~~~~~~

**Caractéristiques :**

- 468 points de repère faciaux
- Suivi précis des yeux
- Estimation de la direction du regard
- Optimisé temps réel

**Configuration :**

.. code-block:: python

    EYE_TRACKING = {
        'model': 'mediapipe_mesh',
        'max_num_faces': 1,
        'refine_landmarks': True,
        'min_detection_confidence': 0.5,
        'min_tracking_confidence': 0.5
    }

**Points d'intérêt pour les yeux :**

.. code-block:: python

    # Indices des points pour l'œil gauche
    LEFT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]
    
    # Indices des points pour l'œil droit  
    RIGHT_EYE = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]

OpenCV Eye Cascade
~~~~~~~~~~~~~~~~~~

**Configuration simple :**

.. code-block:: python

    EYE_TRACKING = {
        'model': 'opencv_cascade',
        'cascade_file': 'models/haarcascade_eye.xml',
        'scale_factor': 1.1,
        'min_neighbors': 5
    }

Gaze Estimation
~~~~~~~~~~~~~~~

**Estimation de la direction du regard :**

.. code-block:: python

    import numpy as np
    
    def estimate_gaze_direction(left_eye_landmarks, right_eye_landmarks):
        # Calculer le centre des yeux
        left_center = np.mean(left_eye_landmarks, axis=0)
        right_center = np.mean(right_eye_landmarks, axis=0)
        
        # Calculer la direction
        gaze_vector = right_center - left_center
        angle = np.arctan2(gaze_vector[1], gaze_vector[0])
        
        return angle

Modèles d'analyse audio
-----------------------

Détection de voix
~~~~~~~~~~~~~~~~~

**Configuration :**

.. code-block:: python

    AUDIO_DETECTION = {
        'enabled': True,
        'model': 'webrtcvad',
        'aggressiveness': 2,  # 0-3
        'frame_duration': 30,  # ms
        'sample_rate': 16000
    }

**Utilisation WebRTC VAD :**

.. code-block:: python

    import webrtcvad
    
    vad = webrtcvad.Vad(2)  # Aggressiveness level
    
    # Détecter la voix dans un frame audio
    is_speech = vad.is_speech(audio_frame, sample_rate)

Classification des sons
~~~~~~~~~~~~~~~~~~~~~~~

**TensorFlow Audio Models :**

.. code-block:: python

    AUDIO_CLASSIFICATION = {
        'model': 'yamnet',
        'model_path': 'models/yamnet.tflite',
        'confidence_threshold': 0.5,
        'target_classes': ['Speech', 'Conversation', 'Whispering']
    }

Modèles personnalisés
--------------------

Entraînement d'un modèle personnalisé
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Préparation des données**

.. code-block:: bash

    # Structure des dossiers
    datasets/
    ├── cheating/
    │   ├── phone_usage/
    │   ├── looking_away/
    │   └── multiple_persons/
    └── normal/
        ├── focused/
        ├── writing/
        └── thinking/

**2. Script d'entraînement**

.. code-block:: python

    import tensorflow as tf
    from tensorflow.keras import layers, models

    def create_custom_model(input_shape, num_classes):
        model = models.Sequential([
            layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.Flatten(),
            layers.Dense(64, activation='relu'),
            layers.Dropout(0.5),
            layers.Dense(num_classes, activation='softmax')
        ])
        
        model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        return model

    # Entraîner le modèle
    model = create_custom_model((224, 224, 3), 2)
    model.fit(train_dataset, epochs=50, validation_data=val_dataset)
    model.save('models/custom_cheating_detector.h5')

**3. Intégration du modèle**

.. code-block:: python

    CUSTOM_MODEL = {
        'enabled': True,
        'model_path': 'models/custom_cheating_detector.h5',
        'input_size': (224, 224),
        'confidence_threshold': 0.8,
        'classes': ['normal', 'cheating']
    }

Transfer Learning
~~~~~~~~~~~~~~~~~

**Utilisation d'un modèle pré-entraîné :**

.. code-block:: python

    import tensorflow as tf
    from tensorflow.keras.applications import ResNet50

    # Charger le modèle pré-entraîné
    base_model = ResNet50(
        weights='imagenet',
        include_top=False,
        input_shape=(224, 224, 3)
    )

    # Ajouter des couches personnalisées
    model = tf.keras.Sequential([
        base_model,
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(2, activation='softmax')
    ])

    # Geler les couches du modèle de base
    base_model.trainable = False

    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

Optimisation des performances
----------------------------

Optimisation GPU
~~~~~~~~~~~~~~~~

**Configuration CUDA :**

.. code-block:: python

    import tensorflow as tf

    # Vérifier la disponibilité GPU
    gpus = tf.config.experimental.list_physical_devices('GPU')
    if gpus:
        try:
            # Limiter la mémoire GPU
            tf.config.experimental.set_memory_growth(gpus[0], True)
        except RuntimeError as e:
            print(e)

**Configuration pour OpenCV :**

.. code-block:: python

    import cv2

    # Utiliser OpenCL si disponible
    cv2.ocl.setUseOpenCL(True)

Quantification des modèles
~~~~~~~~~~~~~~~~~~~~~~~~~~

**TensorFlow Lite :**

.. code-block:: python

    import tensorflow as tf

    # Convertir en TensorFlow Lite
    converter = tf.lite.TFLiteConverter.from_saved_model('models/my_model')
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    
    # Quantification
    converter.representative_dataset = representative_data_gen
    converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
    converter.inference_input_type = tf.uint8
    converter.inference_output_type = tf.uint8
    
    tflite_model = converter.convert()
    
    with open('models/my_model.tflite', 'wb') as f:
        f.write(tflite_model)

Parallélisation
~~~~~~~~~~~~~~~

**Traitement multi-thread :**

.. code-block:: python

    import concurrent.futures
    import threading

    class ModelPipeline:
        def __init__(self):
            self.face_model = load_face_model()
            self.object_model = load_object_model()
            self.eye_model = load_eye_model()
            
        def process_frame(self, frame):
            with concurrent.futures.ThreadPoolExecutor() as executor:
                # Lancer les détections en parallèle
                face_future = executor.submit(self.detect_faces, frame)
                object_future = executor.submit(self.detect_objects, frame)
                eye_future = executor.submit(self.track_eyes, frame)
                
                # Récupérer les résultats
                faces = face_future.result()
                objects = object_future.result()
                eyes = eye_future.result()
                
                return self.combine_results(faces, objects, eyes)

Évaluation des modèles
----------------------

Métriques de performance
~~~~~~~~~~~~~~~~~~~~~~~~

**Précision, Rappel, F1-Score :**

.. code-block:: python

    from sklearn.metrics import classification_report, confusion_matrix
    import numpy as np

    def evaluate_model(y_true, y_pred, classes):
        # Matrice de confusion
        cm = confusion_matrix(y_true, y_pred)
        print("Matrice de confusion:")
        print(cm)
        
        # Rapport de classification
        report = classification_report(y_true, y_pred, target_names=classes)
        print("\nRapport de classification:")
        print(report)
        
        # Précision par classe
        precision = np.diag(cm) / np.sum(cm, axis=0)
        recall = np.diag(cm) / np.sum(cm, axis=1)
        f1 = 2 * (precision * recall) / (precision + recall)
        
        return {
            'precision': precision,
            'recall': recall,
            'f1': f1
        }

**Courbe ROC :**

.. code-block:: python

    from sklearn.metrics import roc_curve, auc
    import matplotlib.pyplot as plt

    def plot_roc_curve(y_true, y_scores):
        fpr, tpr, _ = roc_curve(y_true, y_scores)
        roc_auc = auc(fpr, tpr)
        
        plt.figure()
        plt.plot(fpr, tpr, label=f'ROC curve (AUC = {roc_auc:.2f})')
        plt.plot([0, 1], [0, 1], 'k--')
        plt.xlim([0.0, 1.0])
        plt.ylim([0.0, 1.05])
        plt.xlabel('Taux de faux positifs')
        plt.ylabel('Taux de vrais positifs')
        plt.title('Courbe ROC')
        plt.legend(loc="lower right")
        plt.show()

Benchmarking
~~~~~~~~~~~~

**Test de performance :**

.. code-block:: python

    import time
    import cv2

    def benchmark_model(model, test_images, iterations=100):
        total_time = 0
        
        for i in range(iterations):
            # Sélectionner une image aléatoire
            img = test_images[i % len(test_images)]
            
            # Mesurer le temps d'inférence
            start_time = time.time()
            predictions = model.predict(img)
            end_time = time.time()
            
            total_time += (end_time - start_time)
        
        avg_time = total_time / iterations
        fps = 1.0 / avg_time
        
        print(f"Temps moyen par image: {avg_time:.4f}s")
        print(f"FPS théorique: {fps:.2f}")
        
        return avg_time, fps

Déploiement des modèles
-----------------------

Sauvegarde et chargement
~~~~~~~~~~~~~~~~~~~~~~~~

**TensorFlow/Keras :**

.. code-block:: python

    # Sauvegarder un modèle
    model.save('models/my_model.h5')
    
    # Charger un modèle
    model = tf.keras.models.load_model('models/my_model.h5')

**PyTorch :**

.. code-block:: python

    import torch

    # Sauvegarder
    torch.save(model.state_dict(), 'models/my_model.pth')
    
    # Charger
    model.load_state_dict(torch.load('models/my_model.pth'))
    model.eval()

Versioning des modèles
~~~~~~~~~~~~~~~~~~~~~~

**Structure recommandée :**

.. code-block:: text

    models/
    ├── face_detection/
    │   ├── v1.0/
    │   ├── v1.1/
    │   └── latest -> v1.1/
    ├── object_detection/
    │   ├── v2.0/
    │   └── latest -> v2.0/
    └── eye_tracking/
        ├── v1.5/
        └── latest -> v1.5/

**Configuration de version :**

.. code-block:: python

    MODEL_VERSIONS = {
        'face_detection': 'v1.1',
        'object_detection': 'v2.0',
        'eye_tracking': 'v1.5'
    }

Monitoring des modèles
~~~~~~~~~~~~~~~~~~~~~~

**Surveillance des performances :**

.. code-block:: python

    import logging
    from datetime import datetime

    class ModelMonitor:
        def __init__(self):
            self.stats = {
                'total_predictions': 0,
                'avg_confidence': 0,
                'error_count': 0
            }
            
        def log_prediction(self, confidence, error=False):
            self.stats['total_predictions'] += 1
            
            if error:
                self.stats['error_count'] += 1
            else:
                # Mise à jour de la confiance moyenne
                old_avg = self.stats['avg_confidence']
                n = self.stats['total_predictions']
                self.stats['avg_confidence'] = (old_avg * (n-1) + confidence) / n
            
            # Log si erreur fréquente
            error_rate = self.stats['error_count'] / self.stats['total_predictions']
            if error_rate > 0.1:  # Plus de 10% d'erreurs
                logging.warning(f"Taux d'erreur élevé: {error_rate:.2%}")

Troubleshooting
---------------

Problèmes fréquents
~~~~~~~~~~~~~~~~~~~

**Modèle ne charge pas :**

.. code-block:: python

    try:
        model = tf.keras.models.load_model('models/my_model.h5')
    except Exception as e:
        print(f"Erreur de chargement: {e}")
        # Utiliser un modèle de fallback
        model = load_default_model()

**Performance dégradée :**

.. code-block:: python

    # Vérifier l'utilisation des ressources
    import psutil
    import GPUtil

    def check_system_resources():
        # CPU
        cpu_percent = psutil.cpu_percent(interval=1)
        
        # Mémoire
        memory = psutil.virtual_memory()
        
        # GPU
        gpus = GPUtil.getGPUs()
        
        print(f"CPU: {cpu_percent}%")
        print(f"RAM: {memory.percent}%")
        if gpus:
            print(f"GPU: {gpus[0].load*100:.1f}%")

**Faux positifs élevés :**

.. code-block:: python

    # Ajuster les seuils de confiance
    if false_positive_rate > 0.15:
        CONFIDENCE_THRESHOLD += 0.1
        print(f"Nouveau seuil: {CONFIDENCE_THRESHOLD}")

Documentation des modèles
-------------------------

Chaque modèle doit être documenté avec :

- **Description** et cas d'usage
- **Architecture** et paramètres
- **Données d'entraînement**
- **Métriques de performance**
- **Instructions d'utilisation**
- **Limitations connues**

**Exemple de documentation :**

.. code-block:: yaml

    # models/face_detection_v1.1.yaml
    name: "Face Detection v1.1"
    description: "Détection de visages optimisée pour les examens"
    architecture: "Haar Cascade"
    
    training_data:
      dataset: "Custom exam faces"
      samples: 10000
      validation_split: 0.2
    
    performance:
      precision: 0.92
      recall: 0.89
      f1_score: 0.90
      fps: 45
    
    parameters:
      scale_factor: 1.1
      min_neighbors: 5
      min_size: [30, 30]
    
    limitations:
      - "Performances réduites avec éclairage faible"
      - "Moins précis pour les visages de profil"
    
    usage: |
      face_cascade = cv2.CascadeClassifier('models/haarcascade_frontalface_default.xml')
      faces = face_cascade.detectMultiScale(gray, 1.1, 5)

Cette documentation complète des modèles vous permet de comprendre, configurer et optimiser les différents composants IA d'ExamGuard Pro selon vos besoins spécifiques.
