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
        console.log("Username: ", username, ", Password: ", password);

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
        <div className="flex min-h-screen items-center justify-center bg-pink-400">
            <div className=" bg-gray-500 p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center text-white"> Login Page</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="text-2xl font-bold text-center text-white">Username</label>
                        <input onChange={handleChangeUsername} type="text" placeholder="Username" value={username} className="bg-gray-800 border rounded p-2 mb-2 w-full text-white"  />
                    </div>
                    <div>
                        <label className="text-2xl font-bold text-center text-white"> Password</label>
                        <input onChange={handleChangePassword} type="password" placeholder="Password" value={password} className=" bg-gray-800 border rounded p-2 mb-2 w-full text-white" />
                    </div>
                    <button className="bg-purple-800 text-white" type="submit">Login</button>
                </form>
            </div>
            

        </div>
    ) 
}

export default LoginPage;