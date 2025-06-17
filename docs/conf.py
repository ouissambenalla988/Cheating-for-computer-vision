import os
import sys
sys.path.insert(0, os.path.abspath('..'))

# Informations du projet
project = 'Nom de ton projet'
author = 'Ton nom'
release = '1.0.0'

# Extensions Sphinx
extensions = []

# Fichiers et dossiers à exclure
exclude_patterns = []

# Thème Furo
html_theme = 'furo'

# Dossiers pour les templates
templates_path = ['_templates']
html_static_path = ['_static']
