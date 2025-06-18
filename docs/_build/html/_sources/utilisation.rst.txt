Utilisation
===========

Ce guide vous explique comment utiliser ExamGuard Pro pour surveiller vos examens.

Démarrage rapide
----------------

**1. Lancer l'application**

.. code-block:: bash

    python app.py

**2. Accéder à l'interface**

Ouvrez votre navigateur et rendez-vous sur ``http://localhost:5000``

**3. Première connexion**

Utilisez les identifiants par défaut :
- **Utilisateur** : ``admin``
- **Mot de passe** : ``admin123``

.. warning::
   Changez le mot de passe par défaut lors de votre première connexion !

Interface principale
--------------------

L'interface ExamGuard Pro se compose de plusieurs sections :

Tableau de bord
~~~~~~~~~~~~~~~

Le tableau de bord principal affiche :

- **État du système** : Statut de la caméra, modèles IA chargés
- **Sessions actives** : Liste des examens en cours
- **Statistiques** : Nombre de détections, alertes récentes
- **Alertes en temps réel** : Notifications des comportements suspects

.. image:: _static/dashboard.png
   :alt: Tableau de bord principal
   :align: center

Gestion des sessions
~~~~~~~~~~~~~~~~~~~~

La section "Sessions" permet de :

- Créer de nouvelles sessions d'examen
- Configurer les paramètres de détection
- Voir l'historique des sessions
- Gérer les candidats

Configuration d'une session d'examen
------------------------------------

**1. Créer une nouvelle session**

Cliquez sur "Nouvelle session" et remplissez les informations :

.. code-block:: text

    Nom de la session : Examen Final Mathématiques
    Date et heure : 2025-06-20 14:00
    Durée : 120 minutes
    Nombre de candidats : 30

**2. Configurer les paramètres de détection**

Ajustez la sensibilité selon vos besoins :

+-----------------------+-------------------+---------------------------+
| Paramètre             | Valeur par défaut | Description               |
+=======================+===================+===========================+
| Détection de visage   | Activée           | Vérification identité     |
+-----------------------+-------------------+---------------------------+
| Mouvement des yeux    | Moyenne           | Détection regard suspect  |
+-----------------------+-------------------+---------------------------+
| Détection d'objets    | Activée           | Téléphones, livres, etc.  |
+-----------------------+-------------------+---------------------------+
| Présence multiple     | Activée           | Autres personnes          |
+-----------------------+-------------------+---------------------------+
| Changement d'éclairage| Moyenne           | Modifications environnement|
+-----------------------+-------------------+---------------------------+

**3. Ajouter les candidats**

Plusieurs méthodes disponibles :

- **Import CSV** : Téléchargez un fichier avec la liste des candidats
- **Saisie manuelle** : Ajoutez individuellement chaque candidat
- **Intégration LDAP** : Synchronisation avec l'annuaire

Format CSV attendu :

.. code-block:: csv

    nom,prenom,email,numero_etudiant
    Dupont,Jean,jean.dupont@example.com,12345
    Martin,Marie,marie.martin@example.com,12346

Surveillance en temps réel
--------------------------

Pendant l'examen
~~~~~~~~~~~~~~~~

L'interface de surveillance affiche :

**Vue d'ensemble**

- Grille de toutes les webcams actives
- Codes couleur : Vert (normal), Orange (suspect), Rouge (alerte)
- Compteur de détections par candidat

**Détails par candidat**

Cliquez sur une webcam pour voir :

- Flux vidéo en haute résolution
- Historique des détections
- Score de confiance
- Actions recommandées

**Gestion des alertes**

Quand une alerte se déclenche :

1. **Notification sonore** (si activée)
2. **Popup avec détails** de la détection
3. **Enregistrement automatique** de la séquence
4. **Options d'action** :
   - Ignorer (fausse alerte)
   - Avertir le candidat
   - Marquer comme triche
   - Contacter le surveillant

Types de détections
-------------------

Mouvement des yeux
~~~~~~~~~~~~~~~~~~

**Ce qui est détecté :**

- Regard fixe prolongé vers un point (> 10 secondes)
- Mouvements rapides et répétitifs
- Direction du regard hors écran

**Paramètres configurables :**

.. code-block:: python

    EYE_TRACKING = {
        'sensitivity': 'medium',  # low, medium, high
        'gaze_threshold': 10,     # secondes
        'movement_speed': 0.5     # pixels/frame
    }

Détection d'objets
~~~~~~~~~~~~~~~~~~

**Objets détectés :**

- Téléphones mobiles
- Livres et cahiers
- Écrans supplémentaires
- Calculatrices (si interdites)

**Configuration :**

.. code-block:: python

    OBJECT_DETECTION = {
        'phone': True,
        'book': True,
        'laptop': True,
        'calculator': False,  # Autorisé
        'confidence_threshold': 0.7
    }

Présence multiple
~~~~~~~~~~~~~~~~~

**Détection de :**

- Visages supplémentaires dans le champ de vision
- Voix en arrière-plan (si microphone activé)
- Mouvements suspects hors champ

**Paramètres :**

.. code-block:: python

    PERSON_DETECTION = {
        'max_persons': 1,
        'face_recognition': True,
        'audio_detection': False
    }

Rapports et analyses
--------------------

Rapport de session
~~~~~~~~~~~~~~~~~~

À la fin de chaque examen, un rapport détaillé est généré :

**Informations générales :**

- Durée de la session
- Nombre de participants
- Taux de détection global
- Statistiques par type de détection

**Détails par candidat :**

- Timeline des événements
- Captures d'écran des moments suspects
- Score de risque de triche
- Recommandations

**Export des données :**

- PDF pour archivage
- CSV pour analyse statistique
- JSON pour intégration système

Exemple de rapport :

.. code-block:: text

    ===========================================
    RAPPORT D'EXAMEN - ExamGuard Pro
    ===========================================
    
    Session : Examen Final Mathématiques
    Date : 20/06/2025 14:00-16:00
    Candidats : 28/30 présents
    
    STATISTIQUES GLOBALES
    ----------------------
    Détections totales : 47
    - Mouvement yeux : 23 (49%)
    - Objets suspects : 12 (26%)
    - Présence multiple : 8 (17%)
    - Autres : 4 (8%)
    
    CANDIDATS À RISQUE
    ------------------
    1. Martin, Pierre (Score: 85%)
       - 8 détections majeures
       - Téléphone détecté à 14:45
       - Recommendation: Investigation
    
    2. Durand, Sophie (Score: 72%)
       - 5 détections mineures
       - Regard suspect répété
       - Recommendation: Surveillance

Configuration avancée
---------------------

Personnalisation des modèles IA
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Ajustement des seuils :**

.. code-block:: python

    # config.py
    AI_MODELS = {
        'face_detection': {
            'model': 'haarcascade',
            'confidence': 0.8
        },
        'object_detection': {
            'model': 'yolo_v5',
            'confidence': 0.7,
            'nms_threshold': 0.4
        },
        'eye_tracking': {
            'model': 'mediapipe',
            'landmark_confidence': 0.5
        }
    }

**Modèles personnalisés :**

Vous pouvez entraîner vos propres modèles :

.. code-block:: bash

    # Entraîner un modèle personnalisé
    python scripts/train_custom_model.py --dataset my_dataset/ --epochs 100

Intégrations
~~~~~~~~~~~~

**Système de notation :**

.. code-block:: python

    # Intégration avec Moodle
    MOODLE_CONFIG = {
        'url': 'https://your-moodle.com',
        'token': 'your-api-token',
        'auto_grade': True
    }

**Notifications :**

.. code-block:: python

    # Configuration des alertes
    NOTIFICATIONS = {
        'email': {
            'enabled': True,
            'smtp_server': 'smtp.gmail.com',
            'recipients': ['admin@school.com']
        },
        'slack': {
            'enabled': False,
            'webhook_url': 'https://hooks.slack.com/...'
        },
        'teams': {
            'enabled': False,
            'webhook_url': 'https://outlook.office.com/...'
        }
    }

Bonnes pratiques
----------------

Préparation de l'examen
~~~~~~~~~~~~~~~~~~~~~~~

1. **Testez le système** avant l'examen réel
2. **Informez les candidats** des règles et du système de surveillance
3. **Vérifiez l'éclairage** et la qualité des webcams
4. **Configurez les seuils** selon le niveau de l'examen

Pendant l'examen
~~~~~~~~~~~~~~~~

1. **Surveillez le tableau de bord** régulièrement
2. **Ne réagissez pas immédiatement** aux fausses alertes
3. **Documentez les incidents** pour le rapport final
4. **Gardez une trace** des décisions prises

Après l'examen
~~~~~~~~~~~~~~

1. **Révisez tous les rapports** avant de finaliser les notes
2. **Archivez les données** selon votre politique de rétention
3. **Analysez les statistiques** pour améliorer le système
4. **Collectez les feedbacks** des candidats et surveillants

Résolution de problèmes
-----------------------

Problèmes fréquents
~~~~~~~~~~~~~~~~~~

**Webcam ne fonctionne pas :**

.. code-block:: bash

    # Vérifier les permissions
    python scripts/test_camera.py
    
    # Changer l'index de caméra
    CAMERA_INDEX = 1  # dans config.py

**Détections incorrectes :**

.. code-block:: python

    # Ajuster la sensibilité
    DETECTION_SENSITIVITY = 'low'  # au lieu de 'high'
    
    # Réentraîner le modèle avec vos données
    python scripts/retrain_model.py

**Performance lente :**

.. code-block:: python

    # Réduire la résolution vidéo
    VIDEO_RESOLUTION = (640, 480)  # au lieu de (1280, 720)
    
    # Limiter le nombre de FPS
    MAX_FPS = 15  # au lieu de 30

Support technique
-----------------

En cas de problème :

1. **Consultez les logs** : ``logs/examguard.log``
2. **Vérifiez la FAQ** : :doc:`faq`
3. **Contactez le support** : support@examguard-pro.com
4. **Créez une issue** : `GitHub Issues <https://github.com/examguard-pro/examguard-pro/issues>`_

Prochaine étape
---------------

Pour une utilisation avancée, consultez la documentation :doc:`api` pour intégrer ExamGuard Pro avec vos systèmes existants.
