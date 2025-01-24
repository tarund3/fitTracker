import React, { useContext, useEffect, useState } from 'react'; // Import necessary hooks and context
import { AuthContext } from '../context/AuthContext'; // Import authentication context
import API from '../api/api'; // Import API helper for making requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import LogWorkout from './LogWorkout'; // Import LogWorkout component

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext); // Access user authentication data
  const navigate = useNavigate(); // Hook to handle navigation
  const [workouts, setWorkouts] = useState([]); // State to store workout plans
  const [progress, setProgress] = useState([]); // State to store workout progress

  // Fetch user's workouts and progress when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: workoutData } = await API.get('/workouts'); // Fetch workout plans from backend
        const { data: progressData } = await API.get('/progress'); // Fetch progress logs from backend
        setWorkouts(workoutData);
        setProgress(progressData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Function to update progress when a new workout is logged
  const handleWorkoutLogged = (newLog) => {
    setProgress([...progress, newLog]); // Append new workout log to progress state
  };

  return (
    <div>
      <h2>Welcome, {user?.name}</h2> {/* Display user's name */}

      {/* Logout button */}
      <button onClick={() => { logout(); navigate('/login'); }}>Logout</button>

      {/* Component to log a completed workout */}
      <LogWorkout onWorkoutLogged={handleWorkoutLogged} />

      <h3>Your Workout Plans</h3>
      {workouts.length > 0 ? (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id}>
              <strong>{workout.goal}</strong> - {workout.exercises.length} exercises
            </li>
          ))}
        </ul>
      ) : <p>No workout plans found.</p>}

      <h3>Your Progress</h3>
      {progress.length > 0 ? (
        <ul>
          {progress.map((entry) => (
            <li key={entry._id}>
              {new Date(entry.date).toLocaleDateString()} - {entry.exercises.length} exercises completed
            </li>
          ))}
        </ul>
      ) : <p>No progress logged yet.</p>}
    </div>
  );
};

export default Dashboard; // Export Dashboard component for use in routing