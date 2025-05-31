import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Clubmasterapimodal } from "../../../views/Api/Club/Clubmaster/Clubmasterapimodal";
import { Clubmasterapi } from "../../../views/Api/Club/Clubmaster/Clubmasterapimodal";

const ClubMemberModal = ({setRefresh}) => {
  const [formData, setFormData] = useState({
    club_name_id: "",
    member_name: "",
    qualification: "",
    designation_id: "",
    relation: "",
    photo: null,
    Calender_year_id: "",
    appointment_date: "",
    resignation_date: "",
    signature: null,
    appointment_letter: null,
    history: "",
    dob: "",
    doj: "",
    dol: "",
  });

  const [errors, setErrors] = useState({});
  const [clubNames, setClubNames] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);

  useEffect(() => {
    const getDropdownData = async () => {
      try {
        const { clubNames, designations, academicYears } =
          await Clubmasterapi();
        setClubNames(clubNames);
        setDesignations(designations);
        setAcademicYears(academicYears);
      } catch (error) {
        toast.error("Failed to fetch dropdown data.");
      }
    };

    getDropdownData();
  }, []);
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  

  const validateFields = () => {
    const newErrors = {};
    if (!formData.club_name_id) newErrors.clubName = "Club name is required.";
    if (!formData.member_name)
      newErrors.memberName = "Member name is required.";
    if (!formData.qualification)
      newErrors.qualification = "Qualification is required.";
    if (!formData.designation_id)
      newErrors.designation = "Designation is required.";
    if (!formData.photo) newErrors.photo = "Photo is required.";
    if (!formData.appointment_date)
      newErrors.appointment_date = "Appointment date is required.";
    if (!formData.Calender_year_id)
      newErrors.academicYear = "Academic year is required.";
    if (!formData.dob) newErrors.dob = "Date of Birth is required."; 
    if (!formData.doj) newErrors.doj = "Date of Joining is required."; 
    if (!formData.dol) newErrors.dol = "Date of Leaving is required."; 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSave = async () => {
    if (!validateFields()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      const response = await Clubmasterapimodal(formData);
      console.log(response);
      if (response) {
        toast.success("Club member added successfully!");
        setFormData({
          club_name_id: "",
          member_name: "",
          qualification: "",
          designation_id: "",
          relation: "",
          photo: null,
          Calender_year_id: "",
          appointment_date: "",
          resignation_date: "",
          signature: null,
          appointment_letter: null,
          history: "",
        });
        setErrors({});
        setRefresh(Math.random());
      } else {
        toast.error("Failed to save the club member.");
      }
    } catch (error) {
      toast.error("An error occurred while saving the data.");
    }
  };

  const handleClose=()=>{
    setFormData({
      club_name_id: "",
      member_name: "",
      qualification: "",
      designation_id: "",
      relation: "",
      photo: null,
      Calender_year_id: "",
      appointment_date: "",
      resignation_date: "",
      signature: null,
      appointment_letter: null,
      history: "",
    });
  }
  return (
    <>
      <ToastContainer />
      <div id="add_user" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-md"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Club Member Master</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                {/* Club Name Dropdown */}
                <div className="mb-3">
                  <label className="form-label">
                    Club Name <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="club_name_id"
                    value={formData.club_name_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Club Name</option>
                    {clubNames.map((club) => (
                      <option
                        key={club.club_master_id}
                        value={club.club_master_id}
                      >
                        {club.club_name}
                      </option>
                    ))}
                  </select>

                  {errors.clubName && (
                    <small className="text-danger">{errors.clubName}</small>
                  )}
                </div>

                {/* Member Name */}
                <div className="mb-3">
                  <label className="form-label">
                    Member Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="member_name"
                    value={formData.member_name}
                    onChange={handleChange}
                    placeholder="Enter Member Name"
                  />
                  {errors.memberName && (
                    <small className="text-danger">{errors.memberName}</small>
                  )}
                </div>

                {/* Qualification */}
                <div className="mb-3">
                  <label className="form-label">Qualification</label>
                  <input
                    className="form-control"
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="Enter Qualification"
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
                    {designations.map((designation) => (
                      <option
                        key={designation.designation_master_id}
                        value={designation.designation_master_id}
                      >
                        {designation.designation_name}
                      </option>
                    ))}
                  </select>
                  {errors.designation && (
                    <small className="text-danger">{errors.designation}</small>
                  )}
                </div>

                {/* Relation */}
                <div className="mb-3">
                  <label className="form-label">Relation</label>
                  <input
                    className="form-control"
                    type="text"
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}
                    placeholder="Enter Relation"
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

                {/* Photo Upload */}
                <div className="mb-3">
                  <label className="form-label">Photo</label>
                  <input
                    className="form-control"
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>

                {/* Academic Year Dropdown */}
                <div className="mb-3">
                  <label className="form-label">
                    Academic Year <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="Calender_year_id"
                    value={formData.Calender_year_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Academic Year</option>
                    {academicYears.map((year) => (
                      <option
                        key={year.calender_year_id}
                        value={year.calender_year_id}
                      >
                        {year.calender_year}
                      </option>
                    ))}
                  </select>

                  {errors.academicYear && (
                    <small className="text-danger">{errors.academicYear}</small>
                  )}
                </div>

                {/* Appointment Date */}
                <div className="mb-3">
                  <label className="form-label">
                    Appointment Date <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="date"
                    name="appointment_date"
                    value={formData.appointment_date}
                    onChange={handleChange}
                  />
                  {errors.appointmentDate && (
                    <small className="text-danger">
                      {errors.appointmentDate}
                    </small>
                  )}
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
                    name="signature"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>

                {/* Appointment Letter Upload */}
                <div className="mb-3">
                  <label className="form-label">Appointment Letter</label>
                  <input
                    className="form-control"
                    type="file"
                    name="appointment_letter"
                    accept=".pdf"
                    onChange={handleChange}
                  />
                </div>

                {/* History */}
                <div className="mb-3">
                  <label className="form-label">History</label>
                  <textarea
                    className="form-control"
                    name="history"
                    value={formData.history}
                    onChange={handleChange}
                    placeholder="Enter History (e.g., list of members with designations)"
                  ></textarea>
                </div>

                {/* Save and Cancel Buttons */}
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
                  onClick={handleClose}
                >
                  Cancel
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubMemberModal;
