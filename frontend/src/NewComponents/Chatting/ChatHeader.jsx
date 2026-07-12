import { useState, useEffect } from 'react';
import { useChats } from '../../contexts/ChatContext';
import { useUser } from '../../contexts/UserContext';
import { Users } from 'lucide-react';
import defaultUserImage from '../../assets/defaultUser.jpg';
import defaultChatImage from '../../assets/defaultChat.png';
import ParticipantsModal from './ParticipantsModal';
import Avatar from '../Avatar';

const ChatHeader = () => {
    const { participants, selectedChatId, handleGetChatParticipants, groupChats, directMessages } = useChats();
    const { userId } = useUser();
    const [showParticipants, setShowParticipants] = useState(false);

    useEffect(() => {
        handleGetChatParticipants(selectedChatId);
    }, [selectedChatId]);

    const groupChat = groupChats.find(c => c.chat_id === selectedChatId);
    const isGroup = !!groupChat;
    const currentChat = groupChat || directMessages.find(c => c.chat_id === selectedChatId);
    const otherParticipants = participants.filter(p => p.id !== userId);

    if (!currentChat) return null;

    return (
        <>
        <div
            className="border-b border-primary/15 px-5 h-16 flex items-center gap-4"
            style={{
                background: 'linear-gradient(135deg, oklch(94% 0.04 290 / 0.5) 0%, oklch(97% 0.01 80) 100%)',
            }}
        >
            <Avatar
                pictureKey={currentChat.chat_picture_url}
                alt={currentChat.name}
                fallback={isGroup ? defaultChatImage : defaultUserImage}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
            />


            <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-base-content truncate">
                    {currentChat.name || otherParticipants.map(p => p.username).join(', ') || 'Chat'}
                </p>
                <p className="text-xs text-base-content/40 truncate">
                    {otherParticipants.map(p => p.username).join(', ')}
                </p>
            </div>

            {isGroup && (
                <button
                    onClick={() => setShowParticipants(true)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0
                        hover:bg-primary/10 text-base-content/40 hover:text-primary transition-colors"
                    title="Participants"
                >
                    <Users className="w-4 h-4" />
                </button>
            )}
        </div>

        {isGroup && (
            <ParticipantsModal open={showParticipants} onClose={() => setShowParticipants(false)} />
        )}
        </>
    );
};

export default ChatHeader;