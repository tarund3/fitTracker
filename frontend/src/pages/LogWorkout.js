import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/api';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';


const LogWorkout = ({ onWorkoutLogged }) => {
    const { user } = useContext(AuthContext); // accesses user from AuthContext.js
    const [workouts, setWorkouts] = useState([]); // stores workout plans
    const [selectedWorkout, setSelectedWorkout] = useState(null) // stores selected workout
    const [logData, setLogData] = useState([]) // stores workout data inputted by user

    // Fetch user workouts
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const { data } = await API.get('/workouts');
                setWorkouts(data)
            } catch (error) {
                console.error("Error fetching workouts", error);
            }
        };
        fetchWorkouts();
    }, []);

    // Handles workout selection
    const handleWorkoutSelect = (workoutID) => {
        const workout = workouts.find(w => w._id === workoutID);
        setSelectedWorkout(workout);
        setLogData(workout.exercises.map(ex => ({
            name: ex.name,
            setsCompleted: 0,
            repsCompleted: 0,
            duration: 0
        })));
    };

    // Handles user input for sets, reps, duration
    // index - pos of item in logData
    // field - prop changing
    // value - new value
    const handleInputChange = (index, field, value) => {
        const updatedLog = [...logData];
        updatedLog[index][field] = value;
        setLogData(updatedLog);
    };

    // Handles workout logging submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedWorkout) return alert('Please select a workout');

        try {
            const { data } = await API.post('/progress', {
                workout: selectedWorkout._id,
                exercises: logData,
            });

            onWorkoutLogged(data)
            alert('Workout logged successfully');
            setSelectedWorkout(null);

        } catch (error) {
            console.error('Error logging workout:', error);
        }
    };

    return (
        <Container>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Log a Completed Workout</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Workout</Form.Label>
                  <Form.Select onChange={(e) => handleWorkoutSelect(e.target.value)} value={selectedWorkout?._id || ''}>
                    <option value="" disabled>Select a workout</option>
                    {workouts.map((workout) => (
                      <option key={workout._id} value={workout._id}>{workout.goal}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
    
                {selectedWorkout && logData.map((exercise, index) => (
                  <Row key={index} className="mb-3">
                    <Col>
                      <Form.Label>{exercise.name}</Form.Label>
                      <Form.Control type="number" placeholder="Sets" value={exercise.setsCompleted}
                        onChange={(e) => handleInputChange(index, 'setsCompleted', Number(e.target.value))} />
                    </Col>
                    <Col>
                      <Form.Control type="number" placeholder="Reps" value={exercise.repsCompleted}
                        onChange={(e) => handleInputChange(index, 'repsCompleted', Number(e.target.value))} />
                    </Col>
                    <Col>
                      <Form.Control type="number" placeholder="Duration (seconds)" value={exercise.duration}
                        onChange={(e) => handleInputChange(index, 'duration', Number(e.target.value))} />
                    </Col>
                  </Row>
                ))}
    
                {selectedWorkout && <Button variant="primary" type="submit">Log Workout</Button>}
              </Form>
            </Card.Body>
          </Card>
        </Container>
      );
};

export default LogWorkout;