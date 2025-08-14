import { Routes, Route} from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default App;
