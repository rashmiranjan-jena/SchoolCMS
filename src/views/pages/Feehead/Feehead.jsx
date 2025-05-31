import React, { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs" 
import FeeheadModal from "../../../components/Feehead/FeeheadModal";
import Feeheadtable from "./Feeheadtable";
const Award = () => {
  const [refresh,setRefresh]=useState(0)
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Feehead Master "
          title="Dashboard"
          subtitle="Feehead Master"
          modal="#add_user"
          name="Add Feehead"
        />
        <FeeheadModal setRefresh={setRefresh}/>
        <Feeheadtable refresh={refresh}/>
      </div>
    </div>
  );
};

export default Award;
