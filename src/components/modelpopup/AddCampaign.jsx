import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  Avatar_19,
  Avatar_07,
} from '../../Routes/ImagePath/index'
import { Table } from "antd";
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";
import styled from "styled-components";
const AddCampaign = () => {
  
  const ImportantModal = styled.div`
  max-width: 862px !important;
  max-height: 500vh !important;
  /* margin: 0px; */
`;
  const options = [
    { label: "Object master", value: "Object master" },
    { label: "Brand", value: "Brand" },
    { label: "Lead generation", value: "Lead generation" },
  ];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#FF902F" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#FF902F",
      },
    }),
  };

  const optionsAudience = [
    { label: "Target", value: "Target" },
    { label: "Audience", value: "Audience" },
  ];
  const TargetAudience = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#FF902F" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#FF902F",
      },
    }),
  };

  const optionsCTA = [
    { label: "Apply Now", value: "Apply Now" },
    { label: "Learn More", value: "Learn More" },
    { label: "CONTACT Us", value: "CONTACT Us" },
    { label: "etc..", value: "etc.." },
  ];
  const CTA = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#FF902F" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#FF902F",
      },
    }),
  };

  const  optionsCampaignOwner = [
    // { label: "Apply Now", value: "Apply Now" },
  ];
  const  CampaignOwner = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#FF902F" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#FF902F",
      },
    }),
  };

  
  // Prefix Income
  const [sliderValues, setSliderValues] = useState([200, 800]);

  const handleSliderChange = (values) => {
      setSliderValues(values);
  };

  const [selectedDate1, setSelectedDate1] = useState(null);
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };

  // const data = [
  //   {
  //     id: 1,
  //     image: Avatar_19,
  //     name: "Manasmita",
  //     email: "Manasmita@.com",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     image: Avatar_07,
  //     name: "Samarik",
  //     email: "Samarik@.com",
  //     status: "Inactive",
  //   },
  // ];
  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     render: (text, record) => (
  //       <h2 className="table-avatar">
  //         <Link to="#" className="avatar">
  //           <img alt="" src={record.image} />
  //         </Link>
  //         <Link to="#" className="ant-table-cell">
  //           {text} <span>{record.role}</span>
  //         </Link>
  //       </h2>
  //     ),
  //     sorter: (a, b) => a.name.length - b.name.length,
  //   },
  //   {
  //     title: "Email",
  //     dataIndex: "email",
  //     sorter: (a, b) => a.email.length - b.email.length,
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     render: (text) => (
  //       <div className="dropdown action-label">
  //         <Link
  //           className="btn btn-white btn-sm btn-rounded dropdown-toggle"
  //           to="#"
  //           data-bs-toggle="dropdown"
  //           aria-expanded="false"
  //         >
  //           <i
  //             className={
  //               text === "Inactive"
  //                 ? "far fa-dot-circle text-danger"
  //                 : "far fa-dot-circle text-success"
  //             }
  //           />{" "}
  //           {text}
  //         </Link>
  //         <div className="dropdown-menu">
  //           <Link className="dropdown-item" to="#">
  //             <i className="far fa-dot-circle text-success" /> Active
  //           </Link>
  //           <Link className="dropdown-item" to="#">
  //             <i className="far fa-dot-circle text-danger" /> Inactive
  //           </Link>
  //         </div>
  //       </div>
  //     ),
  //     sorter: (a, b) => a.status.length - b.status.length,
  //   },
  //   {
  //     title: "Action",
  //     sorter: true,
  //     render: () => (
  //       <div className="dropdown dropdown-action text-end">
  //         <Link
  //           to="#"
  //           className="action-icon dropdown-toggle"
  //           data-bs-toggle="dropdown"
  //           aria-expanded="false"
  //         >
  //           <i className="material-icons">more_vert</i>
  //         </Link>
  //         <div className="dropdown-menu dropdown-menu-right">
  //           <Link className="dropdown-item" to="#" data-bs-target="#edit_type">
  //             <i className="fa fa-pencil m-r-5" /> Edit
  //           </Link>
  //           <Link className="dropdown-item" to="#" data-bs-target="#delete">
  //             <i className="fa fa-trash m-r-5" /> Delete
  //           </Link>
  //         </div>
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <>
      <div id="add_campaign" className="modal custom-modal fade" role="dialog">
      <ImportantModal className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> <span class="text-muted fw-light">Campaign Creation /</span>Add Campaign</h5>
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
                
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm">
                      <form className="needs-validation" noValidate="">
                        <div className="row">
                          <div className="col-md-4 mb-3">
                          <h5 className="card-title">
                            Campaign Name</h5>
                            <input
                              type="text"
                              className="form-control"
                              id="CampaignName"
                              placeholder=" Campaign  Name"
                              // defaultValue="Mark"
                              required=""
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                        
                          
                          <div className="col-md-4 mb-3">
                              <h5 className="card-title">Objective</h5>
                                <Select
                                  placeholder="Object master"
                                  options={options}
                                  styles={customStyles}
                                  isSearchable={false}
                                  
                                />
                                <div className="valid-feedback">Looks good!</div>
                          </div>
                          
                          <div className="col-md-4 mb-1">
                            <strong><label className="col-form-label col-md-2 mb-2"style={{fontSize:'15px', textWrap:'nowrap'}}>
                            Campaign Type
                            </label></strong>
                            <div className="d-flex gap-3">
                              <div className="checkbox">
                                <strong><label className="col-form-label mr-2" style={{fontSize:'15px'}}>
                                  <input type="checkbox" name="checkbox" /> Social Media
                                </label></strong>
                              </div>
                              <div className="checkbox">
                                <strong><label className="col-form-label mr-2" style={{fontSize:'15px'}}>
                                  <input type="checkbox" name="checkbox" /> Whats App
                                </label></strong>
                              </div>
                              <div className="checkbox">
                                <strong><label className="col-form-label mr-2" style={{fontSize:'15px'}}>
                                  <input type="checkbox" name="checkbox" />SMS
                                </label></strong>
                              </div>
                              <div className="checkbox">
                                <strong><label className="col-form-label mr-2" style={{fontSize:'15px'}}>
                                  <input type="checkbox" name="checkbox" />Email
                                </label></strong>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                          <div className="input-block">
                            <strong><label>Target Start Date</label></strong>
                            <div className="cal-icon">
                              <DatePicker
                                selected={selectedDate1}
                                onChange={handleDateChange1}
                                className="form-control floating datetimepicker"
                                type="date"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>{" "}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="input-block">
                            <strong><label>Target End Date</label></strong>
                            <div className="cal-icon">
                              <DatePicker
                                selected={selectedDate1}
                                onChange={handleDateChange1}
                                className="form-control floating datetimepicker"
                                type="date"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>{" "}
                          </div>
                        </div>
                        <div className="col-md-4 mb-3">
                              <strong><label htmlFor="TargetAudience" className='mb-1'>Target Audience</label></strong>

                                <Select
                                  placeholder="Multiple"
                                  options={optionsAudience}
                                  styles={TargetAudience}
                                  isSearchable={false}
                                  
                                />
                                <div className="valid-feedback">Looks good!</div>
                        </div>
                              <div className="col-md-12">
                                <div className="card-header">
                                  <h5 className="card-title">Budget</h5>
                                </div>          
                                          <div className="card-body d-flex align-items-center justify-content-between">
                                            {/* Slider Section */}
                                            <div className="col-md-8">
                                              <div className="card-body">
                                                <Slider
                                                      min={0}
                                                      max={1000}
                                                      step={2}
                                                      value={sliderValues}
                                                      onChange={handleSliderChange}
                                                      range
                                                />
                                                  ₹{sliderValues[0]} ₹{sliderValues[1]}
                                              </div>
                                           </div>

                                            {/* Dropdown Section */}
                                            <div className="currency-dropdown" style={{ marginLeft: "10px", marginTop:"-20px" }}>
                                              <select className="form-select">
                                                <option value="" disabled selected>
                                                   Currency
                                                </option>
                                                <option value="inr">₹ Rupees</option>
                                                <option value="usd">$ Dollar</option>
                                              </select>
                                            </div>
                                            <div className="number" style={{ marginLeft: "10px", marginTop:"-20px" }}>
                                             
                                                <input type="number" placeholder="Day"/>
                                                 
                                               
                                            </div>
                                          </div>
                              </div>
                          
                              <div className="col-md-6 mb-4 mt-4">
                              <strong><label htmlFor="CTA" className='mb-1'>CTA(Call To Action)</label></strong>

                                <Select
                                  placeholder="Choose"
                                  options={optionsCTA}
                                  styles={CTA}
                                  isSearchable={false}
                                  
                                />
                                <div className="valid-feedback">Looks good!</div>
                              </div>
                              <div className="col-md-6 mb-4  mt-4">
                              <strong><label htmlFor="CTA" className='mb-1'> Campaign Owner</label></strong>

                                <Select
                                  placeholder="Choose"
                                  options={optionsCampaignOwner}
                                  styles={ CampaignOwner}
                                  isSearchable={false}
                                  
                                />
                                <div className="valid-feedback">Looks good!</div>
                              </div>


                          <div className="col-md-12 mb-3 row mr-2">
                              <strong><label className="col-form-label col-md-2"style={{fontSize:'15px', textWrap:'nowrap'}}>
                              Campaign Description
                              </label></strong>
                              <div className="col-md-10">
                                <textarea
                                  rows={5}
                                  cols={5}
                                  className="form-control"
                                  placeholder="Enter text here"
                                  defaultValue={""}
                                />
                              </div>
                            </div>               
                          </div>
                    

                          {/* <div className="col-md-12 d-flex">
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
                          </div> */}
                        {/* <button className="btn btn-primary" type="submit">
                          Submit 
                        </button> */}
                      </form>
                    </div>
                  </div>
                </div>


                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="reset"
                  >
                    Submit
                  </button>
                </div>
              </form>

            </div>
          </div>
          </ImportantModal>;
      </div>
    </>
  );
};

export default AddCampaign;
