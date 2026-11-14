"""Generate standalone and integrated Field Notes pages from the shared markup."""

from pathlib import Path

folder = Path(__file__).resolve().parents[1]
sections = (folder / "sections.html").read_text()
(folder / "index.html").write_text(
    '<!doctype html>\n<html lang="en">\n<head>\n'
    '<meta charset="utf-8">\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
    '<meta name="description" content="Field Notes: a slower way of seeing. An animated visual journal.">\n'
    "<title>Field Notes — Web Sorcery</title>\n"
    '<link rel="stylesheet" href="./theme.css">\n'
    '<link rel="stylesheet" href="./style.css">\n'
    '</head>\n<body style="margin: 0">\n'
    + sections
    + '\n<script type="module" src="./animation.js"></script>\n</body>\n</html>\n'
)
# Use explicit source paths so the Vite build bundles every local photograph.
page_sections = sections.replace("./assets/", "/animations/field-notes/assets/")
page = folder.parents[1] / "src/pages/gsap-animations.njk"
page.write_text(
    '{% extends "layouts/base.njk" %}\n'
    '{% set portfolioHome = "./index.html" %}\n'
    '{% set description = "Field Notes: a slower way of seeing. An animated visual journal." %}\n'
    "{% block title %}Field Notes — Web Sorcery{% endblock %}\n"
    "{% block mainModifier %} portfolio--full-width{% endblock %}\n"
    "{% block head %}\n"
    '<link rel="stylesheet" href="/animations/field-notes/style.css">\n'
    "{% endblock %}\n"
    "{% block content %}\n" + page_sections + "\n{% endblock %}\n"
    "{% block scripts %}\n"
    '<script type="module" src="/animations/field-notes/animation.js"></script>\n'
    "{% endblock %}\n"
)
