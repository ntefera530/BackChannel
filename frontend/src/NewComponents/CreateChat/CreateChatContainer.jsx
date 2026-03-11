import { useState } from 'react';
import { useChats } from '../../contexts/ChatContext';
import ChatNameInput from './ChatNameInput';
import ChatImageUploader from './ChatImageUploader';
import AddParticipants from './AddParticipants';
import CreateChatHeader from './CreateChatHeader';

const CreateChatContainer = () => {
    const [chatName, setChatName] = useState('');
    const [participants, setParticipants] = useState([]);
    const [chatImage, setChatImage] = useState(null);
    const { handleCreateGroupChat } = useChats();

    const handleCreateChat = () => {
        if (!chatName.trim()) return;
        handleCreateGroupChat(chatName, participants, chatImage);
    };

    const isValid = chatName.trim().length > 0;

    return (
        <div className="flex-1 flex flex-col overflow-auto bg-base-100">
            <CreateChatHeader />

            <div className="flex-1 overflow-y-auto">
                <ChatImageUploader onImageChange={setChatImage} />
                <ChatNameInput chatName={chatName} setChatName={setChatName} />
                <AddParticipants participants={participants} setParticipants={setParticipants} />
            </div>

            {/* Footer */}
            <div className="border-t border-base-300 px-6 py-4">
                <button
                    onClick={handleCreateChat}
                    disabled={!isValid}
                    className="btn btn-primary w-full"
                >
                    Create Chat
                </button>
            </div>
        </div>
    );
};

export default CreateChatContainer;