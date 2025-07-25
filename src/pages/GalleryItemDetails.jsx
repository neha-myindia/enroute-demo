import React,{useEffect} from 'react'
import { GalleryItemsDetails } from '../constants/items';
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookSquare } from "react-icons/fa";
import '../components/ResponsiveLayout.css';

const GalleryItemDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div className='filter-container gallery-item-details-container'>
       <h1>Defiance Gallery at Mary Place</h1>
       <div className='details-container'>
            {
                        GalleryItemsDetails.map((component)=>(
                            <div key={component.id} className={`main-comp-wrapper main-comp-wrapper-details ${!component.items || component.items.length === 0 ? 'main-comp-wrapper-no-exhibition' : ''}`}>
                                <div className='left-side'>
                                    <div className='left-first-row'>     
                                    </div>
                                    <div className='left-second-row'>
                                        <img src={component.image} alt="" />
                                        <div>
                                            <p className='company-name'>wwww.defiancegallery.com</p>
                                            <p className='left-address'>{component.address} | {component.contact_no}</p>
                                             <p className='opening-hours left-opening-hours'>
                                    <span className='left-opening-hours-heading'> Opening Hours :</span> 
                                    <span>Mon-Thu {component.opening_hours_weekdays}<br/>
                                    Fri-Sun {component.opening_hours_weekends}</span>
                                </p>
                                            <div className={component.status === 'Open' ? 'status-open' : 'status-closed'}>
              {component.status}
            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='partition'></div>
                                <div className='right-side'>
              {component.items && component.items.length > 0 ? (
                component.items.map((item, index) => (
                    <div key={item.id}>
                        <h2>Current Exhibition</h2>
                        <div className='right-gallery-item'>

                             <div>
                                <img src={item.item_image} alt="" />
                            </div>
                            <div className='left-side-details'>
                                <h4>{item.item_name}</h4>
                                <p className='artist-name'>Artist : <span>{item.item_artist}</span></p>
                                <p className='date-of-exhibition'>Date of Exhibition : <span>{item.item_exhibition_date}</span></p>
                                <p className='gallery-item-overview'>{item.item_details}</p>
                            </div>
                            
                        </div>
                        <div className='left-fourth-row'>
                                        <div className='planner-icons'>
                                            <a href="#" className='add-to-planner-btn'>Add to Personal Planner</a>
                                            {/* <a href={component.location_on_map}>Show on Map</a> */}
                                            <a href='show-on-map'>Show on Map</a>
                                        </div>
                                        <div className='social-icons'>
                                            <a href={component.instagram_url}>
                                                <TiSocialInstagram/>
                                            </a>
                                            <a href={component.facebook_url}>
                                                <FaFacebookSquare/>
                                            </a>
                                        </div>
                                    </div>
                        {index !== component.items.length - 1 && <hr className='partition-line' />}
                    </div>
                ))
            ) : (
                <div className='no-exhibition-reminder'>
                    <p>No exhibitions for the selected date range.</p>
                </div>
            )}
            
            
                                </div>
                            </div>
                        ))
                    }
       </div>
      </div>
  )
}

export default GalleryItemDetails