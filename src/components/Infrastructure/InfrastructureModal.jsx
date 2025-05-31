import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const InfrastructureModal = ({ setRefresh }) => {
  const [formData, setFormData] = useState({
    image: null,
    infra_structure_name: "",
    infra_structure_description: "", 
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "infra_structure_description") {
      const wordCount = value.split(/\s+/).filter(Boolean).length; 
      if (wordCount > 400) {
        setErrors((prev) => ({
          ...prev,
          infra_structure_description: "Description cannot exceed 400 words.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, infra_structure_description: "" }));
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.image) newErrors.image = "Photo is required.";
    if (!formData.infra_structure_name) newErrors.infra_structure_name = "Name is required.";
    if (!formData.infra_structure_description) 
      newErrors.infra_structure_description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setFormData({
      image: null,
      infra_structure_name: "",
      infra_structure_description: "", 
    });
  };

  const handleSave = async () => {
    if (validateFields()) {
      const formDataToSend = new FormData();
      formDataToSend.append("image", formData.image);
      formDataToSend.append("infra_structure_name", formData.infra_structure_name);
      formDataToSend.append("infra_structure_description", formData.infra_structure_description); 

      try {
        // Send POST request with form data
        const response = await axios.post(`${process.env.REACT_APP_BASE}/api/infra-structure/`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        });

        if (response.status === 201) {
          toast.success("Data saved successfully!");
          setRefresh(Math.random());
          handleClose();
        } else {
          toast.error("Error saving data. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        toast.error("Error saving data. Please try again.");
      }
    } else {
      console.log("Please fix the errors before saving.");
    }
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
              <h5 className="modal-title">Add Infrastructure</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                {/* Infrastructure Name */} 
                <div className="mb-3">
                  <label className="form-label">
                    Infrastructure Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="infra_structure_name"
                    value={formData.infra_structure_name}
                    onChange={handleChange}
                    placeholder="Enter infrastructure name"
                  />
                  {errors.infra_structure_name && (
                    <small className="text-danger">{errors.infra_structure_name}</small>
                  )}
                </div>

                {/* Infrastructure Description */}
                <div className="mb-3">
                  <label className="form-label">
                    Infrastructure Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="infra_structure_description"
                    value={formData.infra_structure_description}
                    onChange={handleChange}
                    placeholder="Enter infrastructure description"
                  ></textarea>
                  <p>Maximum 400 Word</p>
                  {errors.infra_structure_description && (
                    <small className="text-danger">{errors.infra_structure_description}</small>
                  )}
                </div>

                {/* Infrastructure Photo */}
                <div className="mb-3">
                  <label className="form-label">
                    Infrastructure Photo <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  {errors.image && (
                    <small className="text-danger">{errors.image}</small>
                  )}
                </div>

                {/* Save and Cancel Buttons */}
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={handleSave}
                  >
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

export default InfrastructureModal;
