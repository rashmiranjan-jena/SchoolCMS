import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubmenuModal = ({ setRefresh }) => {
  const [formData, setFormData] = useState({
    menuName: "",
    order: "",
    slug: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!formData.menuName) newErrors.menuName = "Menu Name is required.";
    if (!formData.order) newErrors.order = "Order is required.";
    if (!formData.slug) newErrors.slug = "Slug is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setFormData({
      menuName: "",
      order: "",
      slug: "",
    });
  };

  const handleSave = async () => {
    if (validateFields()) {
      // Send data to backend
      try {
        const response = await fetch('https://your-backend-api.com/menus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Send the form data as JSON
        });

        if (response.ok) {
          toast.success("Data saved successfully!");
          setRefresh && setRefresh((prev) => !prev); // Trigger the parent component to refresh
          handleClose();
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message || 'Failed to save data'}`);
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
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
              <h5 className="modal-title">Menu Master</h5>
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
                {/* Menu Name Field */}
                <div className="mb-3">
                  <label className="form-label">
                    Menu Name <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="menuName"
                    value={formData.menuName}
                    onChange={handleChange}
                  >
                    <option value="">Select Menu</option>
                    <option value="Header">Header</option>
                    <option value="Footer">Footer</option>
                  </select>
                  {errors.menuName && (
                    <small className="text-danger">{errors.menuName}</small>
                  )}
                </div>

                {/* Order Field */}
                <div className="mb-3">
                  <label className="form-label">
                    Order <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                  />
                  {errors.order && (
                    <small className="text-danger">{errors.order}</small>
                  )}
                </div>

                {/* Slug Dropdown */}
                <div className="mb-3">
                  <label className="form-label">
                    Slug <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                  >
                    <option value="">Select Slug</option>
                    <option value="home">Home</option>
                    <option value="about">About</option>
                    <option value="contact">Contact</option>
                  </select>
                  {errors.slug && (
                    <small className="text-danger">{errors.slug}</small>
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

export default SubmenuModal;
