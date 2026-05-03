import React, { useState } from 'react';
import { submitRegister } from '../actions/authActions';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [details, setDetails] = useState({
        username: '',
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateDetails = (event) => {
        setDetails({
          ...details,
            [event.target.id]: event.target.value
        });
    };

    const register = async (e) => {
        e && e.preventDefault();
        try {
            await dispatch(submitRegister(details));
            navigate('/home');
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    return (
        <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <card style = {{ width: '30%', justifyContent: 'center', margin: '50px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border : '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
           <div style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom : '20px' }}>
            <h2>Register</h2>
            <p1 style={{ marginBottom: '20px', color: '#555' }}>Create a new account to start using the Flashcard App!</p1> 
            <Form onSubmit={register} style  = {{justifyContent:'center', width : '80%' }}>
                <Form.Group controlId="username" style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', fontSize: '16px' }}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={updateDetails} value={details.username} type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group controlId="email" style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', fontSize: '16px' }}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={updateDetails} value={details.email} type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group controlId="password" style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', fontSize: '16px' }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={updateDetails} value={details.password} autoComplete="current-password" type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ cursor: 'pointer', marginLeft: '65px', marginTop: '20px', width: '70%', color: '#fff', backgroundColor: '#232f91', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', padding: '5px', border: 'none' }}>
                    Register
                </Button>
            </Form>
            <p2 style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>Already have an account? <a href="/login" style={{ color: '#007bff' }}>Login here</a>.</p2>
            </div>
            </card>
        </div>
    );
}

export default Register;