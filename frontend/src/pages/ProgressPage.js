import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Row, Col, Button, Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { AuthContext } from '../context/AuthContext';

const ProgressPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [progress, setProgress] = useState([]);
  const [editEntry, setEditEntry] = useState(null);
  const [editData, setEditData] = useState({ weight: '', bodyFat: '', strength: '' });

  // Fetch user's progress data from the backend
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data } = await API.get('/progress');
        setProgress(data);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };
    fetchProgress();
  }, []);

  // Generate weight progress chart data
  const weightData = {
    labels: progress.map((entry) => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Weight (lbs)',
        data: progress.map((entry) => entry.weight || 0), // Handle missing data
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      },
    ],
  };

  // Generate body fat percentage chart data
  const bodyFatData = {
    labels: progress.map((entry) => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Body Fat Percentage (%)',
        data: progress.map((entry) => entry.bodyFat || 0), // Handle missing data
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true
      },
    ],
  };

  // Handle edit action
  const handleEdit = (entry) => {
    setEditEntry(entry._id);
    setEditData({ weight: entry.weight, bodyFat: entry.bodyFat, strength: entry.strength });
  };

  // Handle save action
  const handleSave = async (id) => {
    try {
      const response = await API.put(`/progress/${id}`, editData);
      setProgress(progress.map((item) => (item._id === id ? response.data : item)));
      setEditEntry(null);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await API.delete(`/progress/${id}`);
      setProgress(progress.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Error deleting progress:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Button variant="secondary" onClick={() => navigate('/')}>
        ← Back to Dashboard
      </Button>

      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Your Fitness Progress</h2>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Weight Progress</Card.Title>
              {progress.length > 0 ? <Line data={weightData} /> : <p>No data available.</p>}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Body Fat Percentage Progress</Card.Title>
              {progress.length > 0 ? <Line data={bodyFatData} /> : <p>No data available.</p>}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Table to View, Edit, and Delete Progress */}
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Progress Log</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Weight (lbs)</th>
                    <th>Body Fat (%)</th>
                    <th>Strength</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {progress.map((entry) => (
                    <tr key={entry._id}>
                      <td>{new Date(entry.date).toLocaleDateString()}</td>
                      <td>
                        {editEntry === entry._id ? (
                          <Form.Control
                            type="number"
                            value={editData.weight}
                            onChange={(e) => setEditData({ ...editData, weight: e.target.value })}
                          />
                        ) : (
                          entry.weight
                        )}
                      </td>
                      <td>
                        {editEntry === entry._id ? (
                          <Form.Control
                            type="number"
                            value={editData.bodyFat}
                            onChange={(e) => setEditData({ ...editData, bodyFat: e.target.value })}
                          />
                        ) : (
                          entry.bodyFat
                        )}
                      </td>
                      <td>
                        {editEntry === entry._id ? (
                          <Form.Control
                            type="text"
                            value={editData.strength}
                            onChange={(e) => setEditData({ ...editData, strength: e.target.value })}
                          />
                        ) : (
                          entry.strength
                        )}
                      </td>
                      <td>
                        {editEntry === entry._id ? (
                          <>
                            <Button variant="success" size="sm" onClick={() => handleSave(entry._id)}>
                              Save
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => setEditEntry(null)} className="ms-2">
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="warning" size="sm" onClick={() => handleEdit(entry)}>
                              Edit
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(entry._id)} className="ms-2">
                              Delete
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProgressPage;
