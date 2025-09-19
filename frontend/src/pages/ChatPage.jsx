import { useEffect, useRef, useState } from 'react';
import {useUser} from '../contexts/UserContext';
import {useMessages} from '../contexts/MessageContext';
import { useContext } from 'react';

import Cookie from 'js-cookie'
import {v4 as uuidv4} from 'uuid';
import ChatMessage from '../components/ChatMessage';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userText, setUserText] = useState("");
  const wsRef = useRef(null);
  const {userId, username} = useUser(); //my User Context
  const {setSelectedChatId, selectedChatId, } = useMessages()

  useEffect(() => {
    //const token = localStorage.getItem('jwt');
    const ws = new WebSocket('ws://localhost:8080');
    wsRef.current = ws;

    //console.log("ChatPage.js UserCOntext - username -- ", username);
    //console.log("ChatPage.js UserCOntext - userId -- ", userId);
    //setCurrentUser(token);

    ws.onopen = () => console.log('Connected to WS server');
    ws.onmessage = (event) => setMessages(prev => [...prev, event.data]);
    ws.onclose = () => console.log('Disconnected from WS server');

    //return () => ws.close();
  }, [username,userId]);

  const handleChangeUserText = (event) => {
    setUserText(event.target.value);
  }

  const sendMessage = (event) => {
    event.preventDefault();
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const newUuid = uuidv4();
      const message = {
        type: 'sendMessageToUser',
        id: newUuid,
        content: userText, 
        sender_id: userId, 
        chat_id:  setSelectedChatId //"28226e7f-08d3-4712-8f3c-d5ea9ab6f01e" //TODO HARD CODED CHANGE THIS NDT
      }
      
      wsRef.current.send(JSON.stringify(message));
    }
    setUserText("");
  };

  return (
    <div className='fixed top-16 left-80 w-screen h-screen bg-gray-500'>
      <form onSubmit={sendMessage}>
        <input
          value={userText}
          onChange={handleChangeUserText}
          placeholder="Type something..."
        />        
        <div>{selectedChatId}</div>
        <button type="submit">Send</button>

      </form> 
      <div>
        <div></div>
        {messages.map((msg, i) => <ChatMessage key={i} message={msg}/>)}
      </div>
     

    </div>
  );
}