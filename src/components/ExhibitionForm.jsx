import React, { useState, useEffect } from "react";

const ExhibitionForm = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [exhibitions, setExhibitions] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    start_date: "",
    end_date: "",
    artistFirstName: "",
    artistLastName: "",
    description: "",
    exhibitionImage: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);

  // ✅ For displaying DD-MM-YYYY
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}-${m}-${y}`;
  };

  // ✅ For input (API might return DD-MM-YYYY)
  const toInputDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts[0].length === 4) return dateStr; // already YYYY-MM-DD
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  // ✅ For sending back to API
  const toApiDate = (dateStr) => dateStr || "";

  const exhibitionDates =
    formData.start_date || formData.end_date
      ? `${formatDate(formData.start_date)} - ${formatDate(formData.end_date)}`
      : "";

  // ✅ Handle input changes
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

  // ✅ Fetch all exhibitions
  const fetchExhibitions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${baseUrl}/api/my-exhibitions/`, {
        headers: { Authorization: `Token ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load exhibitions");
      const data = await res.json();
      setExhibitions(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchExhibitions();
  }, []);

  // ✅ Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!formData.title || !formData.artistFirstName) {
      alert("Exhibition title and artist first name are required.");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("start_date", toApiDate(formData.start_date));
      fd.append("end_date", toApiDate(formData.end_date));
      fd.append("description", formData.description);

      // 🔹 Send artists
      const artistPayload = [
        { first_name: formData.artistFirstName, last_name: formData.artistLastName },
      ];
      fd.append("artists", JSON.stringify(artistPayload));

      if (formData.exhibitionImage) {
        fd.append("images", formData.exhibitionImage);
      }

      let url = `${baseUrl}/api/my-exhibitions/`;
      let method = "POST";

      if (editing && formData.id) {
        url = `${baseUrl}/api/exhibitions/${formData.id}/`;
        method = "PATCH";  
      }

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Token ${token}` },
        body: fd,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to save exhibition");
      }

      setSuccess(editing ? "Exhibition updated!" : "Exhibition added!");
      setError("");
      fetchExhibitions();
      resetForm();
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  // ✅ Edit
  const handleEdit = (exhibition) => {
    const firstArtist = exhibition.artists?.[0] || {};
    setFormData({
      id: exhibition.id,
      title: exhibition.title,
      start_date: toInputDate(exhibition.start_date),
      end_date: toInputDate(exhibition.end_date),
      artistFirstName: firstArtist.first_name || "",
      artistLastName: firstArtist.last_name || "",
      description: exhibition.description,
      exhibitionImage: null,
    });
    setPreviewImage(exhibition.images?.[0]?.image || null);
    setEditing(true);
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${baseUrl}/api/exhibitions/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });
      console.log(res);
      
      if (!res.ok) throw new Error("Failed to delete exhibition");
      setExhibitions((prev) => prev.filter((ex) => ex.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      id: null,
      title: "",
      start_date: "",
      end_date: "",
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

      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form className="exhibition-form" onSubmit={handleSubmit}>
        <div className="wrap-in-line">
          <div>
            <label>Artist First Name * : </label>
            <input
              type="text"
              name="artistFirstName"
              value={formData.artistFirstName}
              onChange={handleChange}
              placeholder="Enter artist first name"
            />
          </div>
          <div>
            <label>Artist Last Name *</label>
            <input
              type="text"
              name="artistLastName"
              value={formData.artistLastName}
              onChange={handleChange}
              placeholder="Enter artist last name"
            />
          </div>
        </div>

        <label>Exhibition Name* : </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter exhibition name"
        />

        <label>Exhibition Dates* : </label>
        <input type="text" value={exhibitionDates} readOnly />

        <div className="wrap-in-line">
          <div>
            <label>Start Date : </label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>End Date : </label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
            />
          </div>
        </div>

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write exhibition description..."
          rows="6"
          cols="50"
          style={{ resize: "none" }}
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
          <button
            type="button"
            onClick={resetForm}
            style={{ marginLeft: "10px" }}
          >
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
            <li key={ex.id} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
      <strong>
        {ex.title
          ? ex.title.length > 20
            ? ex.title.slice(0, 20) + "..."
            : ex.title
          : "Untitled"}
      </strong>
      <div className="actions" style={{ marginLeft: "10px" }}>
        <button onClick={() => handleEdit(ex)}>Modify</button>
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
