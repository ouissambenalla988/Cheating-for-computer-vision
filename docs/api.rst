API Documentation
=================

ExamGuard Pro fournit une API REST complète pour intégrer le système de détection de triche dans vos applications existantes.

Vue d'ensemble
--------------

L'API ExamGuard Pro permet de :

- Gérer les sessions d'examen
- Contrôler la détection en temps réel  
- Récupérer les rapports et statistiques
- Configurer les paramètres de détection
- Gérer les utilisateurs et permissions

Base URL
--------

.. code-block:: text

    http://localhost:5000/api/v1/

Authentification
----------------

L'API utilise l'authentification par token JWT.

**Obtenir un token :**

.. code-block:: http

    POST /api/v1/auth/login
    Content-Type: application/json

    {
        "username": "admin",
        "password": "your-password"
    }

**Réponse :**

.. code-block:: json

    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
        "expires_in": 3600,
        "user": {
            "id": 1,
            "username": "admin",
            "role": "administrator"
        }
    }

**Utiliser le token :**

.. code-block:: http

    GET /api/v1/sessions
    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...

Endpoints de l'API
------------------

Sessions d'examen
~~~~~~~~~~~~~~~~~

**Lister les sessions**

.. code-block:: http

    GET /api/v1/sessions

**Paramètres de requête :**

- ``page`` (int) : Numéro de page (défaut: 1)
- ``per_page`` (int) : Éléments par page (défaut: 10)
- ``status`` (string) : Filtrer par statut (active, completed, scheduled)
- ``date_from`` (string) : Date de début (YYYY-MM-DD)
- ``date_to`` (string) : Date de fin (YYYY-MM-DD)

**Réponse :**

.. code-block:: json

    {
        "sessions": [
            {
                "id": 1,
                "name": "Examen Final Mathématiques",
                "status": "active",
                "start_time": "2025-06-20T14:00:00Z",
                "end_time": "2025-06-20T16:00:00Z",
                "participants": 28,
                "detections_count": 15
            }
        ],
        "pagination": {
            "page": 1,
            "per_page": 10,
            "total": 1,
            "pages": 1
        }
    }

**Créer une session**

.. code-block:: http

    POST /api/v1/sessions
    Content-Type: application/json

    {
        "name": "Examen Final Physique",
        "description": "Examen final de physique - Semestre 2",
        "start_time": "2025-06-25T09:00:00Z",
        "duration": 120,
        "max_participants": 30,
        "settings": {
            "face_detection": true,
            "object_detection": true,
            "eye_tracking": "medium",
            "audio_monitoring": false
        }
    }

**Réponse :**

.. code-block:: json

    {
        "id": 2,
        "name": "Examen Final Physique",
        "status": "scheduled",
        "start_time": "2025-06-25T09:00:00Z",
        "end_time": "2025-06-25T11:00:00Z",
        "created_at": "2025-06-18T10:30:00Z"
    }

**Obtenir une session**

.. code-block:: http

    GET /api/v1/sessions/1

**Réponse :**

.. code-block:: json

    {
        "id": 1,
        "name": "Examen Final Mathématiques",
        "description": "Examen final de mathématiques",
        "status": "active",
        "start_time": "2025-06-20T14:00:00Z",
        "end_time": "2025-06-20T16:00:00Z",
        "duration": 120,
        "participants": [
            {
                "id": 1,
                "name": "Jean Dupont",
                "email": "jean.dupont@example.com",
                "status": "active",
                "detections_count": 3,
                "risk_score": 0.25
            }
        ],
        "settings": {
            "face_detection": true,
            "object_detection": true,
            "eye_tracking": "medium",
            "audio_monitoring": false
        }
    }

**Mettre à jour une session**

.. code-block:: http

    PUT /api/v1/sessions/1
    Content-Type: application/json

    {
        "name": "Examen Final Mathématiques - Modifié",
        "settings": {
            "eye_tracking": "high"
        }
    }

**Supprimer une session**

.. code-block:: http

    DELETE /api/v1/sessions/1

Détections
~~~~~~~~~~

**Lister les détections**

.. code-block:: http

    GET /api/v1/sessions/1/detections

**Paramètres de requête :**

- ``type`` (string) : Type de détection (face, object, eye_movement, audio)
- ``severity`` (string) : Niveau de gravité (low, medium, high)
- ``participant_id`` (int) : ID du participant
- ``timestamp_from`` (string) : Timestamp de début
- ``timestamp_to`` (string) : Timestamp de fin

**Réponse :**

.. code-block:: json

    {
        "detections": [
            {
                "id": 123,
                "session_id": 1,
                "participant_id": 5,
                "type": "object",
                "subtype": "phone",
                "confidence": 0.87,
                "severity": "high",
                "timestamp": "2025-06-20T14:15:30Z",
                "bbox": [120, 80, 200, 160],
                "screenshot_url": "/screenshots/123.jpg",
                "description": "Téléphone mobile détecté"
            }
        ],
        "total": 47
    }

**Obtenir une détection**

.. code-block:: http

    GET /api/v1/detections/123

**Marquer une détection**

.. code-block:: http

    PUT /api/v1/detections/123
    Content-Type: application/json

    {
        "status": "reviewed",
        "action": "false_positive",
        "comment": "Reflet sur les lunettes, pas un téléphone"
    }

Participants
~~~~~~~~~~~~

**Ajouter un participant**

.. code-block:: http

    POST /api/v1/sessions/1/participants
    Content-Type: application/json

    {
        "name": "Marie Martin",
        "email": "marie.martin@example.com",
        "student_id": "12346",
        "metadata": {
            "group": "A",
            "special_needs": false
        }
    }

**Obtenir un participant**

.. code-block:: http

    GET /api/v1/participants/5

**Réponse :**

.. code-block:: json

    {
        "id": 5,
        "name": "Marie Martin",
        "email": "marie.martin@example.com",
        "student_id": "12346",
        "status": "active",
        "join_time": "2025-06-20T14:02:15Z",
        "camera_status": "connected",
        "detections_count": 2,
        "risk_score": 0.15,
        "metadata": {
            "group": "A",
            "special_needs": false
        }
    }

Contrôle en temps réel
~~~~~~~~~~~~~~~~~~~~~~

**Démarrer une session**

.. code-block:: http

    POST /api/v1/sessions/1/start

**Arrêter une session**

.. code-block:: http

    POST /api/v1/sessions/1/stop

**État en temps réel**

.. code-block:: http

    GET /api/v1/sessions/1/status

**Réponse :**

.. code-block:: json

    {
        "session_id": 1,
        "status": "active",
        "uptime": 3600,
        "active_participants": 27,
        "total_detections": 45,
        "recent_detections": [
            {
                "id": 124,
                "participant_id": 8,
                "type": "eye_movement",
                "severity": "medium",
                "timestamp": "2025-06-20T15:45:12Z"
            }
        ],
        "system_health": {
            "cpu_usage": 45.2,
            "memory_usage": 67.8,
            "gpu_usage": 23.1
        }
    }

Rapports
~~~~~~~~

**Générer un rapport**

.. code-block:: http

    POST /api/v1/sessions/1/reports
    Content-Type: application/json

    {
        "type": "full",
        "format": "pdf",
        "include_screenshots": true,
        "include_videos": false,
        "email_to": "admin@school.com"
    }

**Réponse :**

.. code-block:: json

    {
        "report_id": "rep_123456",
        "status": "generating",
        "estimated_completion": "2025-06-20T16:10:00Z",
        "download_url": null
    }

**Obtenir un rapport**

.. code-block:: http

    GET /api/v1/reports/rep_123456

**Réponse :**

.. code-block:: json

    {
        "report_id": "rep_123456",
        "status": "completed",
        "created_at": "2025-06-20T16:05:30Z",
        "download_url": "/downloads/reports/rep_123456.pdf",
        "expires_at": "2025-06-27T16:05:30Z"
    }

Configuration
~~~~~~~~~~~~~

**Obtenir la configuration**

.. code-block:: http

    GET /api/v1/config

**Réponse :**

.. code-block:: json

    {
        "detection": {
            "face_detection": {
                "enabled": true,
                "confidence_threshold": 0.8,
                "model": "haarcascade"
            },
            "object_detection": {
                "enabled": true,
                "confidence_threshold": 0.7,
                "model": "yolo_v5",
                "classes": ["phone", "book", "laptop"]
            },
            "eye_tracking": {
                "enabled": true,
                "sensitivity": "medium",
                "gaze_threshold": 10
            }
        },
        "system": {
            "max_concurrent_sessions": 5,
            "video_resolution": [1280, 720],
            "fps": 30,
            "storage_days": 30
        }
    }

**Mettre à jour la configuration**

.. code-block:: http

    PUT /api/v1/config
    Content-Type: application/json

    {
        "detection": {
            "object_detection": {
                "confidence_threshold": 0.75
            }
        }
    }

WebSocket API
-------------

Pour les mises à jour en temps réel, ExamGuard Pro fournit une API WebSocket.

**Connexion :**

.. code-block:: javascript

    const socket = new WebSocket('ws://localhost:5000/ws');
    
    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log('Nouvelle détection:', data);
    };

**Messages reçus :**

.. code-block:: json

    {
        "type": "detection",
        "data": {
            "session_id": 1,
            "participant_id": 5,
            "detection_type": "object",
            "confidence": 0.87,
            "timestamp": "2025-06-20T15:30:00Z"
        }
    }

**Souscrire aux événements :**

.. code-block:: json

    {
        "action": "subscribe",
        "session_id": 1,
        "events": ["detections", "participant_status"]
    }

Codes d'erreur
--------------

L'API utilise les codes de statut HTTP standards :

+------+-------------------+------------------------------------------+
| Code | Status            | Description                              |
+======+===================+==========================================+
| 200  | OK                | Requête réussie                          |
+------+-------------------+------------------------------------------+
| 201  | Created           | Ressource créée avec succès             |
+------+-------------------+------------------------------------------+
| 400  | Bad Request       | Paramètres de requête invalides         |
+------+-------------------+------------------------------------------+
| 401  | Unauthorized      | Token d'authentification manquant       |
+------+-------------------+------------------------------------------+
| 403  | Forbidden         | Permissions insuffisantes               |
+------+-------------------+------------------------------------------+
| 404  | Not Found         | Ressource non trouvée                    |
+------+-------------------+------------------------------------------+
| 422  | Unprocessable     | Données de requête invalides            |
+------+-------------------+------------------------------------------+
| 429  | Too Many Requests | Limite de taux dépassée                 |
+------+-------------------+------------------------------------------+
| 500  | Internal Error    | Erreur serveur interne                  |
+------+-------------------+------------------------------------------+

**Format des erreurs :**

.. code-block:: json

    {
        "error": {
            "code": "INVALID_SESSION",
            "message": "Session not found or expired",
            "details": {
                "session_id": 999
            }
        }
    }

Exemples d'intégration
----------------------

Python
~~~~~~

.. code-block:: python

    import requests
    import json

    class ExamGuardAPI:
        def __init__(self, base_url, username, password):
            self.base_url = base_url
            self.token = self._authenticate(username, password)
            self.headers = {
                'Authorization': f'Bearer {self.token}',
                'Content-Type': 'application/json'
            }
        
        def _authenticate(self, username, password):
            response = requests.post(
                f'{self.base_url}/auth/login',
                json={'username': username, 'password': password}
            )
            return response.json()['token']
        
        def create_session(self, session_data):
            response = requests.post(
                f'{self.base_url}/sessions',
                headers=self.headers,
                json=session_data
            )
            return response.json()
        
        def get_detections(self, session_id, **filters):
            params = {k: v for k, v in filters.items() if v is not None}
            response = requests.get(
                f'{self.base_url}/sessions/{session_id}/detections',
                headers=self.headers,
                params=params
            )
            return response.json()

    # Utilisation
    api = ExamGuardAPI('http://localhost:5000/api/v1', 'admin', 'password')
    
    # Créer une session
    session = api.create_session({
        'name': 'Examen Python',
        'start_time': '2025-06-25T10:00:00Z',
        'duration': 90
    })
    
    # Récupérer les détections
    detections = api.get_detections(session['id'], severity='high')

JavaScript
~~~~~~~~~~

.. code-block:: javascript

    class ExamGuardAPI {
        constructor(baseUrl) {
            this.baseUrl = baseUrl;
            this.token = null;
        }
        
        async authenticate(username, password) {
            const response = await fetch(`${this.baseUrl}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            });
            const data = await response.json();
            this.token = data.token;
            return data;
        }
        
        async createSession(sessionData) {
            const response = await fetch(`${this.baseUrl}/sessions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sessionData)
            });
            return await response.json();
        }
        
        async getSessionStatus(sessionId) {
            const response = await fetch(`${this.baseUrl}/sessions/${sessionId}/status`, {
                headers: {'Authorization': `Bearer ${this.token}`}
            });
            return await response.json();
        }
    }

    // Utilisation
    const api = new ExamGuardAPI('http://localhost:5000/api/v1');
    
    await api.authenticate('admin', 'password');
    const session = await api.createSession({
        name: 'Examen JavaScript',
        start_time: '2025-06-25T14:00:00Z',
        duration: 120
    });

Limites de taux
---------------

L'API impose des limites de taux pour éviter les abus :

- **Authentification** : 5 tentatives par minute
- **Création de sessions** : 10 par heure
- **Détections** : 100 requêtes par minute
- **Rapports** : 5 générations par heure

SDK officiels
-------------

Des SDK officiels sont disponibles pour :

- **Python** : ``pip install examguard-sdk``
- **JavaScript/Node.js** : ``npm install examguard-js``
- **PHP** : ``composer require examguard/php-sdk``

**Installation Python SDK :**

.. code-block:: bash

    pip install examguard-sdk

**Utilisation :**

.. code-block:: python

    from examguard import Client

    client = Client('http://localhost:5000', 'admin', 'password')
    
    # Créer une session
    session = client.sessions.create({
        'name': 'Mon Examen',
        'duration': 120
    })
    
    # Écouter les détections en temps réel
    @client.on('detection')
    def handle_detection(detection):
        print(f"Détection: {detection.type} - {detection.confidence}")
    
    client.start_listening()

Support et documentation
------------------------

- **Documentation interactive** : ``http://localhost:5000/api/docs``
- **Collection Postman** : `Télécharger <https://github.com/examguard-pro/postman-collection>`_
- **Support technique** : support@examguard-pro.com
- **Issues GitHub** : `GitHub Issues <https://github.com/examguard-pro/examguard-pro/issues>`_
