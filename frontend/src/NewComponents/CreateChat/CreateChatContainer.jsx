import React , {useState} from 'react'
import ChatNameInput from './ChatNameInput';
import ChatImageUploader from './ChatImageUploader';
import AddParticipants from './AddParticipants';
import CreateChatHeader from './CreateChatHeader';

const CreateChatContainer = () => {
    const [chatName, setChatName] = useState('');
    const [participants, setParticipants] = useState([]);

  return (
    <div>
        <CreateChatHeader />
        <ChatImageUploader />
        <ChatNameInput chatName={chatName} setChatName={setChatName} />
        <AddParticipants participants={participants} setParticipants={setParticipants} />
        <div className="button-container mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Chat</button>
        </div>
    </div>
  )
}

export default CreateChatContainer