#!/usr/bin/env python3
"""Generate the React handbook data from the checked-in learning guide.

Uses only the standard library. Supports the Markdown constructs in this source:
headings, paragraphs, emphasis, links, inline/fenced code, quotes, and flat lists.
Source text and code stay unchanged; HTML is escaped before presentation.
"""
from pathlib import Path
import hashlib
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "react-learning-guide.md"


def inline(text):
    result = []
    index = 0
    while index < len(text):
        tail = text[index:]
        code = re.match(r"`([^`]+)`", tail)
        link = re.match(r"\[([^\]]+)\]\(([^\s)]+)\)", tail)
        strong = re.match(r"\*\*(.+?)\*\*", tail)
        emphasis = re.match(r"\*([^*]+)\*", tail)
        if code:
            result.append("<code>" + html.escape(code[1]) + "</code>")
            index += len(code[0])
        elif link:
            url = link[2]
            if not url.startswith(("https://", "http://", "#", "./", "../")):
                raise ValueError("Unsupported link: " + url)
            result.append('<a href="' + html.escape(url, quote=True) + '">' + inline(link[1]) + "</a>")
            index += len(link[0])
        elif strong:
            result.append("<strong>" + inline(strong[1]) + "</strong>")
            index += len(strong[0])
        elif emphasis:
            result.append("<em>" + inline(emphasis[1]) + "</em>")
            index += len(emphasis[0])
        else:
            result.append(html.escape(text[index]))
            index += 1
    return "".join(result)


def markdown(text):
    lines = text.strip().splitlines()
    output = []
    examples = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if not line.strip() or line.strip() == "---":
            i += 1
            continue
        if line.startswith("```"):
            language = line[3:].strip() or "none"
            if not re.fullmatch(r"[\w-]+", language):
                raise ValueError("Unsupported code language")
            code = []
            i += 1
            while i < len(lines) and not lines[i].startswith("```"):
                code.append(lines[i])
                i += 1
            if i == len(lines):
                raise ValueError("Unclosed code fence")
            value = "\n".join(code)
            examples.append({"language": language, "code": value})
            output.append('<pre tabindex="0"><code class="language-' + language + '">' + html.escape(value) + "</code></pre>")
            i += 1
            continue
        if line.startswith("> "):
            quote = []
            while i < len(lines) and lines[i].startswith("> "):
                quote.append(lines[i][2:])
                i += 1
            output.append("<blockquote><p>" + inline(" ".join(quote)) + "</p></blockquote>")
            continue
        listed = re.match(r"^(- |\d+\. )(.*)", line)
        if listed:
            ordered = listed[1] != "- "
            tag = "ol" if ordered else "ul"
            items = []
            while i < len(lines):
                match = re.match(r"^(\d+\. |\- )(.*)", lines[i])
                if not match or (match[1] != "- ") != ordered:
                    break
                items.append("<li>" + inline(match[2]) + "</li>")
                i += 1
            output.append("<" + tag + ">" + "".join(items) + "</" + tag + ">")
            continue
        paragraph = []
        while i < len(lines) and lines[i].strip() and lines[i].strip() != "---":
            if lines[i].startswith(("```", "> ")) or re.match(r"^(?:- |\d+\. )", lines[i]):
                break
            if lines[i].startswith("#"):
                raise ValueError("Headings must be parsed before body rendering")
            paragraph.append(inline(lines[i].rstrip()) + ("<br>" if lines[i].endswith("  ") else ""))
            i += 1
        rendered = " ".join(paragraph)
        is_checkpoint = bool(re.match(r"^<strong>[^<]*checkpoint:", rendered, re.I))
        output.append('<p' + (' class="checkpoint"' if is_checkpoint else "") + ">" + rendered + "</p>")
    return "\n".join(output), examples


def stage(name):
    if name in {"How to use this guide", "React", "JavaScript Roadmap", "CLI Tools", "Components", "Hooks"}:
        return "Foundations"
    if name == "Advanced Topics":
        return "Advanced"
    if name == "Mobile Applications":
        return "Specialization"
    if name.startswith("Related roadmaps"):
        return "Reference"
    if name.startswith("Suggested mastery path"):
        return "Practice"
    return "Application skills"


def build():
    source = SOURCE.read_text()
    heading = re.compile(r"^(#{1,4}) (.+)$", re.M)
    matches = list(heading.finditer(source))
    if not matches or len(matches[0][1]) != 1:
        raise ValueError("Expected document title")
    introduction = source[matches[0].end():matches[1].start()].strip()
    chapters = []
    paths = {}
    for index, match in enumerate(matches[1:], start=1):
        depth = len(match[1])
        name = match[2]
        body = source[match.end():matches[index + 1].start() if index + 1 < len(matches) else len(source)].strip()
        if depth == 2:
            chapters.append({"number": len(chapters) + 1, "name": name, "stage": stage(name), "lessons": []})
            paths = {}
        elif not chapters:
            raise ValueError("Topic before first chapter")
        if depth > 2:
            paths = {key: value for key, value in paths.items() if key < depth}
            parents = [paths[key] for key in sorted(paths)]
            paths[depth] = name
        else:
            parents = []
        rendered, examples = markdown(body)
        chapters[-1]["lessons"].append({
            "name": name if depth > 2 else "Overview",
            "sourceHeading": name,
            "depth": depth,
            "parents": parents,
            "explanation": body,
            "html": rendered,
            "examples": examples,
            "id": "react:" + str(chapters[-1]["number"]) + ":" + name,
        })
    book = {
        "title": matches[0][2],
        "source": SOURCE.name,
        "sourceHash": hashlib.sha256(source.encode()).hexdigest(),
        "introduction": markdown(introduction)[0],
        "chapters": chapters,
    }
    target = ROOT / "js/react-handbook-data.js"
    target.write_text("/* Generated by scripts/build-react-handbook.py from react-learning-guide.md. */\nwindow.ReactHandbook = " + json.dumps(book, ensure_ascii=False, indent=2) + ";\n")
    print(f"Generated {len(chapters)} sections, {sum(len(c['lessons']) for c in chapters)} entries, and {sum(len(e['examples']) for c in chapters for e in c['lessons'])} code examples.")


if __name__ == "__main__":
    build()
