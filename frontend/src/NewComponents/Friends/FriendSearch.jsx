import { useState } from 'react';
import { useFriends } from '../../contexts/FriendContext';
import { UserPlus } from 'lucide-react';

const FriendSearch = () => {
    const [friendUsername, setFriendUsername] = useState("");
    const { handleAddFriend } = useFriends();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!friendUsername.trim()) return;
        handleAddFriend(friendUsername);
        setFriendUsername("");
    };

    return (
        <div className="border-t border-base-300 px-6 py-4">
            <label className="block text-xs font-medium uppercase tracking-widest text-base-content/50 mb-2">
                Add a Friend
            </label>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative flex-1">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Enter username..."
                        className="input input-bordered w-full pl-9"
                        value={friendUsername}
                        onChange={(e) => setFriendUsername(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-square"
                    disabled={!friendUsername.trim()}
                >
                    <UserPlus className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
};

export default FriendSearch;