import React, { useState } from "react";

import Breadcrumbs from "../../../../components/Breadcrumbs";

import Stafftypemastertable from "./Stafftypemastertable";
import StafftypeFilter from "./Stafftypefilter"
import StafftypemasterModal from "../../../../components/Administration/Stafftypemaster/StafftypemasterModal";

const Stafftypemaster = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="StaffTypeName Master "
          title="Dashboard"
          subtitle="StaffTypeName Master"
          modal="#add_user"
          name="Add StaffTypeName"
        />
       
        
        <StafftypemasterModal setRefresh={setRefresh} />
        <StafftypeFilter/>
        <Stafftypemastertable refresh={refresh} />
      </div>
    </div>
  );
};

export default Stafftypemaster;
