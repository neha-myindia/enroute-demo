import React, {useState, useEffect} from 'react'
import { FaSearch } from "react-icons/fa";
import './Navbar.css';
import {NavBottomComps} from '../../constants/items.jsx';
import { ImMenu } from "react-icons/im";
import { RiCloseLargeFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {

  const [credentials, setCredentials] = useState({
  external_user_id: "",
  password: ""
});

const handleChange = (e) => {
  setCredentials({
    ...credentials,
    [e.target.name]: e.target.value
  });
};

    const [activeIndex, setActiveIndex] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const navigate=useNavigate();

    const[bars, setBars]=useState(false)
    const toggleNavbar = () => {
    setBars(prev => !prev);
    console.log("Toggled navbar:", !bars);
};

 useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showLogin]);
  const baseUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${baseUrl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    const data = await response.json();
    console.log("Login Success:", data);

    // Example: Save token in localStorage
    localStorage.setItem("authToken", data.token);

    // Redirect to dashboard or gallery page
    navigate("/login-page");

    setShowLogin(false); // close modal
  } catch (error) {
    console.error("Login error:", error.message);
    alert("Invalid credentials, please try again.");
  }
};


  return (
    <div className='container'>
        <div className='top-nav'>
            <div className='logo-warpper'>
            <img src="../enroute-logo.png" alt="" />
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
                   <button onClick={() => setShowLogin(true)}>
                    Gallery sign in
                </button>
                </a>
            </div>
            </div>
        </div>
          {showLogin && (
        <div className="modal-overlay">
         
          <div className="modal-content">
            <div className='image-wrapper'>
                <img src="loginpop-image.jpg" alt="" style={{width:"100%"}}/>
            </div>
            <div className='modal-form-wrapper'>
                <button type="button" onClick={() => setShowLogin(false)} className='close-btn'>
                X
              </button>
                <h1>Sign In</h1>
                <form action="">
                    <div className='login-input'>
                        <label htmlFor="external_user_id">Username</label>
                    <input 
  type="text" 
  name="external_user_id"
  value={credentials.external_user_id} 
  onChange={handleChange}
/>
                    </div>
                    <div className='login-input'>
                        <label htmlFor="password">Password</label>
                    <input 
  type="password" 
  name="password"
  value={credentials.password} 
  onChange={handleChange}
/>
                    </div>
                    <div style={{display:"flex",alignItems:"center",margin:"1rem 0 2rem 0",justifyContent:"space-between",color:"#1150a3",fontSize:"14px"}}>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <input type="checkbox" name="" id="" />Remember me
                        </div>
                        <div>Forgot Password?</div>
                    </div>
                    <button onClick={handleSubmit} style={{backgroundColor:"#363636",color:"#ffffff"}}>Sign In</button>
                </form>
            </div>
          </div>
        </div>
      )}
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