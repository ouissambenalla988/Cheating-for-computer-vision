# docs/conf.py
html_theme = 'sphinx_rtd_theme'
html_style = None  # Désactive tout style alternatif

extensions = [
    'sphinx_rtd_theme',  # Doit être explicitement déclaré
    # Vos autres extensions...
]

extensions = ['myst_parser']

html_theme_options = {
    'analytics_id': 'G-XXXXXX',  # Optionnel
    'style_external_links': True,
    'collapse_navigation': False  # Important pour la sidebar
}