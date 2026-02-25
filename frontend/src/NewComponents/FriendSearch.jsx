import React from 'react'
import { useState } from 'react';
import { useFriends } from '../contexts/FriendContext';
import { CirclePlus } from 'lucide-react';

const FriendSearch = () => {
    let [friendUsername, setFriendUsername] = useState("");
    const {addFriend} = useFriends(); 

    const handleSubmit = async(e) => {
        e.preventDefault();
        addFriend(friendUsername);
        setFriendUsername("");
    }

    const handleChangeUsername = (event) => {
        setFriendUsername(event.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='form-control'>
                    <label className='label'>
                        <span className='label-text font-medium'>Add a Freind</span>
                    </label>

                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <CirclePlus className='size-5 text-base-content/40' />
                        </div>
                        <input
                            type="text"
                            placeholder="username"
                            className='input input-bordered w-full pl-10'
                            value={friendUsername}
                            onChange={handleChangeUsername}
                        />
                        <button className='btn btn-primary w-full' type="submit">Add Friend</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FriendSearch;
