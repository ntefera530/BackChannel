import { useEffect, useRef, useState } from 'react';
import { useChats } from '../../contexts/ChatContext';
import { useUser } from '../../contexts/UserContext';
import { formatMessageTimestamp } from '../../lib/utils';
import defaultUserImage from '../../assets/defaultUser.jpg';
import { Trash2 } from 'lucide-react';

const MessageList = () => {
    const { messages, hasMore, loadMoreMessages, participants,  handleDeleteMessage } = useChats();
    const { userId, profileImageUrl, username } = useUser();

    const bottomRef = useRef(null);
    const containerRef = useRef(null);
    const shouldScrollRef = useRef(true);

    const [confirmingMessageId, setConfirmingMessageId] = useState(null);
    const confirmTimeoutRef = useRef(null);

    const handleDeleteClick = (messageId) => {
        if (confirmingMessageId !== messageId) {
            setConfirmingMessageId(messageId);
            clearTimeout(confirmTimeoutRef.current);
            confirmTimeoutRef.current = setTimeout(() => setConfirmingMessageId(null), 3000);
            return;
        }
        clearTimeout(confirmTimeoutRef.current);
        setConfirmingMessageId(null);
        handleDeleteMessage(messageId);
    };

    const getParticipant = (senderId) => {
        if (senderId === userId) return { username, profile_picture_url: profileImageUrl };
        return participants.find(p => p.id === senderId) || {};
    };

    const handleLoadMore = () => {
        shouldScrollRef.current = false;
        const container = containerRef.current;
        const scrollHeightBefore = container.scrollHeight;
        loadMoreMessages().then(() => {
            requestAnimationFrame(() => {
                container.scrollTop = container.scrollHeight - scrollHeightBefore;
            });
        });
    };

    useEffect(() => {
        if (shouldScrollRef.current) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        shouldScrollRef.current = true;
    }, [messages]);

    const isOwn = (message) => message.sender_id === userId;

    return (
        <div
            ref={containerRef}
            className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
            style={{
                backgroundImage: `
                    radial-gradient(circle at 20% 20%, oklch(85% 0.06 290 / 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, oklch(85% 0.06 290 / 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, oklch(95% 0.02 290 / 0.05) 0%, transparent 70%)
                `,
                backgroundColor: 'oklch(97% 0.01 80)',
            }}
        >
            {/* Load more */}
            {hasMore && (
                <div className="flex justify-center">
                    <button
                        onClick={handleLoadMore}
                        className="text-xs text-base-content/40 hover:text-primary transition-colors 
                            px-4 py-1.5 rounded-full hover:bg-white/60 border border-base-300 bg-white/40 backdrop-blur-sm"
                    >
                        Load older messages
                    </button>
                </div>
            )}

            {messages.map((message, index) => {
                const own = isOwn(message);
                const sender = getParticipant(message.sender_id);
                const prevMessage = messages[index - 1];
                const isGrouped = prevMessage && prevMessage.sender_id === message.sender_id;

                return (
                    <div
                        key={message.id}
                        className={`group flex gap-3 ${own ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        {/* Avatar */}
                        <div className="flex-shrink-0 w-8 self-end">
                            {!isGrouped && (
                                <img
                                    src={sender.profile_picture_url || defaultUserImage}
                                    alt={sender.username}
                                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white/80"
                                />
                            )}
                        </div>

                        {/* Bubble + meta */}
                        <div className={`flex flex-col gap-1 max-w-[60%] ${own ? 'items-end' : 'items-start'}`}>

                            {/* Sender name + timestamp */}
                            {!isGrouped && (
                                <div className={`flex items-baseline gap-2 px-1 ${own ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <span className="text-xs font-semibold text-base-content/70">
                                        {own ? 'You' : sender.username}
                                    </span>
                                    <span className="text-[10px] text-base-content/35">
                                        {formatMessageTimestamp(message.sent_at)}
                                    </span>
                                </div>
                            )}

                            {/* Bubble + delete button */}
                            <div className={`flex items-center gap-1.5 ${own ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div
                                className={`px-4 py-2.5 text-sm leading-relaxed
                                    ${message.deleted
                                        ? 'italic text-base-content/40 bg-base-200/60 border border-base-300 rounded-2xl'
                                        : own
                                            ? 'bg-primary text-primary-content rounded-2xl rounded-tr-sm shadow-md shadow-primary/20'
                                            : 'bg-white/90 backdrop-blur-sm text-base-content border border-white rounded-2xl rounded-tl-sm shadow-sm'
                                    }

                                    ${!message.deleted && isGrouped && own ? 'rounded-tr-2xl' : ''}
                                    ${!message.deleted && isGrouped && !own ? 'rounded-tl-2xl' : ''}
                                `}
                            >
                                {message.deleted ? (
                                    'This message was deleted'
                                ) : (
                                    <>
                                        {message.image && (
                                            <img
                                                src={message.image}
                                                alt="Attachment"
                                                className="max-w-[200px] rounded-lg mb-2"
                                            />
                                        )}
                                        {message.content}
                                    </>
                                )}
                            </div>

                                {own && !message.deleted && (
                                    <button
                                        onClick={() => handleDeleteClick(message.id)}
                                        title={confirmingMessageId === message.id ? 'Click again to delete' : 'Delete message'}
                                        className={`opacity-0 group-hover:opacity-100 w-6 h-6 flex-shrink-0
                                            flex items-center justify-center rounded-lg transition-all
                                            ${confirmingMessageId === message.id
                                                ? 'opacity-100 bg-error/15 text-error'
                                                : 'text-base-content/25 hover:bg-error/10 hover:text-error'}`}
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                );
            })}

            <div ref={bottomRef} />
        </div>
    );
};

export default MessageList;