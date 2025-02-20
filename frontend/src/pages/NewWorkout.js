import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Table, Form } from 'react-bootstrap';

const NewWorkout = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // State for storing workouts
    const [workouts, setWorkouts] = useState([]);
    const [newWorkout, setNewWorkout] = useState({
        title: '',
        goal: '',
        exercises: []
    });

    // State for new exercise input
    const [exercise, setExercise] = useState({ name: '', sets: 0, reps: 0 });

    // State for editing an existing workout
    const [editExercise, setEditExercise] = useState(null);

    // Fetch workouts when component mounts
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const { data } = await API.get('/workouts');
                setWorkouts(data);
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };
        fetchWorkouts();
    }, []);

    // Handle input change for workout details
    const handleWorkoutChange = (e) => {
        setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value });
    };

    // Handle input change for exercise details
    const handleExerciseChange = (e) => {
        setExercise({ ...exercise, [e.target.name]: e.target.value });
    };

    // Add exercise to the workout
    const handleAddExercise = () => {
        setNewWorkout({
            ...newWorkout,
            exercises: [...newWorkout.exercises, exercise]
        });
        setExercise({ name: '', sets: 0, reps: 0 }); // Reset fields
    };

    // Save new workout
    const handleSaveWorkout = async () => {
        try {
            const response = await API.post('/workouts', newWorkout);
            setWorkouts([...workouts, response.data]); // Update UI
            setNewWorkout({ title: '', goal: '', exercises: [] }); // Reset form
        } catch (error) {
            console.error('Error saving workout:', error);
        }
    };

    // Edit an existing workout
    const handleEdit = (workout) => {
        setEditExercise(workout);
    };

    // Save edited workout
    const handleSaveEdit = async (id) => {
        try {
            const response = await API.put(`/workout/${id}`, editExercise);
            setWorkouts(workouts.map(w => w._id === id ? response.data : w)); // Update UI
            setEditExercise(null);
        } catch (error) {
            console.error('Error updating workout:', error);
        }
    };

    return (
        <Container className="mt-4">
            <Button variant="secondary" onClick={() => navigate('/')}>
                ← Back to Dashboard
            </Button>

            <Row className="mb-4">
                <Col>
                    <h2 className="text-center">Create a New Workout</h2>
                </Col>
            </Row>

            {/* Workout Form */}
            <Row>
                <Col md={12}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-2">
                                    <Form.Label>Workout Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={newWorkout.title}
                                        onChange={handleWorkoutChange}
                                        placeholder="e.g. Upper Body Strength"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Workout Goal</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="goal"
                                        value={newWorkout.goal}
                                        onChange={handleWorkoutChange}
                                        placeholder="e.g. Build muscle, Fat loss"
                                    />
                                </Form.Group>

                                <h5>Add Exercises</h5>
                                <Form.Group className="mb-2">
                                    <Form.Label>Exercise Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={exercise.name}
                                        onChange={handleExerciseChange}
                                        placeholder="e.g. Bench Press"
                                    />
                                </Form.Group>

                                <Row>
                                    <Col>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Sets</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="sets"
                                                value={exercise.sets}
                                                onChange={handleExerciseChange}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Reps</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="reps"
                                                value={exercise.reps}
                                                onChange={handleExerciseChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button variant="secondary" onClick={handleAddExercise} className="me-2">
                                    Add Exercise
                                </Button>
                                <Button variant="primary" onClick={handleSaveWorkout}>
                                    Save Workout
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Previous Workouts */}
            <Row>
                <Col md={12}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Previous Workouts</Card.Title>
                            {workouts.length > 0 ? (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Goal</th>
                                            <th>Exercises</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {workouts.map((workout) => (
                                            <tr key={workout._id}>
                                                <td>{workout.title}</td>
                                                <td>{workout.goal}</td>
                                                <td>
                                                    {workout.exercises.map((ex, idx) => (
                                                        <div key={idx}>
                                                            {ex.name} - {ex.sets} sets x {ex.reps} reps
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    <Button variant="warning" size="sm" onClick={() => handleEdit(workout)}>
                                                        Edit
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <p>No previous workouts found.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default NewWorkout;
