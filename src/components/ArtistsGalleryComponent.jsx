import React, { useState, useEffect, useRef } from 'react';
// import { AllArtists } from '../constants/items'

const ArtistsGalleryComponent = () => {
  const baseUrl = import.meta.env.VITE_API_URL;

      const [selectedExhibitionItem, setSelectedExhibitionItem] = useState(null);
      const [expandedArtists, setExpandedArtists] = useState({});
        const [allArtistItems, setAllArtistItems] = useState([]);
        const [filteredData, setFilteredData] = useState([]);

        useEffect(() => {
          const fetchGalleryItems = async () => {
            try {
              const response = await fetch(`${baseUrl}/exhibiting-artists/`);
              const data = await response.json();
              setAllArtistItems(data);
              
            } catch (error) {
              console.error("Error fetching gallery items:", error);
              console.log("Fetching from:", `${baseUrl}/exhibiting-artists/`);
            }
          };
      
          fetchGalleryItems();
        }, []);

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
            {allArtistItems.map((item)=>(
                <div className='artist-card' key={item.id}>
                    <div className='left'>
                      <div className='top'>
                        <p className='heading-bold'>{item.artists.map((a, index) => (
                    <span key={a.id}>
                      {a.first_name} {a.last_name}
                      {index < item.artists.length - 1 && ", "}
                    </span>
                  ))}</p>
                    <p>Exhibition title : <span>{item.title}</span></p>
                      </div>
                    <div className='middle'>
                      <p className='heading-bold'>Gallery name : <span>{item.gallery.name}, {item.gallery.address} <br/>{item.gallery.phone_number}<br/>{item.gallery.opening_hours} <br/><a target="_blank" href={item.gallery.website} className='website'>{item.gallery.website}</a></span></p>
                    </div>
                    <p className='bottom heading-bold'>Exhibition dates : <span>{item.start_date} - {item.end_date}</span></p>
                    </div>
                     <div className='partition'></div>
                    <p className='gallery-item-overview-wrapper'>Exhibition description : <br/><br/><span className="gallery-item-overview">
                     {item.description}
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