import bcrypt from "bcryptjs";
import { createJWT } from '../lib/utils.js';
import * as userRepo from "../models/userModel.js"

export const signup = async (req, res) => {
    console.log("Signup controller called");
    try {

        const { username, password } = req.body;

        // Validate Input
        if(!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        if (username.length < 3 || password.length < 6) {
            return res.status(400).json({ message: "Username must be at least 3 characters and password at least 6 characters" });
        }

        // Encrypt Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let result = await userRepo.getUserProfileByUsernameQuery(username);

        //If undefined, no user found
        if(!result){
            const newUser = await userRepo.createUserProfileQuery(username, hashedPassword);
            const userId = newUser[0].id;
            createJWT(username,userId,res);   
        }
        else {
            return res.status(400).json({ error: "That username already exists" });
        }

        //TODO send the new user without password? 
        return res.status(200).json({ message: "New User Created" });
    } 
    catch (error) {
        console.log("error in signup controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
   console.log("Login controller called");
    try{ 
        
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).json({ error: "Username and Password required" });
        }

        const user = await userRepo.getUserProfileByUsernameQuery(username);

        if (!user || user.length === 0) {
            return res.status(404).json({ error: "No user with that username" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(404).json({ error: "Username or Password is Incorect" });
        }

        const userId = user.id;
        createJWT(username, userId, res);   

        return res.status(200).json({ 
            username: username,
            userId: userId 
        });
        
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

export const authenticate = async (req, res) => {
    console.log("Auth controller called");

    try {
        //Get User
        const authUser = {
            username: req.user.username, 
            userId: req.user.userId,
        }

		return res.status(200).json({authUser});

	} catch (error) {
		console.log("Error in Auth controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};