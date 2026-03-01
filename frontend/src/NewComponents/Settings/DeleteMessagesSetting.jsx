import React from 'react'
import { useUser

 } from '../../contexts/UserContext';
const DeleteMessagesSetting = () => {
  const { userId, deleteAllUserMessages } = useUser();

  const handleDeleteAllMessages = () => {
    console.log('1) handle --Delete All Messages for user: ', userId);
    deleteAllUserMessages();
  }
  
  return (
    <div>
        DeleteMessagesSetting
        <button 
          className="btn btn-primary"
          onClick={handleDeleteAllMessages}
        >
            Delete All Messages
        </button>
    </div>
  )
}

export default DeleteMessagesSetting