import bcrypt from "bcryptjs";
import pool from '../lib/db.js';
import { createJWT } from '../lib/utils.js';

export const signup = async (req, res) => {
   console.log("Signup controller called");
   const { username, password } = req.body;
   //Check for valid Username and Password;
   if(!username || !password) {
       return res.status(400).json({ message: "Username and password are required" });
   }
   if (username.length < 3 || password.length < 6) {
       return res.status(400).json({ message: "Username must be at least 3 characters and password at least 6 characters" });
   }

    //TODO Check if user already exists, return error if it does
    //If not, create a new user

    try {
        const result = await pool.query('SELECT id FROM "Users" WHERE  username = $1 AND password = $2', [username, password]);

        if (result.rows.length > 0) {
            // User exists, return error
            return res.status(500).json({ error: "That username already exists" });
        } 
        else {
            //Inserting data
            await pool.query('INSERT INTO "Users" (username, password) VALUES ($1, $2) RETURNING *', [username, password]);

            return null; // No user found
        }
    } 
    catch (err) {
      console.error('DB connection error:', err);
    }

    //Create JWT Token od new user after successful signup




   // Encrypt Password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   console.log("Hashed Password:", hashedPassword);

   //Generate JWT Token
    //const token = createJWT(username, hashedPassword);


   //Store User in DB
    // try {
    //     // Inserting data
    //     await pool.query('INSERT INTO "Users" (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
  
    //     const user = await pool.query('SELECT * FROM "Users"');
    //     console.log('Users:', user.rows);
  
    // } 
    // catch (err) {
    //   console.error('DB connection error:', err);
    // }


   console.log("Request body:", req.body);
   return res.status(200).json({ message: "sign up endpoint" });
};

export const login = async (req, res) => {
    console.log("Login controller called");
    const { username, password } = req.body;

    console.log("Request body:", username, password);
    return  res.status(200).json({ message: "login endpoint" });
};

export const logout = async (req, res) => {
    console.log("Logout controller called");
    return  res.status(200).json({ message: "logout endpoint" });
};