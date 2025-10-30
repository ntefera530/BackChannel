import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import UserProvider from "./contexts/UserContext.jsx";
import ChatsProvider from './contexts/ChatContext.jsx'
import MessageProvider from './contexts/MessageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>        
    <MessageProvider>
      <ChatsProvider>   
        <BrowserRouter>
          <UserProvider>
            <App />    
          </UserProvider>
        </BrowserRouter>
      </ChatsProvider>        
    </MessageProvider>
  </StrictMode>,
)
