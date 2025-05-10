// components/GoogleMapEmbed.tsx



import React from 'react';

interface GoogleMapEmbedProps {
    embedCode: string;
}

const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({ embedCode }) => {
    // Basic check to ensure embedCode isn't empty
    if (!embedCode) {
        return (
            <div className="w-full h-[200px] rounded-lg shadow-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                    Map Unavailable: No Embed Code Provided
                </p>
            </div>
        );
    }

    const extractSrc = (code: string) => {
        const match = code.match(/src=["']?([^"']*)["']?/);
        return match ? match[1] : '';
    };

    const src = extractSrc(embedCode);

    return (
        <div className="w-full rounded-lg shadow-lg overflow-hidden">
            <div style={{ position: 'relative', paddingBottom: '45%', height: 0 }}>
                {/* Reduced paddingBottom for a smaller map, added margin for spacing */}
                <iframe
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                    }}
                    loading="lazy"
                    allowFullScreen
                    src={src}
                    title="Student Location Map"
                />
            </div>
        </div>
    );
};

export default GoogleMapEmbed;

