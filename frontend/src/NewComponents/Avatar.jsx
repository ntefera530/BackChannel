import useSignedImageUrl from '../hooks/useSignedImageUrl';
import defaultUserImage from '../assets/defaultUser.jpg';

const Avatar = ({ pictureKey, alt, className, fallback = defaultUserImage }) => {
    const signedUrl = useSignedImageUrl(pictureKey);

    return (
        <img
            src={signedUrl || fallback}
            alt={alt}
            className={className}
        />
    );
};

export default Avatar;
