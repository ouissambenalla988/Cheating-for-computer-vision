# Configuration file for the Sphinx documentation builder.
import os
import sys
sys.path.insert(0, os.path.abspath('../..'))

project = 'Computer Vision Cheating Detection System'
copyright = '2024, Your Name'
author = 'Your Name'

release = '0.1.0'

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.napoleon',
    'sphinx.ext.imgmath',
]

templates_path = ['_templates']
exclude_patterns = []

html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# The suffix of source filenames.
source_suffix = '.rst'

# The master toctree document.
master_doc = 'index'