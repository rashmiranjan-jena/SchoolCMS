import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateForm } from "../../utils/formValidation";
import { create } from "../../utils/intercepter";

const AddStatementMaster = () => {
  const initialData = {
    statement_name: "",
    qoute: "",
    image: null,
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
    statement_name: [{ type: "required", message: "Statement Name is required" }],
    qoute: [{ type: "required", message: "Quote is required" }],
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
      await create("statement-master/", payload);
      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <div id="add_Statement" className="modal custom-modal fade" role="dialog">
      <ToastContainer />
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">System /</span> Statement Master
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
                <div className="col-4 mb-3">
                  <label htmlFor="statement_name" className="form-label">
                    Statement Name
                  </label>
                  <input
                    type="text"
                    id="statement_name"
                    className="form-control"
                    name="statement_name"
                    value={formData.statement_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-4 mb-3">
                  <label htmlFor="qoute" className="form-label">
                    qoute
                  </label>
                  <input
                    type="text"
                    id="qoute"
                    className="form-control"
                    name="qoute"
                    value={formData.qoute}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-4 mb-3">
                  <label htmlFor="image" className="form-label">
                    Image
                  </label>
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
      </div>
    </div>
  );
};

export default AddStatementMaster;
