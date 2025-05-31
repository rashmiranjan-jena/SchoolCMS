import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const AddPageNames = () => {
  // Styled component for modal
  const ImportantModal = styled.div`
    max-width: 862px !important;
    max-height: 500vh !important;
  `;

  // States for managing the "From" and "To" dates
  const [registrationDate, setRegistrationDate] = useState(null);

  return (
    <div id="add_PageNames" className="modal custom-modal fade" role="dialog">
      <ImportantModal className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">System /</span> SubjectMaster
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-6 mb-3">    
                  <label htmlFor="PageName " className="form-label"> Page Name</label>
                  <input type="text" id="PageName" className="form-control" />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="id" className="form-label">ID</label>
                  <input type="number" id="number" className="form-control" />
                </div>
                
              </div>
            </form>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-primary me-2">Save</button>
              <button className="btn btn-secondary">Update</button>
            </div>
          </div>
        </div>
      </ImportantModal>
    </div>
  );
};

export default AddPageNames;
