import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResolutionModal = () => {
  const [type, setType] = useState("");
  const [clubOrCommitteeData, setClubOrCommitteeData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [academicYears, setAcademicYears] = useState([]);
  const [members, setMembers] = useState([]);
  const [checkedMembers, setCheckedMembers] = useState([]);
  const [date, setDate] = useState("");
  const [resolutionFile, setResolutionFile] = useState(null);

  const resolutionFileRef = useRef(null); // useRef for file input reset

  const [formErrors, setFormErrors] = useState({
    type: "",
    selectedId: "",
    academicYear: "",
    date: "",
    resolutionFile: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE}/api/calender-year/`)
      .then((response) => {
        setAcademicYears(response.data);
      })
      .catch((error) => {
        console.error("Error fetching academic years:", error);
      });
  }, []);

  const handleTypeChange = (selectedType) => {
    setType(selectedType);
    setClubOrCommitteeData([]);
    setSelectedId("");
    setMembers([]);
    setFormErrors({ ...formErrors, type: "" });

    if (selectedType === "club") {
      fetchClubOrCommitteeData(
        `${process.env.REACT_APP_BASE}/api/club_master/`
      );
    } else if (selectedType === "committee") {
      fetchClubOrCommitteeData(
        `${process.env.REACT_APP_BASE}/api/committee_type/`
      );
    }
  };

  const fetchClubOrCommitteeData = async (apiUrl) => {
    try {
      const response = await axios.get(apiUrl);
      setClubOrCommitteeData(response.data);
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
    }
  };

  const handleSelectionChange = (id) => {
    setSelectedId(id);
    setFormErrors({ ...formErrors, selectedId: "" });

    const selectedEntity = clubOrCommitteeData.find(
      (item) =>
        (type === "club" && item.club_master_id === id) ||
        (type === "committee" && item.committee_type_id === id)
    );

    if (selectedEntity) {
      if (type === "club") {
        setMembers(selectedEntity.members || []);
      } else if (type === "committee") {
        setMembers([]);
      }
      setCheckedMembers([]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResolutionFile(e.target.files[0]);
      setFormErrors({ ...formErrors, resolutionFile: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let errors = {};
    if (!type) errors.type = "Please select a type.";
    if (!selectedId) errors.selectedId = "Please select a club or committee.";
    if (!academicYear) errors.academicYear = "Please select an academic year.";
    if (!date) errors.date = "Please select a date.";
    if (!resolutionFile) errors.resolutionFile = "Please upload a resolution file.";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return; // Stop if there are validation errors

    const formData = new FormData();
    formData.append("type", type);
    formData.append("academic_year", academicYear);
    formData.append("date", date);
    formData.append("upload_resolution", resolutionFile);

    if (type === "club") {
      const selectedClub = clubOrCommitteeData.find(
        (item) => Number(item.club_master_id) === Number(selectedId)
      );
      if (selectedClub) {
        formData.append("club_name_id", selectedClub.club_master_id);
      } else {
        errors.selectedId = "Selected club not found!";
        setFormErrors(errors);
        return;
      }
    } else if (type === "committee") {
      const selectedCommittee = clubOrCommitteeData.find(
        (item) => Number(item.committee_type_id) === Number(selectedId)
      );
      if (selectedCommittee) {
        formData.append("committee_name_id", selectedCommittee.committee_type_id);
      } else {
        errors.selectedId = "Selected committee not found!";
        setFormErrors(errors);
        return;
      }
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE}/api/resolutions/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Resolution submitted successfully!");
      resetForm(); 
    } catch (error) {
      console.error("Error submitting resolution:", error);
      toast.error("Error submitting resolution. Please try again.");
    }
  };

  const resetForm = () => {
    setType("");
    setSelectedId("");
    setAcademicYear("");
    setDate("");
    setResolutionFile(null);
    setClubOrCommitteeData([]);
    setMembers([]);
    setCheckedMembers([]);
    resolutionFileRef.current.value = ""; 
  };

  return (
    <>
      <ToastContainer />
      <div id="add_user" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "80%" }}
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Resolutions</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Select Type */}
                <div className="mb-3">
                  <label className="form-label">
                    Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="club">Club</option>
                    <option value="committee">Committee</option>
                  </select>
                  {formErrors.type && (
                    <div className="text-danger">{formErrors.type}</div>
                  )}
                </div>

                {/* Select Club or Committee */}
                {type && (
                  <div className="mb-3">
                    <label className="form-label">
                      {type === "club" ? "Club" : "Committee"} Name{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={selectedId}
                      onChange={(e) => handleSelectionChange(e.target.value)}
                    >
                      <option value="">
                        Select {type === "club" ? "Club" : "Committee"}
                      </option>
                      {clubOrCommitteeData &&
                        clubOrCommitteeData.length > 0 &&
                        clubOrCommitteeData.map((item) => (
                          <option
                            key={item.id}
                            value={
                              type === "club"
                                ? item.club_master_id
                                : item.committee_type_id
                            }
                          >
                            {type === "club"
                              ? item.club_name
                              : item.committee_name}
                          </option>
                        ))}
                    </select>
                    {formErrors.selectedId && (
                      <div className="text-danger">{formErrors.selectedId}</div>
                    )}
                  </div>
                )}

                {/* Academic Year */}
                <div className="mb-3">
                  <label className="form-label">
                    Academic Year <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                  >
                    <option value="">Select Academic Year</option>
                    {academicYears &&
                      academicYears.length > 0 &&
                      academicYears.map((year, index) => (
                        <option key={index} value={year.calender_year_id}>
                          {year.calender_year}
                        </option>
                      ))}
                  </select>
                  {formErrors.academicYear && (
                    <div className="text-danger">{formErrors.academicYear}</div>
                  )}
                </div>

                {/* Date */}
                <div className="mb-3">
                  <label className="form-label">
                    Date <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  {formErrors.date && (
                    <div className="text-danger">{formErrors.date}</div>
                  )}
                </div>

                {/* Upload Resolution */}
                <div className="mb-3">
                  <label className="form-label">
                    Upload Resolution <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    accept=".pdf"
                    ref={resolutionFileRef}
                    onChange={handleFileChange}
                  />
                  {formErrors.resolutionFile && (
                    <div className="text-danger">{formErrors.resolutionFile}</div>
                  )}
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-end mt-3">
                  <button type="submit" className="btn btn-primary me-2">
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
    </>
  );
};

export default ResolutionModal;
