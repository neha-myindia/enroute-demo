import React, { useState, useRef, useEffect } from 'react';
import { HiAdjustments } from "react-icons/hi";
import { MdViewModule } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import '../components/Navbar/Navbar.css';
import '../components/ResponsiveLayout.css';



const GalleryMapsFilter = ({ onSearch, onAreaSelect }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [name, setName] = useState('');
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allGalleryNames, setAllGalleryNames] = useState([]);
const[areas,setAreas]=useState([])
const [selectedArea, setSelectedArea] = useState(null);



 const toggleArea = (area) => {
    if (area === "All") {
      setSelectedArea("All");
      onAreaSelect(null); // reset to show all
      return;
    }
    setSelectedArea(area);
    onAreaSelect(area);
     // pass selected area to parent
  };



   useEffect(() => {
      const fetchGalleryItems = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/galleries/areas/`);
          const data = await response.json();
           console.log("Areas from API:", data);
         setAreas(data.areas || []);
        } catch (error) {
          console.error("Error fetching gallery items:", error);
        }
      };
  
      fetchGalleryItems();
    }, []);

    useEffect(() => {
    const fetchGalleryNames = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/galleries/`);
        const data = await response.json();
        const names = [...new Set(data.map((item) => item.name))];
        setAllGalleryNames(names);
        setNameSuggestions(names); // default suggestions
      } catch (error) {
        console.error("Error fetching gallery names:", error);
      }
    };
    fetchGalleryNames();
  }, [baseUrl]);

  useEffect(() => {
    function handleClickOutside(event) {
      setShowSuggestions(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);




const handleSubmit = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/api/galleries/search/?name=${encodeURIComponent(name)}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const selectedGallery = data[0]; // pick the first match
      onSearch({
        name,
        highlightedGallery: {
          id: selectedGallery.id,
          name: selectedGallery.name,
          lat: selectedGallery.lat,   // ✅ correct field
          lng: selectedGallery.long,  // ✅ API uses "long"
        },
      });
    } else {
      onSearch({ name, highlightedGallery: null });
    }
  } catch (error) {
    console.error("Error fetching gallery by name:", error);
  }
};



   const handleNameChange = (e) => {
    const input = e.target.value;
    setName(input);

    if (input.length === 0) {
      setNameSuggestions(allGalleryNames);
      setShowSuggestions(true);
      return;
    }

    const filtered = allGalleryNames.filter((n) =>
      n.toLowerCase().includes(input.toLowerCase())
    );
    setNameSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setName(suggestion);
    setShowSuggestions(false);
    
  };

   // ... your existing imports and code remain unchanged

const handleSearch = async () => {
  // ✅ NEW/CHANGED: Fetch gallery by name to get full info for highlighting
  if (name) {
    try {
      const response = await fetch(
        `${baseUrl}/api/galleries/search/?name=${encodeURIComponent(name)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const selectedGallery = data[0]; // pick the first match
        onSearch({
          name,
          highlightedGallery: {
            id: selectedGallery.id,
            name: selectedGallery.name,
            lat: selectedGallery.lat,
            lng: selectedGallery.long,
            area: selectedGallery.area, // ✅ NEW: pass area for blue markers
          },
        });
      } else {
        onSearch({ name, highlightedGallery: null });
      }
    } catch (error) {
      console.error("Error fetching gallery by name:", error);
    }
  } else {
    // ✅ NEW/CHANGED: If no name, just search by area
    onSearch({ area: selectedArea, highlightedGallery: null });
  }
};


  return (
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

      <div className='bottom-menu-wrapper' style={{justifyContent:"flex-start",flexDirection:"column",alignItems:"flex-start"}}>
        <div style={{display:"flex",flexDirection:"row",alignItems:"flex-end"}}>
            <div style={{ position: 'relative', zIndex: 50 }}>
          <label>Search by gallery name</label>
          <input
            className="input-select"
            type="text"
            placeholder="Gallery name"
            value={name}
            onChange={handleNameChange}
            onFocus={() => setShowSuggestions(true)}
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
        <div className='search-btn-wrapper' style={{marginLeft:"8vmin"}}>
          <button onClick={handleSearch}>Search</button>
        </div>
        </div>
        <div style={{marginTop:"8vmin"}}>
            <div style={{ position: 'relative', zIndex: 10 }}>
          <label>Search by area</label>
          <div className='gallery-maps-areas-grid' style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
           {['All', ...areas].map(area => (
                <button
                  key={area}
                  onClick={() => toggleArea(area)}
                  style={{
                    fontWeight: selectedArea === area ? "bold" : "normal",
                    border: selectedArea === area ? "1px solid black" : "1px solid gray",
                    backgroundColor: selectedArea === area ? "#ffffff" : "#333",
                      color: selectedArea === area ? "#333" : "#ffffff",
                  }}
                >
                  {area}
                </button>
              ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryMapsFilter;
