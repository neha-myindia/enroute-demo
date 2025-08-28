import React, { useState } from 'react';
import Introduction from '../components/Introduction';
import GalleryMapsFilter from '../components/GalleryMapsFilter';
import { GalleryMapShow } from '../components/GalleryMapShow';
import { GalleryNameMapShow } from '../components/GalleryNameMapShow';

const GalleryMaps = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [highlightedGallery, setHighlightedGallery] = useState(null);

  return (
    <>
      <Introduction heading="Search for gallery according to area" />

      <GalleryMapsFilter 
        onAreaSelect={(area) => {
          setSelectedArea(area);
          setHighlightedGallery(null); // reset highlight when choosing area
        }}
        onSearch={({ highlightedGallery }) => {
          setHighlightedGallery(highlightedGallery);
          setSelectedArea(null); // reset area when searching by name
        }}
      />

      {/* 👇 Decide which map to render */}
      {highlightedGallery ? (
        <GalleryNameMapShow highlightedGallery={highlightedGallery} />
      ) : (
        <GalleryMapShow selectedArea={selectedArea} />
      )}
    </>
  );
}

export default GalleryMaps;
