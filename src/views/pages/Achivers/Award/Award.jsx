import React from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Awardfilter from "./Awardfilter";
import AwardModal from "../../../../components/Achievers/Award/AwardModal";
import Awardtable from "./Awardtable";
const Award = () => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Award Master "
          title="Dashboard"
          subtitle="Award Master"
          modal="#add_user"
          name="Add Award"
        />
        <AwardModal />
        <Awardfilter/>
        <Awardtable />
      </div>
    </div>
  );
};

export default Award;
