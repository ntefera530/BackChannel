import { useEffect, useRef, useState } from 'react';
import {UserContext} from '../contexts/UserContext';
import { useContext } from 'react';

import Cookie from 'js-cookie'

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const wsRef = useRef(null);
  const {userId, username} = useContext(UserContext); //my User Context


  useEffect(() => {
    //const token = localStorage.getItem('jwt');
    const ws = new WebSocket('ws://localhost:8080');
    wsRef.current = ws;

    console.log("ChatPage.js UserCOntext - username -- ", username);
    console.log("ChatPage.js UserCOntext - userId -- ", userId);
    //setCurrentUser(token);

    ws.onopen = () => console.log('Connected to WS server');
    ws.onmessage = (event) => setMessages(prev => [...prev, event.data]);
    ws.onclose = () => console.log('Disconnected from WS server');

    //return () => ws.close();
  }, [username,userId]);

  const sendMessage = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {

      const message = {
        type: 'sendMessageToUser',
        content: input, 
        sender_id: userId, 
        chat_id: 4 
      }
      
      wsRef.current.send(JSON.stringify(message));
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, i) => <div key={i}>{msg}</div>)}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}