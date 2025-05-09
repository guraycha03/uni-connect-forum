import React from 'react';

interface MapProps {
  embedCode: string;
}

const Map: React.FC<MapProps> = ({ embedCode }) => {
  return (
    <div className="map-container">
      <div dangerouslySetInnerHTML={{ __html: embedCode }} />
    </div>
  );
};

export default Map;