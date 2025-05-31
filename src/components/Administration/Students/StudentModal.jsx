import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentModal = ({setRefresh}) => {
  const [studentData, setStudentData] = useState({
    student_name: "",
    calender_year_id: "",
    enrollment_no: "",
    pen_no: "",
    course_id: "",
    stream_id: "",
    Class_id: "",
    dob: "",
    fathers_name: "",
    mothers_name: "",
    local_guaridian_name: "",
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to store dropdown data
  const [courses, setCourses] = useState([]);
  const [streams, setStreams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [admissionYears, setAdmissionYears] = useState([]);

  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [coursesRes, streamsRes, classesRes, admissionYearsRes] =
          await Promise.all([
            axios.get(`${process.env.REACT_APP_BASE}/api/course-master/`),
            axios.get(`${process.env.REACT_APP_BASE}/api/stream-master/`),
            axios.get(`${process.env.REACT_APP_BASE}/api/class-master/`),
            axios.get(`${process.env.REACT_APP_BASE}/api/calender-year/`),
          ]);
        setCourses(coursesRes.data);
        setStreams(streamsRes.data);
        setClasses(classesRes.data);
        setAdmissionYears(admissionYearsRes.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        toast.error("Failed to fetch dropdown data");
      }
    };
    fetchDropdownData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setStudentData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const validate = () => {
    const validationErrors = {};
    if (!studentData.student_name)
      validationErrors.student_name = "Student Name is required";
    if (!studentData.calender_year_id)
      validationErrors.calender_year_id = "Admission Year is required";
    if (!studentData.enrollment_no)
      validationErrors.enrollment_no = "Enrollment No. is required";
    if (!studentData.pen_no) validationErrors.pen_no = "PEN is required";
    if (!studentData.course_id)
      validationErrors.course_id = "Course is required";
    if (!studentData.stream_id)
      validationErrors.stream_id = "Stream is required";
    if (!studentData.Class_id) validationErrors.Class_id = "Class is required";
    if (!studentData.dob) validationErrors.dob = "Date of Birth is required";
    if (!studentData.fathers_name)
      validationErrors.fathers_name = "Father's Name is required";
    if (!studentData.mothers_name)
      validationErrors.mothers_name = "Mother's Name is required";
    if (!studentData.photo) validationErrors.photo = "Photo is required";
    return validationErrors;
  };

  const handleSave = async () => {
    setErrors({});
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsSubmitting(true);
        const formData = new FormData();
        Object.keys(studentData).forEach((key) => {
          formData.append(key, studentData[key]);
        });
        const response = await axios.post(
          `${process.env.REACT_APP_BASE}/api/student_list/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response.status)
        if (response.status === 201) {
          toast.success("Student data saved successfully.");
          setStudentData({
            student_name: "",
            calender_year_id: "",
            enrollment_no: "",
            pen_no: "",
            course_id: "",
            stream_id: "",
            Class_id: "",
            dob: "",
            fathers_name: "",
            mothers_name: "",
            local_guaridian_name: "",
            photo: null,
          });
          setRefresh(Math.random());
        } else {
          toast.error("Failed to save student data.");
        }
      } catch (error) {
        toast.error("Error saving student data.");
        console.error("Error saving student data:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  

  const handleClose = () => {
    setStudentData({
      student_name: "",
      calender_year_id: "",
      enrollment_no: "",
      pen_no: "",
      course_id: "",
      stream_id: "",
      Class_id: "",
      dob: "",
      fathers_name: "",
      mothers_name: "",
      local_guaridian_name: "",
      photo: null,
    });
    setErrors({});
  };

  return (
    <div id="add_user" className="modal custom-modal fade" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered modal-md"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Student</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              {" "}
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">
                  Student Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="student_name"
                  value={studentData.student_name}
                  onChange={handleInputChange}
                />
                {errors.student_name && (
                  <div className="text-danger">{errors.student_name}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Admission Year <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  name="calender_year_id"
                  value={studentData.calender_year_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Admission Year</option>
                  {admissionYears.map((year) => (
                    <option key={year.id} value={year.calender_year_id}>
                      {year.calender_year}
                    </option>
                  ))}
                </select>
                {errors.calender_year_id && (
                  <div className="text-danger">{errors.calender_year_id}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Enrollment No. <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="enrollment_no"
                  value={studentData.enrollment_no}
                  onChange={handleInputChange}
                  placeholder="Enter Enrollment No."
                />
                {errors.enrollment_no && (
                  <div className="text-danger">{errors.enrollment_no}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  PEN <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="pen_no"
                  value={studentData.pen_no}
                  onChange={handleInputChange}
                  placeholder="Enter PEN"
                />
                {errors.pen_no && <div className="text-danger">{errors.pen_no}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Course <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  name="course_id"
                  value={studentData.course_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.course_master_id}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
                {errors.course_id && (
                  <div className="text-danger">{errors.course_id}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Stream <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  name="stream_id"
                  value={studentData.stream_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Stream</option>
                  {streams.map((stream) => (
                    <option key={stream.id} value={stream.stream_master_id}>
                      {stream.stream_name}
                    </option>
                  ))}
                </select>
                {errors.stream_id && (
                  <div className="text-danger">{errors.stream_id}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Class <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  name="Class_id"
                  value={studentData.Class_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Class</option>
                  {classes.map((classItem) => (
                    <option
                      key={classItem.id}
                      value={classItem.class_master_id}
                    >
                      {classItem.class_name}
                    </option>
                  ))}
                </select>
                {errors.Class_id && (
                  <div className="text-danger">{errors.Class_id}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Date of Birth <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="date"
                  name="dob"
                  value={studentData.dob}
                  onChange={handleInputChange}
                />
                {errors.dob && <div className="text-danger">{errors.dob}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Father's Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="fathers_name"
                  value={studentData.fathers_name}
                  onChange={handleInputChange}
                  placeholder="Enter Father's Name"
                />
                {errors.father_name && (
                  <div className="text-danger">{errors.fathes_name}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Mother's Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="mothers_name"
                  value={studentData.mothers_name}
                  onChange={handleInputChange}
                  placeholder="Enter Mother's Name"
                />
                {errors.mother_name && (
                  <div className="text-danger">{errors.mothers_name}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Local Guardian's Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="local_guaridian_name"
                  value={studentData.local_guaridian_name}
                  onChange={handleInputChange}
                  placeholder="Enter Local Guardian's Name"
                />
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
                  onChange={handleInputChange}
                />
                {errors.photo && (
                  <div className="text-danger">{errors.photo}</div>
                )}
              </div>

              {/* Add more input fields as needed */}
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={handleSave}
                  disabled={isSubmitting}
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
      <ToastContainer />
    </div>
  );
};

export default StudentModal;
