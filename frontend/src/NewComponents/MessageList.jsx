import React from 'react'
import { useEffect, useRef} from 'react';

import { useChats } from '../contexts/ChatContext';
import { useUser } from '../contexts/UserContext';

import { formatMessageTimestamp } from '../lib/utils';
import defaultUserImage from '../assets/defaultUser.jpg';

const MessageList = () => {
    const {messages, getMessagesByChatId, selectedChatId} = useChats();
    const {userId, profileImageUrl} = useUser();

    const bottomRef = useRef(null);

    useEffect(() => {
        getMessagesByChatId(selectedChatId)
    }, [selectedChatId]);

    useEffect(() => {
        requestAnimationFrame(() => {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        });    
    }, [messages]);

    return (
    <div className= "flex-1 overflow-y-auto px-4 space-y-4">
        {messages.map((message) => (
            <div
                key={message.id}
                className={`chat ${message.sender_id === userId ? "chat-end" : "chat-start"}`}
            >
                <div className="chat-image avatar">
                    <div className="size-10 rounded-full border">
                        <img
                            src={message.sender_id === userId ?  profileImageUrl || defaultUserImage : profileImageUrl || defaultUserImage}
                            alt="Profile Picture"
                        />
                    </div>
                </div>
    
                <div className= "chat-header mb-1">
                    <time className="text-xs opacity-50">
                        {formatMessageTimestamp(message.sent_at)}
                    </time>
                </div>
    
                <div className= "chat-bubble flex flex-col">
                    {message.image && (
                        <img
                            src={message.image}
                            alt="Message Attachment"
                            className="sm:max-w-[200px] rounded-md mb-2"
                        />
                    )}
                    {message.content}
                </div>
            </div>
        ))}
                    
        {/* Dummy div to scroll to bottom */}
        <div ref={bottomRef} />
    </div>
  )
}

export default MessageList