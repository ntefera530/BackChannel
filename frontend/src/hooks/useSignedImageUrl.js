import { useState, useEffect } from 'react';
import { getSignedUrl } from '../api/storageApi';


export default function useSignedImageUrl(key) {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        let cancelled = false;

        if (!key) {
            setUrl(null);
            return;
        }

        if (/^https?:\/\//i.test(key)) {
            setUrl(key);
            return;
        }

        getSignedUrl(key)
            .then(signedUrl => {
                if (!cancelled) setUrl(signedUrl);
            })
            .catch(err => {
                console.error("Failed to resolve signed image URL:", err);
                if (!cancelled) setUrl(null);
            });

        return () => { cancelled = true; };
    }, [key]);

    return url;
}
