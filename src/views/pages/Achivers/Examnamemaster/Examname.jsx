import React from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Examfilter from "./Examfilter"
import Examnametable from "./Examnametable"
import ExamModal from "../../../../components/Achievers/Examname/ExamModal"
const Examname = () => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="ExamName Master"
          title="Dashboard"
          subtitle="ExamName Master"
          modal="#add_user"
          name="Add ExamName"
        />
        <ExamModal />
        <Examfilter/>
        <Examnametable />
      </div>
    </div>
  );
};

export default Examname;
