import React, { useState, useEffect, useRef } from 'react';
import { HiAdjustments } from "react-icons/hi";
import { MdViewModule } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import '../components/Navbar/Navbar.css';
import '../components/ResponsiveLayout.css';
import { GallerylistAlphabets, defaultGallerylistitems } from '../constants/items';
import { NavLink } from 'react-router-dom';

const areas = [
  "City/CBD", "Darlinghurst/Woolloonooloo", "Surry Hills", 
  "Potts Point/Rushcutters Bay", "Paddington/Woollahra", 
  "Chippendale/Darlington", "Redfern/Waterl", 
  "Alexandria/Zetland", "North Shore/Manly"
];

const GallerylistFilter = () => {
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [showAreaOptions, setShowAreaOptions] = useState(false);
  const dropdownAreaRef = useRef(null);

  const [selectedAlphabet, setSelectedAlphabet] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(defaultGallerylistitems.slice(0, 16));
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
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(item => item !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const handleAlphabetClick = (alphabet) => {
  setSelectedAlphabet(alphabet);
  
  const filtered = defaultGallerylistitems.filter(item => {
    const firstChar = item.name.trim().charAt(0).toUpperCase();
    return firstChar === alphabet.toUpperCase();
  });

  setFilteredData(filtered);
};


  return (
    <div>
      <div className='filter-container'>
        <div className='top-menu-wrapper'>
          <div className='filter-left-menu'>
            <div>filter by</div>
            <div className='icon'><HiAdjustments /></div>
          </div>
          {/* <div className='filter-right-menu'>
            <div className='icon'><MdViewModule /></div>
            <div className='sort-by-btn'>sort by<IoIosArrowDown /></div>
          </div> */}
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
              <div
                className="custom-select"
                onClick={() => setShowAreaOptions(!showAreaOptions)}
              >
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
              <button>Search</button>
            </div>
          </div>
        </div>
      </div>

      <div className='main-gallery-container'>
        <div className="filtered-results">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <NavLink to={item.href} key={item.id} className='search-items'>{item.name}</NavLink>
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
