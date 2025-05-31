import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const FooterSubmenumodal = ({ setRefresh }) => {
  const [formData, setFormData] = useState({
    menu_id: "",
    name: "",
    mega_menu_id: "",
    order: "",
    slug: "",
  });

  const [errors, setErrors] = useState({});
  const [menuOptions, setMenuOptions] = useState([]);
  const [megamenuOptions, setMegamenuOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // to track if data is still loading

  useEffect(() => {
    const fetchMenuOptions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE}/api/footer_menu_handler/`);
        setMenuOptions(response.data);
      } catch (error) {
        toast.error("Failed to fetch menu options.");
      }
    };

    const fetchMegamenuOptions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE}/api/footer_mega_menu_handler/`);
        setMegamenuOptions(response.data);
      } catch (error) {
        toast.error("Failed to fetch megamenu options.");
      }
    };

    fetchMenuOptions();
    fetchMegamenuOptions();
  }, []);

  useEffect(() => {
    // Set isLoading to false when the data has been loaded
    if (menuOptions.length > 0 && megamenuOptions.length > 0) {
      setIsLoading(false);
    }
  }, [menuOptions, megamenuOptions]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!formData.menu_id) newErrors.menu_id = "Menu Name is required.";
    if (!formData.name) newErrors.name = "Submenu is required.";
    if (!formData.order) newErrors.order = "Order is required.";
    if (!formData.slug) newErrors.slug = "Slug is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setFormData({
      menu_id: "",
      name: "",
      mega_menu_id: "",
      order: "",
      slug: "",
    });
  };

  const handleSave = async () => {
    if (validateFields()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE}/api/footer_sub_menu_handler/`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          toast.success("Data saved successfully!");
          handleClose();
        } 
      } catch (error) {
        // Handle different error responses
        if (error.response && error.response.status === 400) {
          toast.error("Sub menu name already exists.");
        } else {
          toast.error("An error occurred while saving the data.");
        }
      }
    } else {
      toast.error("Please fix the errors before saving.");
    }
  };

  // Don't render the form until the data has been fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <div id="add_user" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-md" role="document">
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
                {/* Menu Name Dropdown */}
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
                  {errors.menu_id && <small className="text-danger">{errors.menu_id}</small>}
                </div>

                {/* Submenu Field */}
                <div className="mb-3">
                  <label className="form-label">
                    Submenu <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>

                {/* Megamenu Dropdown */}
                <div className="mb-3">
                  <label className="form-label">
                    Megamenu <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="mega_menu_id"
                    value={formData.mega_menu_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Megamenu</option>
                    {megamenuOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  {errors.mega_menu_id && <small className="text-danger">{errors.mega_menu_id}</small>}
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
                  {errors.order && <small className="text-danger">{errors.order}</small>}
                </div>

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
                  <button type="button" className="btn btn-primary me-2" onClick={handleSave}>
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

export default FooterSubmenumodal;
