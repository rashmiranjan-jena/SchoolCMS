import React, { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogcategoryModel = ({setRefresh}) => {
  const [formData, setFormData] = useState({
    category_name: "",
    about: "",
  });

  const [errors, setErrors] = useState({
    category_name: "",
    image: "",
    about: "",
  });

  const imageInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const validate = () => {
    const newErrors = {
      category_name: formData.category_name ? "" : "Category name is required.",
      image: imageInputRef.current?.files?.length ? "" : "Image is required.",
      about: formData.about ? "" : "Details about the blog category are required.",
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = new FormData();
      payload.append("category_name", formData.category_name);
      payload.append("image", imageInputRef.current?.files[0]);
      payload.append("about", formData.about);

      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE}/api/blog-category/`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Blog category saved successfully!");
        setFormData({ category_name: "", about: "" });
        setErrors({ category_name: "", image: "", about: "" });
        if (imageInputRef.current) {
          imageInputRef.current.value = ""; 
        }
        setRefresh(Math.random());
      } catch (error) {
        toast.error("Failed to save the blog category. Please try again.");
        console.error("Error:", error);
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const handleCancel = () => {
    setFormData({ category_name: "", about: "" });
    setErrors({ category_name: "", image: "", about: "" });
    if (imageInputRef.current) {
      imageInputRef.current.value = ""; 
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
            <h5 className="modal-title">Blog Category Master</h5>
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
              {/* Category Name */}
              <div className="mb-3">
                <label className="form-label">
                  Category Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="category_name"
                  value={formData.category_name}
                  onChange={handleChange}
                  placeholder="Enter Category Name"
                />
                {errors.category_name && (
                  <small className="text-danger">{errors.category_name}</small>
                )}
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label">
                  Image <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="image"
                  accept="image/*"
                  ref={imageInputRef} // Bind the ref to the input field
                  onChange={handleChange}
                />
                {errors.image && (
                  <small className="text-danger">{errors.image}</small>
                )}
              </div>

              {/* About Blog Category */}
              <div className="mb-3">
                <label className="form-label">
                  About Blog Category <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  name="about"
                  rows="3"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Enter details about the blog category"
                ></textarea>
                {errors.about && (
                  <small className="text-danger">{errors.about}</small>
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
      <ToastContainer />
    </div>
  );
};

export default BlogcategoryModel;
