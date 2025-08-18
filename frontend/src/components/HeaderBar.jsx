import {UserContext} from '../contexts/UserContext';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function HeaderBar() {
  const navigate = useNavigate();

    const {login, logout, loading} = useContext(UserContext); //my User Context
  return (
      <header className="fixed top-0 left-0 right-0 h-16 bg-blue-600 text-white px-6 flex items-center justify-between shadow-md z-50">
        <h1 className="text-xl font-bold">My App</h1>
        <nav className="space-x-4">
          <button>Profile</button>
          <button onClick={() => navigate("/settings")}>Settings</button>
          <button onClick={() => navigate("/friend")}>Friends</button>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
    );
}

export default HeaderBar;