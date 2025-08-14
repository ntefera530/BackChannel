import Button from '../components/Button';
import Input from '../components/Input';
import axios from 'axios';

import { useState } from 'react';
function LoginPage(){
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Here you would typically send the username and password to your backend for authentication
        console.log("Username:", username);
        console.log("Password:", password);

        try {
            const res = await axios.post('http://localhost:5001/api/v1/auth/login', {
              username,
              password
            });
            console.log('Login success:', res.data);

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);  
            }

          } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
        }

        // Reset the form fields
        setUsername("");
        setPassword("");
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    return(
        <div>
            <h1> Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChangeUsername} type="text" placeholder="Username" className="border rounded p-2 mb-2 w-full" />
                <input onChange={handleChangePassword} type="password" placeholder="Password" className="border rounded p-2 mb-2 w-full" />
                <button type="submit">Login</button>
            </form>
        </div>


    ) 
}

export default LoginPage;