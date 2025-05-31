import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { create, update } from "../../utils/intercepter"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImportantModal = styled.div`
  max-width: 862px !important;
  max-height: 500vh !important;
`;

const AddCalendarYear = ({ getCalenderYear, selectedYear, mode='add' ,setMode}) => {
  
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {

    if (mode === 'edit' && selectedYear) {
      setFromDate(new Date(selectedYear.from_date));
      setToDate(new Date(selectedYear.to_date));
    } else if (mode === 'add') {
      setFromDate(null);
      setToDate(null);
    }

  }, [mode, selectedYear]);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleSave = async () => {

    if (!fromDate || !toDate) {
      toast.error("Please select both From and To dates.");
      return;
    }

    const payload = {
      from_date: formatDate(fromDate),
      to_date: formatDate(toDate),
    };

    try {
      if (mode === 'edit') {
        await update(`calender-year/?calender_year_id=`, selectedYear.id, payload);
        toast.success("Calendar Year updated successfully!");
      } else if (mode === 'add') {
        await create("calender-year/", payload);
        toast.success("Calendar Year added successfully!");
      }
      getCalenderYear();
      setFromDate(null);
      setToDate(null);
    } catch (error) {console.log(error);
    
      toast.error("Failed to add or update Calendar Year. Please try again.");
    }
  };

  return (
    <div id="add_calender" className="modal custom-modal fade" role="dialog">
      <ImportantModal className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">Calendar Year /</span> {mode === 'edit' ? 'Edit Calendar Year' : 'Add Calendar Year'}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setMode('add');
                setFromDate(null);
              }}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="input-block mb-3">
                <label className="col-form-label">
                  Calendar Year - From <span className="text-danger">*</span>
                </label>
                <div className="cal-icon">
                  <DatePicker
                    selected={fromDate}
                    onChange={handleFromDateChange}
                    className="form-control datetimepicker"
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select From Date"
                  />
                </div>
              </div>

              <div className="input-block mb-3">
                <label className="col-form-label">
                  Calendar Year - To <span className="text-danger">*</span>
                </label>
                <div className="cal-icon">
                  <DatePicker
                    selected={toDate}
                    onChange={handleToDateChange}
                    className="form-control datetimepicker"
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select To Date"
                  />
                </div>
              </div>

              <div className="submit-section d-flex gap-2">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSave}
                >
                  {mode === 'edit' ? 'Update' : 'Save'}
                </button>
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setMode('add'); 
                    setFromDate(null); 
                    setToDate(null); 
                  }}
                >
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

export default AddCalendarYear;
