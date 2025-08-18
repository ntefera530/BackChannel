import { Routes, Route} from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import FrontPage from "./Pages/FrontPage";
import FriendPage from "./Pages/FriendPage";
import HomePage from "./Pages/HomePage";
import SettingsPage from "./Pages/SettingsPage";
import CreateChatPage from "./Pages/CreateChatPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/friend" element={<FriendPage/>} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/createChat" element={<CreateChatPage />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default App;
