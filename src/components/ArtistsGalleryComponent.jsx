import React, { useState, useEffect, useRef } from 'react';
// import { AllArtists } from '../constants/items'
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";

const ArtistsGalleryComponent = () => {
  const baseUrl = import.meta.env.VITE_API_URL;

      const [selectedExhibitionItem, setSelectedExhibitionItem] = useState(null);
      const [expandedArtists, setExpandedArtists] = useState({});
        const [allArtistItems, setAllArtistItems] = useState([]);
        const [filteredData, setFilteredData] = useState([]);
          const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 10;
        const galleryTopRef = useRef(null);

        useEffect(() => {
          const fetchGalleryItems = async () => {
            try {
              const response = await fetch(`${baseUrl}/exhibiting-artists/`);
              const data = await response.json();
              setAllArtistItems(data);
              setFilteredData(data);
              
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

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(filteredData.length / itemsPerPage);

useEffect(() => {
  if (galleryTopRef.current) {
    // Jump instantly — no animation
    galleryTopRef.current.scrollIntoView({ behavior: 'auto' });
  }
}, [currentPage]);

 const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    if (currentPage <= 3) {
      start = 1;
      end = Math.min(3, totalPages);
    } else if (currentPage >= totalPages - 2) {
      start = Math.max(totalPages - 2, 1);
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  return (
    <div ref={galleryTopRef} className='main-gallery-container artist-container'>
        <div>
            {currentItems.map((item)=>(
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
         <div className='pagination'>
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                   <FaLessThan/> <FaLessThan/>
                </button>
        
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <FaLessThan/>
                </button>
        
                {getPageNumbers().map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`page-btn ${currentPage === num ? "active" : ""}`}
                  >
                    {num}
                  </button>
                ))}
        
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  <FaGreaterThan/>
                </button>
        
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <FaGreaterThan/><FaGreaterThan/>
                </button>
              </div>
    </div>
  )
}

export default ArtistsGalleryComponent