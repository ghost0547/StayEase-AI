# 🏡 StayEase AI — Next-Gen AI Homestay & Travel Workspace

![License](https://img.shields.io/badge/license-MIT-emerald.svg)
![React](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-teal.svg?logo=fastapi)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4.svg?logo=tailwindcss)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-1.5_Flash-8E44AD.svg?logo=google)
![JWT](https://img.shields.io/badge/JWT-Protected-black.svg?logo=jsonwebtokens)

> An intelligent, full-stack AI-powered homestay discovery and travel itinerary planning platform designed to deliver personalized travel experiences in seconds.

---

## 🌟 Overview

**StayEase AI** bridges the gap between authentic local homestay discovery and effortless travel planning. Leveraging **Google's Gemini 1.5 Flash AI**, StayEase AI generates day-by-day travel itineraries customized to user preferences, travel duration, and budget while recommending verified, premium homestays.

Built with a high-performance **FastAPI** backend, **MongoDB** document database, and a responsive **React (Vite)** frontend, StayEase AI offers a seamless travel workspace complete with user authentication, personalized statistics, interactive galleries, and a token-backed favorites management system.

---

## ✨ Features

### 🏡 Modern Homestay Experience
- **Hero Image Gallery**: Interactive desktop photo mosaic (1 hero + 4 previews) with fullscreen lightbox modal and touch-swipeable mobile slider.
- **Sticky Booking Card**: Desktop-sticky booking card with dynamic night & price calculations, guest counters, date range pickers, and reservation request modals.
- **Property Highlights & Amenities**: Feature chips with Lucide icons (WiFi, Mountain View, Breakfast, Swimming Pool, Workspace) and category-grouped amenity grids.
- **Nearby Attractions & Guest Reviews**: Curated landmark distance cards with travel time estimates and verified guest review ratings.

### 🤖 AI Travel Itinerary Planner
- **Instant Itinerary Synthesis**: Generates day-by-day travel plans powered by Google Gemini AI tailored to destination, budget, and trip length.
- **Rich Dashboard Viewer**: Custom day cards, morning/afternoon/evening activity breakdown, budget allocation cards, and copy/export options.
- **Fallback Recovery**: Graceful retry mechanisms and structured JSON output rendering.

### 👤 Personalized Travel Workspace (Dashboard)
- **Time-Based Welcome**: Dynamic greetings (`Good Morning` / `Good Afternoon` / `Good Evening`) with ambient glow effects.
- **Animated Travel Statistics**: Interactive stat cards with animated count-up counters (Saved Homestays, AI Trips, Favorite Destination, Explored Stays).
- **Favorites Management**: Token-authenticated favorites system with real-time API sync and Framer Motion exit layout animations.
- **Collectible Badges & Timeline**: Achievement progress bars and vertical activity timeline tracing user interactions.

---

## 📸 Screenshots & Live Demo

### 🎥 Live Demo Placeholder
> 📽️ **[Watch Full Video Demo](#)** *(Add video demo or hosted URL link here)*

### 🖼️ Platform Preview
| 🏡 Homestay Details & Hero Gallery | 🤖 AI Travel Planner |
|:---:|:---:|
| *(Add Screenshot: Homestay Details Page)* | *(Add Screenshot: AI Itinerary Output)* |

| 📊 Personalized Dashboard | 📱 Mobile Responsive Layout |
|:---:|:---:|
| *(Add Screenshot: User Travel Workspace)* | *(Add Screenshot: Mobile 320px Viewport)* |

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS v4, Vanilla CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons (Hi2, Lu, Si)
- **Routing**: React Router DOM v6 (Code-split with `React.lazy`)

### **Backend**
- **API Engine**: FastAPI (Python 3.10+)
- **Database**: MongoDB (Motor async driver)
- **AI Integration**: Google Gemini 1.5 Flash API (`google-generativeai`)
- **Authentication**: JWT (JSON Web Tokens) with Passlib & Bcrypt hashing
- **Server**: Uvicorn ASGI Server

---

## 📁 Folder Structure

```text
StayEase-AI/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app initialization & endpoints
│   │   ├── database.py          # MongoDB connection & client configuration
│   │   ├── auth.py              # JWT token generation & password hashing
│   │   └── models.py            # Pydantic schemas & MongoDB models
│   ├── requirements.txt         # Python dependencies
│   └── .env.example             # Backend environment template
├── frontend/
│   ├── public/                  # Static assets & favicon
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── dashboard/       # Dashboard workspace sub-components
│   │   │   ├── homestay/        # Homestay details page sub-components
│   │   │   ├── ui/              # Skeleton placeholders & base UI elements
│   │   │   ├── Navbar.jsx       # Header bar with mobile drawer menu
│   │   │   ├── Footer.jsx       # 4-column footer layout
│   │   │   ├── Card.jsx         # Homestay card component (Memoized)
│   │   │   └── SearchFilterBar.jsx # Search & filter category bar
│   │   ├── context/             # Global React Context (FavoritesContext)
│   │   ├── pages/               # Top-level route pages (Home, About, Dashboard, AIPlanner, HomestayDetails)
│   │   ├── App.jsx              # Application router & lazy page loading
│   │   ├── index.css            # Tailwind & global CSS utilities
│   │   └── main.jsx             # React DOM entry point
│   ├── package.json             # NPM dependencies & build scripts
│   └── vite.config.js           # Vite build configuration
└── README.md                    # Project documentation
```

---

## 🚀 Installation & Local Setup

### **Prerequisites**
- Node.js (v18.0.0 or higher)
- Python (v3.10 or higher)
- MongoDB instance (Local or MongoDB Atlas cluster)
- Google Gemini API Key

---

### **1. Clone Repository**
```bash
git clone https://github.com/pulkit/StayEase-AI.git
cd StayEase-AI
```

---

### **2. Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate
# Activate virtual environment (macOS/Linux)
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
```

#### **Backend `.env` Configuration**
```env
MONGODB_URL=mongodb://localhost:27017/stayease
SECRET_KEY=your_super_secret_jwt_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
GEMINI_API_KEY=your_google_gemini_api_key_here
```

#### **Run Backend Server**
```bash
uvicorn app.main:app --reload --port 8000
```
Backend will run at: `http://127.0.0.1:8000`  
Swagger API Docs available at: `http://127.0.0.1:8000/docs`

---

### **3. Frontend Setup**
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install packages
npm install

# Start Vite development server
npm run dev
```
Frontend will run at: `http://localhost:5173`

---

## 🔌 API Overview

| Method | Endpoint | Description | Auth Required |
|:---|:---|:---|:---:|
| `POST` | `/api/register` | Register new user account | ❌ |
| `POST` | `/api/login` | Authenticate user & return JWT token | ❌ |
| `GET` | `/api/profile` | Fetch authenticated user profile | ✅ |
| `GET` | `/homestays` | List all available homestays with filter queries | ❌ |
| `GET` | `/homestays/{id}` | Get detailed homestay information | ❌ |
| `POST` | `/api/ai/itinerary` | Generate AI itinerary via Gemini API | ❌ |
| `GET` | `/api/favorites` | Get user's saved homestay IDs | ✅ |
| `POST` | `/api/favorites/{id}` | Save homestay to user favorites | ✅ |
| `DELETE` | `/api/favorites/{id}`| Remove homestay from user favorites | ✅ |

---

## 🔮 Future Improvements

- [ ] **Interactive Map Integration**: Mapbox / Leaflet map view for location exploration.
- [ ] **Direct Payment Gateway**: Razorpay / Stripe integration for instant booking checkout.
- [ ] **PDF Itinerary Export**: Export generated AI travel plans directly as downloadable PDF files.
- [ ] **Multi-language Support**: i18n support for international travelers.
- [ ] **Host Portal**: Management dashboard for property owners to list and manage homestays.

---

## 👨‍💻 Author

Developed with ❤️ by **Pulkit** as a full-stack AI-driven web application project.

- **GitHub**: [@pulkit](https://github.com)
- **LinkedIn**: [Connect on LinkedIn](https://linkedin.com)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
