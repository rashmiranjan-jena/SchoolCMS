import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import StafflistModal from "../../../../components/Administration/Stafflist/StafflistModal";  
import Stafflisttable from "./Stafflisttable";  
import StafflistFilter from "./StafflistFilter"
const Stafflist = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Staff list Master "
          title="Dashboard"
          subtitle="Staff list Master"
          modal="#add_user"
          name="Add Staff list"
        />
        <StafflistModal setRefresh={setRefresh} />
        <StafflistFilter/>
        <Stafflisttable refresh={refresh} />
        
        
      </div>
    </div>
  );
};

export default Stafflist;
