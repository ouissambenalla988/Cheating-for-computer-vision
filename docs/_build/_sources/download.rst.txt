Téléchargement
==============

Cette section vous guide pour télécharger et installer ExamGuard Pro sur votre système.

Versions disponibles
-------------------

Version stable
~~~~~~~~~~~~~~

**ExamGuard Pro v3.1** (Recommandée)

- Date de sortie : 18 juin 2025
- Stabilité : Production
- Support : LTS (Long Term Support)
- Compatibilité : Python 3.8+

.. note::
   La version 3.1 est la version stable recommandée pour un usage en production.

**Nouveautés v3.1 :**

- ✅ Amélioration des performances de détection (+25%)
- ✅ Nouveau modèle de suivi oculaire
- ✅ Interface utilisateur redesignée
- ✅ Support GPU amélioré
- ✅ API REST complète
- ✅ Rapports PDF automatiques
- ✅ Intégration Moodle/Canvas

Version de développement
~~~~~~~~~~~~~~~~~~~~~~~

**ExamGuard Pro v3.2-beta**

- Statut : Bêta
- Fonctionnalités expérimentales
- Tests requis avant production

**Nouvelles fonctionnalités (bêta) :**

- 🧪 Détection audio avancée
- 🧪 Reconnaissance vocale
- 🧪 Analyse comportementale IA
- 🧪 Support multi-caméras
- 🧪 Intégration cloud

Méthodes de téléchargement
-------------------------

GitHub Release
~~~~~~~~~~~~~~

**Version complète avec assets :**

.. code-block:: bash

    # Télécharger la dernière version
    curl -L https://github.com/examguard-pro/examguard-pro/archive/v3.1.tar.gz -o examguard-pro-v3.1.tar.gz
    
    # Extraire l'archive
    tar -xzf examguard-pro-v3.1.tar.gz
    cd examguard-pro-3.1

**Liens directs :**

- `📦 Code source (ZIP) <https://github.com/examguard-pro/examguard-pro/archive/v3.1.zip>`_
- `📦 Code source (TAR.GZ) <https://github.com/examguard-pro/examguard-pro/archive/v3.1.tar.gz>`_
- `📋 Notes de version <https://github.com/examguard-pro/examguard-pro/releases/tag/v3.1>`_

Git Clone
~~~~~~~~~

**Cloner le repository complet :**

.. code-block:: bash

    # Version stable
    git clone https://github.com/examguard-pro/examguard-pro.git
    cd examguard-pro
    git checkout v3.1

**Cloner la branche de développement :**

.. code-block:: bash

    # Version de développement
    git clone -b develop https://github.com/examguard-pro/examguard-pro.git

Docker Hub
~~~~~~~~~~

**Images Docker officielles :**

.. code-block:: bash

    # Image stable
    docker pull examguardpro/examguard:3.1
    
    # Image avec GPU
    docker pull examguardpro/examguard:3.1-gpu
    
    # Image de développement
    docker pull examguardpro/examguard:latest

PyPI Package
~~~~~~~~~~~~

**Installation via pip :**

.. code-block:: bash

    # Version stable
    pip install examguard-pro==3.1.0
    
    # Dernière version
    pip install examguard-pro
    
    # Version avec dépendances GPU
    pip install examguard-pro[gpu]

Installateurs
-------------

Windows
~~~~~~~

**Installateur MSI (Recommandé) :**

- `📥 ExamGuard-Pro-3.1-x64.msi <https://releases.examguard-pro.com/v3.1/ExamGuard-Pro-3.1-x64.msi>`_ (64-bit)
- `📥 ExamGuard-Pro-3.1-x86.msi <https://releases.examguard-pro.com/v3.1/ExamGuard-Pro-3.1-x86.msi>`_ (32-bit)

**Installation :**

1. Téléchargez le fichier MSI
2. Double-cliquez pour lancer l'installation
3. Suivez l'assistant d'installation
4. ExamGuard Pro sera installé dans ``C:\Program Files\ExamGuard Pro``

**Installateur EXE (Portable) :**

- `📥 ExamGuard-Pro-3.1-Portable.exe <https://releases.examguard-pro.com/v3.1/ExamGuard-Pro-3.1-Portable.exe>`_

**Configuration système requise Windows :**

- Windows 10/11 (64-bit recommandé)
- 4 GB RAM minimum (8 GB recommandé)
- 2 GB d'espace disque
- Webcam compatible
- .NET Framework 4.8+

macOS
~~~~~

**Paquet DMG :**

- `📥 ExamGuard-Pro-3.1.dmg <https://releases.examguard-pro.com/v3.1/ExamGuard-Pro-3.1.dmg>`_ (Universal Binary)

**Installation :**

1. Téléchargez le fichier DMG
2. Montez l'image disque
3. Glissez ExamGuard Pro vers Applications
4. Lancez depuis le Launchpad

**Homebrew (Développeurs) :**

.. code-block:: bash

    # Ajouter le tap
    brew tap examguard-pro/tap
    
    # Installer
    brew install examguard-pro

**Configuration système requise macOS :**

- macOS 10.15+ (Catalina ou plus récent)
- 4 GB RAM minimum
- 2 GB d'espace disque
- Webcam intégrée ou externe
- Permissions caméra autorisées

Linux
~~~~~

**Paquets DEB (Ubuntu/Debian) :**

.. code-block:: bash

    # Télécharger le paquet
    wget https://releases.examguard-pro.com/v3.1/examguard-pro_3.1.0_amd64.deb
    
    # Installer
    sudo dpkg -i examguard-pro_3.1.0_amd64.deb
    sudo apt-get install -f  # Résoudre les dépendances

**Paquets RPM (CentOS/RHEL/Fedora) :**

.. code-block:: bash

    # Télécharger le paquet
    wget https://releases.examguard-pro.com/v3.1/examguard-pro-3.1.0-1.x86_64.rpm
    
    # Installer (CentOS/RHEL)
    sudo yum install examguard-pro-3.1.0-1.x86_64.rpm
    
    # Installer (Fedora)
    sudo dnf install examguard-pro-3.1.0-1.x86_64.rpm

**AppImage (Distribution universelle) :**

.. code-block:: bash

    # Télécharger
    wget https://releases.examguard-pro.com/v3.1/ExamGuard-Pro-3.1.AppImage
    
    # Rendre exécutable
    chmod +x ExamGuard-Pro-3.1.AppImage
    
    # Lancer
    ./ExamGuard-Pro-3.1.AppImage

**Snap Package :**

.. code-block:: bash

    sudo snap install examguard-pro

**Configuration système requise Linux :**

- Distribution Linux moderne (Ubuntu 20.04+, CentOS 8+)
- 4 GB RAM minimum
- Python 3.8+ (pour l'installation source)
- Pilotes webcam v4l2
- X11 ou Wayland

Assets et modèles
-----------------

Modèles pré-entraînés
~~~~~~~~~~~~~~~~~~~~

**Pack de modèles standard :**

- `📦 examguard-models-v3.1.zip <https://releases.examguard-pro.com/models/examguard-models-v3.1.zip>`_ (150 MB)

**Contenu du pack :**

- Modèles de détection faciale (Haar Cascade, MTCNN)
- Modèles de détection d'objets (YOLOv5, YOLOv8)
- Modèles de suivi oculaire (MediaPipe)
- Classificateurs comportementaux
- Fichiers de configuration

**Installation des modèles :**

.. code-block:: bash

    # Télécharger et extraire
    wget https://releases.examguard-pro.com/models/examguard-models-v3.1.zip
    unzip examguard-models-v3.1.zip -d models/
    
    # Ou utiliser le script d'installation
    python scripts/download_models.py

Modèles GPU optimisés
~~~~~~~~~~~~~~~~~~~~

**Pack GPU (CUDA) :**

- `📦 examguard-models-gpu-v3.1.zip <https://releases.examguard-pro.com/models/examguard-models-gpu-v3.1.zip>`_ (300 MB)

**Modèles TensorRT :**

- `📦 examguard-tensorrt-v3.1.zip <https://releases.examguard-pro.com/models/examguard-tensorrt-v3.1.zip>`_ (200 MB)

Bases de données d'exemple
~~~~~~~~~~~~~~~~~~~~~~~~~~

**Jeu de données de test :**

- `📦 examguard-test-data.zip <https://releases.examguard-pro.com/data/examguard-test-data.zip>`_ (50 MB)

**Vidéos d'exemple :**

- `📦 examguard-sample-videos.zip <https://releases.examguard-pro.com/data/examguard-sample-videos.zip>`_ (100 MB)

Documentation hors ligne
~~~~~~~~~~~~~~~~~~~~~~~~

**Documentation PDF :**

- `📄 ExamGuard-Pro-Documentation-v3.1.pdf <https://releases.examguard-pro.com/docs/ExamGuard-Pro-Documentation-v3.1.pdf>`_ (5 MB)

**Documentation HTML :**

- `📦 examguard-docs-html-v3.1.zip <https://releases.examguard-pro.com/docs/examguard-docs-html-v3.1.zip>`_ (10 MB)

Checksums et signatures
-----------------------

Vérification d'intégrité
~~~~~~~~~~~~~~~~~~~~~~~

**Fichier de checksums SHA256 :**

.. code-block:: bash

    # Télécharger les checksums
    wget https://releases.examguard-pro.com/v3.1/SHA256SUMS
    
    # Vérifier un fichier
    sha256sum -c SHA256SUMS --ignore-missing

**Exemple de checksums :**

.. code-block:: text

    a1b2c3d4e5f6... ExamGuard-Pro-3.1-x64.msi
    f6e5d4c3b2a1... examguard-pro-v3.1.tar.gz
    9876543210ab... ExamGuard-Pro-3.1.dmg

Signature GPG
~~~~~~~~~~~~~

**Clé publique ExamGuard Pro :**

.. code-block:: bash

    # Importer la clé publique
    gpg --keyserver keyserver.ubuntu.com --recv-keys 0x12345ABCDEF
    
    # Vérifier une signature
    gpg --verify examguard-pro-v3.1.tar.gz.sig examguard-pro-v3.1.tar.gz

Installation rapide
-------------------

Script d'installation automatique
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Linux/macOS :**

.. code-block:: bash

    # Installation one-liner
    curl -sSL https://install.examguard-pro.com | bash

**Windows (PowerShell) :**

.. code-block:: powershell

    # Exécuter en tant qu'administrateur
    Invoke-WebRequest -Uri "https://install.examguard-pro.com/windows.ps1" | Invoke-Expression

**Script personnalisé :**

.. code-block:: bash

    #!/bin/bash
    # install.sh - Script d'installation ExamGuard Pro
    
    set -e
    
    echo "🔍 Installation d'ExamGuard Pro v3.1"
    
    # Détecter l'OS
    OS=$(uname -s)
    ARCH=$(uname -m)
    
    # Télécharger la version appropriée
    case $OS in
        Linux)
            if command -v apt &> /dev/null; then
                wget https://releases.examguard-pro.com/v3.1/examguard-pro_3.1.0_amd64.deb
                sudo dpkg -i examguard-pro_3.1.0_amd64.deb
            elif command -v yum &> /dev/null; then
                wget https://releases.examguard-pro.com/v3.1/examguard-pro-3.1.0-1.x86_64.rpm
                sudo yum install examguard-pro-3.1.0-1.x86_64.rpm
            fi
            ;;
        Darwin)
            wget https://releases.examguard-pro.com/v3.1/ExamGuard-Pro-3.1.dmg
            echo "Ouvrez le fichier DMG et glissez ExamGuard Pro vers Applications"
            ;;
    esac
    
    echo "✅ Installation terminée !"
    echo "Lancez 'examguard-pro' pour commencer"

Docker Compose
~~~~~~~~~~~~~~

**Fichier docker-compose.yml :**

.. code-block:: yaml

    version: '3.8'
    
    services:
      examguard:
        image: examguardpro/examguard:3.1
        ports:
          - "5000:5000"
        volumes:
          - ./data:/app/data
          - ./models:/app/models
          - ./logs:/app/logs
        environment:
          - EXAMGUARD_DEBUG=false
          - EXAMGUARD_SECRET_KEY=your-secret-key
        devices:
          - /dev/video0:/dev/video0  # Webcam
        restart: unless-stopped
        
      database:
        image: postgres:13
        environment:
          - POSTGRES_DB=examguard
          - POSTGRES_USER=examguard
          - POSTGRES_PASSWORD=password
        volumes:
          - postgres_data:/var/lib/postgresql/data
        restart: unless-stopped
    
    volumes:
      postgres_data:

**Lancement :**

.. code-block:: bash

    # Télécharger docker-compose.yml
    wget https://releases.examguard-pro.com/docker/docker-compose.yml
    
    # Lancer les services
    docker-compose up -d

Versions antérieures
-------------------

Historique des versions
~~~~~~~~~~~~~~~~~~~~~~

**Version 3.0 (Mars 2025) :**

- `📦 Code source v3.0 <https://github.com/examguard-pro/examguard-pro/archive/v3.0.tar.gz>`_
- Première version stable
- Support de base pour la détection

**Version 2.5 (Décembre 2024) :**

- `📦 Code source v2.5 <https://github.com/examguard-pro/examguard-pro/archive/v2.5.tar.gz>`_
- Version bêta
- Fonctionnalités expérimentales

**Notes de migration :**

Les configurations des versions antérieures peuvent nécessiter des ajustements. Consultez le `guide de migration <https://docs.examguard-pro.com/migration/>`_ pour plus de détails.

Support et maintenance
---------------------

Cycle de vie des versions
~~~~~~~~~~~~~~~~~~~~~~~~

+---------+----------------+------------------+-------------------+
| Version | Date de sortie | Support standard | Support étendu    |
+=========+================+==================+===================+
| 3.1     | Juin 2025      | 2 ans            | 4 ans (LTS)       |
+---------+----------------+------------------+-------------------+
| 3.0     | Mars 2025      | 1 an             | 2 ans             |
+---------+----------------+------------------+-------------------+
| 2.5     | Déc 2024       | 6 mois           | 1 an              |
+---------+----------------+------------------+-------------------+

**Support inclus :**

- Corrections de bugs critiques
- Mises à jour de sécurité
- Documentation mise à jour
- Aide communautaire

**Support étendu (LTS) :**

- Support commercial prioritaire
- Correctifs personnalisés
- Consultation technique
- SLA garanti

Mises à jour automatiques
~~~~~~~~~~~~~~~~~~~~~~~~

**Configuration des mises à jour :**

.. code-block:: python

    # config.py
    AUTO_UPDATE = {
        'enabled': True,
        'channel': 'stable',  # stable, beta, dev
        'check_interval': 24,  # heures
        'auto_install': False,  # mise à jour manuelle
        'backup_before_update': True
    }

**Commandes de mise à jour :**

.. code-block:: bash

    # Vérifier les mises à jour
    examguard-pro --check-updates
    
    # Mettre à jour vers la dernière version
    examguard-pro --update
    
    # Mettre à jour vers une version spécifique
    examguard-pro --update --version 3.1.1

Licences et conditions
---------------------

Licence Open Source
~~~~~~~~~~~~~~~~~~~

ExamGuard Pro est distribué sous licence **MIT** :

- ✅ Utilisation commerciale autorisée
- ✅ Modification autorisée
- ✅ Distribution autorisée
- ✅ Usage privé autorisé
- ❌ Aucune garantie fournie

**Texte complet de la licence :**

.. code-block:: text

    MIT License
    
    Copyright (c) 2025 ExamGuard Pro Team
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction...

Licence commerciale
~~~~~~~~~~~~~~~~~~~

Pour un support commercial et des fonctionnalités avancées :

- **ExamGuard Pro Enterprise** : 99€/mois
- **ExamGuard Pro Educational** : 49€/mois
- **ExamGuard Pro Cloud** : 149€/mois

**Avantages licence commerciale :**

- Support technique prioritaire
- Modèles IA avancés
- Intégrations enterprise
- SLA de disponibilité
- Formation et consultation

**Contact commercial :** sales@examguard-pro.com

Dépendances tierces
~~~~~~~~~~~~~~~~~~

**Licences des dépendances principales :**

- **OpenCV** : Apache 2.0
- **TensorFlow** : Apache 2.0
- **Flask** : BSD 3-Clause
- **NumPy** : BSD 3-Clause
- **Pillow** : PIL Software License

Toutes les dépendances sont compatibles avec un usage commercial.

FAQ Téléchargement
------------------

**Q: Quelle version choisir ?**

R: Pour la production, utilisez toujours la version stable (v3.1). Pour les tests et le développement, la version bêta peut être intéressante.

**Q: Comment migrer depuis une version antérieure ?**

R: Suivez le guide de migration dans la documentation. Généralement, sauvegardez vos données, installez la nouvelle version et migrez la configuration.

**Q: Les modèles sont-ils inclus dans l'installation ?**

R: Non, les modèles doivent être téléchargés séparément pour réduire la taille du package principal. Utilisez le script ``download_models.py``.

**Q: Puis-je utiliser ExamGuard Pro hors ligne ?**

R: Oui, une fois installé et configuré, ExamGuard Pro fonctionne entièrement hors ligne. Seuls les téléchargements initiaux nécessitent une connexion internet.

**Q: Comment vérifier l'intégrité du téléchargement ?**

R: Utilisez les checksums SHA256 fournis avec chaque release pour vérifier l'intégrité des fichiers téléchargés.

Assistance téléchargement
-------------------------

En cas de problème lors du téléchargement :

1. **Vérifiez votre connexion internet**
2. **Consultez les miroirs de téléchargement** : `mirrors.examguard-pro.com <https://mirrors.examguard-pro.com>`_
3. **Contactez le support** : support@examguard-pro.com
4. **Consultez la FAQ** : `faq.examguard-pro.com <https://faq.examguard-pro.com>`_

**Miroirs de téléchargement disponibles :**

- **Europe** : eu.releases.examguard-pro.com
- **Amérique du Nord** : us.releases.examguard-pro.com
- **Asie** : asia.releases.examguard-pro.com

Prochaine étape
---------------

Une fois ExamGuard Pro téléchargé et installé, consultez le guide :doc:`installation` pour la configuration initiale, puis :doc:`utilisation` pour commencer à l'utiliser.
