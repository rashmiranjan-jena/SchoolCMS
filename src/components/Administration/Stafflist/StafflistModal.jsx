import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StafflistModal = ({ setRefresh }) => {
  const [formData, setFormData] = useState({
    staff_type_id: "",
    employee_code: "",
    staff_name: "",
    qualification: "",
    designation_id: "",
    subject_id: "",
    doj: "",
    dol: "",
    dob: "",
    photo: null,
    signature: null,
    employeement_letter: null,
  });

  const [dropdownOptions, setDropdownOptions] = useState({
    staffTypes: [],
    designations: [],
    subjects: [],
  });

  const [errors, setErrors] = useState({
    staff_type_id: "",
    employee_code: "",
    staff_name: "",
    qualification: "",
    designation_id: "",
    subject_id: "",
    doj: "",
    dol: "",
    dob: "",
    photo: "",
    signature: "",
    employeement_letter: "",
  });

  const photoRef = useRef(null);
  const signatureRef = useRef(null);
  const employmentLetterRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [staffTypesResponse, designationsResponse, subjectsResponse] =
          await Promise.all([
            axios.get(`${process.env.REACT_APP_BASE}/api/staff_type/`),
            axios.get(`${process.env.REACT_APP_BASE}/api/designation/`),
            axios.get(`${process.env.REACT_APP_BASE}/api/subject-master/`),
          ]);

        setDropdownOptions({
          staffTypes: staffTypesResponse.data,
          designations: designationsResponse.data,
          subjects: subjectsResponse.data,
        });
      } catch (error) {
        toast.error("Error fetching dropdown data");
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, type, files, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const validateFields = () => {
    const newErrors = {};
    const requiredFields = [
      "staff_type_id",
      "employee_code",
      "staff_name",
      "qualification",
      "designation_id",
      "subject_id",
      "doj",
      "dob",
      "photo",
      "signature",
      "employeement_letter",
    ];

    requiredFields.forEach((field) => {
      if (
        !formData[field] ||
        (formData[field] instanceof File && formData[field].size === 0)
      ) {
        newErrors[field] = `${field
          .replace(/_/g, " ")
          .toUpperCase()} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) {
      toast.error("Staff List is required!");
      return;
    }

    const submitData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        submitData.append(key, value, value.name);
      } else {
        submitData.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE}/api/staff_list/`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Staff data saved successfully!");
        setRefresh(Math.random());
      }
      setFormData({
        staff_type_id: "",
        employee_code: "",
        staff_name: "",
        qualification: "",
        designation_id: "",
        subject_id: "",
        doj: "",
        dol: "",
        dob: "",
        photo: null,
        signature: null,
        employeement_letter: null,
      });
      setErrors({});

      if (photoRef.current) photoRef.current.value = null;
      if (signatureRef.current) signatureRef.current.value = null;
      if (employmentLetterRef.current) employmentLetterRef.current.value = null;
    } catch (error) {
      toast.error("Error saving staff data");
      console.error("Error saving staff data:", error.response?.data || error);
    }
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
              <h5 className="modal-title">Staff List</h5>
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
                <div className="mb-3">
                  <label className="form-label">
                    Staff Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="staff_type_id"
                    value={formData.staff_type_id}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Staff Type</option>
                    {dropdownOptions.staffTypes.map((type) => (
                      <option
                        key={type.staff_type_master_id}
                        value={type.staff_type_master_id}
                      >
                        {type.staff_type_name}
                      </option>
                    ))}
                  </select>
                  {errors.staff_type_id && (
                    <div className="text-danger">{errors.staff_type_id}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Employee Code <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="employee_code"
                    value={formData.employee_code}
                    onChange={handleInputChange}
                    placeholder="Enter Employee Code"
                  />
                  {errors.employee_code && (
                    <div className="text-danger">{errors.employee_code}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Staff Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="staff_name"
                    value={formData.staff_name}
                    onChange={handleInputChange}
                    placeholder="Enter Staff Name"
                  />
                  {errors.staff_name && (
                    <div className="text-danger">{errors.staff_name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Qualification <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    placeholder="Enter Qualification"
                  />
                  {errors.qualification && (
                    <div className="text-danger">{errors.qualification}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Designation <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="designation_id"
                    value={formData.designation_id}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Designation</option>
                    {dropdownOptions.designations.map((designation) => (
                      <option
                        key={designation.designation_master_id}
                        value={designation.designation_master_id}
                      >
                        {designation.designation_name}
                      </option>
                    ))}
                  </select>
                  {errors.designation_id && (
                    <div className="text-danger">{errors.designation_id}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Subject <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="subject_id"
                    value={formData.subject_id}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Subject</option>
                    {dropdownOptions.subjects.map((subject) => (
                      <option
                        key={subject.subject_master_id}
                        value={subject.subject_master_id}
                      >
                        {subject.subject_name}
                      </option>
                    ))}
                  </select>
                  {errors.subject_id && (
                    <div className="text-danger">{errors.subject_id}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Date of Joining (DOJ) <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="date"
                    name="doj"
                    value={formData.doj}
                    onChange={handleInputChange}
                  />
                  {errors.doj && (
                    <div className="text-danger">{errors.doj}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Date of Leaving (DOL)</label>
                  <input
                    className="form-control"
                    type="date"
                    name="dol"
                    value={formData.dol}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Date of Birth (DOB) <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                  {errors.dob && (
                    <div className="text-danger">{errors.dob}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Photo <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="photo"
                    ref={photoRef}
                    onChange={handleInputChange}
                  />
                  {errors.photo && (
                    <div className="text-danger">{errors.photo}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Signature <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="signature"
                    ref={signatureRef}
                    onChange={handleInputChange}
                  />
                  {errors.signature && (
                    <div className="text-danger">{errors.signature}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Employment Letter <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="employeement_letter"
                    ref={employmentLetterRef}
                    onChange={handleInputChange}
                  />
                  {errors.employeement_letter && (
                    <div className="text-danger">
                      {errors.employeement_letter}
                    </div>
                  )}
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

export default StafflistModal;
