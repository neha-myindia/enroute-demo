import React, { useState } from "react";

const SaleForm = () => {
  const [formData, setFormData] = useState({
    artistName: "",
    artImage: null,
    artPrice: "",
    galleryName: "",
    contactNumber: "",
    artName: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "artImage") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, artImage: file }));
      setPreviewImage(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.artistName || !formData.artName || !formData.artPrice) {
      setError("Artist name, Art name, and Art price are required.");
      return;
    }

    if (isNaN(formData.artPrice)) {
      setError("Art price must be a valid number.");
      return;
    }

    // 🔐 Here you'd normally call your API endpoint to save art for sale
    // Example: await api.post("/art-for-sale", formData);

    setSuccess("Artwork successfully listed for sale!");
    setFormData({
      artistName: "",
      artImage: null,
      artPrice: "",
      galleryName: "",
      contactNumber: "",
      artName: "",
    });
    setPreviewImage(null);
  };

  return (
    <form className="sale-form" onSubmit={handleSubmit}>
      <h2>Put Artwork For Sale</h2>

      <label>Artist Name *</label>
      <input
        type="text"
        name="artistName"
        value={formData.artistName}
        onChange={handleChange}
        placeholder="Enter artist name"
      />

      <label>Art Name *</label>
      <input
        type="text"
        name="artName"
        value={formData.artName}
        onChange={handleChange}
        placeholder="Enter artwork name"
      />

      <label>Art Price (₹) *</label>
      <input
        type="text"
        name="artPrice"
        value={formData.artPrice}
        onChange={handleChange}
        placeholder="Enter price"
      />

      <label>Gallery Name</label>
      <input
        type="text"
        name="galleryName"
        value={formData.galleryName}
        onChange={handleChange}
        placeholder="Enter gallery name"
      />

      <label>Contact Number</label>
      <input
        type="tel"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        placeholder="Enter contact number"
      />

      <label>Art Image</label>
      <input
        type="file"
        name="artImage"
        accept="image/*"
        onChange={handleChange}
      />
      {previewImage && (
        <img
          src={previewImage}
          alt="Art Preview"
          style={{ width: "120px", marginTop: "10px", borderRadius: "6px" }}
        />
      )}

      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default SaleForm;
