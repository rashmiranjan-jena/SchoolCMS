import React, { useState, useRef } from "react";
import styled from "styled-components";
import { toast,ToastContainer } from "react-toastify"; 
import { create } from "../../utils/intercepter";
import { validateForm } from "../../utils/formValidation";

const ImportantModal = styled.div`
  max-width: 862px !important;
  max-height: 500vh !important;
`;

const AddBrandMaster = () => {
  const initialData = {
    header_logo: null,
    footer_logo: null,
    favicon: null,
    header: null,
    footer: null,
  };

  const [formData, setFormData] = useState(initialData);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0], 
    }));
  };

  const resetForm = () => {
    setFormData(initialData);
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  const validationRules = {
    header_logo: [
      { type: 'required', message: 'Header Logo is required' },
    ],
    footer_logo: [
      { type: 'required', message: 'Footer Logo is required' },
      ],
      favicon: [
      { type: 'required', message: 'Favicon is required' },
      ],
      header: [
      { type: 'required', message: 'Header Image is required' },
      ],
      footer: [
      { type: 'required', message: 'Footer Image is required' },
      ],
    
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm(formData,validationRules);
    if (!isValid)  return;

    const payload = new FormData(); 
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    try {
       await create("brand-master/", payload); 
      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <div id="add_Brand" className="modal custom-modal fade" role="dialog">
      <ToastContainer />
      <ImportantModal className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">System /</span> Brand Master
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form ref={formRef}>
              <div className="row">
                <div className="col-6 mb-3">
                  <label htmlFor="header_logo" className="form-label">
                    Header Logo
                  </label>
                  <input
                    type="file"
                    id="header_logo"
                    className="form-control"
                    name="header_logo"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="footer_logo" className="form-label">
                    Footer Logo
                  </label>
                  <input
                    type="file"
                    id="footer_logo"
                    name="footer_logo"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="favicon" className="form-label">
                    Favicon
                  </label>
                  <input
                    type="file"
                    id="favicon"
                    name="favicon"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="header" className="form-label">
                    Header Image
                  </label>
                  <input
                    type="file"
                    id="header"
                    name="header"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="footer" className="form-label">
                    Footer Image
                  </label>
                  <input
                    type="file"
                    id="footer"
                    name="footer"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-primary me-2"
                onClick={handleFormSubmit}
              >
                Save
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                data-bs-dismiss="modal"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </ImportantModal>
    </div>
  );
};

export default AddBrandMaster;
