import { useState } from 'react';
import { useChats } from '../contexts/ChatContext';
import Sidebar from '../NewComponents/SideBar';
import NoChatSelected from '../NewComponents/NoChatSelected';
import ChatContainer from '../NewComponents/Chatting/ChatContainer';
import FriendsContainer from '../NewComponents/Friends/FriendsContainer';
import SettingsContainer from '../NewComponents/Settings/SettingsContainer';
import CreateChatContainer from '../NewComponents/CreateChat/CreateChatContainer';

const HomePage = () => {
    const { selectedChatId } = useChats();
    const [selectedView, setSelectedView] = useState();

    const renderContent = () => {
        if (selectedView === 'friends') return <FriendsContainer />;
        if (selectedView === 'settings') return <SettingsContainer />;
        if (selectedView === 'createChat') return <CreateChatContainer />;
        if (!selectedChatId) return <NoChatSelected />;
        return <ChatContainer />;
    };

    return (
        <div
            className="h-screen flex items-center justify-center px-4"
            style={{
                backgroundImage: `
                    radial-gradient(ellipse at 15% 50%, oklch(80% 0.08 290 / 0.25) 0%, transparent 50%),
                    radial-gradient(ellipse at 85% 20%, oklch(80% 0.08 290 / 0.2) 0%, transparent 45%),
                    radial-gradient(ellipse at 60% 90%, oklch(80% 0.06 290 / 0.15) 0%, transparent 40%)
                `,
                backgroundColor: 'oklch(95% 0.01 80)',
            }}
        >
            <div
                className="bg-base-100 rounded-2xl w-full max-w-6xl overflow-hidden"
                style={{
                    height: 'calc(100vh - 4rem)',
                    boxShadow: '0 8px 40px oklch(48% 0.18 290 / 0.12), 0 2px 8px oklch(0% 0 0 / 0.06)',
                }}
            >
                <div className="flex h-full rounded-2xl overflow-hidden">
                    <Sidebar setSelectedView={setSelectedView} />
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default HomePage;