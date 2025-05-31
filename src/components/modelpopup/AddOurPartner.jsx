import React, { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { validateForm } from "../../utils/formValidation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { create } from "../../utils/intercepter";
  
  const ImportantModal = styled.div`
    max-width: 862px !important;
    max-height: 500vh !important;
  `;

const AddOurPartner = ({getEventNames}) => {
  const initialData = {
    logo_title: "",
    // event_id: "",
    // event_description: "",
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
    logo_title: [{ type: "required", message: "Event Name is required" }],
    // event_id: [{ type: "required", message: "Event Id is required" }],
    // event_description: [{ type: "required", message: "Event Description is required" }],
    photo: [{ type: "required", message: "Image is required" }],
  };

  const handleFormSubmit = async (e) => {
    console.log('inside');
    
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
      await create("events-name-master/", payload);
      getEventNames()
      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <div id="add_OurPartner" className="modal custom-modal fade" role="dialog">
      <ToastContainer />
      <ImportantModal className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">OurPartner /</span> AddOurPartner
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
          <form ref={formRef} >
              {/* <div className="row">
                <div className="col-6 mb-3">
                  <label htmlFor="logo_title" className="form-label">
                    Event Name
                  </label>
                  <input type="text" id="logo_title" name="logo_title" className="form-control" value={formData.logo_title}
                    onChange={handleInputChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="event_id" className="form-label">
                    ID
                  </label>
                  <input type="number" id="event_id" name="event_id" className="form-control"
                  value={formData.event_id}
                    onChange={handleInputChange} />
                </div>
              </div> */}

              {/* Photo Field */}
              <div className="row">
              <div className="col-6 mb-3">
                  <label htmlFor="logo_title" className="form-label">
                     Tittle
                  </label>
                  <input type="text" id="logo_title" name="logo_title" className="form-control" value={formData.logo_title}
                    onChange={handleInputChange} />
                </div>
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

              {/* About Event Field */}
              {/* <div className="mb-3">
                <label htmlFor="aboutEvent" className="form-label">
                  About Event
                </label>
                <textarea
                  id="event_description"
                  className="form-control"
                  value={formData.event_description}
                    onChange={handleInputChange}
                  rows="4"
                  name="event_description"
                />
              </div> */}
            </form>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="btn btn-primary me-2" onClick={handleFormSubmit}>
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
          </div>
        </div>
      </ImportantModal>
    </div>
  );
};

export default AddOurPartner;
