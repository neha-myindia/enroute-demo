import React, { useState } from "react";

const ExhibitionForm = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    exhibitionName: "",
    exhibitionDates: "",
     artistFirstName: "",
     artistLastName: "",
    description: "",
    exhibitionImage: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "exhibitionImage") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, exhibitionImage: file }));
      setPreviewImage(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.exhibitionName || !formData.artistName) {
      alert("Exhibition name and artist name are required.");
      return;
    }

    if (editing) {
      // Update existing exhibition
      setExhibitions((prev) =>
        prev.map((ex) => (ex.id === formData.id ? { ...formData } : ex))
      );
      setEditing(false);
    } else {
      // Add new exhibition
      const newExhibition = {
        ...formData,
        id: Date.now(),
      };
      setExhibitions((prev) => [...prev, newExhibition]);
    }

    resetForm();
  };

  const handleEdit = (exhibition) => {
    setFormData(exhibition);
    setPreviewImage(
      exhibition.exhibitionImage instanceof File
        ? URL.createObjectURL(exhibition.exhibitionImage)
        : null
    );
    setEditing(true);
  };

  const handleDelete = (id) => {
    setExhibitions((prev) => prev.filter((ex) => ex.id !== id));
    if (formData.id === id) resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: null,
      exhibitionName: "",
      exhibitionDates: "",
       artistFirstName: "",
     artistLastName: "",
      description: "",
      exhibitionImage: null,
    });
    setPreviewImage(null);
    setEditing(false);
  };

  return (
    <div className="exhibition-wrapper">
      <h2>{editing ? "Edit Exhibition" : "Add Exhibition"}</h2>
      <form className="exhibition-form" onSubmit={handleSubmit}>
        <div className="wrap-in-line"><div><label>Artist First Name * : </label>
      <input
        type="text"
        name="artistFirstName"
        value={formData.artistFirstName}
        onChange={handleChange}
        placeholder="Enter artist first name"
      /></div>
       <div><label>Artist Last Name *</label>
      <input
        type="text"
        name="artistLastName"
        value={formData.artistLastName}
        onChange={handleChange}
        placeholder="Enter artist last name"
      /></div></div>
      <label>Exhibition Name* : </label>
        <input
          type="text"
          name="exhibitionName"
          value={formData.exhibitionName}
          onChange={handleChange}
          placeholder="Enter exhibition name"
        /><label>Exhibition Dates : </label>
        <input
          type="text"
          name="exhibitionDates"
          value={formData.exhibitionDates}
          onChange={handleChange}
          placeholder="e.g. 1 Jan - 20 Jan 2025"
        />
    

          

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write exhibition description..."
          rows="6" cols="50"
        style={{resize: "none"}}
        maxLength={1000}
        ></textarea>

        <label>Exhibition Image</label>
        <input
          type="file"
          name="exhibitionImage"
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

        <button type="submit">{editing ? "Update" : "Add"}</button>
        {editing && (
          <button type="button" onClick={resetForm} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        )}
      </form>

      <h3>Existing Exhibitions</h3>
      {exhibitions.length === 0 ? (
        <p>No exhibitions yet.</p>
      ) : (
        <ul className="exhibition-list">
          {exhibitions.map((ex) => (
            <li key={ex.id}>
              <strong>{ex.exhibitionName}</strong> ({ex.artistName}) - {ex.exhibitionDates}
              <div className="actions">
                <button onClick={() => handleEdit(ex)}>Edit</button>
                <button onClick={() => handleDelete(ex.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExhibitionForm;
