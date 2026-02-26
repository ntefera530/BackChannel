import React from 'react'
import { useEffect } from 'react';


import { useChats } from '../../contexts/ChatContext';
import { useUser } from '../../contexts/UserContext';

import MessageInput from './MessageInput';
import defaultUserImage from '../../assets/defaultUser.jpg';


const ChatHeader = () => {
  const {participants, selectedChatId, getChatParticipantsByChatId } = useChats();

  useEffect(() => {
    getChatParticipantsByChatId(selectedChatId);
  }, [selectedChatId]);

  return (
    <div className="border-b border-base-300 w-full p-3 overflow-x-auto">
      <div className="flex gap-8">
        {participants.map((participant) => (
            <div 
              key={participant.username} 
              className="flex items-center gap-2"
            >
              <div className="size-10 rounded-full border">
                <img 
                  src={participant.profile_picture_url || defaultUserImage} 
                  alt="Profile Picture" 
                  className="w-10 h-10 rounded-full object-cover" 
                />
              </div>

              <div className="font-semibold">
                {participant.username}
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default ChatHeader