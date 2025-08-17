import HeadBar from '../components/HeaderBar';
import Sidebar from '../components/SideBar';
import {UserContext} from '../contexts/UserContext';
import { useContext, useEffect , useState} from 'react';
import axios from 'axios';
import FriendsList from '../components/FriendsList';
import Chatbar from '../components/ChatBar';
import ChatPage from './ChatPage';
axios.defaults.withCredentials = true;

import FriendsProvider from "../contexts/FriendContext";

function HomePage(){
    const [friends, setFriends] = useState([]);
    const [groupChats, setGroupChats] = useState([]);
    const {username, userId} = useContext(UserContext); //my User Context

    useEffect(() => {
    }, []);


    const getGroupChats = async () => {
        try{
            const response = await axios.post('http://localhost:5001/api/v1/chats/me', {
                withCredentials: true
            });
            //setFriends(response.data.friends);

        }catch(error){
            console.error("Error fetching friends:", error);
        }
    }


    return(
       <div>
            <HeadBar/>
            <FriendsProvider>
                <FriendsList/>                
            </FriendsProvider>

            <Chatbar/>
            <ChatPage/>
        </div>
    ) 
}

export default HomePage;