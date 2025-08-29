import React, { useState, useRef, useEffect } from 'react';
import { HiAdjustments } from "react-icons/hi";
import { MdViewModule } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import '../components/Navbar/Navbar.css';
import '../components/ResponsiveLayout.css';


const dates = ["All","Today", "Specific Date", "Date Range"];

const Filter = ({ onSearch, resetTrigger, onReset }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [allGalleryNames, setAllGalleryNames] = useState([]);
  const [name, setName] = useState('');
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const[areas,setAreas]=useState([])
  const [loading, setLoading] = useState(false);

  const [selectedAreas, setSelectedAreas] = useState([]);
  const [showAreaOptions, setShowAreaOptions] = useState(false);
  const dropdownAreaRef = useRef(null);

  const [selectedDates, setSelectedDates] = useState('Today');
  const [showDatesOptions, setShowDatesOptions] = useState(false);
  const dropdownDatesRef = useRef(null);

  const [specificDate, setSpecificDate] = useState('');
  const [dateRangeStart, setDateRangeStart] = useState('');
  const [dateRangeEnd, setDateRangeEnd] = useState('');

  const [sortboxopen,setSortboxopen]=useState(false);
   useEffect(() => {
    setName("");
    setSelectedAreas([]);
    setSelectedDates("Today");
    setSpecificDate("");
    setDateRangeStart("");
    setDateRangeEnd("");
  }, [resetTrigger]);

  useEffect(() => {
  const fetchGalleryNames = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/galleries/`);
      const data = await response.json();
      const names = [...new Set(data.map(item => item.name))]; // unique names
      setAllGalleryNames(names);
      setNameSuggestions(names); // initially all
    } catch (error) {
      console.error("Error fetching gallery names:", error);
    }
  };
  fetchGalleryNames();
}, [baseUrl]);

   useEffect(() => {
      const fetchGalleryItems = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/galleries/areas/`);
          const data = await response.json();
          setAreas(data.areas);
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
      if (dropdownDatesRef.current && !dropdownDatesRef.current.contains(event.target)) {
        setShowDatesOptions(false);
      }
      setShowSuggestions(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckboxChange = (area) => {
  if (area === "All") {
    // Clear other filters
    setName('');
    setSelectedDates("Today");
    setSpecificDate('');
    setDateRangeStart('');
    setDateRangeEnd('');

    // Update selectedAreas and immediately trigger search
    setSelectedAreas(["All"]); // ✅ store "all" directly

    onSearch({
      name: '',
      areas: ["All"],
      dateType: "Today",
      specificDate: '',
      dateRangeStart: '',
      dateRangeEnd: ''
    });

  } else {
    setSelectedAreas(prev => {
      // Remove "all" if user selects a specific area
      const filtered = prev.filter(a => a !== "all" && a !== "All");

      if (filtered.includes(area)) {
        return filtered.filter(a => a !== area);
      } else {
        return [...filtered, area];
      }
    });
  }
};



 const handleSubmit = () => {
   setLoading(true);
  const filters = {
    name,
    areas: selectedAreas.includes("all") ? ["all"] : selectedAreas,
    dateType: selectedDates,
    specificDate,
    dateRangeStart,
    dateRangeEnd
  };
onSearch(filters);

  // Small delay to simulate loading effect if needed
  // You can remove this if search is instant
  setTimeout(() => {
    setLoading(false); // hide loader
  }, 500); // 0.5s

};

useEffect(() => {
  if (selectedDates === "Specific Date") {
    // clear date range if switching to specific date
    setDateRangeStart("");
    setDateRangeEnd("");
  } else if (selectedDates === "Date Range") {
    // clear specific date if switching to date range
    setSpecificDate("");
  }
}, [selectedDates]);

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;  // DD-MM-YYYY
};

const getSelectedDateText = () => {
  if (selectedDates === "Specific Date" && specificDate) {
    return `Specific Date : ${formatDate(specificDate)}`;
  }
  if (selectedDates === "Date Range" && dateRangeStart && dateRangeEnd) {
    return `Date Range : ${formatDate(dateRangeStart)} to ${formatDate(dateRangeEnd)}`;
  }
  return selectedDates;
};

 const handleNameChange = (e) => {
  const input = e.target.value;
  setName(input);

  if (input.length === 0) {
    setNameSuggestions(allGalleryNames); // show all when empty
    setShowSuggestions(true);
    return;
  }

  // Match anywhere (case insensitive)
  const filtered = allGalleryNames.filter(n =>
    n.toLowerCase().includes(input.toLowerCase())
  );

  setNameSuggestions(filtered);
  setShowSuggestions(true);
};

 const handleSuggestionClick = (suggestion) => {
  setName(suggestion);
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
           <button 
          onClick={onReset}
          style={{
            padding: "13px 16px",
            background: "#ccc",
            border: "none",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Reset
        </button>
          <div className='sort-by-btn' onClick={()=>setSortboxopen(!sortboxopen)}>sort by<IoIosArrowDown /></div>
          {sortboxopen && (<div className='sort-box-filter-page'>
            <ul>
              <li>Gallery Name (A-Z)</li>
              <li>Gallery Name (Z-A)</li>
            </ul>
          </div>)}
        </div>
      </div>

      <div className='bottom-menu-wrapper'>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <label>Name</label>
          <input
            className="input-select"
            type="text"
            placeholder="All"
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

        <div className="suburb-area-filter suburb-area-filter-margin" ref={dropdownAreaRef}>
  <label>Suburb / Area</label>

  <div className="custom-select" onClick={() => setShowAreaOptions(!showAreaOptions)}>
    <input
      type="text"
      readOnly
      value={selectedAreas.length > 0 ? selectedAreas.join(", ") : ""}
      placeholder="Area"
      className="area-input"
    />
    <IoIosArrowDown />
  </div>

  {showAreaOptions && (
    <div className="options-list">
      {['All', ...areas].map(area => (
        <label key={area}>
          <input
            type="checkbox"
           checked={
  selectedAreas.includes("All") && area === "All"
    ? true
    : selectedAreas.includes(area)
}
            onChange={() => handleCheckboxChange(area)}
          />
          {area}
        </label>
      ))}
    </div>
  )}
</div>


        <div className="suburb-area-filter" ref={dropdownDatesRef}>
          <label>Date</label>
          {/* <div className="custom-select" onClick={() => setShowDatesOptions(!showDatesOptions)}>
            {getSelectedDateText()} <IoIosArrowDown />
          </div> */}
          <div className="custom-select" onClick={() => setShowDatesOptions(!showDatesOptions)}>
  <span className="selected-date-text">{getSelectedDateText()}</span>
  <IoIosArrowDown />
</div>
          {showDatesOptions && (
            <div className="options-list options-list-date">
              {dates.map(option => (
                <div key={option}>
                  <label>
                    <input
                      type="radio"
                      name="date"
                      value={option}
                      checked={selectedDates === option}
                      onChange={() => {setSelectedDates(option);}
                    }
                    />
                    {option}
                  </label>

                  {option === "Specific Date" && (
                    <div className="date-input-inline date-wrappers-specific">
                      <input
                        type="date"
                        value={specificDate}
                        onChange={(e) => setSpecificDate(e.target.value)}
                         onFocus={() => setSelectedDates("Specific Date")} 
                      />
                    </div>
                  )}

                  {option === "Date Range" && (
                    <div className="date-input-inline date-wrappers date-wrappers-specific">
                      <input
                        type="date"
                        value={dateRangeStart}
                        onChange={(e) => setDateRangeStart(e.target.value)}
                        onFocus={() => setSelectedDates("Date Range")}
                      /> to{' '}
                      <input
                        type="date"
                        value={dateRangeEnd}
                        onChange={(e) => setDateRangeEnd(e.target.value)}
                        onFocus={() => setSelectedDates("Date Range")}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='search-btn-wrapper'>
           <button onClick={handleSubmit} disabled={loading}>
    {loading ? (
      <div className='loader-btn-wrapper'><span className="loader"></span></div>
    ) : (
      "Search"
    )}
  </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
