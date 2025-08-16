import HeadBar from '../components/HeaderBar';
import Sidebar from '../components/SideBar';
import {UserContext} from '../contexts/UserContext';
import { useContext, useEffect , useState} from 'react';
axios.defaults.withCredentials = true;

function HomePage(){
    const [friends, setFriends] = useState([]);
    const [groupChats, setGroupChats] = useState([]);
    const {username, userId} = useContext(UserContext); //my User Context

    useEffect(() => {
        getFriends();
    }, []);

    const getFriends = async () => {
        try{
            const response = await axios.post('http://localhost:5001/api/v1/friends/me', {
                withCredentials: true
            });
            //setFriends(response.data.friends);

        }catch(error){
            console.error("Error fetching friends:", error);
        }
    }

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
            <Sidebar/>

        </div>
    ) 
}

export default HomePage;