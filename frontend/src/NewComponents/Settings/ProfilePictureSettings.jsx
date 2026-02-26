import React from 'react'
import { useUser } from '../../contexts/UserContext';

const ProfilePictureSettings = () => {

const {uploadProfilePicture, profileImageUrl} = useUser();
  const handleFileChange = () => {
    console.log(profileImageUrl);
  }
  return (
    <div>
        ProfilePictureSettings
        <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadProfilePicture(e.target.files[0])}
        />
    </div>
  )
}

export default ProfilePictureSettings