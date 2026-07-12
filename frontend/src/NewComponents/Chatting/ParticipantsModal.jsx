import { useState } from 'react';
import { useChats } from '../../contexts/ChatContext';
import { useUser } from '../../contexts/UserContext';
import { Crown, X, UserMinus } from 'lucide-react';
import defaultUserImage from '../../assets/defaultUser.jpg';
import Avatar from '../Avatar';

const ParticipantsModal = ({ open, onClose }) => {
    const { participants, selectedChatId, groupChats, handleTransferChatOwnership, handleKickUser } = useChats();
    const { userId } = useUser();

    const [confirming, setConfirming] = useState(null);
    const [pendingId, setPendingId] = useState(null);

    if (!open) return null;

    const chat = groupChats.find(c => c.chat_id === selectedChatId);
    const isOwner = chat?.owner === userId;

    const handleClose = () => {
        setConfirming(null);
        onClose();
    };

    const handleConfirm = async () => {
        if (!confirming) return;
        const { id, type } = confirming;
        setPendingId(id);
        try {
            if (type === 'transfer') {
                await handleTransferChatOwnership(selectedChatId, id);
            } else {
                await handleKickUser(selectedChatId, id);
            }
        } finally {
            setPendingId(null);
            setConfirming(null);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            onClick={handleClose}
        >
            <div
                className="bg-base-100 rounded-2xl shadow-xl w-full max-w-sm p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">
                    <p className="font-semibold text-base-content">Participants</p>
                    <button
                        onClick={handleClose}
                        className="w-7 h-7 flex items-center justify-center rounded-lg
                            hover:bg-base-200 text-base-content/40 hover:text-base-content/70 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex flex-col gap-0.5 max-h-80 overflow-y-auto -mx-2">
                    {participants.map((p) => {
                        const isCurrentOwner = chat?.owner === p.id;
                        const isSelf = p.id === userId;
                        const isConfirmingThis = confirming?.id === p.id;
                        const isPending = pendingId === p.id;
                        // Owner-only actions; an owner never sees management controls next to their own row.
                        const canManage = isOwner && !isCurrentOwner;

                        return (
                            <div
                                key={p.id}
                                className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-base-200/50 transition-colors"
                            >
                                <Avatar
                                    pictureKey={p.profile_picture_url}
                                    alt={p.username}
                                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                />


                                <div className="flex-1 min-w-0 flex items-center gap-1.5">
                                    <p className="text-sm font-medium text-base-content truncate">
                                        {p.username}
                                    </p>
                                    {isSelf && (
                                        <span className="text-xs text-base-content/40 flex-shrink-0">(you)</span>
                                    )}
                                    {isCurrentOwner && (
                                        <Crown className="w-3.5 h-3.5 text-warning flex-shrink-0" title="Owner" />
                                    )}
                                </div>

                                {canManage && (
                                    isConfirmingThis ? (
                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            <button
                                                onClick={handleConfirm}
                                                disabled={isPending}
                                                className={`btn btn-xs ${confirming.type === 'kick' ? 'btn-error' : 'btn-primary'}`}
                                            >
                                                {isPending ? '...' : 'Confirm'}
                                            </button>
                                            <button
                                                onClick={() => setConfirming(null)}
                                                disabled={isPending}
                                                className="btn btn-xs btn-ghost"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => setConfirming({ id: p.id, type: 'transfer' })}
                                                className="text-xs font-medium text-primary/70 hover:text-primary transition-colors"
                                            >
                                                Make owner
                                            </button>
                                            <button
                                                onClick={() => setConfirming({ id: p.id, type: 'kick' })}
                                                className="w-6 h-6 flex items-center justify-center rounded-lg
                                                    hover:bg-error/10 text-base-content/20 hover:text-error transition-colors"
                                                title="Remove from chat"
                                            >
                                                <UserMinus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ParticipantsModal;