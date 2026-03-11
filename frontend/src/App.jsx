import { Routes, Route} from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import FriendPage from "./Pages/FriendPage";
import SettingsPage from "./Pages/SettingsPage";
import CreateChatPage from "./Pages/CreateChatPage";

import NewSignUpPage from "./NewPages/SignUpPage";
import NewLoginPage from "./NewPages/LoginPage";
import NewHomePage from "./NewPages/HomePage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<NewSignUpPage/>} />
      <Route path="/login-v2" element={<NewSignUpPage />} />



      <Route path="/login" element={<NewLoginPage />} />
      <Route path="/signup" element={<NewSignUpPage/>} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/friend" element={<FriendPage/>} />
      <Route path="/home" element={<NewHomePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/createChat" element={<CreateChatPage />} />
      <Route path="*" element={<div>404 Not Found</div>} />
      
    </Routes>
  )
}

export default App;
