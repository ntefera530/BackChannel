import { useEffect } from 'react';
import { useChats } from '../../contexts/ChatContext';
import { useUser } from '../../contexts/UserContext';
import defaultUserImage from '../../assets/defaultUser.jpg';
import defaultChatImage from '../../assets/defaultChat.png';

const ChatHeader = () => {
    const { participants, selectedChatId, handleGetChatParticipants, groupChats, directMessages } = useChats();
    const { userId } = useUser();

    useEffect(() => {
        handleGetChatParticipants(selectedChatId);
    }, [selectedChatId]);

    const groupChat = groupChats.find(c => c.chat_id === selectedChatId);
    const isGroup = !!groupChat;
    const currentChat = groupChat || directMessages.find(c => c.chat_id === selectedChatId);
    const otherParticipants = participants.filter(p => p.id !== userId);

    if (!currentChat) return null;

    return (
        <div
            className="border-b border-primary/15 px-5 h-16 flex items-center gap-4"
            style={{
                background: 'linear-gradient(135deg, oklch(94% 0.04 290 / 0.5) 0%, oklch(97% 0.01 80) 100%)',
            }}
        >
            <img
                src={currentChat.chat_picture_url || (isGroup ? defaultChatImage : defaultUserImage)}
                alt={currentChat.name}
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
        </div>
    );
};

export default ChatHeader;

// import { useEffect } from 'react';
// import { useChats } from '../../contexts/ChatContext';
// import { useUser } from '../../contexts/UserContext';
// import defaultUserImage from '../../assets/defaultUser.jpg';

// const ChatHeader = () => {
//     const { participants, selectedChatId, handleGetChatParticipants, groupChats, directMessages } = useChats();
//     const { userId } = useUser();

//     useEffect(() => {
//         handleGetChatParticipants(selectedChatId);
//     }, [selectedChatId]);

//     const currentChat = groupChats.find(c => c.chat_id === selectedChatId) || directMessages.find(c => c.chat_id === selectedChatId);
//     const otherParticipants = participants.filter(p => p.id !== userId);

//     return (
//         <div
//             className="border-b border-primary/15 px-5 py-3 flex items-center gap-4"
//             style={{
//                 background: 'linear-gradient(135deg, oklch(94% 0.04 290 / 0.5) 0%, oklch(97% 0.01 80) 100%)',
//             }}
//         >
//             {/* Stacked avatars */}
//             <div className="flex -space-x-2 flex-shrink-0">
//                 {otherParticipants.slice(0, 3).map((p) => (
//                     <img
//                         key={p.id}
//                         src={p.profile_picture_url || defaultUserImage}
//                         alt={p.username}
//                         className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
//                         title={p.username}
//                     />
//                 ))}
//                 {otherParticipants.length > 3 && (
//                     <div className="w-9 h-9 rounded-full bg-primary/20 ring-2 ring-white
//                         flex items-center justify-center text-xs font-medium text-primary">
//                         +{otherParticipants.length - 3}
//                     </div>
//                 )}
//             </div>

//             {/* Name + subtitle */}
//             <div className="flex-1 min-w-0">
//                 <p className="font-semibold text-sm text-base-content truncate">
//                     {currentChat?.name ||
//                         otherParticipants.map(p => p.username).join(', ') ||
//                         'Chat'}
//                 </p>
//                 <p className="text-xs text-base-content/40 truncate">
//                     {otherParticipants.map(p => p.username).join(', ')}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default ChatHeader;