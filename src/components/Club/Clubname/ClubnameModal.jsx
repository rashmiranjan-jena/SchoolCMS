import React, { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClubnameModal = ({ setRefresh }) => {
  const [clubName, setClubName] = useState("");
  const [keyContents, setKeyContents] = useState([""]); // Initialize with one empty key content field
  const [aboutClub, setAboutClub] = useState("");
  const [errors, setErrors] = useState({
    clubName: "",
    logo: "",
    keyContents: "", // Error for key content
    aboutClub: "",
  });

  const logoRef = useRef(null);

  const handleKeyContentChange = (e, index) => {
    const updatedKeyContents = [...keyContents];
    updatedKeyContents[index] = e.target.value;
    setKeyContents(updatedKeyContents);
  };

  const handleAddKeyContent = () => {
    setKeyContents([...keyContents, ""]); // Add a new empty key content field
  };

  const handleRemoveKeyContent = (index) => {
    // Ensure at least one key content is present
    if (keyContents.length > 1) {
      const updatedKeyContents = keyContents.filter((_, i) => i !== index);
      setKeyContents(updatedKeyContents); // Remove the specified key content field
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {
      clubName: clubName ? "" : "Club Name is required.",
      keyContents: keyContents.some((content) => content === "") 
        ? "All Key Contents must be filled." 
        : "", // Validate all key contents
      aboutClub: aboutClub ? "" : "About Club is required.",
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("club_name", clubName);
      formData.append("logo", logoRef.current.files[0]);
      formData.append("key_contents", JSON.stringify(keyContents)); // Add key contents array
      formData.append("about_club", aboutClub);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE}/api/club_master/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Club details saved successfully!");
        setClubName("");
        setKeyContents([""]); // Reset to one empty field
        setAboutClub("");
        setErrors({});

        logoRef.current.value = "";

        setRefresh(Math.random());
      } else {
        toast.error("Failed to save club details.");
      }
    } catch (error) {
      toast.error("An error occurred while saving the club details.");
    }
  };

  const handleCancel = () => {
    setClubName("");
    setKeyContents([""]); // Reset to one empty field
    setAboutClub("");
    setErrors({});
    logoRef.current.value = "";
  };

  return (
    <>
      <div id="add_user" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-md"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Club Name Master</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCancel}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Club Name */}
                <div className="mb-3">
                  <label className="form-label">
                    Club Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Club Name"
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                  />
                  {errors.clubName && (
                    <div className="text-danger">{errors.clubName}</div>
                  )}
                </div>

                {/* Key Content Fields */}
                <div className="mb-3">
                  <label className="form-label">
                    Key Content <span className="text-danger">*</span>
                  </label>
                  {keyContents.map((keyContent, index) => (
                    <div key={index} className="d-flex mb-2">
                      <input
                        className="form-control me-2"
                        type="text"
                        placeholder={`Key Content ${index + 1}`}
                        value={keyContent}
                        onChange={(e) => handleKeyContentChange(e, index)}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-danger ms-2"
                        onClick={() => handleRemoveKeyContent(index)}
                        disabled={keyContents.length === 1} 
                      >
                        <i className="bi bi-dash-circle">-</i>
                      </button>
                      {index === keyContents.length - 1 && (
                        <button
                          type="button"
                          className="btn btn-outline-primary ms-2"
                          onClick={handleAddKeyContent}
                        >
                          <i className="bi bi-plus-circle">+</i>
                        </button>
                      )}
                    </div>
                  ))}
                  {errors.keyContents && (
                    <div className="text-danger">{errors.keyContents}</div>
                  )}
                </div>

                {/* Logo Upload */}
                <div className="mb-3">
                  <label className="form-label">Logo</label>
                  <input
                    ref={logoRef} // Attach the ref to the file input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    placeholder="Upload Club Logo"
                  />
                  {errors.logo && <div className="text-danger">{errors.logo}</div>}
                </div>

                {/* About Club */}
                <div className="mb-3">
                  <label className="form-label">About Club</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter details about the club"
                    value={aboutClub}
                    onChange={(e) => setAboutClub(e.target.value)}
                  ></textarea>
                  {errors.aboutClub && (
                    <div className="text-danger">{errors.aboutClub}</div>
                  )}
                </div>

                {/* Save and Cancel Buttons */}
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary me-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default ClubnameModal;
