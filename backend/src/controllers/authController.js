import bcrypt from "bcryptjs";
import { createJWT } from '../lib/utils.js';
import * as userRepo from "../models/userModel.js"

export const signup = async (req, res) => {
    try {

        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        if (username.length < 3 || password.length < 6) {
            return res.status(400).json({ message: "Username must be at least 3 characters and password at least 6 characters" });
        }

        let result = await userRepo.getUserProfileByUsername(username);

        if(!result){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await userRepo.createUserProfile(username, hashedPassword);
            const userId = newUser[0].id;
            

            createJWT(username,userId,res);
            return res.status(200).json({ message: "New User Created", username, userId });
        }
        else {
            return res.status(400).json({ message: "That username already exists" });
        }
        
    } 
    catch (error) {
        console.log("Error Signing Up User: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try{ 
        
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).json({ message: "Username and Password required" });
        }

        const user = await userRepo.getUserProfileByUsername(username);

        if (!user) {
            return res.status(404).json({ message: "No user with that username" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({ message: "Username or Password is Incorrect" });
        }

        const userId = user.id;
        createJWT(username, userId, res);   

        return res.status(200).json({ username, userId });
        
    }catch(error){
        console.log("error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const authenticate = async (req, res) => {
    try {
        const authUser = {
            username: req.user.username, 
            userId: req.user.userId,
        }

		return res.status(200).json({authUser});

	} catch (error) {
		console.log("Error in Auth controller", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};