import { useFriends } from '../../contexts/FriendContext';
import { Check } from 'lucide-react';
import defaultUserImage from '../../assets/defaultUser.jpg';
import { useFriends } from '../../contexts/FriendContext';
import { Check } from 'lucide-react';
import Avatar from '../Avatar';

const AddParticipants = ({ participants, setParticipants }) => {
    const { friends } = useFriends();

    const toggleParticipant = (friendId) => {
        setParticipants(prev =>
            prev.includes(friendId)
                ? prev.filter(id => id !== friendId)
                : [...prev, friendId]
        );
    };

    if (friends.length === 0) {
        return (
            <div className="px-6 py-4 text-sm text-base-content/40">
                Add some friends first to invite them to a group chat.
            </div>
        );
    }

    return (
        <div className="px-6">
            <label className="block text-xs font-medium uppercase tracking-widest text-base-content/50 mb-2">
                Participants
            </label>
            <div className="space-y-1">
                {friends.map(friend => {
                    const selected = participants.includes(friend.id);
                    return (
                        <button
                            type="button"
                            key={friend.id}
                            onClick={() => toggleParticipant(friend.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-colors
                                ${selected ? 'bg-primary/10' : 'hover:bg-base-200'}`}
                        >
                            <Avatar
                                pictureKey={friend.profile_picture_url}
                                alt={friend.username}
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                            <span className="text-sm font-medium text-base-content flex-1 text-left">
                                {friend.username}
                            </span>
                            {selected && <Check className="w-4 h-4 text-primary" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AddParticipants;