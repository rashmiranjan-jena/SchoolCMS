import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Select, DatePicker } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import "react-datepicker/dist/react-datepicker.css";
import { validateForm } from "../../../../utils/formValidation";
import { create ,get} from "../../../../utils/intercepter";
const { Option } = Select;

const ImportantModal = styled.div`
  max-width: 862px !important;
  max-height: 500vh !important;
`;

const AddPollMaster = ({   mode = 'add',   initialData = null,   onClose,   onSubmit }) => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    pollNameId: initialData?.pollNameId || null,
    clubCommitteeId: initialData?.clubCommitteeId || null,
    question: initialData?.question || "",
    options: initialData?.options || [""],
    fromDate: initialData?.fromDate || null,
    toDate: initialData?.toDate || null
  });
const [committeeData,setCommitteeData] =useState([])
const [clubData,setClubData] = useState([])
const [pollName,setPollName]= useState([])

const getClubData = async () =>{
  const result = await get('club_master/')
  setClubData(result)
};

const getCommitteeData = async() =>{
  const result = await get('committee_type/');
  setCommitteeData(result)
}
const getPollNames = async() =>{
  const result = await get('poll_name_master/');
  setPollName(result)
}
useEffect(()=>{
  getPollNames()
  getClubData();
  getCommitteeData()
},[])

const [selectType, setSelectType] = useState(initialData ? 
  (initialData.committee_type_id ? 'committee' : 'club') 
  : null
);
const [clubCommitteeOptions, setClubCommitteeOptions] = useState(
  initialData?.committee_type_id 
    ? committeeData 
    : (initialData?.club_master_id 
      ? clubData 
      : [])
);

const handleTypeSelection = (type) => {
  setSelectType(type);
  setFormData(prevData => ({
    ...prevData,
    clubCommitteeId: null 
  }));

  switch(type) {
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
  const handlePollNameChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      pollNameId: value,
    }));
  };
  const formatDate = (date) => {
    if (!date) return '';
    return date.format("YYYY-MM-DD");
  };
  const handleClubCommitteeChange = (value) => {
    // getClubData()
    setFormData((prevData) => ({
      ...prevData,
      clubCommitteeId: value,
    }));
  };

  const handleQuestionChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      question: e.target.value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      options: newOptions
    }));
  };

  const addOption = () => {
    setFormData((prevData) => ({
      ...prevData,
      options: [...prevData.options, ""]
    }));
  };

  const removeOption = (index) => {
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      options: newOptions
    }));
  };

  const handleFromDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      fromDate: date
    }));
  };

  const handleToDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      toDate: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (!formData.pollNameId) {
      toast.error("Please select a Poll Name.");
      return;
    }
    if (!formData.clubCommitteeId) {
      toast.error("Please select a Club/Committee.");
      return;
    }
    if (!formData.question.trim()) {
      toast.error("Please enter a Question.");
      return;
    }
    if (formData.options.some(option => !option.trim())) {
      toast.error("Please fill all options or remove empty ones.");
      return;
    }
    if (!formData.fromDate) {
      toast.error("Please select a start date.");
      return;
    }
    if (!formData.toDate) {
      toast.error("Please select an end date.");
      return;
    }
    if (formData.fromDate > formData.toDate) {
      toast.error("Start date must be before end date.");
      return;
    }

    const payload = {
      poll_name: formData.pollNameId,
      question: formData.question.trim(),
      options: formData.options.map(option => option.trim()),
      date: formatDate(formData.fromDate),
      end_date: formatDate(formData.toDate),
    };
    
    if (selectType === 'committee') {
      payload['committee_name'] = formData.clubCommitteeId;
    } else {
      payload['club_name'] = formData.clubCommitteeId;
    }
    

    try {
      setLoading(true);     
      await create('poll_master/',payload)
      toast.success(`Poll Created`);
      resetForm()
      // onClose();
    } catch (error) {
      console.error(`Error ${mode === 'edit' ? 'updating' : 'creating'} poll:`, error);
      toast.error(`Failed to ${mode === 'edit' ? 'update' : 'create'} poll. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="poll_master" className="modal custom-modal fade" role="dialog">
      <ImportantModal className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">Poll /</span> 
              {mode === 'add' ? ' Add Poll' : ' Edit Poll'}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={resetForm}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form ref={formRef}>
              <div className="mb-3">
                <label className="form-label">
                  Poll Name <span className="text-danger">*</span>
                </label>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select Poll Name"
                  value={formData.pollNameId}
                  onChange={handlePollNameChange}
                >
                  {pollName.map(poll => (
                    <Option key={poll.poll_name_master_id} value={poll.poll_name_master_id}>
                      {poll.poll_name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Club / Committee <span className="text-danger">*</span>
                </label>
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
                <label className="form-label">
                  Question <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Question"
                  value={formData.question}
                  onChange={handleQuestionChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Options <span className="text-danger">*</span>
                </label>
                {formData.options.map((option, index) => (
                  <div key={index} className="d-flex mb-2">
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder={`Enter Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                    {formData.options.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeOption(index)}
                      >
                        <DeleteOutlined />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={addOption}
                >
                  <PlusCircleOutlined /> Add Option
                </button>
              </div>

              <div className="input-block mb-3">
                <label className="col-form-label">
                  From Date <span className="text-danger">*</span>
                </label>
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="Select Start Date"
                  onChange={handleFromDateChange}
                  value={formData.fromDate}
                />
              </div>

              <div className="input-block mb-3">
                <label className="col-form-label">
                  To Date <span className="text-danger">*</span>
                </label>
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="Select End Date"
                  onChange={handleToDateChange}
                  value={formData.toDate}
                />
              </div>

              <div className="submit-section d-flex gap-2">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading 
                    ? (mode === 'edit' ? "Updating..." : "Saving...") 
                    : (mode === 'edit' ? "Update" : "Save")}
                </button>
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
            <ToastContainer />
          </div>
        </div>
      </ImportantModal>
    </div>
  );
};

export default AddPollMaster;