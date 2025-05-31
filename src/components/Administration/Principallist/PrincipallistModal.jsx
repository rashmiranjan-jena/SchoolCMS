import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const PrincipallistModal = ({setRefresh}) => {
  const [principalName, setPrincipalName] = useState("");
  
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [tenure, setTenure] = useState(""); 
  
  const [errors, setErrors] = useState({}); 

  const photoInputRef = useRef(null);
  const signatureInputRef = useRef(null);



  const validateForm = () => {
    const errors = {};
    if (!principalName) errors.principalName = "Principal Name is required";
   
    if (!fromDate || !toDate) errors.tenure = "Tenure (From Date - To Date) is required";
    if (!message) errors.message = "Message is required";
    if (!photo) errors.photo = "Photo is required";
    if (!signature) errors.signature = "Signature is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append("principal_name", principalName);
   
    const formattedTenure = `${fromDate} to ${toDate}`;
    formData.append("tenure", formattedTenure);  

    formData.append("status", status);
    formData.append("message", message);
    if (photo) formData.append("photo", photo);
    if (signature) formData.append("signature", signature);

    axios
      .post(`${process.env.REACT_APP_BASE}/api/principal_list/`, formData)
      .then((response) => {
        toast.success("Data saved successfully!");
        setRefresh(Math.random());
        
        setPrincipalName("");
        setFromDate("");
        setToDate("");
        setStatus("Ongoing");
        setMessage("");
        setPhoto(null);
        setSignature(null);
        setTenure("");
        setErrors({}); 

    
        if (photoInputRef.current) {
          photoInputRef.current.value = "";
        }
        if (signatureInputRef.current) {
          signatureInputRef.current.value = "";
        }
      })
      .catch((error) => {
        toast.error("Error saving data.");
        console.error(error);
      });
  };

  return (
    <>
      <div id="add_user" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Principal List</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">
                    Principal Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Principal Name"
                    value={principalName}
                    onChange={(e) => setPrincipalName(e.target.value)}
                  />
                  {errors.principalName && <div className="text-danger">{errors.principalName}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Designation <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value="Principal"
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Tenure (From Date - To Date) <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex">
                    <input
                      className="form-control me-2"
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                    <input
                      className="form-control"
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                  {errors.tenure && <div className="text-danger">{errors.tenure}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Status <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Past">Past</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {errors.message && <div className="text-danger">{errors.message}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Photo <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    ref={photoInputRef}  
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                  {errors.photo && <div className="text-danger">{errors.photo}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Signature <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    ref={signatureInputRef}  
                    onChange={(e) => setSignature(e.target.files[0])}
                  />
                  {errors.signature && <div className="text-danger">{errors.signature}</div>}
                </div>

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
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PrincipallistModal;
