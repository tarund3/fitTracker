# FitTracker

## Overview
FitTracker is a full-stack web application that creates personalized workout plans based on user goals, health metrics, and preferences. The application leverages the **MERN stack** (MongoDB, Express.js, React, Node.js) to provide a dynamic, responsive, and intuitive user experience across multiple devices.

## Features
### ✅ **Authentication System**
- Users can **register** and **log in** securely.
- Uses **JWT authentication** for secure sessions.
- Passwords are **hashed** before storing in the database.
<img width="1321" alt="Screen Shot 2025-03-09 at 12 08 19 PM" src="https://github.com/user-attachments/assets/a1ca1e24-7677-442b-847e-2e549e6f9bfd" />

### ✅ **User Profiles**
- Users can **create and update their workouts**.
- Stores personal details like **age, weight, height**.
- Users can track **progress over time**.
<img width="1469" alt="Screen Shot 2025-03-09 at 12 09 13 PM" src="https://github.com/user-attachments/assets/f675dc78-a805-4cbf-a08f-4d072f193614" />


### ✅ **Progress Tracking**
- Logs **completed workouts**.
- Displays progress using **charts and analytics**.
<img width="1470" alt="Screen Shot 2025-03-09 at 12 09 32 PM" src="https://github.com/user-attachments/assets/c1505889-97af-48fd-9d29-4b4fe81d97db" />


## Tech Stack
### **Frontend**
- React (React Router for navigation)
- Context API for state management
- Axios for API calls

### **Backend**
- Node.js & Express.js (REST API)
- MongoDB (Database)
- Mongoose (ODM for MongoDB)
- bcrypt.js for password hashing
- JSON Web Tokens (JWT) for authentication

## Setup Instructions
### **1️⃣ Clone the repository**
```bash
git clone https://github.com/YourGitHubUsername/fitTracker.git
cd fitTracker
```

### **2️⃣ Install dependencies**
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd frontend
npm install
```

### **3️⃣ Configure environment variables**
Create a **.env** file in the `backend/` directory and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5002
```

### **4️⃣ Start the application**
#### Run the backend:
```bash
cd backend
npm run dev
```
#### Run the frontend:
```bash
cd frontend
npm start
```

## API Routes
### **Authentication**
- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Authenticate user and return a JWT token

### **User Profile**
- `GET /api/profile` → Fetch user profile
- `PUT /api/profile/update` → Update user profile

### **Workout Management**
- `GET /api/workouts` → Fetch workouts
- `POST /api/workouts/add` → Add a workout
- `PUT /api/workouts/update/:id` → Update a workout
- `DELETE /api/workouts/delete/:id` → Delete a workout

## Deployment
- **Frontend:** Vercel / Netlify
- **Backend:** Heroku / Render / AWS

## Contributors
- **Tarun Damodaran** - Creator & Developer

## Next Steps
- 📌 **Integrate notifications & reminders**
- 📌 **Implement AI-based workout recommendations**
- 📌 **Add social sharing features**

🚀 **FitTracker is in active development. Contributions are welcome!**
