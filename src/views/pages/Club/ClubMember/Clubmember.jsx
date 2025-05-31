import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";

import Clubmemberfilter from "./Clubmeberfilter"

import ClubmmemberModal from "../../../../components/Club/Clubmmember/ClubmmemberModal";
import Clubmembertable from "./Clubmembertable"
const Clubmember = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Club Member Master "
          title="Dashboard"
          subtitle="Club Member Master"
          modal="#add_user"
          name="Add ClubMember"
        />
        <ClubmmemberModal setRefresh={setRefresh}/>
        <Clubmemberfilter/>
        <Clubmembertable refresh={refresh}/>
      </div>
    </div>
  );
};

export default Clubmember;
