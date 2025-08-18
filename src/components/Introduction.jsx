import React from 'react'
import '../components/Navbar/Navbar.css';
import '../components/ResponsiveLayout.css';

const Introduction = ({heading}) => {
  return (
    <div className='heading-container'>
        <h1>
            {/* Research art galleries and exhibitions for any given date or date range when planning visits to Sydney and its art suburbs */}
            {heading}
        </h1>
    </div>
  )
}

export default Introduction