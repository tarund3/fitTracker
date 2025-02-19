// Login.js
import React, { useState, useContext, useEffect } from 'react'; 
import { AuthContext } from '../context/AuthContext'; // Import AuthContext to access login function
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap'; // Import Bootstrap components for layout and styling

const Login = () => {
  const { login, user } = useContext(AuthContext); // Extract login function and user from AuthContext
  const [email, setEmail] = useState(''); // State to store user email input
  const [password, setPassword] = useState(''); // State to store user password input
  const navigate = useNavigate(); // Hook to handle navigation

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard'); // If the user is already logged in, redirect to Dashboard
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    await login(email, password); // Call login function with user input
    navigate('/dashboard'); // Redirect to dashboard after successful login
  };

  return (
    <Container className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <Row className="w-full">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="bg-gray-800 text-white shadow-lg rounded-3 p-8">
            <Card.Body>
              <h2 className="text-center text-4xl font-semibold mb-6">Sign In</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="text-lg">Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="bg-gray-700 text-white border-2 border-gray-600 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </Form.Group>

                <Form.Group className="mb-6">
                  <Form.Label className="text-lg">Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="bg-gray-700 text-white border-2 border-gray-600 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-full py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  Login
                </Button>
              </Form>
              <div className="mt-4 text-center">
                <p className="text-gray-300">Don't have an account? <a href="/signup" className="text-blue-400 hover:underline">Sign up</a></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
