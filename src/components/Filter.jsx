import React, { useState, useEffect, useRef } from 'react';
import { HiAdjustments } from "react-icons/hi";
import { MdViewModule } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import '../components/Navbar/Navbar.css';
import '../components/ResponsiveLayout.css';


const areas = ["City/CBD", "Darlinghurst/Woolloonooloo", "Surry Hills", "Potts Point/Rushcutters Bay", "Paddington/Woollahra", "Chippendale/Darlington", "Redfern/Waterl", "Alexandria/Zetland", "North Shore/Manly"];
const dates = ["Today", "Specific Date", "Date Range"];

const Filter = () => {
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [showAreaOptions, setShowAreaOptions] = useState(false);
  const dropdownAreaRef = useRef(null);

  const [selectedDates, setSelectedDates] = useState('Today');
  const [showDatesOptions, setShowDatesOptions] = useState(false);
  const dropdownDatesRef = useRef(null);

  const [specificDate, setSpecificDate] = useState('');
  const [dateRangeStart, setDateRangeStart] = useState('');
  const [dateRangeEnd, setDateRangeEnd] = useState('');

  const handleCheckboxChange = (area) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(item => item !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownDatesRef.current && !dropdownDatesRef.current.contains(event.target)) {
        setShowDatesOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper to display selected date info
  const getSelectedDateText = () => {
    if (selectedDates === "Specific Date" && specificDate) {
      return `Specific Date: ${specificDate}`;
    }
    if (selectedDates === "Date Range" && dateRangeStart && dateRangeEnd) {
      return `Range: ${dateRangeStart} to ${dateRangeEnd}`;
    }
    return selectedDates;
  };

  return (
    <div className='filter-container'>
      <div className='top-menu-wrapper'>
        <div className='filter-left-menu'>
          <div>filter by</div>
          <div className='icon'>
            <HiAdjustments />
          </div>
        </div>
        <div className='filter-right-menu'>
          <div className='icon'>
            <MdViewModule />
          </div>
          <div className='sort-by-btn'>
            sort by
            <IoIosArrowDown />
          </div>
        </div>
      </div>

      <div className='bottom-menu-wrapper'>
        <div>
          <label>Name</label>
          <input className="input-select" type="text" placeholder='All' />
        </div>

        <div className="suburb-area-filter suburb-area-filter-margin" ref={dropdownAreaRef}>
          <label>Suburb / Area</label>
          <div
            className="custom-select"
            onClick={() => setShowAreaOptions(!showAreaOptions)}
          >
            {selectedAreas.length > 0 ? selectedAreas.join(", ") : "Area"}
            <IoIosArrowDown/>
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
          <div
            className="custom-select"
            onClick={() => setShowDatesOptions(!showDatesOptions)}
          >
            {getSelectedDateText()}
             <IoIosArrowDown/>
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
                      onChange={() => setSelectedDates(option)}
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
                      /> to {' '}
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
          <button>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
