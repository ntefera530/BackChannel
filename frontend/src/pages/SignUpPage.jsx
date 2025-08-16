import { useState } from "react";
import axios from 'axios'

import { useContext } from 'react';

function SignUpPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {signup} = useContext(UserContext); //my User Context

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Here you would typically send the username and password to your backend for authentication
        console.log("Username: ", username, ", Password: ", password);

        try {
            signup(username, password);
        } 
        catch (err) {
            console.error('Signup error:', err.response?.data || err.message);
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
            <h1> Signup Page</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChangeUsername} type="text" placeholder="Username" className="border rounded p-2 mb-2 w-full" />
                <input onChange={handleChangePassword} type="password" placeholder="Password" className="border rounded p-2 mb-2 w-full" />
                <button type="submit">SignUp</button>
            </form>
        </div>
    )
}

export default SignUpPage;