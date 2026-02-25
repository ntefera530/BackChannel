import FriendsList from './FriendsList';
import FriendSearch from './FriendSearch';

const FriendsContainer = () => {
    return (
        <div >  
            <div className="flex-1 flex flex-col overflow-auto">
                Friends container    
            </div>

            <FriendsList/>
            <FriendSearch/>
        </div>
    );
}

export default FriendsContainer;