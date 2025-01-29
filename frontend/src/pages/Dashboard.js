import React, { useContext, useEffect, useState } from 'react'; // Import necessary hooks and context
import { AuthContext } from '../context/AuthContext'; // Import authentication context
import API from '../api/api'; // Import API helper for making requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import LogWorkout from './LogWorkout'; // Import LogWorkout component
import { Container, Row, Col, Button, Card, Table } from 'react-bootstrap';

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
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h2 className="text-center">Welcome, {user?.name}</h2>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col className="text-center">
          <Button variant="danger" onClick={() => { logout(); navigate('/login'); }}>Logout</Button>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Your Workout Plans</Card.Title>
              {workouts.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Goal</th>
                      <th>Exercises</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workouts.map((workout) => (
                      <tr key={workout._id}>
                        <td>{workout.goal}</td>
                        <td>{workout.exercises.length} exercises</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No workout plans found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Your Progress</Card.Title>
              {progress.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Exercises Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {progress.map((entry) => (
                      <tr key={entry._id}>
                        <td>{new Date(entry.date).toLocaleDateString()}</td>
                        <td>{entry.exercises.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No progress logged yet.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <LogWorkout onWorkoutLogged={(newLog) => setProgress([...progress, newLog])} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard; // Export Dashboard component for use in routing