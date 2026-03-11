import { createContext, useContext, useState, useEffect } from "react";
import * as friendApi from '../api/friendApi';

const FriendsContext = createContext();

export default function FriendsProvider({ children }) {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        handleGetFriends();
    }, []);

    const handleGetFriends = async () => {
      setLoading(true);
      try {
        const response = await friendApi.getFriends();
        console.log("Friends fetched:", response.data);
        setFriends(response.data);
      } catch (err) {
        console.error("Error fetching friends:", err);
      } finally {
        setLoading(false);
      }
    }

    const handleAddFriend = async (friendUsername) => {
      setLoading(true);
      console.log("Adding friend with username:", friendUsername);
      try {
        const response = await friendApi.addFriend(friendUsername);
        const addedFriend = response.data.username;

        setFriends(prevFriends => [...prevFriends, { username: addedFriend }]);
      } catch (err) {
        console.error("Error fetching friends:", err);
      } finally {
        setLoading(false);
      }
    }
    const handleDeleteFriend = async (friendUsername) => {
      setLoading(true);
      try {
        const response = await friendApi.deleteFriend(friendUsername);
        console.log("Friend deleted:", response);    
        const deletedFriend = response.data.username;
        setFriends(prevFriends => prevFriends.filter(friend => friend.username !== deletedFriend));
        
      } catch (err) {
        console.error("Error fetching friends:", err);
      } finally {
        setLoading(false);
      }
    }
  
    return (
      <FriendsContext.Provider value={{ friends, loading,
                                        handleGetFriends, handleAddFriend, handleDeleteFriend }}>
        {children}
      </FriendsContext.Provider>
    );
  }
  
// Custom hook (named export)
export function useFriends() {
  return useContext(FriendsContext);
}