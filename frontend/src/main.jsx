import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserProvider } from "./contexts/UserContext.jsx";
import ChatsProvider from './contexts/ChatContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
         <ChatsProvider>   
    <BrowserRouter>
      <UserProvider>

          <App />

 
      </UserProvider>
    </BrowserRouter>
    </ChatsProvider>
  </StrictMode>,
)
