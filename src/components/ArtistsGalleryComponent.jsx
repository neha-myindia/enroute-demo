import React, { useState, useEffect, useRef } from 'react';
import { AllArtists } from '../constants/items'

const ArtistsGalleryComponent = () => {

      const [selectedExhibitionItem, setSelectedExhibitionItem] = useState(null);
      const [expandedArtists, setExpandedArtists] = useState({});

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
        <div>
            {AllArtists.map((artist)=>(
                <div className='artist-card'>
                    <div className='left'>
                      <div className='top'>
                        <p className='heading-bold'>{artist.artist_first_name} {artist.artist_last_name}</p>
                    <p>Exhibition title : <span>{artist.title}</span></p>
                      </div>
                    <div className='middle'>
                      <p className='heading-bold'>Gallery name : <span>{artist.gallery_name}, {artist.address} <br/>{artist.phone_number}<br/>{artist.opening_hours} <br/><a href={artist.website} className='website'>{artist.website}</a></span></p>
                    </div>
                    <p className='bottom heading-bold'>Exhibition dates : <span>{artist.exhibition_date}</span></p>
                    </div>
                     <div className='partition'></div>
                    <p className='gallery-item-overview-wrapper'>Exhibition description : <br/><br/><span className="gallery-item-overview">
                      {artist.exhibition_description}
    {/* {expandedArtists[artist.id]
                  ? artist.exhibition_description
                  : truncateWithMore(artist.exhibition_description, 120)} */}
  </span>
  </p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ArtistsGalleryComponent