# Configuration file for Sphinx

project = "Cheating-for-computer-vision"  # ← Remplacez par le nom de votre projet
copyright = "2024, BENALLA"  # ← Mettez à jour
author = "BENALLA Ouissam"

# ---- Extensions ----
extensions = [
    'myst_parser',       # Pour le support Markdown
    'sphinx_rtd_theme',  # Thème Read the Docs (doit être dans extensions)
    # Ajoutez d'autres extensions si nécessaire :
    # 'sphinx.ext.autodoc',
    # 'sphinx.ext.viewcode',
]

# ---- Paramètres Markdown ----
source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',  # Activer si vous utilisez Myst
}

# ---- Thème ----
html_theme = 'sphinx_rtd_theme'
html_style = None  # Désactive les feuilles de style alternatives

html_theme_options = {
    'analytics_id': 'G-XXXXXX',  # ← Remplacez par votre ID Google Analytics
    'style_external_links': True,
    'collapse_navigation': False,
    'navigation_depth': 4,       # Profondeur de la navigation
    'titles_only': False         # Afficher les sous-titres dans la sidebar
}

# ---- Paramètres HTML ----
html_static_path = ['_static']  # Chemin des assets statiques
html_css_files = []             # CSS personnalisés
html_js_files = []              # JS personnalisés

# ---- Options Myst (Markdown) ----
myst_enable_extensions = [
    "amsmath",
    "dollarmath",
]