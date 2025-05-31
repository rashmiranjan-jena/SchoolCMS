import React, { useState } from "react";

import Breadcrumbs from "../../../../components/Breadcrumbs";
import CommitememberFilter from "./CommitememberFilter"
import CommitememberTable from "./CommitememberTable"
import CommitememberModal from "../../../../components/Administration/Commitemember/CommitememberModal"

const Commitemember = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Commitemember Master "
          title="Dashboard"
          subtitle="Commitemember Master"
          modal="#add_user"
          name="Add Commitemember"
        />
        <CommitememberModal setRefresh={setRefresh} />
        <CommitememberFilter/>
        <CommitememberTable refresh={refresh} />
        
      </div>
    </div>
  );
};

export default Commitemember;
