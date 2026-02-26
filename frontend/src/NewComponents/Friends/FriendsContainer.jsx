import FriendsList from './FriendsList';
import FriendSearch from './FriendSearch';
import FriendsHeader from './FriendsHeader';

const FriendsContainer = () => {
    return (
        <div className="flex-1 flex flex-col overflow-auto"> 
            <FriendsHeader/>
            <FriendsList/>
            <FriendSearch/>
        </div>
    );
}

export default FriendsContainer;