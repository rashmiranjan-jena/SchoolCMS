import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const FooterMegamodal = ({ setRefresh }) => {
  const [formData, setFormData] = useState({
    menu_id: "",
    name: "",
    order: "",
    slug: "",
  });

  const [menuOptions, setMenuOptions] = useState([]); 
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch Menu Name options from backend API
    const fetchMenuOptions = async () => {
      try {
        const response = await axios.get( `${process.env.REACT_APP_BASE}/api/footer_menu_handler/`);
        setMenuOptions(response.data);
      } catch (error) {
        toast.error("Failed to load menu options.");
      }
    };

    fetchMenuOptions();
  }, []);

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

    if (!formData.menu_id) newErrors.menu_id = "Menu Name is required.";
    if (!formData.name) newErrors.name = "Megamenu Name is required.";
    if (!formData.order) newErrors.order = "Order is required.";
    if (!formData.slug) newErrors.slug = "Slug is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setFormData({
      menu_id: "",
      name: "",
      order: "",
      slug: "",
    });
  };

  const handleSave = async () => {
    if (validateFields()) {
      try {
        const response = await axios.post( `${process.env.REACT_APP_BASE}/api/footer_mega_menu_handler/`, formData);
        if (response.status === 200 || response.status === 201) {
          toast.success("Data saved successfully!");
          setRefresh && setRefresh((prev) => !prev); 
          handleClose();
        } else {
          toast.error("Failed to save data.");
        }
      } catch (error) {
        if(error.response.status===400){
          toast.error("Mega menu name already exist")
        }
       
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
                    name="menu_id"
                    value={formData.menu_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Menu</option>
                    {menuOptions.map((menu) => (
                      <option key={menu.id} value={menu.id}>
                        {menu.name}
                      </option>
                    ))}
                  </select>
                  {errors.menu_id && (
                    <small className="text-danger">{errors.menu_id}</small>
                  )}
                </div>

                {/* Megamenu Name Field */}
                <div className="mb-3">
                  <label className="form-label">
                    Megamenu Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Megamenu Name"
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name}</small>
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
                    <option value="/">Home</option>
                    <option value="/about">about</option>
                    <option value="/messages">messages</option>
                    <option value="/administrators">administrators</option>
                    <option value="/policies">policies</option>
                    <option value="/committees">committees</option>
                    <option value="/course">course</option>
                    <option value="/clubs">clubs</option>
                    <option value="/staff">staff</option>
                    <option value="/result">result</option>
                    <option value="/achievers">achievers</option>
                    <option value="/notices">notices</option>
                    <option value="/news">news</option>
                    <option value="/college-gallery">college-gallery</option>
                    <option value="/testimonials">testimonials</option>
                    <option value="/important-links">important-links</option>
                    <option value="/blog">blog</option>
                    <option value="/poll">poll</option>
                    <option value="/scholarships">scholarships</option>
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

export default FooterMegamodal;
