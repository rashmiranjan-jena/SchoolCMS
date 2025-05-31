import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResultModal = ({ setRefresh }) => {
  const [academicYear, setAcademicYear] = useState("");
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [examName, setExamName] = useState("");
  const [examNameOptions, setExamNameOptions] = useState([]); // New state for exam names
  const [boardName, setBoardName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch academic year options
    const fetchAcademicYears = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE}/api/calender-year`
        );
        if (response.status === 200) {
          setAcademicYearOptions(response.data);
        } else {
          toast.error("Failed to load academic years.");
        }
      } catch (error) {
        console.error("Error fetching academic years:", error);
        toast.error("An error occurred while fetching academic years.");
      }
    };

    // Fetch exam name options
    const fetchExamNames = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE}/api/exam-name-master/` // Modify the API endpoint as per your backend
        );
        if (response.status === 200) {
          setExamNameOptions(response.data); // Assume data contains the list of exam names
        } else {
          toast.error("Failed to load exam names.");
        }
      } catch (error) {
        console.error("Error fetching exam names:", error);
        toast.error("An error occurred while fetching exam names.");
      }
    };

    fetchAcademicYears();
    fetchExamNames(); // Call the function to fetch exam names
  }, []);

  const validateFields = () => {
    const newErrors = {};
    if (!academicYear) newErrors.academicYear = "Academic year is required.";
    if (!examName) newErrors.examName = "Exam name is required.";
    if (!boardName) newErrors.boardName = "Board name is required.";
    if (!examDate) newErrors.examDate = "Exam date is required.";
    if (!file) newErrors.file = "Please upload a valid CSV file.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill out all required fields.");
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile);
      setFileError("");
    } else {
      setFileError("Please upload a valid CSV file.");
      setFile(null);
      toast.error("Invalid file type. Only CSV files are allowed.");
    }
  };

  const resetFileInput = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append("calender_year_id", academicYear); 
    formData.append("exam_name_id", examName);
    formData.append("board_name", boardName);
    formData.append("exam_date", examDate);
    formData.append("student_data", file);

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE}/api/results-master/`,
        formData
      );
      if (response.status === 201) {
        toast.success("Data submitted successfully!");
        setAcademicYear("");
        setExamName("");
        setBoardName("");
        setExamDate("");
        resetFileInput();
        setFileError("");
        setErrors({});
        setRefresh(Math.random());
      } else {
        toast.error("Failed to submit data. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="add_user" className="modal custom-modal fade" role="dialog">
      <ToastContainer />
      <div className="modal-dialog modal-dialog-centered modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Result Master</h5>
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
              {/* Academic Year */}
              <div className="mb-3">
                <label className="form-label">
                  Academic Year <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                >
                  <option value="">Select Academic Year</option>
                  {academicYearOptions.map((year) => (
                    <option key={year.id} value={year.calender_year_id}>
                      {year.calender_year}
                    </option>
                  ))}
                </select>
                {errors.academicYear && (
                  <div className="text-danger mt-1">{errors.academicYear}</div>
                )}
              </div>

              {/* Exam Name */}
              <div className="mb-3">
                <label className="form-label">
                  Exam Name <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                >
                  <option value="">Select Exam Name</option>
                  {examNameOptions.map((exam) => (
                    <option key={exam.id} value={exam.exam_master_id}>
                      {exam.exam_name}
                    </option>
                  ))}
                </select>
                {errors.examName && (
                  <div className="text-danger mt-1">{errors.examName}</div>
                )}
              </div>

              {/* Board Name */}
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
                  <div className="text-danger mt-1">{errors.boardName}</div>
                )}
              </div>

              {/* Exam Date */}
              <div className="mb-3">
                <label className="form-label">
                  Exam Date <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                />
                {errors.examDate && (
                  <div className="text-danger mt-1">{errors.examDate}</div>
                )}
              </div>

              {/* File Upload */}
              <div className="mb-3">
                <label className="form-label">
                  Upload Student List <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  accept=".csv"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                {fileError && (
                  <div className="text-danger mt-1">{fileError}</div>
                )}
                {errors.file && (
                  <div className="text-danger mt-1">{errors.file}</div>
                )}
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary me-2"
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
  );
};

export default ResultModal;
