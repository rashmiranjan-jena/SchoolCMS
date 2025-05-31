import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExamModal = () => {
  const [examName, setExamName] = useState(""); 
  const [boardName, setBoardName] = useState("");
  const [errors, setErrors] = useState({});

  const handleSave = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!examName) validationErrors.examName = "Exam Name is required";
    if (!boardName) validationErrors.boardName = "Board Name is required";
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE}/api/exam-name-master/`,
        {
          exam_name: examName,
          borad_name: boardName,
        }
      );
      if (response.status === 201) {
        toast.success("Data saved successfully!");
        setExamName("");
        setBoardName("");
        setErrors({});
      } else {
        toast.error("Error saving data!");
      }
    } catch (error) {
      toast.error("Error: Unable to save data");
    }
  };

  // Handle Close
  const handleClose = () => {
    setExamName("");
    setBoardName("");
    setErrors({});
  };

  return (
    <>
      <div id="add_user" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-md"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Exam Name Master</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSave}>
                {/* Exam Name */}
                <div className="mb-3">
                  <label className="form-label">
                    Exam Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Exam Name"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                  />
                  {errors.examName && (
                    <div className="text-danger">{errors.examName}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Board Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Board Name"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                  />
                  {errors.boardName && (
                    <div className="text-danger">{errors.boardName}</div>
                  )}
                </div>

                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary me-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleClose}
                  >
                    Close
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

export default ExamModal;
