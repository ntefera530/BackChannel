import Button from '../components/Button';
import Input from '../components/Input';
import { useState } from 'react';
function LoginPage(){
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the username and password to your backend for authentication
        console.log("Username:", username);
        console.log("Password:", password);
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