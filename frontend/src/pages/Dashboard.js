import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext); // Access user data and logout function
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]); // State to store workout plans
  const [progress, setProgress] = useState([]); // State to store workout progress

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: workoutData } = await API.get('/workouts'); // Fetch workout plans
        const { data: progressData } = await API.get('/progress'); // Fetch workout progress
        setWorkouts(workoutData);
        setProgress(progressData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>

      <button onClick={() => { logout(); navigate('/login'); }}>Logout</button>

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

export default Dashboard;
