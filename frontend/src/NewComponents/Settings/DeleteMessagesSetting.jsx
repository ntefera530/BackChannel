import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Trash2 } from 'lucide-react';

const DeleteMessagesSetting = () => {
    const { deleteAllUserMessages } = useUser();
    const [confirming, setConfirming] = useState(false);

    const handleClick = () => {
        if (!confirming) {
            setConfirming(true);
            setTimeout(() => setConfirming(false), 3000); // auto cancel after 3s
            return;
        }
        deleteAllUserMessages();
        setConfirming(false);
    };

    return (
        <div className="px-6 py-6 border-b border-base-300">
            <p className="text-xs font-medium uppercase tracking-widest text-base-content/50 mb-4">
                Danger Zone
            </p>

            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-base-content">Delete all messages</p>
                    <p className="text-xs text-base-content/40 mt-0.5">
                        Permanently removes all your messages
                    </p>
                </div>

                <button
                    onClick={handleClick}
                    className={`btn btn-sm gap-2 transition-all
                        ${confirming ? 'btn-error' : 'btn-ghost text-error'}`}
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    {confirming ? 'Confirm?' : 'Delete all'}
                </button>
            </div>
        </div>
    );
};

export default DeleteMessagesSetting;