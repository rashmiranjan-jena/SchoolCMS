import React,  { useEffect, useState } from 'react'
import Select from "react-select";
// import InputMask from "react-input-mask";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import {
  Avatar_19,
  Avatar_07,
} from '../../../Routes/ImagePath/index'
import { Table } from "antd";
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";
import AddCampaign from '../../../components/modelpopup/AddCampaign';

import Breadcrumbs from '../../../components/Breadcrumbs';

const CampaignCreation = () => {
  // const options = [
  //   { label: "Object master", value: "Object master" },
  //   { label: "Brand", value: "Brand" },
  //   { label: "Lead generation", value: "Lead generation" },
  // ];
  // const customStyles = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     backgroundColor: state.isFocused ? "#FF902F" : "#fff",
  //     color: state.isFocused ? "#fff" : "#000",
  //     "&:hover": {
  //       backgroundColor: "#FF902F",
  //     },
  //   }),
  // };

  // const optionsAudience = [
  //   { label: "Target", value: "Target" },
  //   { label: "Audience", value: "Audience" },
  // ];
  // const TargetAudience = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     backgroundColor: state.isFocused ? "#FF902F" : "#fff",
  //     color: state.isFocused ? "#fff" : "#000",
  //     "&:hover": {
  //       backgroundColor: "#FF902F",
  //     },
  //   }),
  // };

  // const optionsCTA = [
  //   { label: "Apply Now", value: "Apply Now" },
  //   { label: "Learn More", value: "Learn More" },
  //   { label: "CONTACT Us", value: "CONTACT Us" },
  //   { label: "etc..", value: "etc.." },
  // ];
  // const CTA = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     backgroundColor: state.isFocused ? "#FF902F" : "#fff",
  //     color: state.isFocused ? "#fff" : "#000",
  //     "&:hover": {
  //       backgroundColor: "#FF902F",
  //     },
  //   }),
  // };

  // const  optionsCampaignOwner = [
  //   // { label: "Apply Now", value: "Apply Now" },
  // ];
  // const  CampaignOwner = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     backgroundColor: state.isFocused ? "#FF902F" : "#fff",
  //     color: state.isFocused ? "#fff" : "#000",
  //     "&:hover": {
  //       backgroundColor: "#FF902F",
  //     },
  //   }),
  // };

  
  // range Income
  // const [sliderValueBudget, setSliderValueBudget] = useState(0);

  // const handleChangeBudget = (value) => {
  //     setSliderValueBudget(value);
  // };

  // const [selectedDate1, setSelectedDate1] = useState(null);
  // const handleDateChange1 = (date) => {
  //   setSelectedDate1(date);
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
            subtitle="Campaign Creation"
           modal="#add_campaign"
            name="Add Campaign"
             Linkname="/AddCampaign"
          />
         <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Campaign </h5>
          
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm">
            
            </div>
          </div>
        </div>
      </div>
          
          
        </div>
      </div>
      <AddCampaign />
    </div>
  );
}

export default CampaignCreation;