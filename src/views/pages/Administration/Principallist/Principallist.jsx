import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import PrincipalFilter from "./PrincipalFilter";
import PrincipallistModal from "../../../../components/Administration/Principallist/PrincipallistModal";
import Principallisttable from "./Principallisttable";
const Principallist = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="PrincipalList Master "
          title="Dashboard"
          subtitle="PrincipalList Master"
          modal="#add_user"
          name="Add Principal List"
        />
        <PrincipallistModal setRefresh={setRefresh} />
        <PrincipalFilter />
        <Principallisttable refresh={refresh} />
      </div>
    </div>
  );
};

export default Principallist;
