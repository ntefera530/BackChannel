import { useState } from 'react';
import { useChats } from '../contexts/ChatContext';
import { useUser } from '../contexts/UserContext';
import { Settings, ContactRound, BadgePlus, Trash2 } from 'lucide-react';
import defaultChatImage from '../assets/defaultChat.png';
import defaultUserImage from '../assets/defaultUser.jpg';

const SideBar = ({ setSelectedView }) => {
    const { chats, selectedChatId, setSelectedChatId } = useChats();
    const { username, profileImageUrl } = useUser();
    const [onlineUsers] = useState([]);

    const handleSettingsClick = () => { setSelectedChatId(null); setSelectedView('settings'); };
    const handleFriendsClick = () => { setSelectedChatId(null); setSelectedView('friends'); };
    const handleCreateChatClick = () => { setSelectedChatId(null); setSelectedView('createChat'); };
    const handleViewChatClick = (chatId) => { setSelectedView(null); setSelectedChatId(chatId); };
    const handleDeleteChatClick = (e, chatId) => { e.stopPropagation(); console.log("Delete chat:", chatId); };

    return (
        <aside
            className="h-full w-20 lg:w-72 flex flex-col transition-all duration-200 border-r border-primary/10"
            style={{
                background: 'linear-gradient(180deg, oklch(93% 0.04 290 / 0.4) 0%, oklch(96% 0.02 290 / 0.2) 50%, oklch(95% 0.01 80) 100%)',
            }}
        >
            {/* Header */}
            <div className="px-4 py-4 border-b border-primary/10 flex items-center justify-between">
                <span
                    className="hidden lg:block text-lg font-semibold text-base-content tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    BackChannel
                </span>
                <button
                    onClick={handleCreateChatClick}
                    className="flex items-center justify-center w-8 h-8 rounded-lg 
                        bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                    title="New chat"
                >
                    <BadgePlus className="w-4 h-4" />
                </button>
            </div>

            {/* Section label */}
            <div className="hidden lg:block px-4 pt-4 pb-1">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-base-content/30">
                    Chats
                </span>
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto py-1 px-2">
                {chats.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                        <p className="text-xs text-base-content/40 leading-relaxed">
                            No chats yet.<br />Create one to get started.
                        </p>
                    </div>
                ) : (
                    chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => handleViewChatClick(chat.chat_id)}
                            className={`
                                group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
                                transition-all duration-150 mb-0.5
                                ${selectedChatId === chat.chat_id
                                    ? 'bg-primary/15 shadow-sm shadow-primary/10'
                                    : 'hover:bg-white/50'}
                            `}
                        >
                            {/* Avatar */}
                            <div className="relative flex-shrink-0">
                                <img
                                    src={chat.chat_picture_url || defaultChatImage}
                                    alt={chat.name}
                                    className={`w-10 h-10 rounded-full object-cover mx-auto lg:mx-0
                                        transition-all duration-150
                                        ${selectedChatId === chat.chat_id
                                            ? 'ring-2 ring-primary/40'
                                            : 'ring-1 ring-base-300'}`}
                                />
                                {onlineUsers.includes(chat.id) && (
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full ring-2 ring-base-100" />
                                )}
                            </div>

                            {/* Name */}
                            <div className="flex-1 min-w-0 hidden lg:block">
                                <p className={`text-sm font-medium truncate transition-colors
                                    ${selectedChatId === chat.chat_id ? 'text-primary' : 'text-base-content'}`}>
                                    {chat.name}
                                </p>
                            </div>

                            {/* Delete */}
                            <button
                                onClick={(e) => handleDeleteChatClick(e, chat.id)}
                                className="hidden lg:flex opacity-0 group-hover:opacity-100 w-6 h-6
                                    items-center justify-center rounded-lg hover:bg-error/10 
                                    text-base-content/20 hover:text-error transition-all flex-shrink-0"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* User footer */}
            <div
                className="border-t border-primary/10 px-3 py-3"
                style={{ background: 'oklch(93% 0.04 290 / 0.3)' }}
            >
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                        <img
                            src={profileImageUrl || defaultUserImage}
                            alt="Your avatar"
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
                        />
                    </div>

                    <div className="flex-1 hidden lg:block min-w-0">
                        <p className="text-sm font-medium text-base-content truncate">{username}</p>
                        <p className="text-xs text-base-content/40">Online</p>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                            onClick={handleFriendsClick}
                            className="w-8 h-8 flex items-center justify-center rounded-lg
                                hover:bg-primary/10 text-base-content/40 hover:text-primary transition-colors"
                            title="Friends"
                        >
                            <ContactRound className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleSettingsClick}
                            className="w-8 h-8 flex items-center justify-center rounded-lg
                                hover:bg-primary/10 text-base-content/40 hover:text-primary transition-colors"
                            title="Settings"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;