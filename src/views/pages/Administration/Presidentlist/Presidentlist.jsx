import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import PresidentFilter from "./PresidentFilter";
import Presidentlistmodal from "../../../../components/Administration/President/PresidentModal";

import Presidentlisttable from "./Presidentlisttable";
const Presidentlist = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Presidentlist Master "
          title="Dashboard"
          subtitle="Presidentlist Master"
          modal="#add_user"
          name="Add Presidentlist"
        />

        <Presidentlistmodal setRefresh={setRefresh} />
        <PresidentFilter />
        <Presidentlisttable refresh={refresh} />
      </div>
    </div>
  );
};

export default Presidentlist;
