import React, { useState, useEffect, useRef } from 'react';
import Filter from './Filter';
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookSquare } from "react-icons/fa";
import '../components/ResponsiveLayout.css';
import { GalleryItems } from '../constants/items';
import { useNavigate } from 'react-router-dom';
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";
import { Link } from "react-router-dom";

// const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");
const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')   // remove anything that's not letters, numbers, space or dash
    .replace(/\s+/g, '-')           // replace spaces with -
    .replace(/-+/g, '-');           // collapse multiple - into single -
};


const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div style={{
        height: "120px",
        width: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <img
          src="img1.jpg"
          alt="Gallery"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }

  // If only one image -> show directly
  if (images.length === 1) {
    return (
      <div style={{
        height: "120px",
        width: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <img
          src={images[0].image}
          alt="Gallery"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }

  // Multiple images -> slider
  const prevSlide = () => {
    setCurrentIndex(prev =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex(prev =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div style={{
      position: "relative",
      height: "120px",
      width: "300px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}>
      <img
        src={images[currentIndex].image}
        alt="Gallery"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          left: "5px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "25px",
          height: "25px",
          cursor: "pointer",
        }}
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          right: "5px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "25px",
          height: "25px",
          cursor: "pointer",
        }}
      >
        ›
      </button>
    </div>
  );
};





const HomeGalleryComponent = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [allGalleryItems, setAllGalleryItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedExhibitionItem, setSelectedExhibitionItem] = useState(null);
  const navigate=useNavigate();
  const [resetCounter, setResetCounter] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const galleryTopRef = useRef(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch(`${baseUrl}/galleries/`);
        const data = await response.json();
        setAllGalleryItems(data);
        setFilteredData(data); 
      } catch (error) {
        console.error("Error fetching gallery items:", error);
        console.log("Fetching from:", `${baseUrl}/galleries/`);
      }
    };

    fetchGalleryItems();
  }, []);


  const handleMoreClick = (gallery) => {
    navigate(`/gallery-list-item-details/${gallery.id}`, { state: { id: gallery.id } });
  };



// useEffect(() => {
//   setAllGalleryItems(GalleryItems);
//   setFilteredData(GalleryItems);
// }, []);

  const handleSearch = async ({ name, areas, dateType, specificDate, dateRangeStart, dateRangeEnd }) => {
  const params = new URLSearchParams();

  if (name) {
  const cleanName = name.replace(/\s+/g, ''); 
  params.append('starts_with', cleanName);
}

 if (areas.length > 0) {
  const cleanArea = areas[0].replace(/\s+/g, ''); 
  params.append('area', cleanArea);
}


  if (dateType === 'Specific Date' && specificDate) {
    params.append('open_from', specificDate);
    params.append('open_until', specificDate);
  }

  if (dateType === 'Date Range' && dateRangeStart && dateRangeEnd) {
    params.append('open_from', dateRangeStart);
    params.append('open_until', dateRangeEnd);
  }

  const url = `${baseUrl}/galleries/?${params.toString()}`;
  console.log("Final URL: ", url); 

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Fetched data:", data);
    setFilteredData(data);
  } catch (err) {
    console.error('Filtered fetch error:', err);
  }
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

function truncateWithMore(text, maxChars) {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trim() + '...';
}

 const handleReset = () => {
    setFilteredData(allGalleryItems); 
    setCurrentPage(1); 
    setResetCounter(prev => prev + 1);
  };
  return (
    <div>
      <Filter onSearch={handleSearch} resetTrigger={resetCounter}  onReset={handleReset}/>

      <div ref={galleryTopRef} className='main-gallery-container'>
        {currentItems.map((component) => (
          <div key={component.id} className={`main-comp-wrapper ${!component.exhibitions || component.exhibitions.length === 0 ? 'main-comp-wrapper-no-exhibition' : ''}`}>
            <div className='left-side'>
              <div className='left-first-row'>
                <p>
                  <span className='company-name'>{component.name}</span><br/>
                  <a  href={`https://${component.website}`} target="_blank" className='company-website'>{component.website}</a>
                </p>
                <div className={component.status === 'open' ? 'status-open' : 'status-closed'}>
                  {component.status}
                </div>
              </div>

              <div className='left-second-row'>
                {/* <div style={{height:"120px",width:"300px",display: "flex",alignItems: "center", justifyContent: "center"}}><img
                  src={component.images && component.images.length > 0 ? component.images[0].image : 'img2.jpg'}
                  alt="Gallery"
                  style={{width:"100%",height:"100%",objectFit:"contain"}} 
                /></div> */}
                <ImageSlider images={component.images} />
                <div style={{fontSize:"14px",width:"50%"}}>
                  <p className='left-address'>{component.address}</p>
                  <p className='left-contact-no'>{component.contact_number}</p>
                  <p className='opening-hours'>
                    Opening Hours <br />
                    <span>{component.opening_hours_full}</span>
                  </p>
                  <p className='opening-hours'>
                    Closed Days <br />
                    <span>{component.days_closed}</span>
                  </p>
                </div>
              </div>

              <div className='left-third-row'>
                <p>{component.overview}</p>
              </div>

              <div className='left-more-btn'>
                 <Link to={`/${slugify(component.name)}`} state={{ id: component.id }}>+ More</Link>
              </div>

              <div className='left-fourth-row'>
                <div className="social-icons">
  {component.instagram && (
    <a 
      href={component.instagram} 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <TiSocialInstagram />
    </a>
  )}
  {component.facebook && (
    <a 
      href={component.facebook} 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <FaFacebookSquare />
    </a>
  )}
</div>
                
                <div className='planner-icons'>
                  <a href="#" className='add-to-planner-btn'>Add to Personal Planner</a>
                  <a href={`/show-on-map/${component.id}`}>Show on Map</a>
                </div>
              </div>
            </div>

            <div className='partition'></div>

            <div className='right-side'>
              {component.exhibitions && component.exhibitions.length > 0 ? (
                component.exhibitions.map((item, index) => (
                  <div key={item.id}>
                    <div className='right-gallery-item'>
                      <div className='left-side-details'>
                        <p className='artist-name' style={{ fontWeight: "700" }}>
  {item.artists.map((artist, index) => (
    <span key={index} style={{ fontWeight: "700" }}>
      {artist.first_name} {artist.last_name}
      {index < item.artists.length - 1 && ", "}
    </span>
  ))}
</p>
                          <h4 style={{fontWeight:"600",margin: "0.2rem 0"}}>{item.title}</h4>
                        <p className='date-of-exhibition' style={{fontWeight:"500",margin: "0 0 0.5rem 0",fontSize:"14px"}}>
                          <span>{item.start_date} - {item.end_date}</span>
                        </p>
                       <div className='gallery-item-overview-wrapper'>
  <span className="gallery-item-overview">
    {truncateWithMore(item.description, 120)}
  </span>
  {item.description.length > 120 && (
    <span
      className="expand-btn-inline"
      onClick={() => setSelectedExhibitionItem(item)}
    >
      +more
    </span>
  )}
</div>
                        </div>
                        {/* <div style={{height:"120px",width:"300px",display: "flex",alignItems: "center", justifyContent: "center"}}>
                     
                        <img
                  src={item.images && item.images.length > 0 ? item.images[0].image : 'img1.jpg'}
                  alt="Gallery" style={{width:"100%",height:"100%",objectFit: "contain"}}
                />
                      </div> */}
                      <ImageSlider images={item.images} />
                      
                    </div>
                    {index !== component.exhibitions.length - 1 && <hr className='partition-line' />}
                  </div>
                ))
              ) : (
                <div className='no-exhibition-reminder'>
                  <p>No exhibitions for the selected date range.</p>
                </div>
              )}
            </div>
          </div>
        ))}
        {selectedExhibitionItem && (
        <div className="popup-overlay" onClick={() => setSelectedExhibitionItem(null)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <div className='button-wrapper'><button onClick={() => setSelectedExhibitionItem(null)}>X</button></div>
            <div style={{width:"100%",textAlign:"center",display: "flex",alignItems: "center", justifyContent: "center"}}>
              <div style={{height:"200px",width:"500px",display: "flex",alignItems: "center", justifyContent: "center"}}>
                        <img src={selectedExhibitionItem.images && selectedExhibitionItem.images.length > 0 ? selectedExhibitionItem.images[0].image : 'img1.jpg'} alt="" style={{width:"100%",height:"100%",objectFit: "contain"}}/>
                      </div>
            </div>
            <h2>{selectedExhibitionItem.title}</h2>
            <p className='exhibition-item-artist'><strong></strong> {selectedExhibitionItem.artists.map((artist, index) => (
    <span key={index}>{artist.first_name} {artist.last_name}</span>
  ))}</p>
            <p className='exhibition-item-date'><strong></strong> {selectedExhibitionItem.start_date} - {selectedExhibitionItem.end_date}</p>
            <p>{selectedExhibitionItem.description}</p>
          </div>
        </div>
      )}
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
  );
};

export default HomeGalleryComponent;
