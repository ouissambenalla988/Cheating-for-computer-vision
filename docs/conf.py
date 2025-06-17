import os
import sys
sys.path.insert(0, os.path.abspath('.'))

project = 'Cheating for computer vision'
author = 'Ouissam BENALLA'
release = '1.0'

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.githubpages',
]

templates_path = ['_templates']
exclude_patterns = []

html_theme = 'furo'
html_static_path = ['_static']
html_css_files = ['custom.css']
html_js_files = ['custom.js']
