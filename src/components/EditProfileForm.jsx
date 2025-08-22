import React, { useState,useEffect,useRef } from "react";

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    galleryName: "",
    galleryArea: "",
    address: "",
    contactNumber: "",
    suburb: "",
    state: "",
    postcode: "",
    website: "",
    openingHours: "",
    closedDays: "",
    galleryOverview: "",
    galleryImage: null,
    instagram: "",
    facebook: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "galleryImage") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, galleryImage: file }));
      setPreviewImage(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation example (add more as needed)
    if (!formData.galleryName || !formData.contactNumber) {
      setError("Gallery name and contact number are required.");
      return;
    }

    // 🔐 Here you’d call your API with `formData`
    // Example: await api.post("/update-profile", formData);

    setSuccess("Profile updated successfully!");
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
  let updated = formData.closedDays
    ? formData.closedDays.split(", ").map((d) => d.trim())
    : [];

  if (updated.includes(fullDay)) {
    // remove if already selected
    updated = updated.filter((d) => d !== fullDay);
  } else {
    // add new
    updated.push(fullDay);
  }

  setFormData((prev) => ({
    ...prev,
    closedDays: updated.join(", "),
  }));
};



  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>

      <label>Gallery Name *</label>
      <input
        type="text"
        name="galleryName"
        value={formData.galleryName}
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
      />

      <div className="wrap-in-line">
        <div><label>Suburb : </label>
      <input
        type="text"
        name="suburb"
        value={formData.suburb}
        onChange={handleChange}
        placeholder="Enter suburb"
      /></div>

      <div><label>Area : </label>
      <input
        type="text"
        name="galleryArea"
        value={formData.galleryArea}
        onChange={handleChange}
        placeholder="Enter gallery area"
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
      /></div>

      <div><label>Postcode : </label>
      <input
        type="text"
        name="postcode"
        value={formData.postcode}
        onChange={handleChange}
        placeholder="Enter postcode"
      /></div>
     </div>

        
      <label>Phone Number *</label>
      <input
        type="tel"
        name="contactNumber"
        value={formData.contactNumber}
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
        type="url"
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
      name="closedDays"
      value={formData.closedDays}
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
    formData.closedDays?.includes(daysMap[dayKey]) ? "selected" : ""
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
        name="galleryOverview"
        value={formData.galleryOverview}
        onChange={handleChange}
        placeholder="Write a brief overview..."
        rows="6"  class="textarea-custom"
        style={{resize: "none",width: "auto"}}
      ></textarea>

      <label>Gallery Image</label>
      <input
        type="file"
        name="galleryImage"
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

    <div className="wrap-in-line social-links">
       <div>
       <label>Instagram : </label>
      <input
        type="url"
        name="instagram"
        value={formData.instagram}
        onChange={handleChange}
        placeholder="https://instagram.com/yourprofile"
      />
     </div>

      <div>
        <label>Facebook : </label>
      <input
        type="url"
        name="facebook"
        value={formData.facebook}
        onChange={handleChange}
        placeholder="https://facebook.com/yourpage"
      />
      </div>

      

    </div>
    <div className="wrap-in-line">
       <div>
  <label>Paid Until : </label>
  <input
    type="text"
    name="state"
    value={formData.state}
    disabled   // ✅ makes it non-editable but still submittable
    placeholder="Date"
  />
</div>

<div>
  <label>Gallery status : </label>
  <input
    type="text"
    name="postcode"
    value={formData.postcode}
    disabled   // or use disabled if you want it greyed out
    placeholder="Active"
  />
</div>

     </div>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfileForm;
