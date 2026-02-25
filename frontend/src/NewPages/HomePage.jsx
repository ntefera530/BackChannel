import {useState} from 'react';
import { useChats } from '../contexts/ChatContext';
import Sidebar from '../NewComponents/SideBar';
import NoChatSelected from '../NewComponents/NoChatSelected';
import ChatContainer from '../NewComponents/ChatContainer';
import FriendsContainer  from '../NewComponents/FriendsContainer';
import SettingsContainer from '../NewComponents/SettingsContainer';

const HomePage = () => {
    const { selectedChatId } = useChats();
    const [selectedView, setSelectedView] = useState();

    const renderContent = () => {
        if(selectedView === 'friends') return <FriendsContainer/>;
        if(selectedView === 'settings') return <SettingsContainer/>;
        
        if(!selectedChatId) return <NoChatSelected/>;
        return <ChatContainer/>;
    }

    return (
        <div className="h-screen bg-base-200">
            <div className=" flex items-center justify-center pt-20 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar setSelectedView={setSelectedView}/>
                        {renderContent()}
                    </div>

                </div>
            </div> 
        </div>
    );

};

export default HomePage;
