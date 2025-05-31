import React, { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAssetpopup = ({ setRefresh }) => {
  const [committeeName, setCommitteeName] = useState("");
  const [logo, setLogo] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!committeeName) newErrors.committeeName = "Committee name is required";
    if (!logo) newErrors.logo = "Logo is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return; 

    const formData = new FormData();
    formData.append("committee_name", committeeName);
    if (logo) formData.append("logo", logo);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE}/api/committee_type/`,
        formData
      );

      if (response.status === 201 || response.status === 200) {
        setRefresh(Math.random());
        console.log(Math.random());

        toast.success("Data saved successfully!", {
          position: "top-right",
        });

        setCommitteeName("");
        setLogo(null);
        setErrors({}); 
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Failed to save data!", {
          position: "top-right",
        });
      } else {
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div id="add_asset" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Committee Type Master</h5>
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
              <div className="row">
                {/* Committee Name */}
                <div className="col-md-12">
                  <div className="input-block mb-3">
                    <label className="col-form-label">Committee Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Committee Name"
                      value={committeeName}
                      onChange={(e) => setCommitteeName(e.target.value)}
                    />
                    {errors.committeeName && (
                      <small className="text-danger">{errors.committeeName}</small>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="input-block mb-3">
                    <label className="col-form-label">Logo</label>
                    <input
                      className="form-control"
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => setLogo(e.target.files[0])}
                    />
                    {errors.logo && (
                      <small className="text-danger">{errors.logo}</small>
                    )}
                  </div>
                </div>
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
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default AddAssetpopup;
