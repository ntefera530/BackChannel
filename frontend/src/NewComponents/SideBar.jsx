import { useState } from 'react';
import { useChats } from '../contexts/ChatContext';
import { useUser } from '../contexts/UserContext';
import { User, Settings, ContactRound, BadgePlus } from 'lucide-react';
import defaultChatImage from '../assets/defaultChat.png';
import defaultUserImage from '../assets/defaultUser.jpg';

const SideBar = ({setSelectedView}) => {
    const { chats, selectedChatId, setSelectedChatId, } = useChats();
    const {userId,username, downloadProfilePicture, uploadProfilePicture, profileImageUrl} = useUser();
    const [onlineUsers, setOnlineUsers] = useState([]);

    const handleSettingsClick = () => {
        setSelectedChatId(null);
        setSelectedView('settings');
    }

    const handleFriendsClick = () => {
        setSelectedChatId(null);
        setSelectedView('friends');
    }

    const handleCreateChatClick = () => {
        setSelectedChatId(null);
        setSelectedView('createChat');
    }

    const handleViewChatClick = (chatId) => {
        setSelectedView(null);
        setSelectedChatId(chatId);
    }

    return (
        <aside className='h-full w-20 lg:w-72 border-r boarder-base-300 flex flex-col transition-all duration-200'>
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <User className="w-6 h-6"/>
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
                    <button
                        onClick={handleCreateChatClick}
                        className={`
                            w-full p-3 flex items-center gap-3 
                            hover:bg-base-300 transition-colors 

                        `}
                    >

                    <BadgePlus className="w-6 h-6"/>
                    <span className="font-medium hidden lg:block">Create Chat</span>

                    </button>                
                {chats.map((chat) => (
                    <button
                        key={chat.id}
                        onClick={() => handleViewChatClick(chat.chat_id)}
                        className={`
                            w-full p-3 flex items-center gap-3 
                            hover:bg-base-300 transition-colors 
                            ${selectedChatId === chat.chat_id ? "bg-base-300 ring-1 ring-base-300" : ""}
                        `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={chat.chat_picture_url || defaultChatImage}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            {onlineUsers.includes(chat.id) && (
                                <span 
                                    className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                                    rounded-full ring-2 ring-zinc-900"
                                />
                            )}
                        </div>

                        <div className="flex-1 text-left hidden lg:block">
                            <p className="font-medium">{chat.name}</p>
                        </div>


                    </button>
                ))}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => uploadProfilePicture(e.target.files[0])}
                            />

            </div>

            
            <div className="mt-auto border-t border-base-300">
                <div
                    //onClick={() => setSelectedChatId(chat.chat_id)}
                    className={`
                            w-full p-3 flex items-center gap-3  
                    `}
                >
                    <div className="relative mx-auto lg:mx-0">
                        <img
                            src={profileImageUrl || defaultUserImage}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>

                    <div className="flex-1 text-left hidden lg:block">
                        <p className="font-medium">{username}</p>
                    </div>

                    <button
                        onClick={handleSettingsClick}
                        className={`
                            hover:bg-base-300 transition-colors 
                        `}
                    >
                        <Settings className="w-8 h-8"/>
                    </button>

                    <button
                        onClick={handleFriendsClick}
                        className={`
                            hover:bg-base-300 transition-colors 
                        `}
                    >
                        <ContactRound className="w-8 h-8"/>
                    </button>
                    
                    
                </div>
                


            </div>

        </aside>
    );
}
export default SideBar;