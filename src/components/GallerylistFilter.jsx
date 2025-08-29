import React, { useState, useEffect, useRef } from 'react';
import { HiAdjustments } from "react-icons/hi";
import '../components/Navbar/Navbar.css';
import '../components/ResponsiveLayout.css';
import { GallerylistAlphabets } from '../constants/items';
import { useNavigate } from 'react-router-dom';

// const areas = [
//   "All","Alexandria/Zetland", "Chippendale/Darlington",  "City/CBD", "Darlinghurst/Woolloomooloo", "North Shore/Manly", "Paddington/Woollahra","Potts Point/Rushcutters Bay", "Redfern/Waterloo", "Surry Hills"
//   ,  , "Testing Purpose"
// ];

const GallerylistFilter = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [showAreaOptions, setShowAreaOptions] = useState(false);
  const dropdownAreaRef = useRef(null);

  const [selectedAlphabet, setSelectedAlphabet] = useState('');
  const [allGalleryItems, setAllGalleryItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const[areas,setAreas]=useState([])
  

  const navigate = useNavigate();

   useEffect(() => {
        const fetchGalleryItems = async () => {
          try {
            const response = await fetch(`${baseUrl}/galleries/areas/`);
            const data = await response.json();
            setAreas(data.areas);
          } catch (error) {
            console.error("Error fetching gallery items:", error);
          }
        };
    
        fetchGalleryItems();
      }, []);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch(`${baseUrl}/galleries/`);
        const data = await response.json();
        setAllGalleryItems(data);
        setFilteredData(data.slice(0, 16));
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      }
    };
    fetchGalleryItems();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownAreaRef.current && !dropdownAreaRef.current.contains(event.target)) {
        setShowAreaOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (area) => {
    setSelectedAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const handleAlphabetClick = (alphabet) => {
    setSelectedAlphabet(alphabet);
    const filtered = allGalleryItems.filter(item =>
      item.name?.trim()?.charAt(0)?.toUpperCase() === alphabet.toUpperCase()
    );
    setFilteredData(filtered);
  };

  const handleGalleryClick = (item) => {
    navigate('/gallery-list-item-details', { state: { id: item.id } });
  };

 const handleSearchClick = async () => {
  try {
    const params = new URLSearchParams();

    if (selectedAlphabet) {
      params.append('name_startswith', selectedAlphabet);
    }

    if (selectedAreas.length > 0 && !selectedAreas.includes("All")) {
      selectedAreas.forEach(area => {
        params.append('area', area);
      });
    }

    const response = await fetch(`${baseUrl}/galleries/?${params.toString()}`);
    console.log("Final API URL:", `${baseUrl}/galleries/?${params.toString()}`);
    const data = await response.json();
    setFilteredData(data);
  } catch (error) {
    console.error("Error during filtered fetch:", error);
  }
};



  return (
    <div>
      <div className='filter-container'>
        <div className='top-menu-wrapper'>
          <div className='filter-left-menu'>
            <div>filter by</div>
            <div className='icon'><HiAdjustments /></div>
          </div>
        </div>

        <div className='bottom-menu-wrapper bottom-menu-wrapper-align-top'>
          <div className='left-alphabets-search-grid'>
            <label>Name</label>
            <div className='alphabets-search-grid'>
              {GallerylistAlphabets.map((item) => (
                <div
                  key={item.id}
                  className={`alphabets ${selectedAlphabet === item.alpha ? 'active' : ''}`}
                  onClick={() => handleAlphabetClick(item.alpha)}
                >
                  {item.alpha}
                </div>
              ))}
            </div>
          </div>

          <div className='right-suburb-area-filter x-y-z right-suburb-area-filter-mobile-view'>
            <div className="suburb-area-filter suburb-area-filter-margin" ref={dropdownAreaRef}>
              <label>Suburb / Area</label>
              <div className="custom-select" onClick={() => setShowAreaOptions(!showAreaOptions)}>
                {selectedAreas.length > 0 ? selectedAreas.join(", ") : "Select Area"}
              </div>
              {showAreaOptions && (
                <div className="options-list">
                  {areas.map(area => (
                    <label key={area}>
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes(area)}
                        onChange={() => handleCheckboxChange(area)}
                      />
                      {area}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className='search-btn-wrapper'>
              <button onClick={handleSearchClick}>Search</button>
            </div>
          </div>
        </div>
      </div>

      <div className='main-gallery-container'>
        <div className="filtered-results">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className='search-items'
                onClick={() => handleGalleryClick(item)}
              >
                {item.name}
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GallerylistFilter;
