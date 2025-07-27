
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Login.css"

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const token = localStorage.getItem('token');

    if(token) navigate("/home")

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Basic form validation
        if (email === '' || password === '') {
            setError('Both fields are required.');
            return;
        }
        
        axios.post("http://localhost:8080/authenticate", {email: email, password: password}).then((response) => {

            console.log(response.data.accessToken)

            if(response.data.accessToken != null){
                localStorage.setItem('token',response.data.accessToken);
                localStorage.setItem('username',response.data.username);
                localStorage.setItem('email',email);
                localStorage.setItem('userType',response.data.userType);
            }

            navigate("/home");
        })
        .catch(error => {
            console.log('There was an error making the request:', error);
            setError(error.response.data.status);
        });

    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit} className='form'>
                <h2 className='heading'>Login</h2>
                
                {error && <p className='error'>{error}</p>}
                
                <div className='inputGroup'>
                    <label className='label'>email:</label>
                    <input 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='input'
                    />
                </div>
                
                <div className='inputGroup'>
                    <label className='label'>Password:</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input'
                    />
                </div>
                
                <button type="submit" className='button'>Login</button>
                <a href="/signup" className='forgot'>Not registered?</a>
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
        width: '20%',
    },
    heading: {
        margin: '0.5rem 0rem 0.5rem 0rem',
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: '1rem',
        width: 'fit',
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
    },
    input: {
        // width: '100%',
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        width: '100%',
        fontSize: "1rem",
        marginTop: "0.5rem",
        padding: '0.6rem',
        backgroundColor: '#007bff',
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
    forgot: {
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'end'
    }
};

export default Login;
