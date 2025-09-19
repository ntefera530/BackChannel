import HeadBar from '../components/HeaderBar';
import Sidebar from '../components/SideBar';
import {useUser} from '../contexts/UserContext';
import { useContext, useEffect , useState} from 'react';
import axios from 'axios';
import FriendsList from '../components/FriendsList';
import Chatbar from '../components/ChatBar';
import ChatPage from './ChatPage';
axios.defaults.withCredentials = true;

import FriendsProvider from "../contexts/FriendContext";
import ChatsProvider from '../contexts/ChatContext';

import CreateChatPage from './CreateChatPage';

function HomePage(){
    const [friends, setFriends] = useState([]);
    const [groupChats, setGroupChats] = useState([]);
    const {username, userId} = useUser; //my User Context

    useEffect(() => {
    }, []);


    return(
       <div>
            <HeadBar/>
            <FriendsProvider>
                <FriendsList/>                
            </FriendsProvider>
            <ChatsProvider>
                <Chatbar/>
                <ChatPage/>
            </ChatsProvider>
        </div>
    ) 
}

export default HomePage;