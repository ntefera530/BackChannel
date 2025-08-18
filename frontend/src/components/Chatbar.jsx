import { useEffect, useState } from 'react';
import {UserContext} from '../contexts/UserContext';
import { useContext } from 'react';

import { useChats } from '../contexts/ChatContext';

function Chatbar() {
    const { chats, loading } = useChats();

    const renderChats = chats.map((chat) => {
      return <li className="p-2 rounded hover:bg-gray-200">{chat.name}</li>;
    });
    return (<div>

        <div className="fixed top-16 left-40 w-40 h-screen bg-green-600 border-r p-4 overflow-y-auto">
        <h2 className="font-semibold mb-2">Friends</h2>
        <ul className="space-y-2">
          {renderChats}
          <li className="p-2 rounded hover:bg-gray-200">Charlie</li>
          <li className="p-2 rounded hover:bg-gray-200">Alice</li>
          <li className="p-2 rounded hover:bg-gray-200">Bob</li>
          <li className="p-2 rounded hover:bg-gray-200">Charlie</li>
          <li className="p-2 rounded hover:bg-gray-200">Alice</li>
          <li className="p-2 rounded hover:bg-gray-200">Bob</li>
          <li className="p-2 rounded hover:bg-gray-200">Charlie</li>
        </ul>
      </div>
        </div>
      
    );
}

export default Chatbar;