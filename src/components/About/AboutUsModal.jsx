import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AboutUsModal = ({ setRefresh }) => {
  const [formData, setFormData] = useState({
    image: null,
    main_content: "",
    infra_structure_content: "", 
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.image) newErrors.image = "Photo is required.";
    if (!formData.main_content) newErrors.main_content = "Content is required.";
    if (!formData.infra_structure_content) 
      newErrors.infra_structure_content = "Infrastructure content is required."; // Validation for new field
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setFormData({
      image: null,
      main_content: "",
      infra_structure_content: "", 
    });
  };

  const handleSave = async () => {
    if (validateFields()) {
      const formDataToSend = new FormData();
      formDataToSend.append("image", formData.image);
      formDataToSend.append("main_content", formData.main_content);
      formDataToSend.append("infra_structure_content", formData.infra_structure_content); 

      try {
        // Send POST request with form data
        const response = await axios.post(`${process.env.REACT_APP_BASE}/api/about-us/`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data", // Important when sending files
          },
        });

        // Check for success response
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
      toast.error("Please fix the errors before saving.");
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
              <h5 className="modal-title">About Us</h5>
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
                {/* Photo Upload */}
                <div className="mb-3">
                  <label className="form-label">
                    Photo <span className="text-danger">*</span>
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

                {/* Main Content */}
                <div className="mb-3">
                  <label className="form-label">
                    Main Content <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="main_content"
                    value={formData.main_content}
                    onChange={handleChange}
                    placeholder="Enter main content"
                  ></textarea>
                  {errors.main_content && (
                    <small className="text-danger">{errors.main_content}</small>
                  )}
                </div>

                {/* Infrastructure Content */}
                <div className="mb-3">
                  <label className="form-label">
                    Infrastructure Content <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="infra_structure_content"
                    value={formData.infra_structure_content}
                    onChange={handleChange}
                    placeholder="Enter infrastructure content"
                  ></textarea>
                  {errors.infra_structure_content && (
                    <small className="text-danger">{errors.infra_structure_content}</small>
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

export default AboutUsModal;
