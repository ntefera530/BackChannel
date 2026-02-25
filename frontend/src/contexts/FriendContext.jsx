import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;

const FriendsContext = createContext();


export default function FriendsProvider({ children }) {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        getFriends();
    }, []);
 
    const getFriends = async () => {
        setLoading(true);
        try {
          const res = await axios.get("http://localhost:5001/api/v1/friends/me");
          console.log("Friends fetched:", res.data);
          console.log(res.data)
          setFriends(res.data);
        } catch (err) {
          console.error("Error fetching friends:", err);
        } finally {
          setLoading(false);
        }
    }

    const addFriend = async (friendUsername) => {
        setLoading(true);
        console.log("Adding friend with username:", friendUsername);
        try {
          const res = await axios.post(`http://localhost:5001/api/v1/friends/me`, { friendUsername });
          const addedFriend = res.data.username;

          console.log("Friend added:", res);
          setFriends(prevFriends => [...prevFriends, { username: addedFriend }]);
        } catch (err) {
          console.error("Error fetching friends:", err);
        } finally {
          setLoading(false);
        }
    }

    const deleteFriend = async (friendUsername) => {
        setLoading(true);
        try {
          const res = await axios.delete(`http://localhost:5001/api/v1/friends/me`,
          { 
            data: { friendUsername }
          });
          console.log("Friend deleted:", res);    
          const deletedFriend = res.data.username;
          setFriends(prevFriends => prevFriends.filter(friend => friend.username !== deletedFriend));
          
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