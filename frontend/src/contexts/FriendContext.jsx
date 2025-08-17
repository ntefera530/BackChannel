import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const FriendsContext = createContext();


export default function FriendsProvider({ children }) {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        //might need to creat the function inside useEffect?
        //getFriends();
    }, []);
 
    const getFriends = async (friendId) => {
        setLoading(true);
        try {
          const res = await axios.get("http://localhost:5001/api/v1/friends/me");
          const data = await res.json();
          setFriends(data);
        } catch (err) {
          console.error("Error fetching friends:", err);
        } finally {
          setLoading(false);
        }
    }

    const addFriend = async (friendId) => {
        setLoading(true);
        try {
          const res = await axios.post("http://localhost:5001/api/v1/friends/me/:friendId");
          const data = await res.json();
          setFriends(data);
        } catch (err) {
          console.error("Error fetching friends:", err);
        } finally {
          setLoading(false);
        }
    }

    const deleteFriend = async (friendId) => {
        setLoading(true);
        try {
          const res = await axios.delete("http://localhost:5001/api/v1/friends/me/:friendId");
          const data = await res.json();
          setFriends(data);
        } catch (err) {
          console.error("Error fetching friends:", err);
        } finally {
          setLoading(false);
        }
    }
  
    return (
      <FriendsContext.Provider value={{ friends, getFriends, addFriend, deleteFriend, loading }}>
        {children}
      </FriendsContext.Provider>
    );
  }
  
  // Custom hook (named export)
  export function useFriends() {
    return useContext(FriendsContext);
  }