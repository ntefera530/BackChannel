import React from 'react'

const ChatImageUploader = () => {

    const handleChatImageChange = (e) => {
        console.log("Selected image file:", e);
    } 
  return (
    <div>
        Chat Image Uploader
        <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChatImageChange(e.target.files[0])}
        />
    </div>
  )
}

export default ChatImageUploader