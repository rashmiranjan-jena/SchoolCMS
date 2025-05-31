import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import FooterMegaTable from "./FooterMegaTable";
import FooterMegamodal from "../../../../components/Footermainmenumodal/FooterMegamodal";
const FooterMega = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Footer Mega menu Master"
          title="Dashboard"
          subtitle="Footer Mega menu Master"
          modal="#add_user"
          name="Add Footer Mega menu"
        />
     <FooterMegaTable/>
     <FooterMegamodal/>
      </div>
    </div>
  );
};

export default FooterMega;
