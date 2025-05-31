import React from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";

import AddPollMaster from "./AddPollMaster";
import Pollmastertable from "./Pollmastertable";

const Pollmaster = () => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Poll Master "
          title="Dashboard"
          subtitle="Poll Master"
          modal="#poll_master"
          name="Add Poll Master"
          Linkname="/AddPollMaster"
        />
      
        <AddPollMaster />
        <Pollmastertable />
      </div>
    </div>
  );
};

export default Pollmaster;
