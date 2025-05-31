import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateForm } from "../../utils/formValidation";
import { get, create } from '../../utils/intercepter';
import { Select, DatePicker } from "antd";
const { Option } = Select;

const NoticeandnewsModal = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    pollNameId: null,
    clubCommitteeId: null,
    notice_title: '',
    notice_details: '',
    creation_date: '',
    publication_date: '',
    till_date: '',
    images: null,
  });
  const [committeeData, setCommitteeData] = useState([]);
  const [clubData, setClubData] = useState([]);

  const getClubData = async () => {
    const result = await get('club_master/');
    setClubData(result);
  };

  const getCommitteeData = async () => {
    const result = await get('committee_type/');
    setCommitteeData(result);
  };

  useEffect(() => {
    getClubData();
    getCommitteeData();
  }, []);

  const [selectType, setSelectType] = useState('');
  const [clubCommitteeOptions, setClubCommitteeOptions] = useState([]);

  const handleTypeSelection = (type) => {
    setSelectType(type);
    setFormData(prevData => ({
      ...prevData,
      clubCommitteeId: null,
    }));

    switch (type) {
      case 'committee':
        setClubCommitteeOptions(committeeData);
        break;
      case 'club':
        setClubCommitteeOptions(clubData);
        break;
      default:
        setClubCommitteeOptions([]);
    }
  };

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleClubCommitteeChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      clubCommitteeId: value,
    }));
  };


  const handleCreationDateChange = (e) => {
    const formattedDate = e.target.value; 
    setFormData((prevData) => ({
      ...prevData,
      creation_date: formattedDate,
    }));
  };
  
  const handlePublicationDateChange = (e) => {
    const formattedDate = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      publication_date: formattedDate,
    }));
  };
  
  const handleTillDateChange = (e) => {
    const formattedDate = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      till_date: formattedDate,
    }));
  };
  
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const validationRules = {
    clubCommitteeId: [{ type: "required", message: "Enter A Club Or Committee" }],
    notice_title: [{ type: "required", message: "Notice Title is required" }],
    notice_details: [{ type: "required", message: "Detailed Notice is required" }],
    creation_date: [{ type: "required", message: "Creation Date is required" }],
    publication_date: [{ type: "required", message: "Publication Date is required" }],
    till_date: [{ type: "required", message: "Up To Date is required" }],
    images: [{ type: "required", message: "Image is required" }],
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm(formData, validationRules);
    if (!isValid) {
      return;
    }
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    if (selectType === 'committee') {
      payload.append('committee_name_id', formData.clubCommitteeId);
    } else {
      payload.append('club_name_id', formData.clubCommitteeId);
    }

    try {
      await create("notices-news/", payload);
      toast.success("Form submitted successfully!");

      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <div id="NoticeAndNews" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">News And Notice</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form ref={formRef}>
              <div className="mb-3">
                <label className="form-label">Club / Committee <span className="text-danger">*</span></label>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select Type First"
                  value={selectType}
                  onChange={(value) => handleTypeSelection(value)}
                >
                  <Option value="committee">Committee</Option>
                  <Option value="club">Club</Option>
                </Select>

                {selectType && (
                  <Select
                    style={{ width: '100%', marginTop: '10px' }}
                    placeholder={`Select ${selectType === 'committee' ? 'Committee' : 'Club'}`}
                    value={formData.clubCommitteeId}
                    onChange={handleClubCommitteeChange}
                    name='clubCommitteeId'
                  >
                    {clubCommitteeOptions.map(item => (
                      <Option
                        key={selectType === 'committee' ? item.committee_type_id : item.club_master_id}
                        value={selectType === 'committee' ? item.committee_type_id : item.club_master_id}
                      >
                        {selectType === 'committee' ? item.committee_name : item.club_name}
                      </Option>
                    ))}
                  </Select>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Notice Title <span className="text-danger">*</span></label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Notice Title"
                  name="notice_title"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Detail Notice <span className="text-danger">*</span></label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Detail Notice Title"
                  name="notice_details"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Creation Date <span className="text-danger">*</span></label>
                <input
                  type="date"
                  name="creation_date"
                  className="form-control"
                  placeholder="Select Date"
                  onChange={handleCreationDateChange}
                  value={formData.creation_date || ''} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Publication Date <span className="text-danger">*</span></label>
                <input
                  type="date"
                  name="publication_date"
                  className="form-control"
                  placeholder="Select Date"
                  onChange={handlePublicationDateChange}
                  value={formData.publication_date || ''} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Till Date <span className="text-danger">*</span></label>
                <input
                  type="date"
                  name="till_date"
                  className="form-control"
                  placeholder="Select Date"
                  onChange={handleTillDateChange}
                  value={formData.till_date || ''} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image <span className="text-danger">*</span></label>
                <input
                  className="form-control"
                  type="file"
                  name="images"
                  onChange={handleInputChange}
                />
              </div>
              <div className="submit-section d-flex gap-2">
                <button className="btn btn-primary submit-btn" onClick={handleFormSubmit}>Submit</button>
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={resetForm}
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

export default NoticeandnewsModal;
