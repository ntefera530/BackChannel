import { Routes, Route, Navigate} from "react-router-dom";

import NewSignUpPage from "./NewPages/SignUpPage";
import NewLoginPage from "./NewPages/LoginPage";
import NewHomePage from "./NewPages/HomePage";

import PublicRoute from "./NewComponents/Routes/PublicRoute";
import ProtectedRoute from "./NewComponents/Routes/ProtectedRoute";


function App() {
  return (
<Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    
    <Route path="/login" element={<PublicRoute><NewLoginPage /></PublicRoute>} />
    <Route path="/signup" element={<PublicRoute><NewSignUpPage /></PublicRoute>} />
    
    <Route path="/home" element={<ProtectedRoute><NewHomePage /></ProtectedRoute>} />
    
    <Route path="*" element={<div>404 Not Found</div>} />
</Routes>
  )
}

export default App;
