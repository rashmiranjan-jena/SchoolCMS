import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Submenudatatable from "./Submenudatatable";
import SubmenuModal from "../../../../components/Menu/SubmenuModal";
const Submenudata = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Mega Menu Master "
          title="Dashboard"
          subtitle="Mega Menu Master"
          modal="#add_user"
          name="Add Mega Menu"
        />
        <SubmenuModal/>
        <Submenudatatable/>
   
      </div>
    </div>
  );
};

export default Submenudata;
