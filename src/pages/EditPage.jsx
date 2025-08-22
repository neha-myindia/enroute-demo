import React,{useState,memo} from 'react'



import EditProfileForm from '../components/EditProfileForm';

import ExhibitionForm from '../components/ExhibitionForm';

import SaleForm from '../components/SaleForm';

import ChangePasswordForm from "../components/ChangePasswordForm"; 

const EditPage = () => {

    const [activeTab, setActiveTab] = useState("edit");

  const renderForm = () => {
    switch (activeTab) {
      case "edit":
        return <EditProfileForm />;
      case "exhibition":
        return <ExhibitionForm />;
      case "sale":
        return <SaleForm />;
      case "password":
        return <ChangePasswordForm />;
      default:
        return null;
    }
  };


  return (
    <div className="login-container" style={{marginTop: "5rem"}}>
      {/* Top Options */}
      <div className="tab-buttons">
        <button
          className={activeTab === "edit" ? "active" : ""}
          onClick={() => setActiveTab("edit")}
        >
          Edit Profile
        </button>
        <button
          className={activeTab === "exhibition" ? "active" : ""}
          onClick={() => setActiveTab("exhibition")}
        >
          Add / Modify Exhibition
        </button>
        <button
          className={activeTab === "sale" ? "active" : ""}
          onClick={() => setActiveTab("sale")}
        >
          Put For Sale
        </button>
        <button
          className={activeTab === "password" ? "active" : ""}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
      </div>

      {/* Form Display */}
      <div className="form-container">{renderForm()}</div>
    </div>
  )
}

export default EditPage