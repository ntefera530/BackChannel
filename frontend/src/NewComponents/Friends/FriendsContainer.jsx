import FriendsList from './FriendsList';
import FriendSearch from './FriendSearch';
import FriendsHeader from './FriendsHeader';

const FriendsContainer = () => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
            <FriendsHeader />
            <FriendsList />
            <FriendSearch />
        </div>
    );
};

export default FriendsContainer;