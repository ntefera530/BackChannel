import { useEffect, useState } from 'react';
import {UserContext} from '../contexts/UserContext';
import { useContext } from 'react';


import { useFriends } from "../contexts/FriendContext";

function FriendsList() {
    const { friends, loading } = useFriends();


    return (<div>

          <div className="fixed top-16 left-0 h-screen w-40 bg-red-600 border-r p-4 overflow-y-auto">
          <h2 className="font-semibold mb-2">Friends</h2>
          <ul className="space-y-2">
            <li className="p-2 rounded hover:bg-gray-200">Alice</li>
            <li className="p-2 rounded hover:bg-gray-200">Bob</li>
            <li className="p-2 rounded hover:bg-gray-200">Charlie</li>
            <li className="p-2 rounded hover:bg-gray-200">Alice</li>
            <li className="p-2 rounded hover:bg-gray-200">Bob</li>
            <li className="p-2 rounded hover:bg-gray-200">Charlie</li>
            <li className="p-2 rounded hover:bg-gray-200">Alice</li>
            <li className="p-2 rounded hover:bg-gray-200">Bob</li>
            <li className="p-2 rounded hover:bg-gray-200">Charlie</li>
            <li className="p-2 rounded hover:bg-gray-200">Alice</li>
            <li className="p-2 rounded hover:bg-gray-200">Bob</li>
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

export default FriendsList;