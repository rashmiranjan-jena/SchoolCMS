import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import MenuModal from "../../../../components/Menu/MenuModal";
import MenuTable from "./MenuTable";
const MenuItem = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Header Menu Master "
          title="Dashboard"
          subtitle="Header Menu Master"
          modal="#add_user"
          name="Add Header Menu"
        />
      <MenuModal setRefresh={setRefresh}/>
      <MenuTable/>
      </div>
    </div>
  );
};

export default MenuItem;
