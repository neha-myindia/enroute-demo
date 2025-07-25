import React, {useState} from 'react'
import { FaSearch } from "react-icons/fa";
import './Navbar.css';
import {NavBottomComps} from '../../constants/items.jsx';
import { ImMenu } from "react-icons/im";
import { RiCloseLargeFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';



const Navbar = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const[bars, setBars]=useState(false)
    const toggleNavbar = () => {
    setBars(prev => !prev);
    console.log("Toggled navbar:", !bars);
};

  return (
    <div className='container'>
        <div className='top-nav'>
            <div className='logo-warpper'>
            <img src="enroute-logo.png" alt="" />
            </div>
            <div className='right-wrapper'>
            <div className='search-container right-comp'>
                <input type="text" placeholder='Search'/>
                <div className='search-icon'>
                    <FaSearch />
                </div>
            </div>
            <div className='right-comp'>
                <a href="#">
                    <button>
                    About the site
                </button>
                </a>
            </div>
            <div className='right-comp'>
                <a href="#">
                    <button>
                    Gallery sign in
                </button>
                </a>
            </div>
            </div>
        </div>
        <div className='bottom-nav'>
            <ul>
                {NavBottomComps.map((navItem,index) => (
                    <li 
  key={navItem.id} 
  onClick={() => setActiveIndex(index)}
  className={`nav-item ${activeIndex === index ? 'active' : ''}`}
>

                        <NavLink to={navItem.href}>
                            {navItem.item}
                         {index !== NavBottomComps.length - 1 && (
            <div
              className={`separator ${activeIndex === index ? 'active-separator' : ''}`}
            ></div>
          )}
                        </NavLink>
                    </li>
                ))}
            </ul>
         
    
        </div>
        <div className="toggle-btn-container">
        <button onClick={toggleNavbar}>
            {bars ? '' : <ImMenu/>}
        </button>
    </div>
        {bars && (
                <div className="mobile-menu">
                     <div className="mobile-menu-header">
            <button onClick={toggleNavbar} className="close-btn"><RiCloseLargeFill/></button>
        </div>
                    <ul className="menu-list">
                        {NavBottomComps.map((navItem, index) => (
                            <li key={index}>
                                <a href={navItem.href}>{navItem.item}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="menu-buttons">
                        <a href="#" className="about-btn">About the site</a>
                        <a href="#" className="signin-btn">Gallery sign in</a>
                    </div>
                </div>
            )}
    </div>
  )
}

export default Navbar