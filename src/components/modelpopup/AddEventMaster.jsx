import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { create, get } from "../../utils/intercepter";
import { validateForm } from "../../utils/formValidation";

const { Option } = Select;

const AddEventMaster = () => {
  const initialData = {
    event_category_master_id: "",
    event_master_id: "",
    display_photo: null,
    date_from: null,
    date_to: null,
    start_time: "",
    end_time: "",
    venue: { address: '', long_lat: '' },
    clubCommitteeId: null,
    event_letter: null,
    guest_details: [{ name: "", designation: "", institute: "" }],
  };

  const [eventDetails, setEventDetails] = useState(initialData);
  const [committeeData, setCommitteeData] = useState([]);
  const [clubData, setClubData] = useState([]);
  const [eventMasterNameData, setEventMasterNameData] = useState([]);
  const [eventCategoryData, setEventCategoryData] = useState([]);
  const [selectType, setSelectType] = useState('');
  const [clubCommitteeOptions, setClubCommitteeOptions] = useState([]);

  const formRef = useRef(null);

  
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [clubs, committees, eventNames, eventCategories] = await Promise.all([
          get('club_master/'),
          get('committee_type/'),
          get('events-name-master/'),
          get('events-category-master/')
        ]);

        setClubData(clubs);
        setCommitteeData(committees);
        setEventMasterNameData(eventNames);
        setEventCategoryData(eventCategories);
      } catch (error) {
        toast.error("Error fetching initial data");
        console.error("Fetch error:", error);
      }
    };

    fetchInitialData();
  }, []);

  const resetForm = () => {
    setEventDetails(initialData);
    setSelectType('');
    setClubCommitteeOptions([]);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleTypeSelection = (type) => {
    setSelectType(type);
    setEventDetails(prev => ({
      ...prev,
      clubCommitteeId: null,
    }));

    setClubCommitteeOptions(type === 'committee' ? committeeData : type === 'club' ? clubData : []);
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      setEventDetails(prev => ({
        ...prev,
        [fileType]: file
      }));
    }
  };
  const handleFromDateChange = (e) => {
    const formattedDate = e.target.value;
    setEventDetails((prevData) => ({
      ...prevData,
      date_from: formattedDate,
    }));
  };
  
  const handleToDateChange = (e) => {
    const formattedDate = e.target.value;
    setEventDetails((prevData) => ({
      ...prevData,
      date_to: formattedDate,
    }));
  };

  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...eventDetails.guest_details];
    updatedGuests[index][field] = value;
    setEventDetails(prev => ({ ...prev, guest_details: updatedGuests }));
  };

  const removeGuest = (index) => {
    setEventDetails(prev => ({
      ...prev,
      guest_details: prev.guest_details.filter((_, i) => i !== index)
    }));
  };

  const addGuest = () => {
    setEventDetails(prev => ({
      ...prev,
      guest_details: [...prev.guest_details, { name: "", designation: "", institute: "" }]
    }));
  };

  const validationRules = {
    event_category_master_id: [{ type: "required", message: "Enter Event Category" }],
    event_master_id: [{ type: "required", message: "Enter Event Name" }],
    display_photo: [{ type: "required", message: "Display Image is required" }],
    date_from: [{ type: "required", message: "Event Starting Date is required" }],
    date_to: [{ type: "required", message: "Event End Date is required" }],
    start_time: [{ type: "required", message: "Event Starting Time is required" }],
    end_time: [{ type: "required", message: "Event Ending Time is required" }],
    'venue.address': [{ type: "required", message: "Venue Address is required" }],
    clubCommitteeId: [{ type: "required", message: "Club/Committee is required" }],
    event_letter: [{ type: "required", message: "Event Letter is required" }],
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    
    const formDataToValidate = {
      ...eventDetails,
      'venue.address': eventDetails.venue.address,
      venue: JSON.stringify({
        address: eventDetails.venue.address,
        long_lat: eventDetails.venue.long_lat || '' 
      })
    };

    const isValid = validateForm(formDataToValidate, validationRules);
    if (!isValid) {
      return;
    }

    const payload = new FormData();
    
    
    Object.entries(formDataToValidate).forEach(([key, value]) => {
      if (value instanceof File) {
        payload.append(key, value);
      } else if (value !== null && value !== undefined) {
        payload.append(key, value);
      }
    });

    
    const guestDetails = eventDetails.guest_details.map(guest => ({
      name: guest.name,
      designation: guest.designation,
      institute: guest.institute
  }));
  
  payload.append('guest_details', JSON.stringify(guestDetails));

    
    if (selectType === 'committee') {
      payload.append('committee_name_id', eventDetails.clubCommitteeId);
      payload.delete('clubCommitteeId')
    } else if (selectType === 'club') {
      payload.delete('clubCommitteeId')

      payload.append('club_name_id', eventDetails.clubCommitteeId);
    }

    try {
      await create("event-master-view/", payload);
      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <div id="add_EventMaster" className="modal custom-modal fade" role="dialog">
      <ToastContainer />
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">Event /</span> Event Master
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form ref={formRef}>
              {/* Event Master Section */}
              <h5>Event Master</h5>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Event Name Master <span className="text-danger">*</span></label>
                  <Select
                    style={{ width: '100%', marginTop: '10px' }}
                    placeholder='Select Event Master'
                    value={eventDetails.event_master_id}
                    onChange={(value) => setEventDetails(prev => ({ ...prev, event_master_id: value }))}
                    name='event_master_id'
                  >
                    {eventMasterNameData.map(item => (
                      <Option
                        key={item.event_master_id}
                        value={item.event_master_id}
                      >
                        {item.event_name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Event Category <span className="text-danger">*</span></label>
                  <Select
                    style={{ width: '100%', marginTop: '10px' }}
                    placeholder='Select Event Category'
                    value={eventDetails.event_category_master_id}
                    onChange={(value) => setEventDetails(prev => ({ ...prev, event_category_master_id: value }))}
                    name='event_category_master_id'
                  >
                    {eventCategoryData.map(item => (
                      <Option
                        key={item.event_category_master_id}
                        value={item.event_category_master_id}
                      >
                        {item.event_category_name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Display Photo <span className="text-danger">*</span></label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleFileChange(e, "display_photo")}
                    accept="image/*"
                  />
                </div>
              </div>

              {/* Event Details Section */}
              <h5>Event Details</h5>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Date From <span className="text-danger">*</span></label>
                  <input
                  type="date"
                  name="date_from"
                  className="form-control"
                  placeholder="Select Date"
                  onChange={handleFromDateChange}
                  value={eventDetails.date_from || ''} 
                />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Date To <span className="text-danger">*</span></label>
                  <input
                  type="date"
                  name="date_to"
                  className="form-control"
                  placeholder="Select Date"
                  onChange={handleToDateChange}
                  value={eventDetails.date_to || ''} 
                />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Start Time <span className="text-danger">*</span></label>
                  <input
                    type="time"
                    className="form-control"
                    name="start_time"
                    value={eventDetails.start_time}
                    onChange={(e) => setEventDetails(prev => ({ ...prev, start_time: e.target.value }))}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">End Time <span className="text-danger">*</span></label>
                  <input
                    type="time"
                    className="form-control"
                    name="end_time"
                    value={eventDetails.end_time}
                    onChange={(e) => setEventDetails(prev => ({ ...prev, end_time: e.target.value }))}
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Venue Address <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={eventDetails.venue.address}
                    onChange={(e) => setEventDetails(prev => ({
                      ...prev,
                      venue: { ...prev.venue, address: e.target.value }
                    }))}
                    placeholder="Enter Venue Address"
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Venue Lat-Long (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={eventDetails.venue.long_lat}
                    onChange={(e) => setEventDetails(prev => ({
                      ...prev,
                      venue: { ...prev.venue, long_lat: e.target.value }
                    }))}
                    placeholder="Optional: Enter latitude and longitude"
                  />
                </div>
              </div>

              {/* Organiser Section */}
              <h5>Organiser <span className="text-danger">*</span></h5>
              <div className="mb-3">
                <label className="form-label">Club / Committee Type <span className="text-danger">*</span></label>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select Type First"
                  value={selectType}
                  onChange={handleTypeSelection}
                >
                  <Option value="committee">Committee</Option>
                  <Option value="club">Club</Option>
                </Select>

                {selectType && (
                  <Select
                    style={{ width: '100%', marginTop: '10px' }}
                    placeholder={`Select ${selectType === 'committee' ? 'Committee' : 'Club'}`}
                    value={eventDetails.clubCommitteeId}
                    onChange={(value) => setEventDetails(prev => ({ ...prev, clubCommitteeId: value }))}
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

              {/* Notice Section */}
              <h5>Notice</h5>
              <div className="mb-3">
                <label className="form-label">Event Letter <span className="text-danger">*</span></label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleFileChange(e, "event_letter")}
                  accept=".pdf,.doc,.docx"
                />
              </div>

              {/* Guests Section */}
              <h5>Add Guest</h5>
             
              <h5>Add Guest</h5>
              {eventDetails.guest_details.map((guest, index) => (
                <div key={index} className="row">
                  <div className="col-4 mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={guest.name}
                      onChange={(e) => handleGuestChange(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="col-4 mb-3">
                    <label className="form-label">Designation</label>
                    <input
                      type="text"
                      className="form-control"
                      value={guest.designation}
                      onChange={(e) => handleGuestChange(index, "designation", e.target.value)}
                    />
                  </div>
                  <div className="col-4 mb-3">
                    <label className="form-label">Institute</label>
                    <input
                      type="text"
                      className="form-control"
                      value={guest.institute}
                      onChange={(e) => handleGuestChange(index, "institute", e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-outline-primary mb-3" onClick={addGuest}>
                Add Guest
              </button>

              {/* Add Report */}
              {/* <h5>Add Report</h5>
              <div className="mb-3">
                <label className="form-label">Text Editor / Upload PDF</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleFileChange(e, "report")}
                />
              </div> */}

              {/* Add Gallery */}
              {/* <h5>Add Gallery</h5>
              <div className="mb-3">
                <label className="form-label">Add Images (Multiple)</label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={(e) =>
                    setEventDetails((prev) => ({
                      ...prev,
                      galleryImages: [...e.target.files],
                    }))
                  }
                />
              </div> */}
              {/* <h5>Add Videos (Only YouTube URLs)</h5>
              {eventDetails.youtubeLinks.map((link, index) => (
                <div className="row" key={index}>
                  <div className="col-12 mb-3">
                    <label className="form-label">YouTube Link</label>
                    <input
                      type="text"
                      className="form-control"
                      value={link}
                      onChange={(e) => handleYouTubeLinkChange(index, e.target.value)}
                    />
                  </div>
                </div>
              ))} */}

              <div className="modal-footer">
                <button type="button" className="btn btn-primary"  onClick={handleFormSubmit} >
                  Save
                </button>
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
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

export default AddEventMaster;
