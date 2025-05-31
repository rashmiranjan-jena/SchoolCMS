import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
// import PrincipalFilter from "./PrincipalFilter";
import ClubnameFilter from "./ClubnameFilter"

import ClubnameModal from "../../../../components/Club/Clubname/ClubnameModal";
import Clubnametable from "./Clubnametable"
const Clubname = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Club Name Master "
          title="Dashboard"
          subtitle="Club Name Master"
          modal="#add_user"
          name="Add ClubName"
        />
        <ClubnameModal setRefresh={setRefresh}/>
        <ClubnameFilter />
        <Clubnametable refresh={refresh} />
      </div>
    </div>
  );
};

export default Clubname;
