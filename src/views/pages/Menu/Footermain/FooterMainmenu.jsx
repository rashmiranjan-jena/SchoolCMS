import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import FooterMainmenumodal from "../../../../components/Footermainmenumodal/FooterMainmenumodal";
import FooterMainmenutable from "./FooterMainmenutable";
const FooterMainmenu = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Footer menu Master "
          title="Dashboard"
          subtitle="Footer menu Master"
          modal="#add_user"
          name="Add Footer menu Master"
        />
     <FooterMainmenumodal/>
     <FooterMainmenutable/>
      </div>
    </div>
  );
};

export default FooterMainmenu;
