import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Megamenutable from "./Megamenutable";
import MegamenuModal from "../../../../components/Megamenu/MegamenuModal";
const Megamenu = () => {
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
        <Megamenutable/>
        <MegamenuModal/>
   
      </div>
    </div>
  );
};

export default Megamenu;
