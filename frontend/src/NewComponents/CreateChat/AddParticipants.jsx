import { useState } from 'react';
import { UserPlus, X } from 'lucide-react';

const AddParticipants = ({ participants, setParticipants }) => {
    const [input, setInput] = useState('');

    const addParticipant = () => {
        const trimmed = input.trim();
        if (!trimmed || participants.includes(trimmed)) return;
        setParticipants([...participants, trimmed]);
        setInput('');
    };

    const removeParticipant = (username) => {
        setParticipants(participants.filter(p => p !== username));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addParticipant();
        }
    };

    return (
        <div className="px-6">
            <label className="block text-xs font-medium uppercase tracking-widest text-base-content/50 mb-2">
                Participants
            </label>

            {/* Input row */}
            <div className="flex gap-2 mb-3">
                <div className="relative flex-1">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30 pointer-events-none" />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter username..."
                        className="input input-bordered w-full pl-9"
                    />
                </div>
                <button
                    type="button"
                    onClick={addParticipant}
                    className="btn btn-primary btn-square"
                    disabled={!input.trim()}
                >
                    <UserPlus className="w-4 h-4" />
                </button>
            </div>

            {/* Participant chips */}
            {participants.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {participants.map((username) => (
                        <div
                            key={username}
                            className="flex items-center gap-1.5 bg-primary/10 text-primary 
                                text-sm px-3 py-1 rounded-full"
                        >
                            <span>{username}</span>
                            <button
                                type="button"
                                onClick={() => removeParticipant(username)}
                                className="hover:text-error transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddParticipants;