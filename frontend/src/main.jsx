import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import UserProvider from "./contexts/UserContext.jsx";
import ChatsProvider from './contexts/ChatContext.jsx';
import FriendsProvider from './contexts/FriendContext.jsx'
import WebSocketProvider from './contexts/WebSocketContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>   
      <UserProvider>
        <WebSocketProvider>
          <FriendsProvider>
            <ChatsProvider>   
              <App />   
            </ChatsProvider>
          </FriendsProvider>   
        </WebSocketProvider>
      </UserProvider>
    </BrowserRouter>   
)

