import { Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/signup" element={<SignUpPage/>} />
    </Routes>
  )
}

export default App;
