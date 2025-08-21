import React, { useState, useEffect, useRef } from 'react';

import {AllArtForSale} from '../constants/items'

const ArtForSaleComponent = () => {

      const [selectedExhibitionItem, setSelectedExhibitionItem] = useState(null);
      const [expandedArtists, setExpandedArtists] = useState({});
      const [selectedImage, setSelectedImage] = useState(null);

function truncateWithMore(text, maxChars) {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trim() + '...';
}

 const toggleExpand = (id) => {
    setExpandedArtists((prev) => ({
      ...prev,
      [id]: !prev[id] 
    }));
  };


  return (
    <div className='main-gallery-container artist-container'>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",columnGap:"2rem"}}>
            {AllArtForSale.map((artist)=>(
                <div className='art-for-sale-card'>
                    <div className='left'>
                      <div className='top'>
                        <p className='heading-bold'>{artist.artist_first_name} {artist.artist_last_name}</p>
                    <p>Exhibition title : <span>{artist.title}</span></p>
                      </div>
                    <div className='middle'>
                      <p className='heading-bold'>Contact : <span>{artist.gallery_name} <br/>{artist.phone_number}</span></p>
                    </div>
                    <p className='bottom heading-bold'>Price : <span>{artist.price}</span></p>
                    </div>
                    <div>
                      <img
              src={artist.image}
              alt={artist.title}
              style={{ width: "100%", height: "300px", objectFit: "cover", cursor: "pointer", borderRadius: "10px" }}
              onClick={() => setSelectedImage(artist.image)} // open modal with this image
            />
                    </div>
                    <div style={{fontWeight:"600",margin:"0 0 1rem 0"}}>ART FOR SALE !</div>
                </div>
            ))}
            {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "pointer"
          }}
        >
          <img
            src={selectedImage}
            alt="Enlarged"
            style={{ maxHeight: "90%", maxWidth: "90%", borderRadius: "10px" }}
          />
        </div>
      )}
        </div>
    </div>
  )
}

export default ArtForSaleComponent