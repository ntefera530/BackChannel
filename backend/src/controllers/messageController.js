import pool from '../lib/db.js';

export const getMessages = async (req, res) => {
    console.log("get Messages");

    try{

        return res.status(200).json({ message: "Got Messages" });
    }
    catch(error){
        console.error("Error Getting Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}