import React from "react";
import { Link } from "react-router-dom";


const AddAudienceTab = () => {


  return (
    <>
      <div className="tab-content">
        <div
          id="segment"
          className="pro-overview tab-pane fade show active"
        >
            <div className="row">
                <div className="col-md-4 mb-3">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <h5 className="card-title mb-0" style={{marginLeft:"10px", textWrap: "nowrap"}}>Segment Name</h5>
                        <input
                            type="text"
                            className="form-control"
                            id="Segment"
                            placeholder=" "
                            required=""
                            style={{ flex: 1, width:'200px' }}
                        />
                    </div>
                    <div className="valid-feedback">Looks good!</div>
                </div>
           
          </div>
          
        </div>
        
      </div>
      
    </>
  );
};

export default AddAudienceTab;
