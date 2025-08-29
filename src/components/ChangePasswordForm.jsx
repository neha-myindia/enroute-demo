import React, { useState, useEffect } from "react";

const ChangePasswordForm = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    oldUsername: "",
    newUsername: "",
    confirmUsername: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    setToken(savedToken);
    console.log("Token in localStorage:", savedToken);

    // optional GET check
    // if your backend expects a GET request to verify token
    if (savedToken) {
      fetch(`${baseUrl}/change-credentials/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${savedToken}`,
        },
      }).catch((err) => setError(err.message));
    }
  }, [baseUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  // ---------- USERNAME SUBMIT ----------
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();

    if (!formData.oldUsername || !formData.newUsername || !formData.confirmUsername) {
      setError("All fields are required.");
      return;
    }

    if (formData.newUsername.length < 6) {
      setError("New userid must be at least 6 characters long.");
      return;
    }

    if (formData.newUsername !== formData.confirmUsername) {
      setError("New userid and confirmation do not match.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/change-credentials/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          old_username: formData.oldUsername,
          new_username: formData.newUsername,
          confirm_new_username: formData.confirmUsername,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update User-id.");
      }

      setSuccess("User-id changed successfully!");
      setFormData((prev) => ({
        ...prev,
        oldUsername: "",
        newUsername: "",
        confirmUsername: "",
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  // ---------- PASSWORD SUBMIT ----------
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

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

    try {
      const response = await fetch(`${baseUrl}/change-credentials/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          old_password: formData.oldPassword,
          new_password: formData.newPassword,
          confirm_new_password: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update password.");
      }

      setSuccess("Password changed successfully!");
      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="password-form">
      <form className="password-form" onSubmit={handleUsernameSubmit}>
        <h2>Change User-ID and Password Page</h2>

        <label>Old User-id</label>
        <input
          type="text"
          name="oldUsername"
          value={formData.oldUsername}
          onChange={handleChange}
          placeholder="Enter old Userid"
        />

        <label>New User-id</label>
        <input
          type="text"
          name="newUsername"
          value={formData.newUsername}
          onChange={handleChange}
          placeholder="Enter new Userid"
        />

        <label>Confirm New User-id</label>
        <input
          type="text"
          name="confirmUsername"
          value={formData.confirmUsername}
          onChange={handleChange}
          placeholder="Confirm new Userid"
        />

        <button type="submit">Update User-id</button>
      </form>

      <form className="password-form" onSubmit={handlePasswordSubmit}>
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
    </div>
  );
};

export default ChangePasswordForm;
