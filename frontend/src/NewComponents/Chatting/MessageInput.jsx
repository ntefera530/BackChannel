import { useState, useRef, useEffect } from 'react';
import { useChats } from '../../contexts/ChatContext';
import { X, ImagePlus, Send, Loader2 } from 'lucide-react';

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50MB

const MessageInput = () => {
    const [text, setText] = useState("");
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaPreviewUrl, setMediaPreviewUrl] = useState(null);
    const [mediaType, setMediaType] = useState(null); // 'image' | 'video'
    const [fileError, setFileError] = useState(null);
    const [sending, setSending] = useState(false);

    const { sendMessage } = useChats();
    const fileInputRef = useRef(null);

    // Clean up the object URL when it's replaced or the component unmounts.
    useEffect(() => {
        return () => {
            if (mediaPreviewUrl) URL.revokeObjectURL(mediaPreviewUrl);
        };
    }, [mediaPreviewUrl]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileError(null);

        const isVideo = file.type.startsWith('video/');
        const isImage = file.type.startsWith('image/');

        if (!isVideo && !isImage) {
            setFileError("Only images or videos are supported");
            fileInputRef.current.value = '';
            return;
        }

        const maxBytes = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
        if (file.size > maxBytes) {
            setFileError(`File too large — max ${isVideo ? '50MB' : '10MB'}`);
            fileInputRef.current.value = '';
            return;
        }

        if (mediaPreviewUrl) URL.revokeObjectURL(mediaPreviewUrl);
        setMediaFile(file);
        setMediaType(isVideo ? 'video' : 'image');
        setMediaPreviewUrl(URL.createObjectURL(file));
    };

    const removeMedia = () => {
        if (mediaPreviewUrl) URL.revokeObjectURL(mediaPreviewUrl);
        setMediaFile(null);
        setMediaPreviewUrl(null);
        setMediaType(null);
        setFileError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (sending) return;
        if (!text.trim() && !mediaFile) return;

        setSending(true);
        try {
            await sendMessage(text.trim(), mediaFile);
            setText("");
            // Don't revoke here — ChatContext's optimistic message is now using this same blob URL.
            setMediaFile(null);
            setMediaPreviewUrl(null);
            setMediaType(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } finally {
            setSending(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    return (
        <div className="border-t border-base-300 px-4 py-3 bg-base-100">

            {/* Media preview */}
            {mediaPreviewUrl && (
                <div className="mb-2 flex items-center gap-2">
                    <div className="relative inline-block">
                        {mediaType === 'video' ? (
                            <video
                                src={mediaPreviewUrl}
                                className="w-16 h-16 object-cover rounded-lg border border-base-300"
                                muted
                            />
                        ) : (
                            <img
                                src={mediaPreviewUrl}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded-lg border border-base-300"
                            />
                        )}
                        <button
                            onClick={removeMedia}
                            type="button"
                            disabled={sending}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-neutral 
                                text-neutral-content flex items-center justify-center"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            )}

            {fileError && (
                <div className="mb-2 text-xs text-error">{fileError}</div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">

                {/* Media button */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    disabled={sending}
                    className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl
                        transition-colors
                        ${mediaPreviewUrl
                            ? 'text-primary bg-primary/10'
                            : 'text-base-content/30 hover:text-base-content/60 hover:bg-base-200'
                        }`}
                >
                    <ImagePlus className="w-4.5 h-4.5" />
                </button>

                <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
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
                    disabled={sending}
                />

                {/* Send button */}
                <button
                    type="submit"
                    disabled={(!text.trim() && !mediaFile) || sending}
                    className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl
                        bg-primary text-primary-content
                        disabled:opacity-30 disabled:cursor-not-allowed
                        hover:bg-primary/90 transition-colors"
                >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>

            </form>
        </div>
    );
};

export default MessageInput;