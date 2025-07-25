import React from 'react';

export const ShowonMap = () => {
  return (
    <div className='map-container'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.5950112367304!2d-73.99625672483104!3d40.748936135354974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259afce41a2b1%3A0xb305cdae84e413bd!2s224%20W%2030th%20St%20%23304%2C%20New%20York%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2sin!4v1753432934106!5m2!1sen!2sin" width="1000" 
      height="650" 
      style={{ border: 0, width: "100%" }}
      allowfullscreen 
      loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
};

