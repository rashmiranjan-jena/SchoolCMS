import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AwardModal = () => {
  const [formData, setFormData] = useState({
    calender_year_id: "",
    competition_name_id: "",
    level: "",
    organiser: "",
    date: "",
    student_name: "",
    Class_id: "",
    roll_no: "",
    position: "",
  });

  const [dropdownData, setDropdownData] = useState({
    calendarYears: [],
    competitionNames: [],
    classes: [],
  });

  const [formErrors, setFormErrors] = useState({});

  const fetchDropdownData = async () => {
    try {
      const [calendarYearResponse, competitionNameResponse, classResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BASE}/api/calender-year`),
        axios.get(`${process.env.REACT_APP_BASE}/api/competition-master`),
        axios.get(`${process.env.REACT_APP_BASE}/api/class-master`),
      ]);
      setDropdownData({
        calendarYears: calendarYearResponse.data,
        competitionNames: competitionNameResponse.data,
        classes: classResponse.data,
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
    if (!formData.calender_year_id) errors.calender_year_id = "Calendar Year is required.";
    if (!formData.competition_name_id) errors.competition_name_id = "Competition Name is required.";
    if (!formData.level) errors.level = "Level is required.";
    if (!formData.organiser) errors.organiser = "Organiser is required.";
    if (!formData.date) errors.date = "Date is required.";
    if (!formData.student_name) errors.student_name = "Student Name is required.";
    if (!formData.Class_id) errors.Class_id = "Class is required.";
    if (!formData.roll_no) errors.roll_no = "Roll No. is required.";
    if (!formData.position) errors.position = "Position is required.";
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE}/api/awards/`, formData);

      if (response.status === 201) {
        toast.success("Award saved successfully!");
        setFormData({
          calender_year_id: "",
          competition_name_id: "",
          level: "",
          organiser: "",
          date: "",
          student_name: "",
          Class_id: "",
          roll_no: "",
          position: "",
        });
        setFormErrors({});
      }
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
            <h5 className="modal-title">Awards</h5>
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
              {/* Calendar Year */}
              <div className="mb-3">
                <label className="form-label">
                  Calendar Year <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  name="calender_year_id"
                  value={formData.calender_year_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Calendar Year</option>
                  {dropdownData.calendarYears.map((year) => (
                    <option key={year.calender_year_id} value={year.calender_year_id}>
                      {year.calender_year}
                    </option>
                  ))}
                </select>
                {formErrors.calender_year_id && <div className="text-danger">{formErrors.calender_year_id}</div>}
              </div>

              {/* Competition Name */}
              <div className="mb-3">
                <label className="form-label">
                  Competition Name <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  name="competition_name_id"
                  value={formData.competition_name_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Competition</option>
                  {dropdownData.competitionNames.map((competition) => (
                    <option key={competition.competition_master_id} value={competition.competition_master_id}>
                      {competition.competition_name}
                    </option>
                  ))}
                </select>
                {formErrors.competition_name_id && <div className="text-danger">{formErrors.competition_name_id}</div>}
              </div>

              {/* Level */}
              <div className="mb-3">
                <label className="form-label">
                  Level <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  placeholder="Enter Level"
                />
                {formErrors.level && <div className="text-danger">{formErrors.level}</div>}
              </div>

              {/* Organiser */}
              <div className="mb-3">
                <label className="form-label">
                  Organiser <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="organiser"
                  value={formData.organiser}
                  onChange={handleInputChange}
                  placeholder="Enter Organiser"
                />
                {formErrors.organiser && <div className="text-danger">{formErrors.organiser}</div>}
              </div>

              {/* Date */}
              <div className="mb-3">
                <label className="form-label">
                  Date <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
                {formErrors.date && <div className="text-danger">{formErrors.date}</div>}
              </div>

              {/* Student Name */}
              <div className="mb-3">
                <label className="form-label">
                  Student Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleInputChange}
                  placeholder="Enter Student Name"
                />
                {formErrors.student_name && <div className="text-danger">{formErrors.student_name}</div>}
              </div>

              {/* Class */}
              <div className="mb-3">
                <label className="form-label">
                  Class <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  name="Class_id"
                  value={formData.Class_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Class</option>
                  {dropdownData.classes.map((cls) => (
                    <option key={cls.class_master_id} value={cls.class_master_id}>
                      {cls.class_name}
                    </option>
                  ))}
                </select>
                {formErrors.Class_id && <div className="text-danger">{formErrors.Class_id}</div>}
              </div>

              {/* Roll No. */}
              <div className="mb-3">
                <label className="form-label">
                  Roll No. <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="roll_no"
                  value={formData.roll_no}
                  onChange={handleInputChange}
                  placeholder="Enter Roll No."
                />
                {formErrors.roll_no && <div className="text-danger">{formErrors.roll_no}</div>}
              </div>

              {/* Position */}
              <div className="mb-3">
                <label className="form-label">
                  Position <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Enter Position"
                />
                {formErrors.position && <div className="text-danger">{formErrors.position}</div>}
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

export default AwardModal;
