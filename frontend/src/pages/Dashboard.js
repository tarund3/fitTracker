import React, { useContext, useEffect, useState } from 'react'; // Import necessary hooks and context
import { AuthContext } from '../context/AuthContext'; // Import authentication context
import API from '../api/api'; // Import API helper for making requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import LogWorkout from '../pages/LogWorkout'; // Import LogWorkout component
import CreateWorkout from '../components/CreateWorkout'; // Import CreateWorkout component
import { Container, Row, Col, Button, Card, Table } from 'react-bootstrap';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext); // Access user authentication data
  const navigate = useNavigate(); // Hook to handle navigation
  const [workouts, setWorkouts] = useState([]); // State to store workout plans
  const [progress, setProgress] = useState([]); // State to store workout progress
  const [recommendedWorkouts, setRecommendedWorkouts] = useState([]); // State to store workout recommendations

  // Fetch user's workouts, progress, and recommendations when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: workoutData } = await API.get('/workouts'); // Fetch workout plans from backend
        const { data: progressData } = await API.get('/progress'); // Fetch progress logs from backend
        setWorkouts(workoutData);
        setProgress(progressData);

        // Fetch workout recommendations based on user's fitness goals
        const { data: recommendationData } = await API.get('/workout/recommendations', {
          params: {
            fitnessGoal: 'muscle gain', // Replace with actual user preference
            experienceLevel: 'beginner',
            workoutType: 'full body'
          }
        });
        setRecommendedWorkouts(recommendationData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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
                      <th>Title</th>
                      <th>Goal</th>
                      <th>Exercises</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workouts.map((workout) => (
                      <tr key={workout._id}>
                        <td>{workout.title}</td>
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

      {/* Create a Workout Plan Section */}
      <Row>
        <Col md={12}>
          <CreateWorkout onWorkoutCreated={(newWorkout) => setWorkouts([...workouts, newWorkout])} />
        </Col>
      </Row>

      {/* Recommended Workouts Section */}
      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Recommended Workouts</Card.Title>
              {recommendedWorkouts.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Body Part</th>
                      <th>Equipment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendedWorkouts.map((workout, index) => (
                      <tr key={index}>
                        <td>{workout.name}</td>
                        <td>{workout.bodyPart}</td>
                        <td>{workout.equipment}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No recommendations available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Log a Completed Workout Section */}
      <Row>
        <Col>
          <LogWorkout onWorkoutLogged={(newLog) => setProgress([...progress, newLog])} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard; // Export Dashboard component for use in routing
