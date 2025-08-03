import bcrypt from "bcrypt";
import pool from '../DB/db.js';

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

   // Encrypt Password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   console.log("Hashed Password:", hashedPassword);

   //Generate JWT Token


   //Store User in DB
    try {
        // Inserting data
        await pool.query('INSERT INTO "Users" (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
  
        const user = await pool.query('SELECT * FROM "Users"');
        console.log('Users:', user.rows);
  
    } 
    catch (err) {
      console.error('DB connection error:', err);
    }


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