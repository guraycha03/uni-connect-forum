// components/GoogleMapEmbed.tsx
import React from 'react';

interface GoogleMapEmbedProps {
    embedCode: string; // Placeholder for the full iframe embed code
}

const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({ embedCode }) => {
    // Basic check to ensure embedCode isn't empty to prevent errors
    if (!embedCode) {
        return (
            <div className="w-full h-[300px] rounded-lg shadow-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                    Map Unavailable: No Embed Code Provided
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-[300px] rounded-lg shadow-lg">
            <div style={{ position: 'relative', paddingBottom: '75%', height: 0, overflow: 'hidden' }}>
                {/* Use dangerouslySetInnerHTML to render the embed code */}
                <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={embedCode}
                    title="Student Location Map" // Add a title for accessibility
                />
            </div>
            {/* Removed the mapembeds.com link, as it's part of the provided code
             <a
                href="https://mapembeds.com"
                rel="noopener noreferrer"
                target="_blank"
                style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0,0,0,0)',
                    whiteSpace: 'nowrap',
                    border: 0,
                }}
            >
                mapembeds.com
            </a>
            */}
        </div>
    );
};

export default GoogleMapEmbed;
