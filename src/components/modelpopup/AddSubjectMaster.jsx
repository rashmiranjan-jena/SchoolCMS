import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
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
const AddSubjectMaster = () => {

  const initialData = {
    subject_name: '',
    image:null
  }

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
    subject_name: [{ type: "required", message: "Subject Name is required" }],
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
      await create("subject-master/", payload);
      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };
  return (
    <div id="add_SubjectMaster" className="modal custom-modal fade" role="dialog">
        <ToastContainer />
      <ImportantModal className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">System /</span> SubjectMaster
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
          <form ref={formRef} >
              <div className="row">
                <div className="col-6 mb-3">    
                  <label htmlFor="subject_name " className="form-label"> Subject Name</label>
                  <input type="text" id="subject_name" className="form-control"  name="subject_name"
                    value={formData.subject_name}
                    onChange={handleInputChange} />
                </div>
                <div className="col-6 mb-3">
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
            </form>
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

export default AddSubjectMaster;
