import {useState} from 'react';
import {useUser} from '../contexts/UserContext';
import { useContext } from 'react';

function ChatMessage({message}){
    const {userId} = useUser(); //my User Context

    const object = JSON.parse(message);
    const messageText = object.content;
    const messageSender = object.sender;
    let myMessagestyle = "bg-blue-400";

    //console.log("UserID : Sender -> ", userId, messageSender);
    if(userId.toString() === messageSender.toString()){
        myMessagestyle = "bg-red-600"
    }

    console.log(message, messageSender, messageText);
    return(
        <div className={myMessagestyle}>
           <h3>{messageText}</h3>
           <h3>{messageSender}</h3> 
        </div>
    )
}

export default ChatMessage;