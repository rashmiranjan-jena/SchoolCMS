import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { validateForm } from "../../utils/formValidation";
import { create } from "../../utils/intercepter";
const ImportantModal = styled.div`
  max-width: 862px !important;
  max-height: 500vh !important;
`;
const AddCourseMaster = () => {
  const initialData = {
    course_name: "",
    tenure_year: "",
    tenure_month: '',
  };
  const [formData, setFormData] = useState(initialData);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialData);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const validationRules = {
    course_name: [{ type: "required", message: "Course Name is required" }],
    tenure_year: [{ type: "required", message: "Tenure Year is required" }],
    tenure_month: [{ type: "required", message: "Tenure Month is required" }],
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
      await create("course-master/", payload);
      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <div id="add_CourseMaster" className="modal custom-modal fade" role="dialog">
       <ToastContainer />
      <ImportantModal className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">System /</span>  CourseMaster
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
              <div className="row">
                <div className="col-4 mb-3">    
                  <label htmlFor="course_name " className="form-label"> Course Name</label>
                  <input type="text" id="course_name" name="course_name" className="form-control" value={formData.course_name}
                    onChange={handleInputChange}  />
                </div>
                <h5>Tenure</h5>
                <div className="col-4 mb-3">
                  <label htmlFor="tenure_year" className="form-label">Tenure year</label>
                  <input type="number" id="tenure_year" name="tenure_year" className="form-control" value={formData.tenure_year}
                    onChange={handleInputChange} />
                </div>
                <div className="col-4 mb-3">
                  <label htmlFor="tenure_month" className="form-label">Tenure Month</label>
                  <input type="number" id="tenure_month" name="tenure_month" className="form-control" value={formData.tenure_month}
                    onChange={handleInputChange} />
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

export default AddCourseMaster;
