import React from "react";

const AssetsSearchFilter = ({ setSearchQuery }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="row filter-row space">
        <div className="col-sm-6 col-md-3">
          <input
            type="text"
            className="form-control"
             placeholder="Search by committee name"
            onChange={handleInputChange} 
          />
        </div>
      </div>
    </div>
  );
};

export default AssetsSearchFilter;

