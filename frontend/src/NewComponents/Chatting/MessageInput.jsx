import { useState, useRef } from 'react';
import { useChats } from '../../contexts/ChatContext';
import { X, ImagePlus, Send } from 'lucide-react';

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const { sendMessage } = useChats();
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImagePreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setImagePreview(null);
        fileInputRef.current.value = '';
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;
        sendMessage(text);
        setText("");
        setImagePreview(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    return (
        <div className="border-t border-base-300 px-4 py-3 bg-base-100">

            {/* Image preview */}
            {imagePreview && (
                <div className="mb-2 flex items-center gap-2">
                    <div className="relative inline-block">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-lg border border-base-300"
                        />
                        <button
                            onClick={removeImage}
                            type="button"
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-neutral 
                                text-neutral-content flex items-center justify-center"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">

                {/* Image button */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl
                        transition-colors
                        ${imagePreview
                            ? 'text-primary bg-primary/10'
                            : 'text-base-content/30 hover:text-base-content/60 hover:bg-base-200'
                        }`}
                >
                    <ImagePlus className="w-4.5 h-4.5" />
                </button>

                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />

                {/* Text input */}
                <input
                    type="text"
                    className="flex-1 bg-base-200 rounded-xl px-4 py-2 text-sm outline-none
                        placeholder:text-base-content/30 text-base-content
                        focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                {/* Send button */}
                <button
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                    className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl
                        bg-primary text-primary-content
                        disabled:opacity-30 disabled:cursor-not-allowed
                        hover:bg-primary/90 transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>

            </form>
        </div>
    );
};

export default MessageInput;