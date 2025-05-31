import React,  { useEffect, useState } from 'react'
import Select from "react-select";
import { Table } from "antd";
import Breadcrumbs from '../../../components/Breadcrumbs';

const MultiChannelCreation = () => {
  const optionsCampaignName = [
    { label: "CampaignName", value: "CampaignName" },
    // { label: "Brand", value: "Brand" },
    // { label: "Lead generation", value: "Lead generation" },
  ];
  const customCampaignName = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#FF902F" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#FF902F",
      },
    }),
  };
  const optionsPrimaryChannelforCampaign = [
    { label: "PrimaryChannelforCampaign", value: "PrimaryChannelforCampaign" },
    // { label: "Brand", value: "Brand" },
    // { label: "Lead generation", value: "Lead generation" },
  ];
  const customPrimaryChannelforCampaign = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#FF902F" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#FF902F",
      },
    }),
  };
  const optionsChannelSelected = [
    { label: "facebook ", value: "facebook " },
    { label: " LinkedIn", value: " LinkedIn" },
    { label: "Google", value: "Google" },
    { label: "Instagram", value: "Instagram" },
    { label: "Email Sletter", value: "Email Sletter" },
  ];
  const customChannelSelected = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#FF902F" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#FF902F",
      },
    }),
  };
  
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
         
        <Breadcrumbs
            maintitle="Campaign"
            title="Campaign"
            subtitle="Multi Channel Creation"
            modal="#add_leave"
            name="Add MultiChannel"
          />
         <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">MultiChannel Creation</h5>
          <div className="row">
                    <div className="col-md-4 mb-3">
                       <label htmlFor="objective" className='mb-1'>Campaign Name</label>

                        <Select
                          placeholder="CampaignName"
                          options={optionsCampaignName}
                          styles={customCampaignName}
                          isSearchable={false}
                          
                        />
                         <div className="valid-feedback">Looks good!</div>
                    </div>

                    <div className="col-md-4 mb-3">
                       <label htmlFor="objective" className='mb-1'>Primary Channel for Campaign</label>

                        <Select
                          placeholder="Primary Channel for Campaign"
                          options={optionsPrimaryChannelforCampaign}
                          styles={customPrimaryChannelforCampaign}
                          isSearchable={false}
                          
                        />
                         <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="col-md-4 mb-3">
                       <label htmlFor="objective" className='mb-1'>Channel Selected</label>

                        <Select
                          placeholder="Choose"
                          options={optionsChannelSelected}
                          styles={customChannelSelected}
                          isSearchable={false}
                          
                        />
                         <div className="valid-feedback">Looks good!</div>
                    </div>
                    </div>
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
    </div>
  );
}

export default MultiChannelCreation;