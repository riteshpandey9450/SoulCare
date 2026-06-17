<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,6&height=200&section=header&text=SoulCare&fontSize=80&fontColor=fff&animation=twinkling&fontAlignY=35&desc=AI-Powered%20Digital%20Mental%20Health%20Platform&descAlignY=58&descSize=22" width="100%"/>

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-soulcare--nar5.onrender.com-6366f1?style=for-the-badge&logoColor=white)](https://soulcare-nar5.onrender.com)
[![Demo Video](https://img.shields.io/badge/▶️_Demo_Video-Watch_Now-ef4444?style=for-the-badge&logoColor=white)](https://shorturl.at/Z9lb2)
[![GitHub](https://img.shields.io/badge/⭐_Star_This_Repo-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/riteshpandey9450/SoulCare)

<br/>

![React](https://img.shields.io/badge/React.js-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_API-4285F4?style=flat-square&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black)
![AWS](https://img.shields.io/badge/AWS-FF9900?style=flat-square&logo=amazonaws&logoColor=white)

<br/>

> **"Breaking barriers to mental health support with innovative technology - professional help, peer support, and self-care resources, anytime, anywhere."**

<br/>

</div>

---

## 📋 Table of Contents

- [About SoulCare](#-about-soulcare)
- [✨ Key Features](#-key-features)
- [🧠 AI & RAG Architecture](#-ai--rag-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔐 Demo Credentials](#-demo-credentials)

---

## 🌟 About SoulCare

**SoulCare** is a full-stack, AI-powered mental health and wellness platform built for students and young professionals. It bridges the gap between users in emotional distress and the support they need - through an **AI chatbot (MindCare Assistant)**, **live counsellor booking**, **anonymous community chat**, and a **personalized wellness dashboard**.

Built with a **3-tier architecture** - React frontend, Node.js/Express backend, and a dedicated Python AI/RAG service - SoulCare combines the power of **Gemini API**, **RAG pipeline**, and **real-time WebSockets** to deliver intelligent, context-aware, empathetic support.

```
🎯 Mission: Make quality mental health support accessible, private, and intelligent for everyone.
```

### 💡 Why SoulCare?

| Problem | SoulCare's Solution |
|---|---|
| Generic chatbot responses with no mental health context | RAG pipeline grounded in curated mental health knowledge base |
| Fear of identity exposure in mental health conversations | Fully anonymous community chat (you appear as `Anonymous-XXXX`) |
| No easy way to reach real counsellors | 4-step counsellor booking with therapist profiles & specializations |
| Mood & wellness tracking scattered across apps | Unified student dashboard with mood score, weekly goals & AI insights |
| Delayed support during crises | Crisis Helpline & Emergency Chat accessible from the dashboard |

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🤖 MindCare AI Assistant
- **Gemini API** powered empathetic chatbot
- **RAG pipeline** with curated mental health knowledge base (ChromaDB)
- Heuristic confidence filtering prevents hallucinated outputs
- Safe, judgment-free conversational interface
- Session-based context memory

</td>
<td width="50%">

### 📊 Student Wellness Dashboard
- **Mood Score tracker** with daily ratings
- Weekly goals - Meditation, Sessions, Resources
- **AI Insights** - personalized daily wellness tips
- Upcoming counsellor sessions at a glance
- Today's Audio Resources (guided meditation, lo-fi, nature sounds)

</td>
</tr>
<tr>
<td width="50%">

### 💬 Anonymous Community Chat
- Real-time peer support via **WebSockets**
- Fully anonymous identities (`Anonymous-XXXX`)
- Safe space to share thoughts without fear of judgment
- Live message delivery with timestamps

</td>
<td width="50%">

### 📅 Counsellor Booking System
- Browse verified therapists with specializations (Anxiety, Depression, CBT, EMDR)
- 4-step booking: Choose Therapist → Select Time → Share Context → Confirmation
- Counsellor dashboard for session management
- Admin panel for counsellor management & reports

</td>
</tr>
<tr>
<td width="50%">

### 🔒 Security & Privacy
- **JWT-based** authentication with role-based access
- Anonymous sessions with zero PII stored
- Encrypted communication channels
- Protected routes for Student, Counsellor & Admin roles

</td>
<td width="50%">

### 🐍 Python AI Service
- Standalone RAG pipeline (`rag_pipeline.py`)
- Web scraper (`scrapper.py`) for knowledge base building
- Counsellor directory auto-population (`build_database.py`)
- Logging & conversation summary (`logging_and_summary.py`)

</td>
</tr>
</table>


## 🧠 AI & RAG Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                         USER QUERY (Chat Input)                      │
└─────────────────────────────┬────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│                   PYTHON RAG SERVICE (rag_pipeline.py)               │
│                                                                      │
│  ┌──────────────────┐      ┌──────────────────────────────────────┐  │
│  │  Query Encoder   │─────▶│         ChromaDB Vector Store        │  │
│  │ (Sentence-BERT)  │      │   Mental Health Knowledge Base       │  │
│  └──────────────────┘      │   (scraped via scrapper.py +         │  │
│                            │    Selenium from trusted sources)    │  │
│                            └──────────────┬───────────────────────┘  │
│                                           │                          │
│                         ┌─────────────────▼─────────────────────┐   │
│                         │   Confidence Filter (Heuristic Layer)  │   │
│                         │   Removes low-relevance retrievals     │   │
│                         └─────────────────┬─────────────────────┘   │
│                                           │                          │
│                         ┌─────────────────▼─────────────────────┐   │
│                         │         GEMINI API (LLM)               │   │
│                         │   Context + Query → Empathetic         │   │
│                         │   Response grounded in knowledge base  │   │
│                         └─────────────────┬─────────────────────┘   │
└───────────────────────────────────────────┼──────────────────────────┘
                                            │
                              ┌─────────────▼──────────────┐
                              │   Node.js Backend (API)     │
                              │   Delivers via WebSocket    │
                              └─────────────┬──────────────┘
                                            │
                              ┌─────────────▼──────────────┐
                              │     React Frontend          │
                              │   MindCare Chat Interface   │
                              └────────────────────────────┘
```

### Python AI Service Files

| File | Purpose |
|---|---|
| `rag_pipeline.py` | Core RAG retrieval + Gemini integration |
| `scrapper.py` | Selenium-based web scraper for knowledge base |
| `build_database.py` | Builds & populates ChromaDB vector store |
| `core_logic.py` | Core AI logic and response generation |
| `logging_and_summary.py` | Conversation logging & session summaries |
| `constants.py` | Configuration constants |
| `main.py` | Entry point for Python AI service |
| `app.py` | Flask/FastAPI wrapper for Python service |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React.js** | Component-based UI, hooks, context API |
| **Tailwind CSS** | Utility-first responsive styling |
| **Zustand** | Global state management (`useAuthStore`, `useChatStore`) |
| **Axios** | HTTP client for REST API communication |
| **WebSocket Client** | Real-time community chat & AI responses |
| **Vite** | Lightning-fast build tool & dev server |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express.js** | RESTful API server & middleware |
| **WebSocket / Socket.io** | Real-time bidirectional messaging |
| **JWT** | Secure authentication & role-based authorization |
| **Cloudinary** | Profile image upload & storage |
| **Nodemon** | Development auto-restart |

### AI / ML (Python Service)
| Technology | Purpose |
|---|---|
| **Gemini API** | Core LLM for empathetic response generation |
| **RAG Architecture** | Knowledge-grounded, context-aware responses |
| **ChromaDB** | Vector store for semantic similarity search |
| **Selenium** | Automated scraping for mental health knowledge base |
| **Sentence Transformers** | Text embedding generation |

### Database
| Technology | Purpose |
|---|---|
| **MongoDB** | Primary NoSQL DB - users, sessions, feedback, chat |
| **MySQL** | Relational DB for structured analytics & reports |

### DevOps & Hosting
| Technology | Purpose |
|---|---|
| **Vercel** | Frontend deployment |
| **Render** | Backend Node.js API hosting |
| **AWS** | Cloud infrastructure & storage |

---

## 📁 Project Structure

```
SoulCare/
│
├── backend/                          # Node.js + Express API
│   ├── controller/
│   │   ├── feedback.controller.js
│   │   ├── session.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   └── user.middleware.js        # JWT auth middleware
│   ├── models/
│   │   ├── feedback.model.js
│   │   ├── session.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── feedback.route.js
│   │   ├── session.route.js
│   │   └── user.route.js
│   └── utils/
│       ├── cloudinary.js             # Image upload utility
│       ├── db.js                     # MongoDB connection
│       └── upload.js                 # File upload handler
│   └── server.js                     # Express entry point
│
├── frontend/                         # React + Vite + Tailwind
│   ├── public/
│   │   ├── Logo.png
│   │   └── doc.png
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── Footer.jsx
│       │   └── Navbar.jsx
│       ├── lib/
│       │   └── axios.js              # Axios instance
│       ├── pages/
│       │   ├── LandingPage.jsx
│       │   ├── Auth.jsx
│       │   ├── StudentDashboard.jsx
│       │   ├── ChatBotPage.jsx       # MindCare AI Assistant
│       │   ├── CommunitySupportPage.jsx  # Anonymous community chat
│       │   ├── Booking.jsx           # Counsellor booking (4-step)
│       │   ├── CounsellorDashboard.jsx
│       │   ├── CounsellorProfile.jsx
│       │   ├── CounsellorManagementPage.jsx
│       │   ├── AdminDashboard.jsx
│       │   ├── ProfilePage.jsx
│       │   ├── FeedbackPage.jsx
│       │   ├── Reports.jsx
│       │   ├── Resource.jsx
│       │   ├── About.jsx
│       │   └── Contact.jsx
│       └── stores/
│           ├── useAuthStore.js       # Auth global state
│           └── useChatStore.js       # Chat global state
│
├── python/                           # Python AI / RAG Service
│   ├── rag_pipeline.py               # Core RAG implementation
│   ├── scrapper.py                   # Selenium web scraper
│   ├── build_database.py             # ChromaDB population
│   ├── core_logic.py                 # AI response logic
│   ├── logging_and_summary.py        # Session logging
│   ├── constants.py
│   ├── main.py
│   ├── app.py
│   ├── counselor_directory.json
│   ├── url_list.txt                  # Scraping target URLs
│   └── requirements.txt
│
├── nodemon.json
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
python >= 3.9
MongoDB (local or Atlas URI)
MySQL
```

### 1. Clone the Repository

```bash
git clone https://github.com/riteshpandey9450/SoulCare.git
cd SoulCare
```

### 2. Backend Setup (Node.js)

```bash
npm install   # from root (installs backend deps via nodemon.json)
```

Create a `.env` file at the root level:

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# MySQL
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=soulcare

# Auth
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev   # starts Node.js server via nodemon
```

### 3. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

```bash
npm run dev
```

### 4. Python AI Service Setup

```bash
cd python
pip install -r requirements.txt
```

Create `python/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
CHROMA_DB_PATH=./chromadb
```

```bash
# Build the knowledge base first (run once)
python build_database.py

# Then start the AI service
python app.py
```

### 5. Open in Browser

```
Frontend  → http://localhost:5173
Backend   → http://localhost:5000
AI Service → http://localhost:8000
```

---

## 🔐 Demo Credentials

> ⚠️ **For testing only. Do not enter real personal information.**

### 🎓 Student Account
| Field | Value |
|---|---|
| 📧 Email | `ritesh@gmail.com` |
| 🔑 Password | `123456` |

> 🌐 **Live Demo:** [soulcare-nar5.onrender.com](https://soulcare-nar5.onrender.com)
> 🎬 **Demo Video:** [Watch here](https://shorturl.at/Z9lb2)


<div align="center">

**If SoulCare helped you or inspired you, please consider giving it a ⭐**

*It motivates us to keep building and improving.*

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,6&height=120&section=footer" width="100%"/>

</div>
