import React, { useRef, useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateForm } from "../../utils/formValidation";
import { create } from "../../utils/intercepter";

const ImportantModal = styled.div`
  max-width: 862px !important;
  max-height: 500vh !important;
`;
const AddStatsMaster = () => {
  
  const initialData = {
    lebel: "",
    Stats: "",
    image: null,
  };

  const [formData, setFormData] = useState(initialData);
  const formRef = useRef(null);

  
  const handleInputChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0]
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const resetForm = () => {
    setFormData(initialData);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const validationRules = {
    lebel: [{ type: "required", message: "Label is required" }],
    Stats: [{ type: "required", message: "Stats is required" }],
    image: [{ type: "required", message: "Image is required" }],
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm(formData, validationRules);
    if (!isValid) {
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    try {
      await create("stats-master/", payload);
      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <div id="add_Stat" className="modal custom-modal fade" role="dialog">
      <ToastContainer />
      <ImportantModal className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">System /</span> Stats Master
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={resetForm}
            ></button>
          </div>
          <div className="modal-body">
            <form ref={formRef} onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="lebel" className="form-label">Label</label>
                  <input
                    type="text"
                    id="lebel"
                    className="form-control"
                    name="lebel"
                    value={formData.lebel}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-4 mb-3">
                  <label htmlFor="Stats" className="form-label">Stats</label>
                  <input
                    type="number"
                    id="Stats"
                    className="form-control"
                    name="Stats"
                    value={formData.Stats}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-4 mb-3">
                  <label htmlFor="image" className="form-label">Image</label>
                  <input
                    type="file"
                    id="image"
                    className="form-control"
                    name="image"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="btn btn-primary me-2">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </ImportantModal>
    </div>
  );
};

export default AddStatsMaster;
