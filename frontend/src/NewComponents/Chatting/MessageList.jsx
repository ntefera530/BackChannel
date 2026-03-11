
import { useEffect, useRef} from 'react';

import { useChats } from '../../contexts/ChatContext';
import { useUser } from '../../contexts/UserContext';

import { formatMessageTimestamp } from '../../lib/utils';
import defaultUserImage from '../../assets/defaultUser.jpg';

const MessageList = () => {
    const {messages, hasMore, loadMoreMessages, participants} = useChats();
    const {userId, profileImageUrl} = useUser();

    const bottomRef = useRef(null);
    const containerRef = useRef(null);
    const shouldScrollRef = useRef(true); // ← controls whether to scroll to bottom

    // Helper to get a participant's picture
    const getParticipantImage = (senderId) => {
        if (senderId === userId) return profileImageUrl || defaultUserImage;
        const participant = participants.find(p => p.id === senderId);
        return participant?.profile_picture_url || defaultUserImage;
    }

    const handleLoadMore = () => {
        shouldScrollRef.current = false; // ← don't scroll on load more
        const container = containerRef.current;
        const scrollHeightBefore = container.scrollHeight;
    
        loadMoreMessages().then(() => {
            requestAnimationFrame(() => {
                container.scrollTop = container.scrollHeight - scrollHeightBefore;
            });
        });
    }

useEffect(() => {
    if (shouldScrollRef.current) {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    shouldScrollRef.current = true; // ← reset for next message
}, [messages]);

    return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-4 space-y-4">
        {hasMore && (
            <button onClick={handleLoadMore} className="btn btn-sm btn-ghost w-full">
                Load older messages
            </button>
        )}
        {messages.map((message) => (
            <div
                key={message.id}
                className={`chat ${message.sender_id === userId ? "chat-end" : "chat-start"}`}
            >
                <div className="chat-image avatar">
                    <div className="size-10 rounded-full border">
                        <img
                            src={getParticipantImage(message.sender_id)}
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