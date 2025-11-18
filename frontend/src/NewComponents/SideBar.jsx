import { useState } from 'react';
import { useChats } from '../contexts/ChatContext';
import { User } from 'lucide-react';
const SideBar = () => {
    const { chats, selectedChatId, setSelectedChatId} = useChats();
    const [onlineUsers, setOnlineUsers] = useState([]);

    return (
        <aside className='h-full w-20 lg:w-72 border-r boarder-base-300 flex flex-col transition-all duration-200'>
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <User className="w-6 h-6"/>
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
                {chats.map((chat) => (
                    <button
                        key={chat.id}
                        onClick={() => setSelectedChatId(chat.chat_id)}
                        className={`
                            w-full p-3 flex items-center gap-3 
                            hover:bg-base-300 transition-colors 
                            ${selectedChatId === chat.chat_id ? "bg-base-300 ring-1 ring-base-300" : ""}
                        `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={"../assets/defaultUser.jpg"}
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
                        
                    </button>
                ))}
            </div>
        </aside>
    );
}
export default SideBar;