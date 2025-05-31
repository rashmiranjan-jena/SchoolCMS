import React, { useState, useRef } from "react";
import axios from "axios"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BannerModal = ({ setRefresh }) => {
  const [formData, setFormData] = useState({
    image: null,
    order: "",
  });

  const [errors, setErrors] = useState({});
  const imageInputRef = useRef(null); // Create a ref for the image input

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
    if (!formData.image) newErrors.image = "Image is required.";
    if (!formData.order) newErrors.order = "Order is required.";
    else if (isNaN(formData.order) || formData.order <= 0)
      newErrors.order = "Please enter a valid order number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setFormData({
      image: null,
      order: "",
    });
    // Reset the file input using the ref
    if (imageInputRef.current) {
      imageInputRef.current.value = null;
    }
  };

  const handleSave = async () => {
    if (validateFields()) {
      const data = new FormData();
      data.append("image", formData.image);
      data.append("order", formData.order);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE}/api/banners/`,
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
              <h5 className="modal-title">Banner Information</h5>
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
                {/* Image Upload */}
                <div className="mb-3">
                  <label className="form-label">
                    Image <span className="text-danger">*</span>
                  </label>
                  <input
                    ref={imageInputRef} // Assign the ref to the file input
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

                {/* Order */}
                <div className="mb-3">
                  <label className="form-label">
                    Order <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    placeholder="Enter order number"
                  />
                  {errors.order && (
                    <small className="text-danger">{errors.order}</small>
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

export default BannerModal;
