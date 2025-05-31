import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import FooterModal from "../../../../components/Menu/FooterModal";
import Footertable from "./Footertable";
const Footermenu = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Sub Menu Master "
          title="Dashboard"
          subtitle="Sub Menu Master"
          modal="#add_user"
          name="Add Sub Menu"
        />
     <FooterModal/>
     <Footertable/>
      </div>
    </div>
  );
};

export default Footermenu;
