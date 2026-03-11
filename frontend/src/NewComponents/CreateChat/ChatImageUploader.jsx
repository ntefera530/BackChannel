import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import defaultChatImage from '../../assets/defaultChat.png';

const ChatImageUploader = ({ onImageChange }) => {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPreview(URL.createObjectURL(file));
        if (onImageChange) onImageChange(file);
    };

    return (
        <div className="flex flex-col items-center py-6">
            <div
                className="relative cursor-pointer group"
                onClick={() => fileInputRef.current.click()}
            >
                <img
                    src={preview || defaultChatImage}
                    alt="Chat"
                    className="w-20 h-20 rounded-full object-cover ring-2 ring-base-300 group-hover:ring-primary transition-all"
                />
                <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 
                    flex items-center justify-center transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                </div>
            </div>
            <p className="text-xs text-base-content/40 mt-2">Click to add a chat photo</p>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ChatImageUploader;