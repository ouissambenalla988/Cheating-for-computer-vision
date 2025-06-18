Installation
============

Cette section vous guide dans l'installation d'ExamGuard Pro.

Prérequis
---------

Avant d'installer ExamGuard Pro, assurez-vous d'avoir :

- **Python 3.8 ou supérieur**
- **OpenCV 4.5+**
- **TensorFlow 2.x**
- **Flask**
- **Une webcam** pour la détection en temps réel

Configuration système recommandée
---------------------------------

**Minimum requis :**

- RAM : 4 GB
- CPU : Intel Core i3 ou équivalent
- GPU : Optionnel (accélération recommandée)
- Stockage : 500 MB d'espace libre

**Configuration recommandée :**

- RAM : 8 GB ou plus
- CPU : Intel Core i5 ou supérieur
- GPU : NVIDIA GTX 1050 ou supérieur (pour CUDA)
- Stockage : 2 GB d'espace libre

Installation des dépendances
----------------------------

**1. Cloner le repository**

.. code-block:: bash

    git clone https://github.com/examguard-pro/examguard-pro.git
    cd examguard-pro

**2. Créer un environnement virtuel (recommandé)**

.. code-block:: bash

    # Créer l'environnement virtuel
    python -m venv venv
    
    # Activer l'environnement (Windows)
    venv\Scripts\activate
    
    # Activer l'environnement (Linux/macOS)
    source venv/bin/activate

**3. Installer les dépendances Python**

.. code-block:: bash

    pip install -r requirements.txt

**4. Installation des modèles pré-entraînés**

.. code-block:: bash

    # Télécharger les modèles (optionnel)
    python scripts/download_models.py

Installation via Docker
-----------------------

Pour une installation simplifiée avec Docker :

.. code-block:: bash

    # Cloner le repository
    git clone https://github.com/examguard-pro/examguard-pro.git
    cd examguard-pro
    
    # Construire l'image Docker
    docker build -t examguard-pro .
    
    # Lancer le conteneur
    docker run -p 5000:5000 -v /dev/video0:/dev/video0 examguard-pro

.. note::
   L'option ``-v /dev/video0:/dev/video0`` permet d'accéder à la webcam depuis le conteneur.

Configuration
-------------

**1. Fichier de configuration**

Copiez le fichier de configuration exemple :

.. code-block:: bash

    cp config.example.py config.py

**2. Modifier la configuration**

Éditez le fichier ``config.py`` :

.. code-block:: python

    # Configuration de base
    DEBUG = True
    SECRET_KEY = 'votre-clé-secrète-très-sécurisée'
    
    # Configuration de la base de données
    DATABASE_URL = 'sqlite:///examguard.db'
    
    # Configuration de la webcam
    CAMERA_INDEX = 0  # Index de votre webcam
    
    # Configuration des modèles IA
    MODEL_PATH = 'models/'
    DETECTION_THRESHOLD = 0.5
    
    # Configuration des alertes
    ENABLE_EMAIL_ALERTS = False
    EMAIL_SERVER = 'smtp.gmail.com'
    EMAIL_PORT = 587
    EMAIL_USERNAME = 'your-email@gmail.com'
    EMAIL_PASSWORD = 'your-password'

**3. Initialiser la base de données**

.. code-block:: bash

    python scripts/init_db.py

Installation manuelle des dépendances
-------------------------------------

Si vous préférez installer les dépendances manuellement :

**Dépendances principales :**

.. code-block:: bash

    pip install flask==2.3.3
    pip install opencv-python==4.8.0.76
    pip install tensorflow==2.13.0
    pip install numpy==1.24.3
    pip install pillow==10.0.0

**Dépendances pour l'interface web :**

.. code-block:: bash

    pip install flask-socketio==5.3.6
    pip install flask-cors==4.0.0
    pip install flask-restful==0.3.10

**Dépendances pour la base de données :**

.. code-block:: bash

    pip install sqlalchemy==2.0.21
    pip install flask-sqlalchemy==3.0.5
    pip install alembic==1.12.0

Installation sur différents OS
------------------------------

Ubuntu/Debian
~~~~~~~~~~~~~~

.. code-block:: bash

    # Installer les dépendances système
    sudo apt update
    sudo apt install python3-pip python3-venv
    sudo apt install libopencv-dev python3-opencv
    sudo apt install ffmpeg
    
    # Suivre les étapes d'installation standard
    git clone https://github.com/examguard-pro/examguard-pro.git
    cd examguard-pro
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt

Windows
~~~~~~~

.. code-block:: batch

    REM Installer Python depuis python.org
    REM Ouvrir PowerShell en tant qu'administrateur
    
    git clone https://github.com/examguard-pro/examguard-pro.git
    cd examguard-pro
    python -m venv venv
    venv\Scripts\activate
    pip install -r requirements.txt

macOS
~~~~~

.. code-block:: bash

    # Installer Homebrew si nécessaire
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Installer Python
    brew install python
    
    # Cloner et installer
    git clone https://github.com/examguard-pro/examguard-pro.git
    cd examguard-pro
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt

Vérification de l'installation
------------------------------

**1. Test des imports Python**

.. code-block:: python

    # Tester les imports principaux
    python -c "import cv2, tensorflow, flask; print('Installation réussie!')"

**2. Test de la webcam**

.. code-block:: bash

    python scripts/test_camera.py

**3. Lancement du serveur de test**

.. code-block:: bash

    python app.py

Accédez ensuite à ``http://localhost:5000`` dans votre navigateur.

Dépannage
---------

**Problème : Erreur d'import OpenCV**

.. code-block:: bash

    # Solution pour Ubuntu/Debian
    sudo apt install python3-opencv
    
    # Solution alternative
    pip uninstall opencv-python
    pip install opencv-python-headless

**Problème : TensorFlow ne démarre pas**

.. code-block:: bash

    # Vérifier la version de Python
    python --version  # Doit être 3.8+
    
    # Réinstaller TensorFlow
    pip uninstall tensorflow
    pip install tensorflow==2.13.0

**Problème : Webcam non détectée**

.. code-block:: bash

    # Lister les webcams disponibles
    python scripts/list_cameras.py
    
    # Modifier l'index dans config.py
    CAMERA_INDEX = 1  # Essayer différents index

**Problème : Permissions webcam sur Linux**

.. code-block:: bash

    # Ajouter l'utilisateur au groupe video
    sudo usermod -a -G video $USER
    
    # Redémarrer la session
    logout && login

Variables d'environnement
-------------------------

Vous pouvez utiliser des variables d'environnement pour la configuration :

.. code-block:: bash

    export EXAMGUARD_DEBUG=True
    export EXAMGUARD_SECRET_KEY=your-secret-key
    export EXAMGUARD_DATABASE_URL=sqlite:///examguard.db
    export EXAMGUARD_CAMERA_INDEX=0

Ou créer un fichier ``.env`` :

.. code-block:: text

    EXAMGUARD_DEBUG=True
    EXAMGUARD_SECRET_KEY=your-secret-key
    EXAMGUARD_DATABASE_URL=sqlite:///examguard.db
    EXAMGUARD_CAMERA_INDEX=0

Mise à jour
-----------

Pour mettre à jour ExamGuard Pro :

.. code-block:: bash

    # Sauvegarder la configuration
    cp config.py config.backup.py
    
    # Mettre à jour le code
    git pull origin main
    
    # Mettre à jour les dépendances
    pip install -r requirements.txt --upgrade
    
    # Appliquer les migrations de base de données
    python scripts/migrate_db.py
    
    # Restaurer la configuration
    cp config.backup.py config.py

Prochaine étape
---------------

Une fois l'installation terminée, consultez le guide :doc:`utilisation` pour apprendre à utiliser ExamGuard Pro.
