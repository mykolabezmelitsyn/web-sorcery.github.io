"""Synchronize the standalone demo and the named GSAP landing page."""

from pathlib import Path

folder = Path(__file__).resolve().parents[1]
sections = (folder / "sections.html").read_text()
(folder / "index.html").write_text(
    '<!doctype html>\n<html lang="en">\n<head>\n'
    '<meta charset="utf-8">\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
    '<meta name="description" content="Ten interactive experiments in motion, made with GSAP.">\n'
    "<title>Motion, by design — Web Sorcery</title>\n"
    '<link rel="stylesheet" href="./showcase.css">\n'
    '</head>\n<body style="margin: 0">\n'
    + sections
    + '\n<script type="module" src="./showcase.js"></script>\n</body>\n</html>\n'
)
page = folder.parents[1] / "src/pages/gsap-animations.njk"
page.write_text(
    '{% extends "layouts/base.njk" %}\n'
    '{% set portfolioHome = "./index.html" %}\n'
    '{% set description = "Ten interactive experiments in motion, made with GSAP." %}\n'
    "{% block title %}Motion, by design — Web Sorcery{% endblock %}\n"
    "{% block mainModifier %} portfolio--full-width{% endblock %}\n"
    "{% block head %}\n"
    '  <link rel="stylesheet" href="/animations/motion-lab/showcase.css">\n'
    "{% endblock %}\n"
    "{% block content %}\n" + sections + "\n{% endblock %}\n"
    "{% block scripts %}\n"
    '  <script type="module" src="/animations/motion-lab/showcase.js"></script>\n'
    "{% endblock %}\n"
)
