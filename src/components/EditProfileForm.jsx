import React, { useState,useEffect,useRef } from "react";
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')   // remove special characters
    .replace(/\s+/g, '-')           // spaces → dash
    .replace(/-+/g, '-')            // collapse multiple dashes
    .replace(/^-+|-+$/g, '');       // trim leading/trailing dashes
};

const EditProfileForm = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    address: "",
    contact_number: "",
    suburb: "",
    state: "",
    postcode: "",
    website: "",
    opening_hours_full: "",
    days_closed: "",
    overview: "",
    images: null,
    instagram: "",
    facebook: "",
    email: "",
    status: "",
    paid_until:null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  
  useEffect(() => {
  const fetchGallery = async () => {
    try {
     
      const token = localStorage.getItem("authToken");
console.log("Token in localStorage:", token);

      const res = await fetch(`${baseUrl}/api/my-gallery/`, {
        method: "GET",
        headers: {
  "Authorization": `Token ${token}`,
},
      });

      if (!res.ok) throw new Error("Failed to load gallery data");
      const data = await res.json();

      setFormData({
        ...data,
        images: null,
      });

      if (data.images) {
        setPreviewImage(data.images);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  fetchGallery();
}, []);


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, images: file }));
      setPreviewImage(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setError("");
    setSuccess("");
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        formDataToSend.append(key, formData[key]);
      }
    });

    const token = localStorage.getItem("authToken"); 

    const res = await fetch(`${baseUrl}/api/my-gallery/`, {
      method: "PATCH",
     headers: {
  "Authorization": `Token ${token}`,
},
      body: formDataToSend,
    });

    if (!res.ok) throw new Error("Failed to update gallery");

    setSuccess("Profile updated successfully!");
  } catch (err) {
    setError(err.message);
  }
};


const [showDropdown, setShowDropdown] = useState(false);

const daysMap = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const closedDaysRef = useRef(null);

useEffect(() => {
  const handleOutside = (e) => {
    if (closedDaysRef.current && !closedDaysRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };
  const handleEsc = (e) => {
    if (e.key === "Escape") setShowDropdown(false);
  };

  document.addEventListener("pointerdown", handleOutside);
  document.addEventListener("keydown", handleEsc);
  return () => {
    document.removeEventListener("pointerdown", handleOutside);
    document.removeEventListener("keydown", handleEsc);
  };
}, []);

const handleSelectDay = (dayKey) => {
  const fullDay = daysMap[dayKey];
  let updated = formData.days_closed
    ? formData.days_closed.split(", ").map((d) => d.trim())
    : [];

  if (updated.includes(fullDay)) {
   
    updated = updated.filter((d) => d !== fullDay);
  } else {
    
    updated.push(fullDay);
  }

  setFormData((prev) => ({
    ...prev,
    days_closed: updated.join(", "),
  }));
};

const navigate = useNavigate();

  const handleShowListing = () => {
    const slug = slugify(formData.name);
    navigate(`/${slug}`, { state: { id: formData.id } });
  };

  return (
    <form className="profile-form">
      <h2>Edit Profile</h2>

      <label>Gallery Name *</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter gallery name"
      />

   

      <label>Address</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Enter address"
        disabled
      />

      <div className="wrap-in-line">
        <div><label>Suburb : </label>
      <input
        type="text"
        name="suburb"
        value={formData.suburb}
        onChange={handleChange}
        placeholder="Enter suburb"
        disabled
      /></div>

      <div><label>Area : </label>
      <input
        type="text"
        name="area"
        value={formData.area}
        onChange={handleChange}
        placeholder="Enter gallery area"
        disabled
      /></div>
      </div>

     <div className="wrap-in-line">
       <div><label>State : </label>
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="Enter state"
        disabled
      /></div>

      <div><label>Postcode : </label>
      <input
        type="text"
        name="postcode"
        value={formData.postcode}
        onChange={handleChange}
        placeholder="Enter postcode"
        disabled
      /></div>
     </div>

        
      <label>Phone Number *</label>
      <input
        type="tel"
        name="contact_number"
        value={formData.contact_number}
        onChange={handleChange}
        placeholder="Enter contact number"
      />

      
      <label>Email *</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter email"
      />

      <label>Website</label>
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        placeholder="https://example.com"
      />

      <div className="wrap-in-line">
        <div className="wrap-in-line">
  <label>Opening Hours : </label>
  <div style={{ display: "flex", gap: "10px" ,alignItems:"center"}}>
    <input
      type="time"
      name="openFrom"
      value={formData.openFrom}
      onChange={handleChange}
    />
    <span>to</span>
    <input
      type="time"
      name="openUntil"
      value={formData.openUntil}
      onChange={handleChange}
    />
  </div>
</div>

    
<div ref={closedDaysRef} className="wrap-in-line">
  <label>Closed Days : </label>
  <div style={{ position: "relative" }}>
    <input
      type="text"
      name="days_closed"
      value={formData.days_closed}
      readOnly
      placeholder="e.g. Sunday"
      onClick={() => setShowDropdown((prev) => !prev)}
    />

    {showDropdown && (
      <div className="edit-profile-days-dropdown" 
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          background: "#fff",
          border: "1px solid #ccc",
          padding: "8px",
          display: "flex",
          gap: "8px",
          zIndex: 100,
          flexWrap: "wrap",
        }}
      >
        {Object.keys(daysMap).map((dayKey) => (
          <span
            key={dayKey}
            onClick={() => handleSelectDay(dayKey)}
            className={`edit-profile-form-days ${
    formData.days_closed?.includes(daysMap[dayKey]) ? "selected" : ""
  }`}
          >
            {dayKey}
          </span>
        ))}
      </div>
    )}
  </div>
</div>



      </div>

      <label>Gallery Overview</label>
      <textarea
        name="overview"
        value={formData.overview}
        onChange={handleChange}
        placeholder="Write a brief overview..."
        rows="6"  class="textarea-custom"
        style={{resize: "none",width: "auto"}}
        maxLength={1000}
      ></textarea>

      <label>Gallery Image</label>
      <input
        type="file"
        name="images"
        accept="image/*"
        onChange={handleChange}
      />
      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          style={{ width: "120px", marginTop: "10px", borderRadius: "6px" }}
        />
      )}


      
       <label>Instagram : </label>
      <input
        type="text"
        name="instagram"
        value={formData.instagram}
        onChange={handleChange}
        placeholder="https://instagram.com/yourprofile"
      />
     

     
        <label>Facebook : </label>
      <input
        type="text"
        name="facebook"
        value={formData.facebook}
        onChange={handleChange}
        placeholder="https://facebook.com/yourpage"
      />
   
      

  
    <div className="wrap-in-line">
       <div>
  <label>Paid Until : </label>
  <input
    type="text"
    name="paid_until"
    value={formData.paid_until}
    disabled   
    placeholder="null"
  />
</div>

<div>
  <label>Gallery status : </label>
  <input
    type="text"
    name="status"
    value={formData.status}
    disabled   
    placeholder="Active"
  />
</div>

     </div>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div className="preview-btn" 
        onClick={() => setShowPreview(true)}>Preview</div>
        <button onClick={handleSubmit}>Save Changes</button>
        <div className="show-gallery-listing-btn"
        onClick={handleShowListing}>Show gallery listing</div>
      </div>
        {showPreview && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            

            <div className='left-side' style={{width:"100%"}}>
            <div className='left-second-row'>
             {previewImage && <img src={previewImage} alt="Preview" style={{ width: "100%", borderRadius: "6px" }} />}

              <div>
                <p><b>Gallery Name:</b> {formData.name}</p>
                <p><b>Email:</b>{formData.email}</p>
                <p><b>Website:</b>{formData.website}</p>
                <p className='left-address'><b>Address:</b>{formData.address}, {formData.suburb}, {formData.area}, {formData.state}, {formData.postcode} | {formData.contact_number}</p>
                <p>
                  <b>Opening Hours:</b>
                  <span>{formData.opening_hours_full}</span>
                </p>
                 <p>
                  <b>Closed days:</b>
                  <span>{formData.days_closed}</span>
                </p>
                <div className={formData.status === 'open' ? 'status-open' : 'status-closed'} style={{display:"inline-block"}}>
                  {formData.status}
                </div>
                <p>{formData.overview}</p>
              </div>
            </div>
          </div>
          <div>
            <div className='left-fourth-row'>
                             
                                <div className='social-icons'>
                                  <a href={formData.instagram} target='_blank'><TiSocialInstagram /></a>
                                  <a href={formData.facebook} target='_blank'><FaFacebookSquare /></a>
                                </div>
                              </div>
          </div>

            <div style={{ textAlign: "right", marginTop: "15px" }}>
              <button onClick={() => setShowPreview(false)} style={{ padding: "6px 15px" }}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
     
  );
};

export default EditProfileForm;
