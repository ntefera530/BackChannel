import bcrypt from "bcryptjs";
import pool from '../lib/db.js';
import { createJWT } from '../lib/utils.js';
import {createUserProfileQuery, getUserProfileByIdQuery, getUserProfileByUsernameQuery} from "../models/authModel.js"

export const signup = async (req, res) => {
    try {
        
        console.log("Signup controller called");
        const { username, password } = req.body;

        //Check for valid Username and Password;
        if(!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        if (username.length < 3 || password.length < 6) {
            return res.status(400).json({ message: "Username must be at least 3 characters and password at least 6 characters" });
        }

        // Encrypt Password
         const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

    
            let result = getUserProfileQuery(username);
        
            if (result.rows.length > 0) {
                // User already exists, return error
                return res.status(400).json({ error: "That username already exists" });
            } 
            else {
                //Inserting data
            
                //TODO Fix this timing issue please
                createUserProfileQuery(username, hashedPassword);
                const newUser = getUserProfileByUsernameQuery(username);
                const userId = result.rows[0].id;
                console.log(userId);
                createJWT(username,userId,res);
                return res.status(200).json({ message: "New User Created" });
            }
    } 
    catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
   
    try{ 
        console.log("Login controller called");
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).json({ error: "Username and Password required" });
        }

        const result = getUserProfileByUsernameQuery(username);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No user with that username" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, result.rows[0].password);
        const userId = result.rows[0].id;

        if(!isPasswordCorrect){
            return res.status(404).json({ error: "Username or Password is Incorect" });
        }

        createJWT(username, userId, res);   

        return  res.status(200).json({ username: username, });
        
    }catch(error){
        console.log("error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    console.log("Logout controller called");

    try {
        //Clear All Cookies
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};