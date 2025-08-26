import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookSquare } from "react-icons/fa";
import '../components/ResponsiveLayout.css';

const GalleryItemDetails = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const { state } = useLocation();
  const navigate = useNavigate();
  const galleryId = state?.id;

  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    if (!galleryId) {
      navigate('/gallery-list');
      return;
    }

    window.scrollTo(0, 0);

    const fetchDetails = async () => {
      try {
        const res = await fetch(`${baseUrl}/galleries/${galleryId}/`);
        const data = await res.json();
        setGallery(data);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      }
    };

    fetchDetails();
  }, [galleryId]);

  if (!gallery) return <p>Loading...</p>;

  return (
    <div className='filter-container gallery-item-details-container'>
      <h1>{gallery.name}</h1>
      <div className='details-container'>
        <div className={`main-comp-wrapper main-comp-wrapper-details ${!gallery.exhibitions || gallery.exhibitions.length === 0 ? 'main-comp-wrapper-no-exhibition' : ''}`}>
          <div className='left-side'>
            <div className='left-second-row'>
             <img
  src={gallery.images && gallery.images.length > 0 ? gallery.images[0].image : 'img1.jpg'}
  alt="Gallery"
/>

              <div>
                <p className='company-name'>{gallery.email}</p>
                <p className='left-address'>{gallery.address} | {gallery.contact_number}</p>
                <p className='opening-hours left-opening-hours'>
                  <span className='left-opening-hours-heading'>Opening Hours:</span>
                  <span>{gallery.opening_hours_full}</span>
                </p>
                <div className={gallery.status === 'open' ? 'status-open' : 'status-closed'}>
                  {gallery.status}
                </div>
                <p>{gallery.overview}</p>
              </div>
            </div>
          </div>

          <div className='partition'></div>

          <div className='right-side'>
            <h2>Current Exhibition</h2>
            {gallery.exhibitions && gallery.exhibitions.length > 0 ? (
              gallery.exhibitions.map((item, index) => (
                <div key={item.id}>
                  <div className='right-gallery-item'>
                    <div style={{height:"250px",width:"375px",display: "flex",alignItems: "center", justifyContent: "center"}}><img src={item.images && item.images.length > 0 ? item.images[0].image : 'img2.jpg'} alt={item.item_name}  style={{width:"100%",height:"100%",objectFit:"contain"}}/></div>
                    <div className='left-side-details'>
                      <h4>{item.title}</h4>
                      <p className='artist-name'>Artist : <span>{item.artist}</span></p>
                      <p className='date-of-exhibition'>Date of Exhibition : <span>{item.start_date} - {item.end_date}</span></p>
                      <p className='gallery-item-overview'>{item.description}</p>
                    </div>
                  </div>
                  {index !== gallery.exhibitions.length - 1 && <hr className='partition-line' />}
                </div>
              ))
            ) : (
              <div className='no-exhibition-reminder'>
                <p>No exhibitions for the selected date range.</p>
              </div>
            )}
            <div className='left-fourth-row'>
                    <div className='planner-icons'>
                      <a href="#" className='add-to-planner-btn'>Add to Personal Planner</a>
                      <a href={`/show-on-map/${gallery.id}`}>Show on Map</a>
                    </div>
                    <div className='social-icons'>
                      <a href={gallery.instagram} target='_blank'><TiSocialInstagram /></a>
                      <a href={gallery.facebook} target='_blank'><FaFacebookSquare /></a>
                    </div>
                  </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryItemDetails;
