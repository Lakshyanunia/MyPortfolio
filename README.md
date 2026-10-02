# 🚀 Lakshya Nunia — Personal Portfolio Website

<div align="center">


[![GitHub](https://img.shields.io/badge/GitHub-Lakshyanunia-181717?style=for-the-badge&logo=github)](https://github.com/Lakshyanunia)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-lakshyanunia-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/lakshyanunia)
[![LeetCode](https://img.shields.io/badge/LeetCode-Lakshyanunia-FFA116?style=for-the-badge&logo=leetcode&logoColor=black)](https://leetcode.com/u/Lakshyanunia/)
[![Email](https://img.shields.io/badge/Email-luckylakshya@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:luckylakshya4445@gmail.com)

**A fully dynamic, admin-powered personal portfolio site built with pure HTML, CSS & JavaScript.**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Admin Dashboard](#-admin-dashboard)
- [Sections](#-sections)
- [Projects Showcased](#-projects-showcased)
- [Certificates](#-certificates)
- [Running Locally](#-running-locally)
- [Deployment](#-deployment)
- [Contact](#-contact)

---

## 🌟 Overview

This is my personal portfolio website — a responsive, dark-mode-first, single-page site that showcases my education, skills, projects, achievements, and certificates. It is fully dynamic: all content is managed through a **secure Admin Dashboard** without ever touching the source code.

I am **Lakshya Nunia**, a Computer Science & Engineering undergraduate at **Lovely Professional University**, specializing in **Data Science**. I'm passionate about software development, data analysis, and problem solving, with 200+ LeetCode problems solved and active open-source contributions.

---

## 🔗 Live Demo

> 🌐 **[View Portfolio →](https://lakshya-nunia.vercel.app/)**

---

## ✨ Features

### Portfolio Site (`index.html`)
- 🌙 **Dark / Light Mode Toggle** — smooth theme switching with `localStorage` persistence
- ✨ **Custom Glowing Cursor** — animated cursor glow effect
- 🎯 **Smooth Scroll Navigation** — sticky navbar with anchor links to all sections
- 🎞️ **Scroll Reveal Animations** — fade-in & staggered entrance animations on all sections
- 📱 **Fully Responsive** — mobile-first design adapts to all screen sizes
- 💎 **Glassmorphism UI** — frosted glass cards throughout using CSS backdrop-filter
- 🖥️ **Interactive Terminal Card** — animated typing terminal in the About section
- 📧 **Formspree Contact Form** — functional contact form with real email delivery
- 📄 **CV Download** — one-click résumé PDF download
- ⚡ **localStorage-powered** — all content is loaded dynamically from data saved via the Admin Dashboard

### Admin Dashboard (`admin.html`)
- 🔐 **Secure Login** — username + password authentication (credentials stored in `localStorage`)
- 🗂️ **10 Tabbed Sections** — dedicated editor for every section of the portfolio
- ➕ **Add / Edit / Delete / Reorder** — full CRUD management for all dynamic content
- 💾 **Auto-Save to localStorage** — changes persist across sessions instantly
- 📥 **JSON Backup Export** — download entire portfolio data as a `.json` file
- 📤 **JSON Import** — restore or transfer data from a backup file
- 🔄 **Reset to Defaults** — restore all content to factory defaults
- 🔒 **Lock Panel** — one-click session logout
- 🔑 **Credential Management** — change admin username & password from the Settings tab

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | Vanilla CSS3 (custom properties, grid, flexbox, animations) |
| Logic | Vanilla JavaScript (ES6+, modules) |
| Fonts | Google Fonts — Outfit (300–800) |
| Icons | Inline SVG |
| Contact Form | Formspree |
| Data Storage | Browser `localStorage` |
| Deployment | Vercel |

> **No frameworks. No dependencies. Zero build steps.** Pure web standards.

---

## 📁 Project Structure

```
MyPortfolio/
│
├── index.html              # Main portfolio page
├── admin.html              # Admin Dashboard & Editor
│
├── main.css                # Portfolio styles (dark/light theme, animations, layout)
├── admin.css               # Admin Dashboard styles
│
├── main.js                 # Portfolio logic (theme toggle, animations, dynamic rendering)
├── admin.js                # Admin Dashboard logic (CRUD, auth, import/export)
│
├── js/
│   └── portfolio-data.js   # Default portfolio data (seeded into localStorage)
│
├── vercel.json             # Vercel deployment config
│
├── my-profile-photo.jpeg   # Profile picture
├── covid_analysis.png      # Project screenshot
├── traffic_dashboard.png   # Project screenshot
├── sales_profit.png        # Project screenshot
├── cipherschool.png        # Certificate logo
├── springboard-logo.avif   # Certificate logo
├── boardinfinity.png       # Certificate logo
│
├── CV Lakshya.pdf                      # Résumé / CV
├── Lakshya_Nunia_Cipher_dsa.pdf        # DSA with Java certificate
├── Lakshya_Nunia_Cipher_github.pdf     # Git & GitHub certificate
├── Infosys Springboard.pdf             # Infosys Springboard certificate
└── Boardinfinitymooc.pdf               # Board Infinity MOOC certificate
```

---

## 🔐 Admin Dashboard

The Admin Dashboard (`admin.html`) is a fully custom content management system built on top of `localStorage`. It allows me to update every section of my portfolio without touching any code.

### How to Access
1. Navigate to `admin.html` (or click the `L/N` logo on the portfolio)
2. Enter admin credentials at the login screen
3. Use the sidebar to switch between content sections
4. Click **💾 Save Portfolio Changes** to apply updates

### Editable Sections

| Tab | What You Can Edit |
|---|---|
| 🚀 Hero & Header | Name, tagline, profile image, location badge, CTA button |
| 👤 About Me | Bio paragraph, stats cards (e.g. "2+ Years Coding"), terminal card content |
| 🎓 Education | Add/edit/delete/reorder education timeline entries |
| 📊 Training | Manage training programs, bootcamps, dates, and skill tags |
| ⚡ Technical Skills | Skill categories with normal & highlighted (gradient) tags |
| 💻 Featured Projects | Project cards with image, description, tech stack, and links |
| 🏆 Key Achievements | Achievement cards with badge, date, title, and description |
| 📜 My Certificates | Certificate cards with logo, date, PDF link, and verifier URL |
| 📧 Contact & Socials | Email, location, GitHub, LinkedIn, LeetCode, Formspree URL |
| ⚙️ Security & Backup | Change credentials, export/import JSON, reset to defaults |

---

## 📄 Sections

### 🏠 Hero
Full-screen welcome banner with animated name, tagline, CTA buttons (View Work, Download CV, Let's Talk), profile photo, and a floating location badge.

### 👤 About Me
Two-column layout: a paragraph bio with stat counters (2+ Years Coding, 5+ Projects, 200+ LeetCode problems) and an interactive terminal card with typed output.

### 🎓 Education
Vertical timeline showing:
- **B.Tech CSE** (Data Science) — Lovely Professional University *(2023–Present, 6.8 CGPA)*
- **Class XII** — Jeevani International School *(2021–2022, 87.5%)*
- **Class X** — Jeevani International School *(2019–2020, 86%)*

### 📊 Technical Training
- **DSA with Java** — CipherSchool *(Jun–Jul 2025)*
- **DSA with C++ & Software Testing** — LPU *(Jan–Feb 2026)*

### ⚡ Technical Skills

| Category | Skills |
|---|---|
| Data Science | MS-Excel, PowerBI, Python, SQL/MySQL |
| Languages | ★ Java, Python, C, C++, HTML, CSS, SQL/MySQL |
| Tools & Others | Git & GitHub, Tableau, JetBrains, VS Code, Blender, Unity, LeetCode |

### 💻 Projects

| Project | Tech | Links |
|---|---|---|
| Covid-19 Impact Analysis & Visualisation | Python, Pandas, Matplotlib, Seaborn | [LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7317113184006426624/) · [GitHub](https://github.com/Lakshyanunia/Covid-19-impact-analysis-and-visualisation-) |
| Traffic Crash Analysis Dashboard | Power BI | [LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7406067070968414208/) · [GitHub](https://github.com/Lakshyanunia/Traffic-Crash-Analysis-Dashboard-using-PowerBI) |
| Sales and Profit Analysis | MS-Excel | [LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7317241496477306881/) · [GitHub](https://github.com/Lakshyanunia/Sales-and-Profit-using-excel) |

### 🏆 Achievements
- **LeetCode Ranking** — Rank < 6.5 Lakh *(2026)*
- **Coding Milestone** — 200+ problems solved, 50-day active badge *(2026)*

### 📜 Certificates

| Certificate | Issuer | Period |
|---|---|---|
| Data Structures & Algorithms with Java | CipherSchool | Jun–Jul 2025 |
| Git & GitHub | CipherSchool | Jun–Jul 2025 |
| Infosys Springboard | Infosys | Aug–Sep 2025 |
| Microlearning in Data Structures & Algorithms | Board Infinity | Jan–Feb 2024 |

---

## 💻 Running Locally

Since this is a pure static site, you can open it directly in any browser:

```bash
# Option 1: Double-click index.html in File Explorer

# Option 2: Open directly in Chrome (Windows)
Start-Process "chrome.exe" "file:///d:/CV/Portfolio CV/index.html"
```

Or serve it locally with Python (if installed):

```bash
python -m http.server 8080
# Then open: http://localhost:8080
```

---

## 🚀 Deployment

This project is configured for **Vercel** deployment via `vercel.json`:

```json
{
  "version": 2,
  "public": true,
  "name": "portfolio-cv",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**To deploy:**
1. Go to [vercel.com](https://vercel.com)
2. Click **New Project** → Import from GitHub
3. Select `Lakshyanunia/MyPortfolio`
4. Click **Deploy** — done! ✅

Your portfolio will be live at a `*.vercel.app` URL within seconds.

---

## 📬 Contact

| Platform | Link |
|---|---|
| 📧 Email | [luckylakshya@gmail.com](mailto:luckylakshya@gmail.com) |
| 💼 LinkedIn | [linkedin.com/in/lakshyanunia](https://www.linkedin.com/in/lakshyanunia) |
| 🐙 GitHub | [github.com/Lakshyanunia](https://github.com/Lakshyanunia) |
| 🧩 LeetCode | [leetcode.com/u/Lakshyanunia](https://leetcode.com/u/Lakshyanunia/) |
| 📍 Location | Phagwara, Punjab, India |

---

<div align="center">

© 2026 Designed & Built by **Lakshya Nunia**

⭐ *If you like this portfolio, consider giving the repo a star!*

</div>
