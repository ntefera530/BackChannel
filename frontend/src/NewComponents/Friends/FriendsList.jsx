import  { useEffect, useState } from 'react'
import { useFriends } from '../../contexts/FriendContext'
import { Delete, CircleX } from 'lucide-react';

const FriendsList = () => {
  const { friends, deleteFriend } = useFriends();


  useEffect(() => {

  }, [friends]);
  
  const handleDeleteFriend = (friendUsername) => {
    deleteFriend(friendUsername);
  }
  
  return (
    <div className= "flex-1 overflow-y-auto px-4 space-y-4">
        {friends.map(friend => (
            <div key={friend.id} className="">
              {friend.username}
              <button
                onClick={() => handleDeleteFriend(friend.username)}
                className="hover:bg-base-300 transition-colors text-red-500"
              >
                  <Delete />
              </button>
            </div>
        ))}
    </div>
  )
}

export default FriendsList