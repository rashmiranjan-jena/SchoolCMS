import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Resultfilter from "./Resultfilter";
import Resulttable from "./Resulttable";
import ResultModal from "../../../../components/Achievers/Result/ResultModal"

const Result = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Result Master "
          title="Dashboard"
          subtitle="Result Master"
          modal="#add_user"
          name="Add Result"
        />
        <ResultModal setRefresh={setRefresh}/>
        <Resultfilter />
        <Resulttable refresh={refresh}/>
      </div>
    </div>
  );
};

export default Result;
