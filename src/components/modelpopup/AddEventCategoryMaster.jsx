import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateForm } from "../../utils/formValidation";
import { create } from "../../utils/intercepter";

const ImportantModal = styled.div`
  max-width: 862px !important;
  max-height: 500vh !important;
`;
const AddEventCategoryMaster = () => {
  const initialData = {
    event_category_name: "",
    photo: null,
  };

  const [formData, setFormData] = useState(initialData);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialData);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const validationRules = {
    event_category_name: [{ type: "required", message: "Event Category Name is required" }],
    photo: [{ type: "required", message: "Image is required" }],
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
      await create("events-category-master/", payload);
      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };
  return (
    <div id="add_EventCategoryMaster" className="modal custom-modal fade" role="dialog">
      <ToastContainer />
      <ImportantModal className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">Event /</span> Event Category
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={resetForm}
            >  <i className="fa fa-close m-r-5 m-lg-4" style={{ color: "blue", fontSize: "13px" }}></i>
            </button>
          </div>
          <div className="modal-body">
            <form ref={formRef} onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-6 mb-3">
                  <label htmlFor="event_category_name" className="form-label">
                    Event Category
                  </label>
                  <input
                    type="text"
                    id="event_category_name"
                    name="event_category_name"
                    value={formData.event_category_name}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                {/* Photo Field */}
                <div className="col-6 mb-3">
                  <label htmlFor="photo" className="form-label">
                    Photo
                  </label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Action Buttons */}
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

export default AddEventCategoryMaster;
