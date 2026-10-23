# Practice Course: Minimal LiaScript Template with Automated Export

[![Open the course](https://img.shields.io/badge/Open_the_course-LiaScript-0A66C2)](https://liascript.github.io/course/?https://raw.githubusercontent.com/AEMSabbirRifat/Practice-Course/main/Test%2001.md)

**A small, clean starting point for anyone who wants to publish an interactive course on GitHub.**

This is the sandbox where I first learned to publish courses with [LiaScript](https://liascript.github.io/): plain Markdown that becomes an interactive course in the browser, hosted for free on GitHub. It contains the smallest possible working setup, which makes it a handy template.

## 📦 What's inside

| Path | What it is |
|---|---|
| [`Test 01.md`](Test%2001.md) | A one-page demo course with a learning-goals list and a quiz → [open it](https://liascript.github.io/course/?https://raw.githubusercontent.com/AEMSabbirRifat/Practice-Course/main/Test%2001.md) |
| [`English Language Series/`](English%20Language%20Series) | Placeholders for a planned beginner → intermediate → advanced grammar series |
| [`.github/workflows/automate-liascript.yml`](.github/workflows/automate-liascript.yml) | One-click GitHub Actions export to **PDF + SCORM 1.2** (Moodle / ILIAS), published as a GitHub Release |
| [`scripts/generate-pdf.js`](scripts/generate-pdf.js) · [`package.json`](package.json) | Export script using the official `@liascript/exporter`; the lesson to export is set in `package.json` |

## 🚀 Use it as a template

1. Click **Fork** (or *Use this template*).
2. Replace `Test 01.md` with your own lesson, and update `"lesson"` in `package.json`.
3. Open `https://liascript.github.io/course/?https://raw.githubusercontent.com/<you>/<repo>/main/<your-file>.md` to see it live.
4. Go to *Actions* → *LiaScript Export* → *Run workflow* to get a PDF and a SCORM package.

## 🔧 2026 update

I replaced the original export script, which printed raw Markdown, with the official LiaScript exporter. I also added a proper course header, fixed the quiz syntax and added a `.gitignore`. For real lessons built with this pipeline, see [automation-test-1](https://github.com/AEMSabbirRifat/automation-test-1) and [QuRM-WiSe2024-25](https://github.com/AEMSabbirRifat/QuRM-WiSe2024-25).

---

### 📬 About me

I'm **Sabbir Rifat**, an analyst, quantitative researcher and course designer at Otto von Guericke University Magdeburg.
**[a.e.m.sabbirrifat@gmail.com](mailto:a.e.m.sabbirrifat@gmail.com)** · [LinkedIn](https://www.linkedin.com/in/aemsabbirrifat) · [Portfolio](https://scaleupwithsabbir.github.io/)
