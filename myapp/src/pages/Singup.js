
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic form validation
        if (!email || !username || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        axios.post("http://localhost:8080/signup",{username: username, email: email, password: password}).then((response) => {

            console.log(response.data.accessToken)
            localStorage.setItem('token',JSON.stringify(response.data.accessToken));
            localStorage.setItem('email',email);
            localStorage.setItem('userType',response.data.userType);

            navigate("/home");

        })

        // Simulate a successful signup process
        setSuccess('Signup successful!');
        setError('');
        
        // In a real app, you'd submit the form data to the server here
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Sign Up</h2>

                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}

                <div style={styles.inputGroup}>
                    {/* <label style={styles.label}>Email:</label> */}
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    {/* <label style={styles.label}>Username:</label> */}
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username'
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    {/* <label style={styles.label}>Password:</label> */}
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    {/* <label style={styles.label}>Confirm Password:</label> */}
                    <input 
                        type="password" 
                        value={confirmPassword}
                        placeholder='Repeat Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.button}>Sign Up</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
    },
    form: {
        padding: '0rem 2rem 2rem 2rem',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '20%'
    },
    heading: {
        marginBottom: '1rem',
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between'
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
    },
    input: {
        width: '100%',
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        width: '100%',
        padding: '0.6rem',
        backgroundColor: '#007bff',
        fontSize: "1rem",
        marginTop: "0.5rem",
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginBottom: '1rem',
        textAlign: 'center',
    },
    success: {
        color: 'green',
        marginBottom: '1rem',
        textAlign: 'center',
    },
};

export default Signup;
