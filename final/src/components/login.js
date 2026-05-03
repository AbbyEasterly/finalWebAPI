import React, { useState } from 'react';
import { submitLogin } from '../actions/authActions';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


function Login() {
  const [details, setDetails] = useState({
    username: '',
    password: '',
  });
  const Nav = useNavigate();

  const dispatch = useDispatch();

  const updateDetails = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  

  const login = (event) => {
    event.preventDefault();
    dispatch(submitLogin(details)).then(() => {
      Nav('/home');
    }).catch((e) => {
      console.error('Login failed:', e);
    });
  };

	return (
    <div style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <card style={{ width: '30%', justifyContent: 'center', margin: '50px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border : '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
        <div style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom : '20px' }}>
      <h2>Login</h2>
      <p1 style={{ marginBottom: '20px', color: '#555' }}>Welcome back! Please enter your credentials to log in.</p1>
      <Form onSubmit={login} style  = {{justifyContent:'center', width : '80%' }}>
        <Form.Group controlId="nameInput" style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', fontSize: '16px' }}>
          <Form.Label style={{ fontWeight: 'bold' }}>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={details.username}
            onChange={updateDetails}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" style={{ display: 'flex', flexDirection: 'column', fontSize: '16px' }}>
          <Form.Label style={{ fontWeight: 'bold', justifyContent: 'center' }}>Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={details.password}
            onChange={updateDetails}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ cursor: 'pointer', marginLeft: '65px', marginTop: '20px', width: '70%', color: '#fff', backgroundColor: '#232f91', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', padding: '5px', border: 'none' }}>
          Login
        </Button>
        
      </Form>
      <p2 style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>Don't have an account? <a href="/register" style={{ color: '#007bff' }}>Register here</a>.</p2>
      
      </div>
      </card>
    </div>
	);
}

export default Login;