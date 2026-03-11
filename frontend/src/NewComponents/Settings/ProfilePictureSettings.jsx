import React from 'react'
import { useRef } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Camera } from 'lucide-react';
import defaultUserImage from '../../assets/defaultUser.jpg';

const ProfilePictureSettings = () => {
    const { uploadProfilePicture, profileImageUrl, username } = useUser();
    const fileInputRef = useRef(null);

    return (
        <div className="px-6 py-6 border-b border-base-300">
            <p className="text-xs font-medium uppercase tracking-widest text-base-content/50 mb-4">
                Profile
            </p>

            <div className="flex items-center gap-4">
                {/* Avatar with click to change */}
                <div
                    className="relative cursor-pointer group flex-shrink-0"
                    onClick={() => fileInputRef.current.click()}
                >
                    <img
                        src={profileImageUrl || defaultUserImage}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-base-300 group-hover:ring-primary transition-all"
                    />
                    <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100
                        flex items-center justify-center transition-opacity">
                        <Camera className="w-5 h-5 text-white" />
                    </div>
                </div>

                <div>
                    <p className="font-medium text-base-content">{username}</p>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="text-xs text-primary hover:underline mt-0.5"
                    >
                        Change photo
                    </button>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => uploadProfilePicture(e.target.files[0])}
                />
            </div>
        </div>
    );
};

export default ProfilePictureSettings;