import React from 'react'
import { GoArrowDownLeft } from "react-icons/go";
import '../components/ResponsiveLayout.css';


const BottomBlackFooter = () => {
  return (
    <div className='main-bottom-footer-container'>
        <div>
            2025
        </div>
        <div className='right-comp'>
            <a href="#">
                Join our newsletter
            </a>
            <GoArrowDownLeft/>
        </div>
    </div>
  )
}

export default BottomBlackFooter