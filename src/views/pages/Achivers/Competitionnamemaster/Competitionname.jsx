import React from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Competitionnamefilter from "./Competitionnamefilter";
import CompetitionModal from "../../../../components/Achievers/Competitionname/CompetitionModal";
import Competitionnametable from "./Competitionnametable";

const Competitionname = () => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Competitionname Master "
          title="Dashboard"
          subtitle="Competitionname Master"
          modal="#add_user"
          name="Add Competitionname"
        />
        <CompetitionModal />
        <Competitionnamefilter />
        <Competitionnametable />
      </div>
    </div>
  );
};

export default Competitionname;
