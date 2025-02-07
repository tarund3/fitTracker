import React, { useState } from 'react';
import { Card, Form, Button, Table } from 'react-bootstrap';
import API from '../api/api'; // Ensure correct path to API

const CreateWorkout = ({ onWorkoutCreated }) => {
  const [newWorkout, setNewWorkout] = useState({ title: '', exercises: [] });
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseWeight, setExerciseWeight] = useState('');

  const handleAddExercise = () => {
    if (exerciseName && exerciseWeight) {
      setNewWorkout({
        ...newWorkout,
        exercises: [...newWorkout.exercises, { name: exerciseName, weight: exerciseWeight }],
      });
      setExerciseName('');
      setExerciseWeight('');
    }
  };

  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    if (newWorkout.title && newWorkout.exercises.length > 0) {
      try {
        const { data } = await API.post('/workouts', newWorkout); // Save to DB
        onWorkoutCreated(data);
        setNewWorkout({ title: '', exercises: [] }); // Reset form
      } catch (error) {
        console.error('Error saving workout:', error);
      }
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Create a Workout Plan</Card.Title>
        <Form onSubmit={handleCreateWorkout}>
          <Form.Group className="mb-2">
            <Form.Label>Workout Title</Form.Label>
            <Form.Control
              type="text"
              value={newWorkout.title}
              onChange={(e) => setNewWorkout({ ...newWorkout, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Exercise Name</Form.Label>
            <Form.Control
              type="text"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Weight (lbs)</Form.Label>
            <Form.Control
              type="number"
              value={exerciseWeight}
              onChange={(e) => setExerciseWeight(e.target.value)}
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleAddExercise}>
            Add Exercise
          </Button>
          <Button className="ms-2" type="submit" variant="primary">
            Save Workout
          </Button>
        </Form>

        {newWorkout.exercises.length > 0 && (
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Weight (lbs)</th>
              </tr>
            </thead>
            <tbody>
              {newWorkout.exercises.map((exercise, index) => (
                <tr key={index}>
                  <td>{exercise.name}</td>
                  <td>{exercise.weight}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default CreateWorkout;
