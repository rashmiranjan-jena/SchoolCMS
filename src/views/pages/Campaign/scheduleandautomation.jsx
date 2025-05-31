import React,  { useEffect, useState } from 'react'

import { Table } from "antd";
import Breadcrumbs from '../../../components/Breadcrumbs';

const ScheduleandAutomation = () => {
 
  
  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
         
        <Breadcrumbs
            maintitle="Campaign"
            title="Campaign"
            subtitle="Schedule and Automation"
            modal="#add_leave"
            name="Add Template"
          />
         <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Schedule</h5>
          
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

export default ScheduleandAutomation;