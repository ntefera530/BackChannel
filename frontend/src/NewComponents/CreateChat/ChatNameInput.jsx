import React from 'react'

const ChatNameInput = ({chatName, setChatName}) => {
  return (
    <div>
        <div className="font-semibold mb-2">Chat Name</div>
        <input
            type="text"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            placeholder="Enter chat name"
        />
    </div>
  )
}

export default ChatNameInput