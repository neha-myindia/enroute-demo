import React, { useState } from "react";

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

      <label>Contact Number *</label>
      <input
        type="tel"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        placeholder="Enter contact number"
      />

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

      <label>Website</label>
      <input
        type="url"
        name="website"
        value={formData.website}
        onChange={handleChange}
        placeholder="https://example.com"
      />

      <div className="wrap-in-line">
        <div><label>Opening Hours : </label>
      <input
        type="text"
        name="openingHours"
        value={formData.openingHours}
        onChange={handleChange}
        placeholder="e.g. Mon-Fri 10am - 6pm"
      />
</div>
      <div><label>Closed Days : </label>
      <input
        type="text"
        name="closedDays"
        value={formData.closedDays}
        onChange={handleChange}
        placeholder="e.g. Sunday, Public Holidays"
      /></div>
      </div>

      <label>Gallery Overview</label>
      <textarea
        name="galleryOverview"
        value={formData.galleryOverview}
        onChange={handleChange}
        placeholder="Write a brief overview..."
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
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfileForm;
