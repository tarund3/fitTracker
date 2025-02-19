// UserPage.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Table, Form } from 'react-bootstrap';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [workouts, setWorkouts] = useState([]);
  const [progress, setProgress] = useState([]);
  const [newWorkout, setNewWorkout] = useState({ goal: '', exercises: '' });
  const [newProgress, setNewProgress] = useState({ weight: '', bodyFat: '', strength: '' });

  // Redirect to login if no user is found
  useEffect(() => {
    if (!user) {
      navigate('/login'); // If not logged in, redirect to login page
    }
  }, [user, navigate]);

  // Fetch workout and progress data
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🔄 Fetching updated progress from backend...");
        const { data: workoutData } = await API.get('/workouts');
        const { data: progressData } = await API.get('/progress');
        console.log("✅ Progress Data Received:", progressData);
        setWorkouts(workoutData);
        setProgress(progressData);
      } catch (error) {
        console.error('❌ Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // Ensure useEffect runs when component mounts

  // Handle create workout
  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/workouts', newWorkout);
      setWorkouts([...workouts, response.data]);
      setNewWorkout({ goal: '', exercises: '' });
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  // Handle log progress
  const handleLogProgress = async (e) => {
    e.preventDefault();
    try {
      console.log("🛠 Sending progress data:", newProgress);
      const response = await API.post('/progress', newProgress);
      console.log("✅ Progress logged successfully:", response.data);

      // Update state immediately to reflect new progress
      setProgress((prevProgress) => [...prevProgress, response.data]);
      setNewProgress({ weight: '', bodyFat: '', strength: '' });

    } catch (error) {
      console.error('❌ Error logging progress:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  // Handle navigation to the ProgressPage
  const navigateToProgressPage = () => {
    navigate('/progress'); // Navigate to the progress page
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
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>

      {/* Workout Plans */}
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
                        <td>{workout.exercises}</td>
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

        {/* Progress Tracking */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Your Progress</Card.Title>
              {progress.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Weight</th>
                      <th>Body Fat %</th>
                      <th>Strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    {progress.map((entry) => (
                      <tr key={entry._id}>
                        <td>{new Date(entry.date).toLocaleDateString()}</td>
                        <td>{entry.weight} lbs</td>
                        <td>{entry.bodyFat}%</td>
                        <td>{entry.strength}</td>
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

      {/* Create Workout Form */}
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Create a Workout</Card.Title>
              <Form onSubmit={handleCreateWorkout}>
                <Form.Group className="mb-2">
                  <Form.Label>Goal</Form.Label>
                  <Form.Control
                    type="text"
                    value={newWorkout.goal}
                    onChange={(e) => setNewWorkout({ ...newWorkout, goal: e.target.value })}
                    placeholder="E.g. Build Muscle, Lose Fat"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Exercises (comma-separated)</Form.Label>
                  <Form.Control
                    type="text"
                    value={newWorkout.exercises}
                    onChange={(e) => setNewWorkout({ ...newWorkout, exercises: e.target.value })}
                    placeholder="E.g. Squats, Bench Press, Deadlifts"
                  />
                </Form.Group>
                <Button type="submit" variant="primary">Save Workout</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Log Progress Form */}
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Log Your Fitness Progress</Card.Title>
              <Form onSubmit={handleLogProgress}>
                <Form.Group className="mb-2">
                  <Form.Label>Weight (lbs)</Form.Label>
                  <Form.Control
                    type="number"
                    value={newProgress.weight}
                    onChange={(e) => setNewProgress({ ...newProgress, weight: e.target.value })}
                    placeholder="E.g. 175"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Body Fat %</Form.Label>
                  <Form.Control
                    type="number"
                    value={newProgress.bodyFat}
                    onChange={(e) => setNewProgress({ ...newProgress, bodyFat: e.target.value })}
                    placeholder="E.g. 15%"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Strength Progress</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProgress.strength}
                    onChange={(e) => setNewProgress({ ...newProgress, strength: e.target.value })}
                    placeholder="E.g. Bench Press 200lbs"
                  />
                </Form.Group>
                <Button type="submit" variant="success">Log Progress</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant='primary' onClick={navigateToProgressPage}>
            View Progress
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
