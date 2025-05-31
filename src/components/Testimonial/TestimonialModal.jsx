import React, { useState, useRef } from "react";
import axios from "axios"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TestimonialModal = ({ setRefresh }) => {
  const [formData, setFormData] = useState({
    description_title: "",
    description: "",
    rollNo: "",
    testimoni_name: "",
    photo: null,
    designation: "", 
    other_designation: "", 
  });

  const [errors, setErrors] = useState({});
  const photoInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDesignationChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      designation: value,
      other_designation: value === "Others" ? prev.other_designation : "",
    }));
    setErrors((prev) => ({ ...prev, designation: "" }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!formData.description_title) newErrors.description_title = "Description Name is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.rollNo) newErrors.rollNo = "Roll number is required.";
    if (!formData.testimoni_name) newErrors.testimoni_name = "Name is required.";
    if (!formData.photo) newErrors.photo = "Photo is required.";
    if (!formData.designation) newErrors.designation = "Designation is required.";
    if (formData.designation === "Others" && !formData.other_designation) newErrors.other_designation = "Please provide the custom designation.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setFormData({
      description_title: "",
      description: "",
      rollNo: "",
      testimoni_name: "",
      photo: null,
      designation: "",
      other_designation: "",
    });
    // Reset the file input using the ref
    if (photoInputRef.current) {
      photoInputRef.current.value = null;
    }
  };

  const handleSave = async () => {
    if (validateFields()) {
      const data = new FormData();
      data.append("description_title", formData.description_title);
      data.append("description", formData.description);
      data.append("rollNo", formData.rollNo);
      data.append("testimoni_name", formData.testimoni_name);
      data.append("photo", formData.photo);
      data.append("designation", formData.designation);
      if (formData.designation === "Others") {
        data.append("other_designation", formData.other_designation);
      }

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE}/api/testimoni-responses/`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data", 
            },
          }
        );

        if (response.status === 201) {
          toast.success("Banner added successfully!");
          setRefresh(Math.random()); 
          handleClose(); 
        } else {
          toast.error("Failed to add the banner.");
        }
      } catch (error) {
        toast.error("An error occurred while saving the banner.");
        console.error("Error saving banner:", error);
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
              <h5 className="modal-title">Testimonial Information</h5>
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
                {/* Description Name */}
                <div className="mb-3">
                  <label className="form-label">
                    Description Title <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="description_title"
                    value={formData.description_title}
                    onChange={handleChange}
                    placeholder="Enter description name"
                  />
                  {errors.description_title && (
                    <small className="text-danger">{errors.description_title}</small>
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
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                  />
                  {errors.description && (
                    <small className="text-danger">{errors.description}</small>
                  )}
                </div>

 {/* Designation */}
 <div className="mb-3">
                  <label className="form-label">
                    Designation <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="designation"
                    value={formData.designation}
                    onChange={handleDesignationChange}
                  >
                    <option value="">Select Designation</option>
                    <option value="Student">Student</option>
                    <option value="Parent">Parent</option>
                    <option value="Staff">Staff</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.designation && (
                    <small className="text-danger">{errors.designation}</small>
                  )}
                  {formData.designation === "Others" && (
                    <input
                      className="form-control mt-2"
                      type="text"
                      name="other_designation"
                      value={formData.other_designation}
                      onChange={handleChange}
                      placeholder="Enter custom designation"
                    />
                  )}
                  {errors.other_designation && (
                    <small className="text-danger">{errors.other_designation}</small>
                  )}
                </div>
                {/* Roll No */}
                <div className="mb-3">
                  <label className="form-label">
                    Roll No. <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                    placeholder="Enter roll number"
                  />
                  {errors.rollNo && (
                    <small className="text-danger">{errors.rollNo}</small>
                  )}
                </div>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="testimoni_name"
                    value={formData.testimoni_name}
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                  {errors.testimoni_name && (
                    <small className="text-danger">{errors.testimoni_name}</small>
                  )}
                </div>

        
                {/* Photo Upload */}
                <div className="mb-3">
                  <label className="form-label">
                    Photo <span className="text-danger">*</span>
                  </label>
                  <input
                    ref={photoInputRef}
                    className="form-control"
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  {errors.photo && (
                    <small className="text-danger">{errors.photo}</small>
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

export default TestimonialModal;
