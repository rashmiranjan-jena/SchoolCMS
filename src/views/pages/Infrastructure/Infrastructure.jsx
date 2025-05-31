import React, { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import InfrastructureModal from "../../../components/Infrastructure/InfrastructureModal";
import Infrastructuretable from "./Infrastructuretable";
const Infrastructure = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Infrastructure Master"
          title="Dashboard"
          subtitle="Infrastructure Master"
          modal="#add_user"
          name="Add Infrastructure"
        />
       <InfrastructureModal setRefresh={setRefresh}/>
       <Infrastructuretable refresh={refresh}/>
      </div>
    </div>
  );
};

export default Infrastructure;
