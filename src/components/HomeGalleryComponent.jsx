import React, { useState, useEffect, useRef } from 'react';
import Filter from './Filter';
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookSquare } from "react-icons/fa";
import '../components/ResponsiveLayout.css';



const HomeGalleryComponent = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [allGalleryItems, setAllGalleryItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedExhibitionItem, setSelectedExhibitionItem] = useState(null);

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
      }
    };

    fetchGalleryItems();
  }, []);

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

function truncateWithMore(text, maxChars) {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trim() + '...';
}


  return (
    <div>
      <Filter onSearch={handleSearch} />

      <div ref={galleryTopRef} className='main-gallery-container'>
        {currentItems.map((component) => (
          <div key={component.id} className={`main-comp-wrapper ${!component.exhibitions || component.exhibitions.length === 0 ? 'main-comp-wrapper-no-exhibition' : ''}`}>
            <div className='left-side'>
              <div className='left-first-row'>
                <p>
                  <span className='company-name'>{component.name}</span>,{' '}
                  <span className='company-website'>{component.website}</span>
                </p>
                <div className={component.status === 'open' ? 'status-open' : 'status-closed'}>
                  {component.status}
                </div>
              </div>

              <div className='left-second-row'>
                <img
                  src={component.images && component.images.length > 0 ? component.images[0].image : 'img1.jpg'}
                  alt="Gallery"
                />
                <div style={{fontSize:"14px"}}>
                  <p className='left-address'>{component.address}, {component.area}</p>
                  <p className='left-contact-no'>{component.contact_number}</p>
                  <p className='opening-hours'>
                    Opening Hours <br />
                    <span>Mon-Thu {component.opening_hours}<br />
                      Fri-Sun {component.opening_hours}</span>
                  </p>
                </div>
              </div>

              <div className='left-third-row'>
                Gallery Overview
                <p>{component.overview}</p>
              </div>

              <div className='left-more-btn'>
                <a href="#">+ More</a>
              </div>

              <div className='left-fourth-row'>
                <div className='social-icons'>
                  <a href={component.instagram_url}><TiSocialInstagram /></a>
                  <a href={component.facebook_url}><FaFacebookSquare /></a>
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
                          <h4>{item.title}</h4>
                        <p className='artist-name'>Artist : <span>{item.artist}</span></p>
                        <p className='date-of-exhibition'>
                          Date of Exhibition : <span>{item.start_date} - {item.end_date}</span>
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
                        <div>
                        <img src={item.image} alt="" />
                      </div>
                      
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
              <div style={{width:"260px",height:"150px"}}>
                        <img src={selectedExhibitionItem.image} alt="" style={{width:"100%",height:"100%"}}/>
                      </div>
            </div>
            <h2>{selectedExhibitionItem.title}</h2>
            <p className='exhibition-item-artist'><strong>Artist:</strong> {selectedExhibitionItem.artist}</p>
            <p className='exhibition-item-date'><strong>Date:</strong> {selectedExhibitionItem.start_date} - {selectedExhibitionItem.end_date}</p>
            <p>{selectedExhibitionItem.description}</p>
          </div>
        </div>
      )}
      </div>
      <button
  onClick={() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
  disabled={currentPage === 1}
>
  Prev
</button>

<span>Page {currentPage} of {totalPages}</span>

<button
  onClick={() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
  disabled={currentPage === totalPages}
>
  Next
</button>

    </div>
  );
};

export default HomeGalleryComponent;
