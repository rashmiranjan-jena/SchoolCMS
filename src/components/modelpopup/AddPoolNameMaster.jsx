import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get,create } from '../../utils/intercepter';
import { Select, DatePicker } from "antd";
const { Option } = Select;
const ImportantModal = styled.div`
  max-width: 862px !important;
  max-height: 500vh !important;
`;

const AddPoolNameMaster = ({ editData, onClose }) => {
  
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    pollName: editData ? editData["Poll Name"] : "",
    clubCommitteeId: editData ? editData["Committee / Club"] : "",
  });
  const [loading, setLoading] = useState(false);
  const [committeeData,setCommitteeData] =useState([])
  const [clubData,setClubData] = useState([])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getClubData = async () =>{
    const result = await get('club_master/')
    setClubData(result)
  };
  
  const getCommitteeData = async() =>{
    const result = await get('committee_type/');
    setCommitteeData(result)
  }

  useEffect(()=>{
    getClubData();
    getCommitteeData()
  },[]);

  const [selectType, setSelectType] = useState(editData ? 
    (editData.committee_type_id ? 'committee' : 'club') 
    : null
  );
  const [clubCommitteeOptions, setClubCommitteeOptions] = useState(
    editData?.committee_type_id 
      ? committeeData 
      : (editData?.club_master_id 
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pollName || !formData.clubCommitteeId) {
      toast.error("Please fill out all required fields.");
      return;
    }
    const payload = {
      poll_name: formData.clubCommitteeId,
    };
    
    if (selectType === 'committee') {
      payload['committee_name_id'] = formData.clubCommitteeId;
    } else {
      payload['club_name_id'] = formData.clubCommitteeId;
    }
    

    try {
      setLoading(true);     
      await create('poll_name_master/',payload)
      toast.success(`Poll Name Created`);
      resetForm()
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="Add_pool_Name_Master" className="modal custom-modal fade" role="dialog">
      <ImportantModal className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">Pool Name Master /</span> Add Pool Name Master
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  Poll Name <span className="text-danger">*</span>
                </label>
                <input
                  ref={inputRef}
                  className="form-control"
                  type="text"
                  placeholder="Enter Poll Name"
                  name="pollName"
                  value={formData.pollName}
                  onChange={handleChange}
                  autoFocus
                />
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

              <div className="submit-section d-flex gap-2">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
                <button className="btn btn-secondary" type="button" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </ImportantModal>
      <ToastContainer />
    </div>
  );
};

export default AddPoolNameMaster;
