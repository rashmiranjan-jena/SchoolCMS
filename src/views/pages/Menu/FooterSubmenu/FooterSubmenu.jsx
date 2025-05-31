import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";

import FooterSubmenumodal from "../../../../components/Footermainmenumodal/FooterSubmenumodal";
import FooterSubmenutable from "./FooterSubmenutable";
const FooterSubmenu = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Footer SubMenu Master "
          title="Dashboard"
          subtitle="Footer SubMenu Master"
          modal="#add_user"
          name="Add Footer SubMenu"
        />
        <FooterSubmenumodal/>
        <FooterSubmenutable/>
   
      </div>
    </div>
  );
};

export default FooterSubmenu;
