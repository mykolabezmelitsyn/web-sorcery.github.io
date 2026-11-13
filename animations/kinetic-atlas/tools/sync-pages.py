#!/usr/bin/env python3
"""Publish the shared showcase markup into its standalone and Nunjucks pages."""
from pathlib import Path

folder = Path(__file__).resolve().parents[1]
markup = (folder / "sections.html").read_text()
(folder / "index.html").write_text(
    '<!doctype html>\n<html lang="en">\n<head>\n'
    '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n'
    '<meta name="description" content="Ten studies in motion, curiosity and considered interaction.">\n'
    '<title>Kinetic atlas — Web Sorcery</title>\n'
    '<link rel="stylesheet" href="./showcase.css">\n</head>\n<body style="margin:0">\n'
    + markup
    + '\n<script type="module" src="./showcase.js"></script>\n</body>\n</html>\n'
)
page = folder.parents[1] / "src/pages/gsap-animations.njk"
page.write_text(
    '{% extends "layouts/base.njk" %}\n'
    '{% set portfolioHome = "./index.html" %}\n'
    '{% set description = "Kinetic atlas: ten studies in motion, curiosity, and considered interaction." %}\n'
    '{% block title %}GSAP Animations — Web Sorcery{% endblock %}\n'
    '{% block mainModifier %} portfolio--full-width{% endblock %}\n'
    '{% block head %}\n'
    '  <link rel="stylesheet" href="/animations/kinetic-atlas/showcase.css" />\n'
    '{% endblock %}\n{% block content %}\n'
    + markup
    + '\n{% endblock %}\n{% block scripts %}\n'
    '  <script type="module" src="/animations/kinetic-atlas/showcase.js"></script>\n'
    '{% endblock %}\n'
)
