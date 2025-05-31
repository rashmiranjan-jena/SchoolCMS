import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../../../../Routes/ImagePath";

const Statistics = () => {
  const [notices, setNotices] = useState([]);
  const [staffBirthdays, setStaffBirthdays] = useState([]);
  const [studentBirthdays, setStudentBirthdays] = useState([]);
  const [topperList, setTopperList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // For selected image

  useEffect(() => {
    // Fetch Notices
    axios
      .get("https://api.example.com/notices") // Replace with your actual API endpoint
      .then((response) => setNotices(response.data))
      .catch((error) => console.error("Error fetching notices:", error));

    // Fetch Birthdays (Staff and Students)
    axios
      .get(`${process.env.REACT_APP_BASE}/api/birthday/`)
      .then((response) => {
        setStaffBirthdays(response.data.staff_birthday || []);
        setStudentBirthdays(response.data.student_birthday || []);
      })
      .catch((error) => console.error("Error fetching birthdays:", error));

    // Fetch Topper List
    axios
      .get("https://api.example.com/topperlist") // Replace with your actual API endpoint
      .then((response) => setTopperList(response.data))
      .catch((error) => console.error("Error fetching topper list:", error));
  }, []);

  // Handle image change and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle image click to open modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="row">
        {/* Notices Card */}
        <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <h4 className="card-title">Notices</h4>
              {notices.length > 0 ? (
                notices.map((notice, index) => (
                  <div key={index} className="leave-info-box">
                    <div className="media d-flex align-items-center">
                      <div className="avatar">
                        <img alt="" src={User} onClick={() => handleImageClick(User)} />
                      </div>
                      <div className="media-body">
                        <div className="text-sm my-0">{notice.title}</div>
                      </div>
                    </div>
                    <div className="row align-items-center mt-3">
                      <div className="col-6">
                        <h6 className="mb-0">{notice.date}</h6>
                        <span className="text-sm text-muted">Notice Date</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Notices Available</p>
              )}
            </div>
          </div>
        </div>

        {/* Staff Birthdays Card */}
        <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <h4 className="card-title">Staff Birthdays</h4>
              {staffBirthdays.length > 0 ? (
                staffBirthdays.map((staff, index) => (
                  <div key={index} className="leave-info-box">
                    <div className="media d-flex align-items-center">
                      <div className="avatar">
                        <img
                          alt={staff.name}
                          src={`${process.env.REACT_APP_BASE}${staff.photo}`}
                          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                          onClick={() => handleImageClick(`${process.env.REACT_APP_BASE}${staff.photo}`)}
                        />
                      </div>
                      <div className="media-body">
                        <div className="text-sm my-0">{staff.name}</div>
                        <div className="text-sm text-muted">{staff.message}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Staff Birthdays Today</p>
              )}
            </div>
          </div>
        </div>

        {/* Student Birthdays Card */}
        <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <h4 className="card-title">Student Birthdays</h4>
              {studentBirthdays.length > 0 ? (
                studentBirthdays.map((student, index) => (
                  <div key={index} className="leave-info-box">
                    <div className="media d-flex align-items-center">
                      <img
                        alt={student.name}
                        src={`${process.env.REACT_APP_BASE}${student.photo}`}
                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        onClick={() => handleImageClick(`${process.env.REACT_APP_BASE}${student.photo}`)}
                      />
                      <div className="media-body">
                        <div className="text-sm my-0">{student.name}</div>
                        <div className="text-sm text-muted">{student.message}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Student Birthdays Today</p>
              )}
            </div>
          </div>
        </div>

        {/* Topper List Card */}
        <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <h4 className="card-title">Topper List</h4>
              {topperList.length > 0 ? (
                topperList.map((topper, index) => (
                  <div key={index} className="leave-info-box">
                    <div className="media d-flex align-items-center">
                      <img
                        alt=""
                        src={User}
                        onClick={() => handleImageClick(User)}
                      />
                      <div className="media-body">
                        <div className="text-sm my-0">{topper.name}</div>
                      </div>
                    </div>
                    <div className="row align-items-center mt-3">
                      <div className="col-6">
                        <h6 className="mb-0">{topper.score}</h6>
                        <span className="text-sm text-muted">Top Score</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Topper List Available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload and Preview */}
      <div>
        <h5>Upload Image</h5>
        <input type="file" onChange={handleImageChange} />
        {imagePreview && (
          <div>
            <h6>Image Preview:</h6>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
        )}
      </div>

      {/* Modal for Image Preview */}
      {isModalOpen && selectedImage && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
          onClick={closeModal}
        >
          <img
            src={selectedImage}
            alt="Preview"
            style={{ width: "80%", maxHeight: "80%", objectFit: "contain", borderRadius: "8px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Statistics;
