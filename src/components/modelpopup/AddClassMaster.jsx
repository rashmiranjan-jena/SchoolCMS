import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { validateForm } from "../../utils/formValidation";
import { create } from "../../utils/intercepter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ImportantModal = styled.div`
  max-width: 862px !important;
  max-height: 500vh !important;
`;
const AddClassMaster = () => {

  const initialFormState = {
    class_name: ''
  }
  const formRef = useRef(null);
  const [data, setData] = useState(initialFormState);

  const validationRules = {
    class_name: [
      { type: 'required', message: 'Class Name is required' },
      { type: 'minLength', value: 2, message: 'Class Name must be at least 2 characters long' },
      { type: 'maxLength', value: 100, message: 'Class Name must not exceed 100 characters' }
    ]
  };
  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  const handleFormSubmit = async (e) => {
    
    e.preventDefault();
    const isValid = validateForm(data, validationRules);
    if (!isValid) return;
    try {
      const response = await create("class-master/", data);
      toast.success("Form submitted successfully!");
      resetForm()
    } catch (error) {
      toast.error("Error submitting form. Please try again.", error);
    }
  };


  return (
    <div id="add_ClassMaster" className="modal custom-modal fade" role="dialog">
      <ToastContainer />
      <ImportantModal className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">System /</span> ClassMaster
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
               <i className="fa fa-close m-r-5 m-lg-4" style={{ color: "blue", fontSize: "13px" }}></i>
            </button>
          </div>
          <div className="modal-body">
          <form ref={formRef}>
              <div className="row">
                <div className="col-6 mb-3">    
                  <label htmlFor="ClassName " className="form-label"> Class Name</label>
                  <input type="text" id="ClassName" className="form-control"  onChange={(e) => setData({ class_name: e.target.value })} />
                </div>
                
                
              </div>
            </form>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-primary me-2" onClick={handleFormSubmit}>Save</button>
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

export default AddClassMaster;
