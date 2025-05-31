import React,  { useEffect, useState } from 'react'
import Select from "react-select";
import InputMask from "react-input-mask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import {
  Avatar_19,
  Avatar_07,
} from '../../../Routes/ImagePath/index'
import { Table } from "antd";
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";
import Breadcrumbs from '../../../components/Breadcrumbs';

const AddCampaign = () => {
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

  
  // range Income
  const [sliderValueBudget, setSliderValueBudget] = useState(0);

  const handleChangeBudget = (value) => {
      setSliderValueBudget(value);
  };

  const [selectedDate1, setSelectedDate1] = useState(null);
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };

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
            subtitle="Campaign Creation"
            modal="#add_leave"
            name="Add Campaign"
          />
         <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Custom Bootstrap Form Validation</h5>
          
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm">
              <form className="needs-validation" noValidate="">
                <div className="row">
                  <div className="col-md-4 mb-3">
                  <h5 className="card-title">Campaign Name</h5>
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
                    <label className="col-form-label col-md-2 mb-2"style={{fontSize:'15px', textWrap:'nowrap'}}>
                    Campaign Type
                    </label>
                    <div className="d-flex gap-3">
                      <div className="checkbox">
                        <label className="col-form-label mr-2" style={{fontSize:'15px'}}>
                          <input type="checkbox" name="checkbox" /> Social Media
                        </label>
                      </div>
                      <div className="checkbox">
                        <label className="col-form-label mr-2" style={{fontSize:'15px'}}>
                          <input type="checkbox" name="checkbox" /> Whats App
                        </label>
                      </div>
                      <div className="checkbox">
                        <label className="col-form-label mr-2" style={{fontSize:'15px'}}>
                          <input type="checkbox" name="checkbox" />SMS
                        </label>
                      </div>
                      <div className="checkbox">
                        <label className="col-form-label mr-2" style={{fontSize:'15px'}}>
                          <input type="checkbox" name="checkbox" />Email
                        </label>
                      </div>
                    </div>
                  </div>
                   <div className="col-md-4">
                  <div className="input-block">
                    <label>Target Start Date</label>
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
                    <label>Target End Date</label>
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
                       <label htmlFor="TargetAudience" className='mb-1'>Target Audience</label>

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
                                    <div className="slider-container" style={{ flex: 1 }}>
                                      <Slider
                                        min={8}
                                        max={65}
                                        value={sliderValueBudget}
                                        defaultValue={[8, 65]}
                                        onChange={handleChangeBudget}
                                      />
                                      <div>{sliderValueBudget}</div>
                                    </div>

                                    {/* Dropdown Section */}
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
                   
                  <div className="col-md-4 mb-3">
                       <label htmlFor="CTA" className='mb-1'>CTA(Call To Action)</label>

                        <Select
                          placeholder="Choose"
                          options={optionsCTA}
                          styles={CTA}
                          isSearchable={false}
                          
                        />
                         <div className="valid-feedback">Looks good!</div>
                  </div>
                  <div className="col-md-4 mb-3">
                       <label htmlFor="CTA" className='mb-1'> Campaign Owner</label>

                        <Select
                          placeholder="Choose"
                          options={optionsCampaignOwner}
                          styles={ CampaignOwner}
                          isSearchable={false}
                          
                        />
                         <div className="valid-feedback">Looks good!</div>
                  </div>


                  <div className="col-md-12 mb-3 row mr-2">
                      <label className="col-form-label col-md-2"style={{fontSize:'15px'}}>
                      Campaign Description
                      </label>
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
        {/* <div className="card-footer">
          <Link to="/clients">View all clients</Link>
        </div> */}
      </div>
    </div>

                <button className="btn btn-primary" type="submit">
                  Submit 
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
          
          
        </div>
      </div>
    </div>
  );
}

export default AddCampaign;