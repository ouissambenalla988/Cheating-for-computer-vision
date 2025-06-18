# Configuration file for the Sphinx documentation builder.
# Documentation complète : https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------

project = 'Cheating'
copyright = '2025, Ouissam'
author = 'Ouissam'
release = '1.0'

# -- General configuration ---------------------------------------------------

extensions = [
    'myst_parser',        # Pour permettre les fichiers .md
    'sphinx_rtd_theme',   # Thème Read the Docs
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

language = 'fr'

# -- Options for HTML output -------------------------------------------------

html_theme = 'sphinx_rtd_theme'

html_static_path = ['_static']

# Ajout de fichiers CSS personnalisés (si tu veux appliquer ton propre style)
def setup(app):
    app.add_css_file("style.css")  # le fichier doit être dans docs/_static/monstyle.css
