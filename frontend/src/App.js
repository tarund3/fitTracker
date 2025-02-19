// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; // Updated import to reflect the renamed file
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProgressPage from './pages/ProgressPage';
import LogWorkout from './pages/LogWorkout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Updated route for the new Dashboard */}
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/log-workout" element={<LogWorkout />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
