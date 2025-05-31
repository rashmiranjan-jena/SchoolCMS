import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AdmissionModal = ({ setRefresh }) => {
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    rollNo: "",
    penNo: "",
    slcNo: "",
    dob: "",
    doj: "",
    gender: "",
    motherTongue: "",
    phone: "",
    courseComplete: "",
    classComplete: "",
    enrolledClass: "",
    section: "",
    board: "",
    typeOfAdmission: "",
    hostelAllotment: "",
    presentAddress: "",
    permanentAddress: "",
    bloodGroup: "",
    religion: "",
    guardian: "",
    aadherNo: "",
    photo: "",
    aadherPhoto: "",
    fatherName: "",
    fatherOccupation: "",
    fatherPhone: "",
    motherName: "",
    motherOccupation: "",
    motherPhone: "",
  });

  const handleInputChange = (field, value) => {
    setStudentDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { studentDetails };

    console.log("Submitted Data:", formData);
    alert("Form submitted successfully!");

    setRefresh((prev) => prev + 1);
  };

  return (
    <div id="admission_form" className="modal custom-modal fade" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "80%" }}
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Student Admission Form</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Student Details */}
              <h5>Student Details</h5>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">
                    Student Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={studentDetails.name}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "name",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Roll No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={studentDetails.rollNo}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "rollNo",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Pen No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={studentDetails.penNo}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "penNo",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">SLC No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={studentDetails.slcNo}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "slcNo",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={studentDetails.dob}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "dob",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Date of Joining</label>
                  <input
                    type="date"
                    className="form-control"
                    value={studentDetails.doj}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "doj",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    value={studentDetails.gender}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "gender",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Mother Tongue</label>
                  <input
                    type="text"
                    className="form-control"
                    value={studentDetails.motherTongue}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "motherTongue",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={studentDetails.phone}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "phone",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Course Complete</label>
                  <select
                    className="form-select"
                    value={studentDetails.courseComplete}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "courseComplete",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Class Complete</label>
                  <select
                    className="form-select"
                    value={studentDetails.classComplete}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "classComplete",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Enrolled Class</label>
                  <input
                    type="text"
                    className="form-control"
                    value={studentDetails.enrolledClass}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "enrolledClass",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Section</label>
                  <input
                    type="text"
                    className="form-control"
                    value={studentDetails.section}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "section",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Board</label>
                  <input
                    type="text"
                    className="form-control"
                    value={studentDetails.board}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "board",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Type of Admission</label>
                  <select
                    className="form-select"
                    value={studentDetails.typeOfAdmission}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "typeOfAdmission",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Option</option>
                    <option value="Regular">Regular</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Hostel Allotment</label>
                  <select
                    className="form-select"
                    value={studentDetails.hostelAllotment}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "hostelAllotment",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Yes/No</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Present Address</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={studentDetails.presentAddress}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "presentAddress",
                        e.target.value
                      )
                    }
                  ></textarea>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Permanent Address</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={studentDetails.permanentAddress}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "permanentAddress",
                        e.target.value
                      )
                    }
                  ></textarea>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Blood Group</label>
                  <select
                    className="form-select"
                    value={studentDetails.bloodGroup}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "bloodGroup",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="O-">O-</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Religion</label>
                  <select
                    className="form-select"
                    value={studentDetails.religion}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "religion",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Religion</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Guardian</label>
                  <input
                    type="text"
                    className="form-control"
                    value={studentDetails.guardian}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "guardian",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Aadhaar No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={studentDetails.aadherNo}
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "aadherNo",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Photo</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "photo",
                        e.target.files[0]
                      )
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Aadhaar Photo</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      handleInputChange(
                        setStudentDetails,
                        "aadherPhoto",
                        e.target.files[0]
                      )
                    }
                  />
                </div>
              </div>
              <h5 className="mt-4">Parent Details</h5>
              <div className="row">
                {/* Father Details */}
                <div className="col-md-6">
                  <h6>Father Details</h6>
                  <div className="mb-3">
                    <label className="form-label">Father's Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={studentDetails.fatherName}
                      onChange={(e) =>
                        handleInputChange("fatherName", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Occupation</label>
                    <input
                      type="text"
                      className="form-control"
                      value={studentDetails.fatherOccupation}
                      onChange={(e) =>
                        handleInputChange("fatherOccupation", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={studentDetails.fatherPhone}
                      onChange={(e) =>
                        handleInputChange("fatherPhone", e.target.value)
                      }
                    />
                  </div>
                </div>
                {/* Mother Details */}
                <div className="col-md-6">
                  <h6>Mother Details</h6>
                  <div className="mb-3">
                    <label className="form-label">Mother's Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={studentDetails.motherName}
                      onChange={(e) =>
                        handleInputChange("motherName", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Occupation</label>
                    <input
                      type="text"
                      className="form-control"
                      value={studentDetails.motherOccupation}
                      onChange={(e) =>
                        handleInputChange("motherOccupation", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={studentDetails.motherPhone}
                      onChange={(e) =>
                        handleInputChange("motherPhone", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="btn btn-primary me-2">
                  Submit
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
  );
};

export default AdmissionModal;
