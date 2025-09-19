import {useUser} from '../contexts/UserContext';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

function FriendPage(){
    const [friends, setFriends] = useState([]);
    const [friendsUsername, setFriendsUserName] = useState("");
    const {username, userId} = useUser(); //my User Context

    const handleAddFriendSubmit = async (event) => {
        event.preventDefault();
        try{
            console.log(friendsUsername);
            const response = await axios.post(`http://localhost:5001/api/v1/friends/me/${friendsUsername}`);
            console.log(response.data);
            return response.status(200);
        }
        catch(error){
            console.log("error in Adding Friends on Friends Page");
            return { success: false, error: error};
        }
    }

    const handleDeleteFriendSubmit = async (event) => {
        event.preventDefault();
        try{
            console.log(friendsUsername);
            const response = await axios.delete(`http://localhost:5001/api/v1/friends/me/${friendsUsername}`);
            console.log(response.data);
            return response.status(200);
        }
        catch(error){
            console.log("error in Deleting Friends on Friends Page");
            return { success: false, error: error};
        }
    }

    const handleChangeFriendsUsername = (event) => {
        setFriendsUserName(event.target.value);
    }



    const getFreindsList = async() => {
        try{
            const response = await axios.get("http://localhost:5001/api/v1/friends/me");
            console.log(response.data);
            return response.status(200);

        }
        catch(error){
            console.log("error in get All Friends on Friends Page");
            return { success: false, error: error};
        }
    }

    return(
       <div>
            <div className="bg-gray-400">
                This is the Friends Page -- you have been authenticated
                <h1>UserName: {username}</h1> 
                <h1>UserId: {userId}</h1> 
            </div>
            <div className="bg-purple-500">
                <h1>Get all Friends</h1>
                <button className="bg-amber-100" onClick={getFreindsList}>Get All Friends</button>
            </div>
            <form onSubmit={handleAddFriendSubmit} className="bg-green-200">
                <h1>Add Friends</h1>
                <input onChange={handleChangeFriendsUsername} type="text" placeholder= " Friends Username" className="border rounded p-2 mb-2 w-full" />
                <button className="bg-green-400" type="submit">Add Friends</button>
            </form>
            <form onSubmit={handleDeleteFriendSubmit} className="bg-red-400">
                <h1>Delete Friends</h1>
                <input onChange={handleChangeFriendsUsername} type="text" placeholder= " Friends Username" className="border rounded p-2 mb-2 w-full" />
                <button className="bg-green-400" type="submit">Delete Friends</button>
            </form>
        </div>
    ) 
}

export default FriendPage;