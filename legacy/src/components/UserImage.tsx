import React, { useState } from 'react';
import { DefaultProfile } from "@/assets/icons/defaultProfile";

interface ProfileImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    imageUrl?: string;
    rounded?: boolean;
    size?: number;
}

export function ProfileImage({ imageUrl, rounded, size }: ProfileImageProps) {
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        setHasError(true);
    };

    const borderRadius = rounded ? '50%' : '0';

    if (hasError || !imageUrl) {
        return (
            <div style={{ height: size ?? 40, width: size ?? 40 }}>
                <div className="hidden dark:block">
                    <DefaultProfile color="#2C2C2C" />
                </div>
                <div className="block dark:hidden">
                    <DefaultProfile color="#ADB5BD" />
                </div>
            </div>
        )
    }

    return (
        <div style={{ height: size, width: size, borderRadius }}>
            <img
                src={imageUrl}
                alt="Profile"
                style={{ height: size ?? 40, width: size ?? 40, borderRadius }}
                onError={handleError}
            />
        </div>
    );
}
