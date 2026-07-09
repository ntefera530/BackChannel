import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const ChatActionModal = ({ open, mode, chatName, onCancel, onConfirm }) => {
    const [deleteMessages, setDeleteMessages] = useState(false);

    if (!open) return null;

    const isDelete = mode === 'delete';

    const handleConfirm = () => {
        onConfirm(isDelete ? true : deleteMessages);
        setDeleteMessages(false);
    };

    const handleCancel = () => {
        setDeleteMessages(false);
        onCancel();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            onClick={handleCancel}
        >
            <div
                className="bg-base-100 rounded-2xl shadow-xl w-full max-w-sm p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-4.5 h-4.5 text-error" />
                    </div>
                    <p className="font-semibold text-base-content">
                        {isDelete ? 'Delete chat?' : 'Leave chat?'}
                    </p>
                </div>

                <p className="text-sm text-base-content/60 mb-4">
                    {isDelete
                        ? <>This permanently deletes <span className="font-medium">{chatName}</span> and all of its messages for everyone. This can't be undone.</>
                        : <>You'll leave <span className="font-medium">{chatName}</span> and stop receiving new messages from it.</>
                    }
                </p>

                {!isDelete && (
                    <label className="flex items-start gap-2 mb-5 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-sm checkbox-error mt-0.5"
                            checked={deleteMessages}
                            onChange={(e) => setDeleteMessages(e.target.checked)}
                        />
                        <span className="text-sm text-base-content/70">
                            Also delete all of my messages from this chat
                        </span>
                    </label>
                )}

                <div className="flex justify-end gap-2">
                    <button className="btn btn-sm btn-ghost" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="btn btn-sm btn-error" onClick={handleConfirm}>
                        {isDelete ? 'Delete' : 'Leave'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatActionModal;