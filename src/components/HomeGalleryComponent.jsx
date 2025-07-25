import React from 'react'
import { GalleryItems } from '../constants/items'
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookSquare } from "react-icons/fa";
import '../components/ResponsiveLayout.css';

const HomeGalleryComponent = () => {
  return (
    <div className='main-gallery-container'>
        {
            GalleryItems.map((component)=>(
                <div key={component.id} className={`main-comp-wrapper ${!component.items || component.items.length === 0 ? 'main-comp-wrapper-no-exhibition' : ''}`}>
                    <div className='left-side'>
                        <div className='left-first-row'>
                            <p><span className='company-name'>{component.name}</span>, <span className='company-website'>
                                {component.website}</span></p>
                            <div className={component.status === 'Open' ? 'status-open' : 'status-closed'}>
  {component.status}
</div>
                        </div>
                        <div className='left-second-row'>
                            <img src={component.image} alt="" />
                            <div>
                                <p className='left-address'>{component.address}</p>
                                <p className='left-contact-no'>{component.contact_no}</p>
                                <p className='opening-hours'>
                                    Opening Hours <br/>
                                    <span>Mon-Thu {component.opening_hours_weekdays}<br/>
                                    Fri-Sun {component.opening_hours_weekends}</span>
                                </p>
                            </div>
                        </div>
                        <div className='left-third-row'>
                            Gallery Overview
                            <p>{component.overview}</p>
                        </div>
                        <div className='left-more-btn'>
                            <a href="#">
                                + More
                            </a>
                        </div>
                        <div className='left-fourth-row'>
                            <div className='social-icons'>
                                <a href={component.instagram_url}>
                                    <TiSocialInstagram/>
                                </a>
                                <a href={component.facebook_url}>
                                    <FaFacebookSquare/>
                                </a>
                            </div>
                            <div className='planner-icons'>
                                <a href="#" className='add-to-planner-btn'>Add to Personal Planner</a>
                                {/* <a href={component.location_on_map}>Show on Map</a> */}
                                <a href='show-on-map'>Show on Map</a>
                            </div>
                        </div>
                    </div>
                    <div className='partition'></div>
                    <div className='right-side'>
  {component.items && component.items.length > 0 ? (
    component.items.map((item, index) => (
        <div key={item.id}>
            <div className='right-gallery-item'>
                <div className='left-side-details'>
                    <h4>{item.item_name}</h4>
                    <p className='artist-name'>Artist : <span>{item.item_artist}</span></p>
                    <p className='date-of-exhibition'>Date of Exhibition : <span>{item.item_exhibition_date}</span></p>
                    <p className='gallery-item-overview'>{item.item_details}</p>
                </div>
                <div>
                    <img src={item.item_image} alt="" />
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
  )
}

export default HomeGalleryComponent