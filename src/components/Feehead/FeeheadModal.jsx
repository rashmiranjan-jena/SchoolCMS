import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeeheadModal = ({setRefresh}) => {
  const [formData, setFormData] = useState({
    head_name: "",  
    course_id: "",  
    amount: "",
  });

  const [dropdownData, setDropdownData] = useState({
    courses: [],
  });

  const [formErrors, setFormErrors] = useState({});

  const fetchDropdownData = async () => {
    try {
      const courseResponse = await axios.get(`${process.env.REACT_APP_BASE}/api/course-master/`); 
      setDropdownData({
        courses: courseResponse.data,  
      });
    } catch (error) {
      toast.error("Error fetching dropdown data:", error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.head_name) errors.head_name = "Headname is required.";  // Validate headname
    if (!formData.course_id) errors.course_id = "Course is required.";  // Validate course
    if (!formData.amount) errors.amount = "Amount is required.";  // Validate amount
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE}/api/fee-heads/`, formData);

      if (response.status === 201) {
        toast.success("Award saved successfully!");
        setFormData({
          head_name: "",  // Reset headname
          course_id: "",  // Reset course
          amount: "",  // Reset amount
        });
        setFormErrors({});
      }
      setRefresh(Math.random());
    } catch (error) {
      console.error("Error saving award:", error);
      toast.error("Failed to save award.");
    }
  };

  return (
    <div id="add_user" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Fee Details</h5>
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
              {/* Headname */}
              <div className="mb-3">
                <label className="form-label">
                  Headname <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="head_name"
                  value={formData.head_name}
                  onChange={handleInputChange}
                  placeholder="Enter Headname"
                />
                {formErrors.head_name && <div className="text-danger">{formErrors.head_name}</div>}
              </div>

              {/* Course */}
              <div className="mb-3">
                <label className="form-label">
                  Course <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  name="course_id"
                  value={formData.course_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Course</option>
                  {dropdownData.courses.map((course) => (
                    <option key={course.course_master_id} value={course.course_master_id}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
                {formErrors.course_id && <div className="text-danger">{formErrors.course_id}</div>}
              </div>

              {/* Amount */}
              <div className="mb-3">
                <label className="form-label">
                  Amount <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter Amount"
                />
                <div className="form-text">
                  This amount belongs to per-head student.
                </div>
                {formErrors.amount && <div className="text-danger">{formErrors.amount}</div>}
              </div>

              {/* Save and Close Buttons */}
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={handleSubmit}
                >
                  Save
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
      <ToastContainer />
    </div>
  );
};

export default FeeheadModal;
