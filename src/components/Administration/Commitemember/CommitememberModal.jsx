import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommitememberModal = ({setRefresh}) => {
  const [committeeData, setCommitteeData] = useState([]);
  const [designationData, setDesignationData] = useState([]);
  const [academicYearData, setAcademicYearData] = useState([]);
  const [formData, setFormData] = useState({
    committee_name_id: "",
    member_name: "",
    qualification: "",
    designation_id: "",
    relation: "",
    photo: null,
    calender_year_id: "",
    appointment_date: "",
    resignation_date: "",
    signature: null,
    appointment_letter: null,
    history: "",
    dob: "",
    doj: "",
    dol: "",
  });
  useEffect(() => {
    const fetchCommitteeData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE}/api/committee_type/`
        );
        setCommitteeData(res.data);
      } catch (error) {
        toast.error("Error fetching committee data");
      }
    };

    const fetchDesignationData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE}/api/designation/`
        );
        setDesignationData(res.data);
      } catch (error) {
        toast.error("Error fetching designation data");
      }
    };

    const fetchAcademicYearData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE}/api/calender-year/`
        );
        setAcademicYearData(res.data);
      } catch (error) {
        toast.error("Error fetching academic year data");
      }
    };

    fetchCommitteeData();
    fetchDesignationData();
    fetchAcademicYearData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isValidDate = (dateString) => {
      const date = new Date(dateString);
      return !isNaN(date.getTime());
    };
  
    const data = new FormData();
  
    
    if (formData.dob && isValidDate(formData.dob)) {
      const formattedDob = new Date(formData.dob).toISOString().split("T")[0];
      data.append("dob", formattedDob);
    } else if (formData.dob) {
      toast.error("Invalid date of birth");
      return;
    }
    
    if (formData.doj && isValidDate(formData.doj)) {
      const formattedDoj = new Date(formData.doj).toISOString().split("T")[0];
      data.append("doj", formattedDoj);
    } else if (formData.doj) {
      toast.error("Invalid date of joining");
      return;
    }
    
    if (formData.dol && isValidDate(formData.dol)) {
      const formattedDol = new Date(formData.dol).toISOString().split("T")[0];
      data.append("dol", formattedDol);
    } else if (formData.dol) {
      toast.error("Invalid date of leaving");
      return;
    }
    
  
    if (formData.appointment_date && isValidDate(formData.appointment_date)) {
      const formattedAppointmentDate = new Date(formData.appointment_date)
        .toISOString()
        .split("T")[0];
      data.append("appointment_date", formattedAppointmentDate);
    } else if (formData.appointment_date) {
      toast.error("Invalid appointment date");
      return;
    }
  
    if (formData.calender_year_id) {
      const calendarYearId = parseInt(formData.calender_year_id, 10);
      if (isNaN(calendarYearId)) {
        toast.error("Invalid calendar year ID");
        return;
      }
      data.append("calender_year_id", calendarYearId);
    }
  
    for (let key in formData) {
      if (
        key !== "appointment_date" &&
        key !== "calender_year_id" &&
        key !== "doj" &&
        key !== "dol" &&
        key !== "dob"
      ) {
        if (key === "appointment_letter" && formData.appointment_letter) {
          data.append(key, formData.appointment_letter);
        } else if (formData[key]) {
          data.append(key, formData[key]);
        }
      }
    }
  
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE}/api/committee_member/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Form submitted successfully");
  
      setFormData({
        committee_name_id: "",
        member_name: "",
        qualification: "",
        designation_id: "",
        relation: "",
        photo: null,
        calender_year_id: "",
        appointment_date: "",
        resignation_date: "",
        signature: null,
        appointment_letter: null,
        history: "",
        dob: "",
        doj: "",
        dol: "",
      });

      setRefresh(Math.random());
  
      console.log("Form submitted successfully", res.data);
    } catch (error) {
      toast.error("Error submitting form");
      console.error("Error submitting form", error);
    }
  };
  

  return (
    <div id="add_user" className="modal custom-modal fade" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered modal-md"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Committee Member Master</h5>
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  Committee Name <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="committee_name_id"
                  value={formData.committee_name_id}
                  onChange={handleChange}
                >
                  <option value="">Select Committee Name</option>
                  {committeeData.map((committee) => (
                    <option
                      key={committee.id}
                      value={committee.committee_type_id}
                    >
                      {committee.committee_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Member Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Member Name"
                  name="member_name"
                  value={formData.member_name}
                  onChange={handleChange}
                />
              </div>

              {/* Qualification */}
              <div className="mb-3">
                <label className="form-label">Qualification</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                />
              </div>

              {/* Designation Dropdown */}
              <div className="mb-3">
                <label className="form-label">
                  Designation <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="designation_id"
                  value={formData.designation_id}
                  onChange={handleChange}
                >
                  <option value="">Select Designation</option>
                  {designationData.map((designation) => (
                    <option
                      key={designation.designation_master_id}
                      value={designation.designation_master_id}
                    >
                      {designation.designation_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Relation */}
              <div className="mb-3">
                <label className="form-label">Relation Master</label>
                <select
                  className="form-select"
                  name="relation"
                  value={formData.relation}
                  onChange={handleChange}
                >
                  <option value="staff">Staff</option>
                  <option value="alumni">Alumni</option>
                  <option value="parents">Parents</option>
                  <option value="localGuardian">Local Guardian</option>
                  <option value="governingBody">Governing Body</option>
                  <option value="ngo">NGO / Society / Trust</option>
                  <option value="donor">Donor</option>
                  <option value="celebrity">Celebrity</option>
                  <option value="politician">Politician</option>
                  <option value="governmentOfficer">Government Officer</option>
                  <option value="student">Student</option>
                  <option value="academician">Academician</option>
                </select>
              </div>

              {/* Date of Joining */}
              <div className="mb-3">
                <label className="form-label">Date of Joining</label>
                <input
                  className="form-control"
                  type="date"
                  name="doj"
                  value={formData.doj}
                  onChange={handleChange}
                />
              </div>

              {/* Date of Leaving */}
              <div className="mb-3">
                <label className="form-label">Date of Leaving</label>
                <input
                  className="form-control"
                  type="date"
                  name="dol"
                  value={formData.dol}
                  onChange={handleChange}
                />
              </div>

              {/* Date of Birth */}
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  className="form-control"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              {/* Photo Upload */}
              <div className="mb-3">
                <label className="form-label">Photo</label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  name="photo"
                  onChange={handleChange}
                />
              </div>

              {/* Academic Year Dropdown */}
              <div className="mb-3">
                <label className="form-label">Academic Year</label>
                <select
                  className="form-select"
                  name="calender_year_id"
                  value={formData.calender_year_id}
                  onChange={handleChange}
                >
                  <option value="">Select Academic Year</option>
                  {academicYearData.map((year) => (
                    <option key={year.id} value={year.calender_year_id}>
                      {year.calender_year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Appointment Date */}
              <div className="mb-3">
                <label className="form-label">Appointment Date</label>
                <input
                  className="form-control"
                  type="date"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={handleChange}
                />
              </div>

              {/* Resignation Date */}
              <div className="mb-3">
                <label className="form-label">Resignation Date</label>
                <input
                  className="form-control"
                  type="date"
                  name="resignation_date"
                  value={formData.resignation_date}
                  onChange={handleChange}
                />
              </div>

              {/* Signature Upload */}
              <div className="mb-3">
                <label className="form-label">Signature</label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  name="signature"
                  onChange={handleChange}
                />
              </div>

              {/* Appointment Letter Upload */}
              <div className="mb-3">
                <label className="form-label">Appointment Letter</label>
                <input
                  className="form-control"
                  type="file"
                  accept="application/pdf"
                  name="appointment_letter"
                  onChange={handleChange}
                />
              </div>

              {/* History */}
              <div className="mb-3">
                <label className="form-label">History</label>
                <textarea
                  className="form-control"
                  name="history"
                  rows="4"
                  value={formData.history}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
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

export default CommitememberModal;
