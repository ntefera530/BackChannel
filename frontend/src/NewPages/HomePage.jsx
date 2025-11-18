import {useState} from 'react';
import { useChats } from '../contexts/ChatContext';
import Sidebar from '../NewComponents/SideBar';
import NoChatSelected from '../NewComponents/NoChatSelected';
import ChatContainer from '../NewComponents/ChatContainer';

const HomePage = () => {
    const { selectedChatId } = useChats();

    return (
        <div className="h-screen bg-base-200">
            <div className=" flex items-center justify-center pt-20 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar />
                        {!selectedChatId ? <NoChatSelected /> : <ChatContainer />} 
                    </div>

                </div>
            </div> 
        </div>
    );

};

export default HomePage;
