import { useFriends } from '../../contexts/FriendContext';
import { Trash2, Users } from 'lucide-react';
import defaultUserImage from '../../assets/defaultUser.jpg';

const FriendsList = () => {
    const { friends, deleteFriend } = useFriends();

    if (friends.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-7 h-7 text-primary/60" />
                </div>
                <p className="text-sm font-medium text-base-content/50">No friends yet</p>
                <p className="text-xs text-base-content/30 mt-1">Add someone below to get started</p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-3 py-2">
            {friends.map(friend => (
                <div
                    key={friend.id}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-base-200 transition-colors"
                >
                    <img
                        src={friend.profile_picture_url || defaultUserImage}
                        alt={friend.username}
                        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-base-content truncate">
                            {friend.username}
                        </p>
                    </div>

                    <button
                        onClick={() => deleteFriend(friend.username)}
                        className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center 
                            justify-center rounded-lg hover:bg-error/10 text-base-content/30 
                            hover:text-error transition-all flex-shrink-0"
                        title="Remove friend"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FriendsList;