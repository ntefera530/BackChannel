import {UserContext} from '../contexts/UserContext';
import { useContext } from 'react';

function HomePage(){
    const {username, userId} = useContext(UserContext); //my User Context
    return(
       <div>
            <div>
                This is the homepage -- you have been authenticated
                <h1>UserName: {username}</h1> 
                <h1>UserId: {userId}</h1> 
            </div>
        </div>
    ) 
}

export default HomePage;