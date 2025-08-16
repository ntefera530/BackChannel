import { useState } from "react";
import axios from 'axios'

import { useContext } from 'react';
import {UserContext} from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function SignUpPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {signup} = useContext(UserContext); //my User Context
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        //console.log("Username: ", username, ", Password: ", password);

        signup(username, password);

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
                <h1 className="text-2xl font-bold text-center text-white"> SignUp Page</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="text-2xl font-bold text-center text-white">Username</label>
                        <input onChange={handleChangeUsername} type="text" placeholder="Username" value={username} className="bg-gray-800 border rounded p-2 mb-2 w-full text-white"  />
                    </div>
                    <div>
                        <label className="text-2xl font-bold text-center text-white"> Password</label>
                        <input onChange={handleChangePassword} type="password" placeholder="Password" value={password} className=" bg-gray-800 border rounded p-2 mb-2 w-full text-white" />
                    </div>
                    <button className="bg-purple-800 text-white" type="submit">SignUp</button>
                </form>
                <button className="bg-blue-800 text-white" onClick={goToLogin}>Go to Login</button>
            </div>
        </div>
    )
}

export default SignUpPage;