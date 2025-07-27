
import { useState } from 'react';
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
        
        axios.post(`${process.env.REACT_APP_API_URL}/authenticate`, {email: email, password: password}).then((response) => {

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

export default Login;
