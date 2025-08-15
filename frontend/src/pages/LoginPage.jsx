import Button from '../components/Button';
import Input from '../components/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../contexts/UserContext';

import { useState } from 'react';
import { useContext } from 'react';

function LoginPage(){
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    const {login, logout, loading} = useContext(UserContext); //my User Context

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Here you would typically send the username and password to your backend for authentication
        console.log("Username:", username);
        console.log("Password:", password);

        login(username, password)

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
                <button className="bg-green-400" type="submit">Login</button>
            </form>
            <div>
                <h1>Logout Button</h1>
                <button className="bg-orange-600" onClick={logout}> Logout</button>
            </div>
        </div>
    ) 
}

export default LoginPage;