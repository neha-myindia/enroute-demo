import React, { useState, useRef, useEffect } from 'react';
import { HiAdjustments } from "react-icons/hi";
import { MdViewModule } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import '../components/Navbar/Navbar.css';
import '../components/ResponsiveLayout.css';
import { areas } from '../constants/items';


const GalleryMapsFilter = ({ onSearch }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [name, setName] = useState('');
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
//   const[areas,setAreas]=useState([])

  const [selectedAreas, setSelectedAreas] = useState([]);


//    useEffect(() => {
//       const fetchGalleryItems = async () => {
//         try {
//           const response = await fetch(`${baseUrl}/galleries/areas/`);
//           const data = await response.json();
//           setAreas(data.areas);
//         } catch (error) {
//           console.error("Error fetching gallery items:", error);
//         }
//       };
  
//       fetchGalleryItems();
//     }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      setShowSuggestions(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);




 const handleSubmit = () => {
  const filters = {
    name,
  };
  onSearch(filters);
};



  const handleNameChange = async (e) => {
    const input = e.target.value;
    setName(input);
    if (input.length === 0) {
      setNameSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/galleries/?name_startswith=${encodeURIComponent(input)}`);
    const data = await response.json();
    
    // ✅ Only show unique, matching suggestions
    const names = [...new Set(data.map(item => item.name))].filter(n =>
      n.toLowerCase().startsWith(input.toLowerCase())
    );

    setNameSuggestions(names);
    setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setName(suggestion);
    setNameSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className='filter-container'>
      <div className='top-menu-wrapper'>
        <div className='filter-left-menu'>
          <div>filter by</div>
          <div className='icon'><HiAdjustments /></div>
        </div>
        <div className='filter-right-menu'>
          <div className='icon'><MdViewModule /></div>
          <div className='sort-by-btn'>sort by<IoIosArrowDown /></div>
        </div>
      </div>

      <div className='bottom-menu-wrapper' style={{justifyContent:"flex-start",flexDirection:"column",alignItems:"flex-start"}}>
        <div style={{display:"flex",flexDirection:"row",alignItems:"flex-end"}}>
            <div style={{ position: 'relative', zIndex: 10 }}>
          <label>Search by gallery name</label>
          <input
            className="input-select"
            type="text"
            placeholder="Gallery name"
            value={name}
            onChange={handleNameChange}
            onClick={(e) => {
              e.stopPropagation();
              if (nameSuggestions.length > 0) setShowSuggestions(true);
            }}
            autoComplete="off"
          />
          {showSuggestions && nameSuggestions.length > 0 && (
            <div className="suggestions-list" style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 999
            }}>
              {nameSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleSuggestionClick(suggestion);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='search-btn-wrapper'>
          <button onClick={handleSubmit}>Search</button>
        </div>
        </div>
        <div>
            <div style={{ position: 'relative', zIndex: 10 }}>
          <label>Search by area</label>
          <div className='gallery-maps-areas-grid' style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
            {areas.map((item)=>(
            <button key={item.id} >{item.area}</button>
          ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryMapsFilter;
