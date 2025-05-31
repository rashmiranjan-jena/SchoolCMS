import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const ImportantLinkModal = ({ setRefresh }) => {
  const [errors, setErrors] = useState({});
  const [linkName, setLinkName] = useState(""); 
  const [linkUrl, setLinkUrl] = useState("");   
  const [description, setDescription] = useState(""); 

  const validateFields = (link_name, link_url, description) => {
    const newErrors = {};
    if (!link_name) newErrors.link_name = "Link Name is required.";
    if (!link_url) {
      newErrors.link_url = "URL is required.";
    } else if (!/^https?:\/\/.+/i.test(link_url)) {
      newErrors.link_url = "Please enter a valid URL.";
    }
    if (!description) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setErrors({});
  };

  const handleSave = async () => {
    if (validateFields(linkName, linkUrl, description)) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE}/api/important-links/`,
          {
            link_name: linkName,
            link_url: linkUrl,
            description,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          toast.success("Data saved successfully!");
          setRefresh(Math.random()); 
          resetForm(); 
        } else {
          throw new Error("Failed to save data");
        }
      } catch (error) {
        // Handle error
        toast.error("An error occurred while saving data.");
      }
    } else {
      toast.error("Please fix the errors before saving.");
    }
  };

  const resetForm = () => {
    setLinkName(""); // Reset Link Name
    setLinkUrl("");  // Reset URL
    setDescription(""); // Reset Description
  };

  return (
    <>
      <ToastContainer />
      <div id="add_user" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-md"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Important Link</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                {/* Link Name */}
                <div className="mb-3">
                  <label className="form-label">
                    Link Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="link_name"
                    value={linkName}
                    onChange={(e) => setLinkName(e.target.value)}
                    placeholder="Enter Link Name"
                  />
                  {errors.link_name && (
                    <small className="text-danger">{errors.link_name}</small>
                  )}
                </div>

                {/* URL */}
                <div className="mb-3">
                  <label className="form-label">
                    URL <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="url"
                    name="link_url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="Enter URL"
                  />
                  {errors.link_url && (
                    <small className="text-danger">{errors.link_url}</small>
                  )}
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Description"
                  ></textarea>
                  {errors.description && (
                    <small className="text-danger">{errors.description}</small>
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
                    aria-label="Close"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportantLinkModal;
