import React, { useState } from "react";
import axios from "axios"; // Make sure axios is installed (npm install axios)
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StafftypemasterModal = ({setRefresh}) => {
  const [staffTypeName, setStaffTypeName] = useState(""); // State for input field
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(""); // To handle errors

  const handleSave = async () => {
    if (!staffTypeName) {
      setError("Staff Type Name is required");
      toast.error("Staff Type Name is required!"); // Show error toast
      return;
    }
    setLoading(true);
    setError(""); 

    try {
     
      const response = await axios.post(`${process.env.REACT_APP_BASE}/api/staff_type/`, {
        staff_type_name: staffTypeName, 
      });

      if (response.status === 201) {
        // Success: Show success toast
        toast.success("Staff Type saved successfully!");
        setStaffTypeName("")

        setRefresh(Math.random());

      }
    } catch (err) {
      setError("Failed to save data, please try again.");
      toast.error("Failed to save data, please try again."); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="add_user" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Staff Type Master</h5>
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <div className="mb-3">
                  <label className="form-label">
                    Staff Type Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Staff Type Name"
                    value={staffTypeName}
                    onChange={(e) => setStaffTypeName(e.target.value)}
                  />
                  {error && <small className="text-danger">{error}</small>}
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container moved here to ensure visibility */}
      <ToastContainer autoClose={3000} position="top-right" />
    </>
  );
};

export default StafftypemasterModal;
