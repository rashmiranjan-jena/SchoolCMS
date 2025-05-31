import React, { useState,  useRef } from 'react'
import Select from "react-select";
import Breadcrumbs from '../../../components/Breadcrumbs';
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";
import AddAudience from '../../../components/modelpopup/AddAudience';
import {
  Avatar_19,
  Avatar_07,
} from '../../../Routes/ImagePath/index'
import { Table } from "antd";
import { Link } from 'react-router-dom';

const AudienceSegment = () => {

  // const [formData, setFormData] = useState({ name: "", field: "" });
  // const [savedData, setSavedData] = useState([]); 


  //   const optionsOther = [
  //       { label: "Other", value: "Other" },
        
  //     ];
  //     const customStyles = {
  //       option: (provided, state) => ({
  //         ...provided,
  //         backgroundColor: state.isFocused ? "#FF902F" : "#fff",
  //         color: state.isFocused ? "#fff" : "#000",
  //         "&:hover": {
  //           backgroundColor: "#FF902F",
  //         },
  //       }),
  //     };
     
  //     const optionGender = [
  //       { label: "Male", value: "Male" },
  //       { label: "FeMale", value: "FeMale" },
  //       { label: "TransGender", value: "TransGender" },
  //     ];
      
  //     const customGender= {
  //       option: (provided, state) => ({
  //         ...provided,
  //         backgroundColor: state.isFocused ? "#FF902F" : "#fff",
  //         color: state.isFocused ? "#fff" : "#000",
  //         "&:hover": {
  //           backgroundColor: "#FF902F",
  //         },
  //       }),
  //     };
      
  //     const optionEducation = [
  //       { label: "Male", value: "Male" },
  //       { label: "FeMale", value: "FeMale" },
  //       { label: "TransEducation", value: "TransEducation" },
  //     ];
      
  //     const customEducation= {
  //       option: (provided, state) => ({
  //         ...provided,
  //         backgroundColor: state.isFocused ? "#FF902F" : "#fff",
  //         color: state.isFocused ? "#fff" : "#000",
  //         "&:hover": {
  //           backgroundColor: "#FF902F",
  //         },
  //       }),
  //     };
      

  //     const optionOccupation = [
  //       { label: "Male", value: "Male" },
  //       { label: "FeMale", value: "FeMale" },
  //       { label: "TransOccupation", value: "TransOccupation" },
  //     ];
      
  //     const customOccupation= {
  //       option: (provided, state) => ({
  //         ...provided,
  //         backgroundColor: state.isFocused ? "#FF902F" : "#fff",
  //         color: state.isFocused ? "#fff" : "#000",
  //         "&:hover": {
  //           backgroundColor: "#FF902F",
  //         },
  //       }),
  //     };

  //     const optionProduct = [
  //       { label: "Product1", value: "Product1" },
  //       { label: "Product2", value: "Product2" },
  //       { label: "Product3", value: "Product3" },
  //     ];
      
  //     const customProduct= {
  //       option: (provided, state) => ({
  //         ...provided,
  //         backgroundColor: state.isFocused ? "#FF902F" : "#fff",
  //         color: state.isFocused ? "#fff" : "#000",
  //         "&:hover": {
  //           backgroundColor: "#FF902F",
  //         },
  //       }),
  //     };
      
  //     const customDropList= {
  //       option: (provided, state) => ({
  //         ...provided,
  //         backgroundColor: state.isFocused ? "#FF902F" : "#fff",
  //         color: state.isFocused ? "#fff" : "#000",
  //         "&:hover": {
  //           backgroundColor: "#FF902F",
  //         },
  //       }),
  //     };
     


  //     const [sliderValueDefault, setSliderValueDefault] = useState(0);

  //     const handleChangeDefault = (value) => {
  //         setSliderValueDefault(value);
  //     };

  //     const [sliderValueIncome, setSliderValueIncome] = useState(0);

  //     const handleChangeIncome = (value) => {
  //         setSliderValueIncome(value);
  //     };


  // const handleSave = () => {
  //   if (formData.name && formData.field) {
  //     setSavedData([...savedData, formData]); 
  //     setFormData({ name: "", field: "" }); 
  //   } else {
  //     alert("Please fill in both fields before saving!");
  //   }
  // };


  // const [mapUrl, setMapUrl] = useState(
  //   "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29923.748267460505!2d85.83030991756925!3d20.363562908395775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1731758598276!5m2!1sen!2sin"
  // );


  // const locationOptions = [
  //   { label: "Bhubaneswar, India", value: "Bhubaneswar,India" },
  //   { label: "New York, USA", value: "New York,USA" },
  //   { label: "Tokyo, Japan", value: "Tokyo,Japan" },
  //   { label: "Paris, France", value: "Paris,France" },
  //   { label: "London, UK", value: "London,UK" },
  //   { label: "Sydney, Australia", value: "Sydney,Australia" },
  // ];


  // const handleLocationChange = (e) => {
  //   const selectedLocation = e.target.value;
  //   if (selectedLocation) {
     
  //     const newMapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
  //       selectedLocation
  //     )}`;
  //     setMapUrl(newMapUrl);
  //   }
  // };

  const data = [
    {
      id: 1,
      image: Avatar_19,
      name: "Manasmita",
      email: "Manasmita@.com",
      status: "Active",
    },
    {
      id: 2,
      image: Avatar_07,
      name: "Samarik",
      email: "Samarik@.com",
      status: "Inactive",
    },
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link to="#" className="avatar">
            <img alt="" src={record.image} />
          </Link>
          <Link to="#" className="ant-table-cell">
            {text} <span>{record.role}</span>
          </Link>
        </h2>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <div className="dropdown action-label">
          <Link
            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
            to="#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className={
                text === "Inactive"
                  ? "far fa-dot-circle text-danger"
                  : "far fa-dot-circle text-success"
              }
            />{" "}
            {text}
          </Link>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="#">
              <i className="far fa-dot-circle text-success" /> Active
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="far fa-dot-circle text-danger" /> Inactive
            </Link>
          </div>
        </div>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Action",
      sorter: true,
      render: () => (
        <div className="dropdown dropdown-action text-end">
          <Link
            to="#"
            className="action-icon dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to="#" data-bs-target="#edit_type">
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            <Link className="dropdown-item" to="#" data-bs-target="#delete">
              <i className="fa fa-trash m-r-5" /> Delete
            </Link>
          </div>
        </div>
      ),
    },
  ];
      
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
            
              <Breadcrumbs
                    maintitle="Campaign"
                    title="Campaign"
                    subtitle="Audience Segment"
                    modal="#add_audience"
                    name="Add Audience"
              />
          <div className="card">
                <div className="card-header">
                  < h5 className="card-title mb-0">Audience</h5>
                </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm">
                  <form className="needs-validation" noValidate="">
                    {/* <div className="row">
                                <div className="col-md-4 mb-3">
                                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <h5 className="card-title mb-0">Segment Name</h5>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="SegmentName"
                                      placeholder=" "
                                      required=""
                                      style={{ flex: 1 }}
                                    />
                                  </div>
                                  <div className="valid-feedback">Looks good!</div>
                                </div>
                              <h1 className='mt-3 mb-3'style={{textDecoration:'underline', fontSize:'35px'}}> Demographics</h1>
                            
                                  <div className="col-md-6">
                                    <div className="card-header">
                                      <h5 className="card-title">Age</h5>
                                    </div>
                                    <div className="card-body">
                                      <Slider
                                      min={8}
                                      max={65}
                                      value={sliderValueDefault}
                                      defaultValue={[8, 65]}
                                      onChange={handleChangeDefault}
                                      />
                                      {sliderValueDefault}
                                    </div>
                                  </div>
                                 
                                <div className="col-md-4 mb-3 mt-3">
                                  <h5 className="card-title">Gender</h5>

                                      <Select
                                        placeholder="choose"
                                        options={optionGender}
                                        styles={customGender}
                                        isSearchable={false}
                                        
                                      />
                                      <div className="valid-feedback">Looks good!</div>
                                </div>
                               
                                <div className="col-md-9">
                                  <div className="card-header">
                                    <h5 className="card-title">Income</h5>
                                  </div>
                                  <div className="card-body d-flex align-items-center justify-content-between">
                                    
                                    <div className="slider-container" style={{ flex: 1 }}>
                                      <Slider
                                        min={8}
                                        max={65}
                                        value={sliderValueIncome}
                                        defaultValue={[8, 65]}
                                        onChange={handleChangeIncome}
                                      />
                                      <div>{sliderValueIncome}</div>
                                    </div>

                                   
                                    <div className="currency-dropdown" style={{ marginLeft: "10px", marginTop:"-20px" }}>
                                      <select className="form-select">
                                        <option value="" disabled selected>
                                          Select Currency
                                        </option>
                                        <option value="inr">₹ Rupees</option>
                                        <option value="usd">$ Dollar</option>
                                      </select>
                                    </div>
                                    <div className="currency-dropdown" style={{ marginLeft: "10px", marginTop:"-20px" }}>
                                      <select className="form-select">
                                        <option value="" disabled selected>
                                          Select TimeLine
                                        </option>
                                        <option value="inr">Monthly</option>
                                        <option value="usd">Anually</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              
             
                                <div className="col-md-6 mb-3 mt-3 ml-5" style={{marginLeft: '21px'}}>
                                  <h5 className="card-title">Education</h5>

                                      <Select
                                        placeholder="choose"
                                        options={optionEducation}
                                        styles={customEducation}
                                        isSearchable={false}
                                        isMulti={true} 
                                      />
                                      <div className="valid-feedback">Looks good!</div>
                                </div>
                   
                                <div className="col-md-5 mb-3 mt-3 ml-5" >
                                  <h5 className="card-title">Occupation</h5>

                                      <Select
                                        placeholder="choose"
                                        options={optionOccupation}
                                        styles={customOccupation}
                                        isSearchable={false}
                                        isMulti={true} 
                                      />
                                      <div className="valid-feedback">Looks good!</div>
                                </div>
                                

                                <div className="container mt-4">
                 
                                  <div className="row">
                                    <div className="col-md-11" style={{marginLeft: '21px'}}>
                                      <h5 className="mb-3" style={{ color: "#444444cf", fontWeight: "bold" }}>
                                        Saved Data
                                      </h5>
                                      <div
                                        style={{
                                          border: "1px solid #ddd",
                                          padding: "10px",
                                          borderRadius: "8px",
                                          backgroundColor: "#f9f9f9",
                                        }}
                                      >
                                        {savedData.length > 0 ? (
                                          <ul style={{ listStyleType: "none", padding: 0 }}>
                                            {savedData.map((data, index) => (
                                              <li
                                                key={index}
                                                style={{
                                                  padding: "10px",
                                                  borderBottom:
                                                    index !== savedData.length - 1 ? "1px solid #ddd" : "none",
                                                }}
                                              >
                                                <strong style={{fontSize:'15px', marginRight: '5px'}}>Name:</strong> {data.name} <br />
                                                <strong style={{fontSize:'15px', marginRight: '5px'}}>Field:</strong> {data.field}
                                              </li>
                                            ))}
                                          </ul>
                                        ) : (
                                          <p style={{ color: "#888" }}>No data saved yet.</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <hr className="mt-5" />

                                  <div className="row align-items-center mt-3">
                                    
            
                                    <div className="col-md-2" style={{marginLeft: '21px'}}>
                                      <h3>Others</h3>
                                    </div>
           
                                    <div className="col-md-3">
                                      <label htmlFor="nameField" style={{ fontWeight: "bold" }}>
                                        Name
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="nameField"
                                        placeholder="Enter Name"
                                        value={formData.name}
                                        onChange={(e) =>
                                          setFormData({ ...formData, name: e.target.value })
                                        }
                                        style={{
                                          borderRadius: "4px",
                                        }}
                                      />
                                    </div>

  
                                    <div className="col-md-3">
                                      <label htmlFor="numericField" style={{ fontWeight: "bold" }}>
                                        Field (Put Numeric)
                                      </label>
                                      <input
                                        type="number"
                                        className="form-control"
                                        id="numericField"
                                        placeholder="Enter Number"
                                        value={formData.field}
                                        onChange={(e) =>
                                          setFormData({ ...formData, field: e.target.value })
                                        }
                                        style={{
                                          borderRadius: "4px",
                                        }}
                                      />
                                    </div>

    
                                    <div className="col-md-2 mt-3">
                                      <button className="btn btn-primary" type="button" onClick={handleSave}>
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </div>

                      <h1 className='mt-5 mb-3' style={{textDecoration:'underline', fontSize:'35px'}}> Geographics</h1>



 
                                <div className="col-md-6 mb-3 mt-3 ml-5" style={{marginLeft: '21px'}}>
                                  <h5 className="card-title">Product</h5>

                                      <Select
                                        placeholder="choose"
                                        options={optionProduct}
                                        styles={customProduct}
                                        isSearchable={false}
                                        isMulti={true} 
                                      />
                                      <div className="valid-feedback">Looks good!</div>
                                </div>
                                

                            <div className="mb-3">
                                <select
                                  className="form-select"
                                  onChange={handleLocationChange}
                                  defaultValue=""
                                  style={{ width: "300px" }}
                                >
                                  <option value="" disabled>
                                    Search for a city or country
                                  </option>
                                  {locationOptions.map((location) => (
                                    <option key={location.value} value={location.value}>
                                      {location.label}
                                    </option>
                                  ))}
                                </select>
                              </div>

        
                              <iframe
                                src={mapUrl}
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                              />
                            </div> */}
            <div className="col-md-12 d-flex">
      <div className="card card-table flex-fill">
        <div className="card-header">
          <h3 className="card-title mb-0">Clients</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <Table
              dataSource={data?.length > 0 ? data : []}
              columns={columns}
              pagination={false}
              rowKey={(record) => record.id}
            />
          </div>
        </div>
      </div>
    </div>

                       
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddAudience/>
    </div>
  );
}

export default AudienceSegment;