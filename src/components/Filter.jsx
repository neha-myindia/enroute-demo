import React, { useState, useRef, useEffect } from 'react';
import { HiAdjustments } from "react-icons/hi";
import { MdViewModule } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import '../components/Navbar/Navbar.css';
import '../components/ResponsiveLayout.css';

const areas = [
  "All","Alexandria/Zetland", "Chippendale/Darlington",  "City/CBD", "Darlinghurst/Woolloomooloo", "North Shore/Manly", "Paddington/Woollahra","Potts Point/Rushcutters Bay", "Redfern/Waterloo", "Surry Hills"
   , "Testing Purpose"
];
const dates = ["Today", "Specific Date", "Date Range"];

const Filter = ({ onSearch }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [name, setName] = useState('');
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [selectedAreas, setSelectedAreas] = useState([]);
  const [showAreaOptions, setShowAreaOptions] = useState(false);
  const dropdownAreaRef = useRef(null);

  const [selectedDates, setSelectedDates] = useState('Today');
  const [showDatesOptions, setShowDatesOptions] = useState(false);
  const dropdownDatesRef = useRef(null);

  const [specificDate, setSpecificDate] = useState('');
  const [dateRangeStart, setDateRangeStart] = useState('');
  const [dateRangeEnd, setDateRangeEnd] = useState('');

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
  const filters = {
    name,
    areas: selectedAreas.includes("all") ? ["all"] : selectedAreas,
    dateType: selectedDates,
    specificDate,
    dateRangeStart,
    dateRangeEnd
  };
  onSearch(filters);
};



  const getSelectedDateText = () => {
    if (selectedDates === "Specific Date" && specificDate) {
      return `Specific Date: ${specificDate}`;
    }
    if (selectedDates === "Date Range" && dateRangeStart && dateRangeEnd) {
      return `Range: ${dateRangeStart} to ${dateRangeEnd}`;
    }
    return selectedDates;
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
      const response = await fetch(`${baseUrl}/api/galleries/?name_startswith=${input}`);
      const data = await response.json();
      const names = data.map(item => item.name);
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
            {selectedAreas.length > 0 ? selectedAreas.join(", ") : "Area"} <IoIosArrowDown />
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

        <div className="suburb-area-filter" ref={dropdownDatesRef}>
          <label>Date</label>
          <div className="custom-select" onClick={() => setShowDatesOptions(!showDatesOptions)}>
            {getSelectedDateText()} <IoIosArrowDown />
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
                      onChange={() => {setSelectedDates(option);setShowDatesOptions(false);}
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
                      />
                    </div>
                  )}

                  {option === "Date Range" && (
                    <div className="date-input-inline date-wrappers date-wrappers-specific">
                      <input
                        type="date"
                        value={dateRangeStart}
                        onChange={(e) => setDateRangeStart(e.target.value)}
                      /> to{' '}
                      <input
                        type="date"
                        value={dateRangeEnd}
                        onChange={(e) => setDateRangeEnd(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='search-btn-wrapper'>
          <button onClick={handleSubmit}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
