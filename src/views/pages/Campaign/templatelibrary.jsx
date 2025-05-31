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
import Breadcrumbs from '../../../components/Breadcrumbs';

const TemplateLibrary = () => {
 
  
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
         
        <Breadcrumbs
            maintitle="Campaign"
            title="Campaign"
            subtitle="Template Library"
            modal="#add_leave"
            name="Add Template"
          />
         <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Template</h5>
          
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

export default TemplateLibrary;