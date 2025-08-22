import React, { useState } from "react";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    // 🔐 Normally here you’d call your API
    // Example: await api.post("/change-password", formData);

    setSuccess("Password changed successfully!");
    setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <form className="password-form" onSubmit={handleSubmit}>
      <h2>Change User-ID and password page</h2>

      <label>Old Username</label>
      <input
        type="password"
        name="oldPassword"
        value={formData.oldPassword}
        onChange={handleChange}
        placeholder="Enter old password"
      />

      <label>New Username</label>
      <input
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        placeholder="Enter new password"
      />

      <label>Confirm New Username</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm new password"
      />

      <button type="submit">Update Username</button>

      <label>Old Password</label>
      <input
        type="password"
        name="oldPassword"
        value={formData.oldPassword}
        onChange={handleChange}
        placeholder="Enter old password"
      />

      <label>New Password</label>
      <input
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        placeholder="Enter new password"
      />

      <label>Confirm New Password</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm new password"
      />

      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <button type="submit">Update Password</button>
      
    </form>
  );
};

export default ChangePasswordForm;
