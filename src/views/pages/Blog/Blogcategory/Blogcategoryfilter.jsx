import React, { useState } from "react";

const Blogcategoryfilter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    console.log("Searching for:", query);
    // Perform your search logic here (e.g., filter data or call API)
  };

  return (
    <div className="row">
      <div className="col-auto">
        {/* Restrict input to fit only a part of the screen */}
        <input
          type="text"
          className="form-control"
          placeholder="Search here..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: "250px" }} 
        />
      </div>
    </div>
  );
};

export default Blogcategoryfilter;
