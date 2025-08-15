import { useState } from "react";
import axios from 'axios'
function SignUpPage(){
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Here you would typically send the username and password to your backend for authentication
        console.log("Username:", username);
        console.log("Password:", password);

        try {
            const response = await axios.post('http://localhost:5001/api/v1/auth/signup', {
              username,
              password
            });
            console.log('Signup success:', response.data);

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);  
            }

          } catch (err) {
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