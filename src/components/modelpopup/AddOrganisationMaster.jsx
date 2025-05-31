import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { create } from "../../utils/intercepter";
import { validateForm } from "../../utils/formValidation";

const ImportantModal = styled.div`
  max-width: 862px !important;
  max-height: 500vh !important;
`;

const AddOrganisationMaster = () => {
  const initialFormState = {
    bussiness_name: '',
    registration_no: '',
    affliation_no: '',
    registration_date: '',
    affliation_body: '',
    type_of_organization: '',
    udise_plus_no: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip_pin: '',
    email_id: '',
    website: '',
    contact_details: {
      contactNo: '',
      whatsappNo: '',
      phoneNo1: '',
      phoneNo2: ''
    }
  };

  const [formData, setFormData] = useState(initialFormState);
  const [registrationDate, setRegistrationDate] = useState(null);
  const formRef = useRef(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validationRules = {
    bussiness_name: [
      { type: 'required', message: 'Business Name is required' },
      { type: 'minLength', value: 2, message: 'Business Name must be at least 2 characters long' },
      { type: 'maxLength', value: 100, message: 'Business Name must not exceed 100 characters' }
    ],
    registration_no: [
      { type: 'required', message: 'Registration No. is required' },
      { type: 'minLength', value: 3, message: 'Registration No. must be at least 3 characters long' },
      {
        type: 'pattern',
        value: /^\d+$/,
        message: 'Registration No must be a number'
      }
    ],
    affliation_no: [
      { type: 'required', message: 'Affiliation No. is required' },
      {
        type: 'pattern',
        value: /^\d+$/,
        message: 'Affiliation No must be a number'
      }
    ],
    registration_date: [
      { type: 'required', message: 'Registration Date is required' }
    ],
    affliation_body: [
      { type: 'required', message: 'Affiliation Body is required' }
    ],
    type_of_organization: [
      { type: 'required', message: 'Type of Organization is required' }
    ],
    udise_plus_no: [
      { type: 'required', message: 'UDISE Plus No. is required' },
      {
        type: 'pattern',
        value: /^\d+$/,
        message: 'UDISE Plus No must be a number'
      }
    ],
    address: [
      { type: 'required', message: 'Address is required' },
      { type: 'minLength', value: 5, message: 'Address must be at least 5 characters long' },
      { type: 'maxLength', value: 200, message: 'Address must not exceed 200 characters' }
    ],
    city: [
      { type: 'required', message: 'City is required' },
      { type: 'minLength', value: 2, message: 'City name must be at least 2 characters long' }
    ],
    state: [
      { type: 'required', message: 'State is required' },
      { type: 'minLength', value: 2, message: 'State name must be at least 2 characters long' }
    ],
    country: [
      { type: 'required', message: 'Country is required' },
      { type: 'minLength', value: 2, message: 'Country name must be at least 2 characters long' }
    ],
    zip_pin: [
      { type: 'required', message: 'PIN/ZIP is required' },
      {
        type: 'pattern',
        value: /^[0-9]{6}$/,
        message: 'PIN/ZIP must be a 6-digit number'
      }
    ],
    email_id: [
      { type: 'required', message: 'Email ID is required' },
      {
        type: 'pattern',
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
      }
    ],
    website: [
      {
        type: 'pattern',
        value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        message: 'Please enter a valid website URL'
      }
    ],
    contact_details: {
      contactNo: [
        { type: 'required', message: 'Contact No. is required' },
        {
          type: 'pattern',
          value: /^[6-9]\d{9}$/,
          message: 'Contact No. must be a valid 10-digit Indian mobile number'
        }
      ],
      whatsappNo: [
        {
          type: 'custom',
          validate: (value) => {
            if (value && !/^[6-9]\d{9}$/.test(value)) {
              return 'WhatsApp No. must be a valid 10-digit Indian mobile number';
            }
            return null;
          }
        }
      ],
      phoneNo1: [
        {
          type: 'custom',
          validate: (value) => {
            if (value && !/^[0-9]{10}$/.test(value)) {
              return 'Phone No. 1 must be a 10-digit number';
            }
            return null;
          }
        }
      ],
      phoneNo2: [
        {
          type: 'custom',
          validate: (value) => {
            if (value && !/^[0-9]{10}$/.test(value)) {
              return 'Phone No. 2 must be a 10-digit number';
            }
            return null;
          }
        }
      ]
    }
  };

  const flattenedFormData = {
    ...formData,
    contactNo: formData.contact_details.contactNo,
    whatsappNo: formData.contact_details.whatsappNo,
    phoneNo1: formData.contact_details.phoneNo1,
    phoneNo2: formData.contact_details.phoneNo2
  };


  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      contact_details: {
        ...prevData.contact_details,
        [name]: value
      }
    }));
  };
  const resetForm = () => {
    setFormData(initialFormState);
    setRegistrationDate(null);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm(flattenedFormData, validationRules);
    if (!isValid) return;
    try {
      const response = await create("organization-master/", formData);
      toast.success("Form submitted successfully!");
      resetForm()
    } catch (error) {
      toast.error("Error submitting form. Please try again.", error);
    }
  };

  return (
    <div id="add_Organisation" className="modal custom-modal fade" role="dialog">
      <ToastContainer />
      <ImportantModal className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">System /</span> Organisation Master
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
              <div className="row">
                <div className="col-6 mb-3">
                  <label htmlFor="businessName" className="form-label">Business Name</label>
                  <input type="text" id="businessName" name="bussiness_name" onChange={handleInputChange} className="form-control" />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="registrationNo" className="form-label">Registration No.</label>
                  <input type="text" id="registrationNo" name="registration_no" onChange={handleInputChange} className="form-control" />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="registrationDate" className="form-label">Registration Date</label>
                  <DatePicker
                    selected={registrationDate}
                    onChange={(date) => {
                      const formattedDate = new Intl.DateTimeFormat('en-CA', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      }).format(date);

                      setRegistrationDate(date);
                      setFormData((prevData) => ({
                        ...prevData,
                        registration_date: formattedDate,
                      }));
                    }}
                    className="form-control"
                    id="registrationDate"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="affiliationNo" className="form-label">Affiliation No.</label>
                  <input type="text" id="affiliationNo" name="affliation_no" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="affiliationBody" className="form-label">Affiliation Body</label>
                  <input type="text" id="affiliationBody" name="affliation_body" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="typeOrganisation" className="form-label">Type of Organisation</label>
                  <input type="text" id="typeOrganisation" name="type_of_organization" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="udisePlusNo" className="form-label">UDISE Plus No.</label>
                  <input type="text" id="udisePlusNo" name="udise_plus_no" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" id="address" name="address" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <input type="text" id="city" name="city" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="state" className="form-label">State</label>
                  <input type="text" id="state" name="state" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="country" className="form-label">Country</label>
                  <input type="text" id="country" name="country" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="pinZip" className="form-label">PIN / ZIP</label>
                  <input type="number" id="pinZip" name="zip_pin" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="email" className="form-label">Email ID</label>
                  <input type="email" id="email" name="email_id" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="website" className="form-label">Website</label>
                  <input type="text" id="website" name="website" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="contactNo" className="form-label">Contact No.</label>
                  <input type="number" id="contactNo" name="contactNo" className="form-control" onChange={handleContactChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="whatsappNo" className="form-label">WhatsApp No.</label>
                  <input type="number" id="whatsappNo" name="whatsappNo" className="form-control" onChange={handleContactChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="phoneNo1" className="form-label">Phone No. 1</label>
                  <input type="number" id="phoneNo1" name="phoneNo1" className="form-control" onChange={handleContactChange} />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="phoneNo2" className="form-label">Phone No. 2</label>
                  <input type="number" id="phoneNo2" name="phoneNo2" className="form-control" onChange={handleContactChange} />
                </div>
              </div>
            </form>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-primary me-2" onClick={handleFormSubmit}>Save</button>
              <button 
                className="btn btn-secondary" 
                type="button"
                data-bs-dismiss="modal"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </ImportantModal>
    </div>
  );
};

export default AddOrganisationMaster;
