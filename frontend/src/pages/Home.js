import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">FitTracker</Navbar.Brand>
          <Nav className="ms-auto">
            <Button
              variant="outline-light"
              className="me-2"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="text-center mt-5">
        <h1>Welcome to FitTracker</h1>
        <p>
          Your personalized workout planner to help you reach your fitness goals.
        </p>
        <Button
          variant="success"
          size="lg"
          onClick={() => navigate('/signup')}
        >
          Get Started
        </Button>
      </Container>
    </>
  );
};

export default Home;
