# Configuration file for the Sphinx documentation builder.

project = "Cheating-for-computer-vision"
copyright = "2025, BENALLA"
author = "BENALLA Ouissam"

# ---- Extensions Sphinx ----
extensions = [
    'myst_parser',         # Support des fichiers Markdown
    'sphinx_rtd_theme',    # Thème ReadTheDocs
    # 'sphinx.ext.autodoc',
    # 'sphinx.ext.viewcode',
]

# ---- Types de fichiers supportés ----
source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

# ---- Thème HTML ----
html_theme = 'sphinx_rtd_theme'

html_theme_options = {
    'style_external_links': True,
    'collapse_navigation': False,
    'navigation_depth': 4,
    'titles_only': False,
    # 'analytics_id': 'G-XXXXXX',  # Tu peux ajouter un ID Google Analytics ici si besoin
}

html_static_path = ['_static']
html_css_files = []  # Tu peux ajouter ton CSS personnalisé ici
html_js_files = []   # Ou un JS personnalisé

# ---- Extensions Myst Markdown ----
myst_enable_extensions = [
    "amsmath",
    "dollarmath",
]
