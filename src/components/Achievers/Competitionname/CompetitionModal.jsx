import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompetitionModal = () => {
  const [formData, setFormData] = useState({
    competition_name: "",
    level: "",
    organiser: "",
  });

  const [errors, setErrors] = useState({
    competition_name: "",
    level: "",
    organiser: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Clear the error when user starts typing
    });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.competition_name) {
      newErrors.competition_name = "Competition name is required.";
    }

    if (!formData.level) {
      newErrors.level = "Level is required.";
    }

    if (!formData.organiser) {
      newErrors.organiser = "Organiser is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE}/api/competition-master/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        // Clear the form after success
        setFormData({
          competition_name: "",
          level: "",
          organiser: "",
        });
        setErrors({});
        // You can use toast here for success message
      } else {
        // Handle any error with toast
      }
    } catch (error) {
      // Handle any error with toast
    }
  };

  return (
    <div id="add_user" className="modal custom-modal fade" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered modal-md"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Competition Name Master</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Competition Name */}
              <div className="mb-3">
                <label className="form-label">
                  Competition Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Competition Name"
                  name="competition_name"
                  value={formData.competition_name}
                  onChange={handleInputChange}
                  required
                />
                {errors.competition_name && (
                  <small className="text-danger">{errors.competition_name}</small>
                )}
              </div>

              {/* Level */}
              <div className="mb-3">
                <label className="form-label">
                  Level <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Level"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                />
                {errors.level && (
                  <small className="text-danger">{errors.level}</small>
                )}
              </div>

              {/* Organiser */}
              <div className="mb-3">
                <label className="form-label">
                  Organiser <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Organiser"
                  name="organiser"
                  value={formData.organiser}
                  onChange={handleInputChange}
                  required
                />
                {errors.organiser && (
                  <small className="text-danger">{errors.organiser}</small>
                )}
              </div>

              {/* Save and Close Buttons */}
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* ToastContainer for displaying success/error messages */}
      <ToastContainer />
    </div>
  );
};

export default CompetitionModal;
