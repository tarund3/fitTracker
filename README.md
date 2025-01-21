
# **FitBuddy - Backend**

🚀 **FitBuddy** is a full-stack web application that creates **personalized workout plans** based on user goals, health metrics, and preferences. This repository contains the **backend**, built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.

## **📌 Features Implemented So Far**
### ✅ **1. User Authentication**
- **User Registration & Login** using **JWT-based authentication**.
- **Password hashing** with `bcryptjs` for security.
- Protected routes with **JWT middleware**.

### ✅ **2. Profile Management**
- Users can **create, update, and delete** their fitness profiles.
- Each profile stores **age, weight, height, fitness goal, and target areas**.

### ✅ **3. Workout Plan API**
- Users can **create, fetch, update, and delete** their workout plans.
- Each plan includes **goal-based exercises** (e.g., strength, endurance, weight loss).
- Users can **customize difficulty, sets, and reps**.

---

## **🛠️ Tech Stack**
| Technology  | Purpose |
|-------------|---------|
| **Node.js** | Backend runtime environment |
| **Express.js** | Web framework for building APIs |
| **MongoDB (Mongoose)** | NoSQL database for storing user data |
| **bcryptjs** | Secure password hashing |
| **jsonwebtoken (JWT)** | User authentication & security |
| **dotenv** | Environment variable management |

---

## **📂 Folder Structure**
```
fitBuddy/
  ├── server/                  # Backend code
  │   ├── config/               # Database configuration
  │   ├── middleware/           # JWT authentication middleware
  │   ├── models/               # Mongoose models (User, Profile, Workout)
  │   ├── routes/               # API route handlers (Auth, Profile, Workouts)
  │   ├── server.js             # Express server setup
  │   ├── .env                  # Environment variables (not committed)
  ├── frontend/                 # (To be implemented)
  ├── README.md                 # Project documentation
```

---

## **🛠️ Setup Instructions**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/tarund3/fitTracker.git
cd fitTracker/server
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the `server/` folder and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### **4️⃣ Run the Server**
```bash
npm run dev
```
✅ The server should start on **http://localhost:5000/**.

---

## **🛠️ API Endpoints**
### 🔹 **Authentication**
| Method | Endpoint            | Description |
|--------|--------------------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login` | Login a user & get JWT token |
| GET    | `/api/auth/me` | Get logged-in user data (Protected) |

### 🔹 **Profile Management**
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/api/profile` | Get the user's profile (Protected) |
| POST   | `/api/profile` | Create/update profile (Protected) |
| DELETE | `/api/profile` | Delete profile (Protected) |

### 🔹 **Workout Plans**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/workouts` | Create a workout plan (Protected) |
| GET    | `/api/workouts` | Get all workout plans (Protected) |
| PUT    | `/api/workouts/:id` | Update a workout plan (Protected) |
| DELETE | `/api/workouts/:id` | Delete a workout plan (Protected) |

---

## **📌 Next Steps**
- **🔜 Progress Tracking** (Graphs & Stats 📈)
- **🔜 Frontend Development** (React + Redux)
- **🔜 Notifications & Reminders** (Push Notifications)

---

## **💡 Contributors**
👤 **Tarun D.** - _Developer_  
💡 **Want to contribute?** Fork the repository, make your changes, and submit a pull request! 🚀

---

## **📜 License**
This project is **open-source** and available under the **MIT License**.

---

