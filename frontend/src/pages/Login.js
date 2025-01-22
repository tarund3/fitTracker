import React, { useState, useContext } from 'react'; // Import React, useState for form handling, and useContext to access authentication context
import { AuthContext } from '../context/AuthContext'; // Import AuthContext to access login function
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

const Login = () => {
  const { login } = useContext(AuthContext); // Extract login function from AuthContext
  const [email, setEmail] = useState(''); // State to store user email input
  const [password, setPassword] = useState(''); // State to store user password input
  const navigate = useNavigate(); // Hook to handle navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    await login(email, password); // Call login function with user input
    navigate('/dashboard'); // Redirect to dashboard after successful login
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}> {/* Form submission handled by handleSubmit function */}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} // Update state on input change
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} // Update state on input change
          required 
        />
        <button type="submit">Login</button> {/* Submit button triggers handleSubmit */}
      </form>
    </div>
  );
};

export default Login; // Export Login component for use in routing

