import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PresidentModal = ({ setRefresh }) => {
  const [formData, setFormData] = useState({
    presidentName: "",
    fromDate: "",
    toDate: "",
    status: "Ongoing",
    message: "",
    photo: null,
    signature: null,
  });

  const [errors, setErrors] = useState({});

  // Create refs for the photo and signature input fields
  const photoInputRef = useRef(null);
  const signatureInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.presidentName) newErrors.presidentName = "President Name is required.";
    if (!formData.fromDate) newErrors.fromDate = "From Date is required.";
    if (!formData.toDate) newErrors.toDate = "To Date is required.";
    if (!formData.message) newErrors.message = "Message is required.";
    if (!formData.photo) newErrors.photo = "Photo is required.";
    if (!formData.signature) newErrors.signature = "Signature is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const tenure = `${formatDate(formData.fromDate)} to ${formatDate(formData.toDate)}`;

      const formDataToSend = new FormData();
      formDataToSend.append("president_name", formData.presidentName);
      formDataToSend.append("tenure", tenure);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("photo", formData.photo);
      formDataToSend.append("signature", formData.signature);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE}/api/president_list/`,
        formDataToSend
      );

      if (response.status === 201) {
        toast.success("President data saved successfully!");

        // Reset the form fields after successful submission
        setFormData({
          presidentName: "",
          fromDate: "",
          toDate: "",
          status: "Ongoing",
          message: "",
          photo: null,
          signature: null,
        });
        photoInputRef.current.value = "";
        signatureInputRef.current.value = "";
        setRefresh(Math.random());
      }
    } catch (error) {
      toast.error("There was an error saving the data.");
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div id="add_user" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">President List</h5>
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
                  President Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="presidentName"
                  value={formData.presidentName}
                  onChange={handleChange}
                  placeholder="Enter President Name"
                />
                {errors.presidentName && <div className="text-danger">{errors.presidentName}</div>}
              </div>

              <div className="mb-3">
                  <label className="form-label">
                    Designation <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value="President"
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
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                    placeholder="From Date"
                  />
                  <input
                    className="form-control"
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                    placeholder="To Date"
                  />
                </div>
                {errors.fromDate && <div className="text-danger">{errors.fromDate}</div>}
                {errors.toDate && <div className="text-danger">{errors.toDate}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Status <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
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
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter message"
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
                  name="photo"
                  ref={photoInputRef}
                  onChange={handleFileChange}
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
                  name="signature"
                  ref={signatureInputRef}
                  onChange={handleFileChange}
                />
                {errors.signature && <div className="text-danger">{errors.signature}</div>}
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PresidentModal;
