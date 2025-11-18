import React from 'react'
import { useState, useRef } from 'react'
import { useChats } from '../contexts/ChatContext';
import { X , Image, Send} from 'lucide-react';

const MessageInput = () => {
    const [text, setText] = useState("")
    const [imagePreview, setImagePreview] = useState(null)

    const { sendMessage } = useChats();

    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {};

    const removeImage = (e) => {};

    const handleSendMessage = async(e) => {
        e.preventDefault();
        sendMessage(text);
        setText("");
    }; 

    return (
        <div className= "p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img 
                            src={imagePreview}
                            alt="Preview"
                            className= "w-20 h-20 object-cover rounded-lg border border-zing-700"
                        />

                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                            flex items-center justify-center"
                            type="button"                        
                        >
                            <X className="w-3 h-3"/>
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:imput-md"
                        placeholder="Type your message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)} 
                    />

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className={`hidden sm:flex btn btn-circle
                            ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                    >
                        <Image size={20} />
                    </button>

                </div>

                <button
                    type="submit"
                    className="btn btn-sm btn-circle"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={22} />
                </button>

            </form>

        </div>
    )
}

export default MessageInput