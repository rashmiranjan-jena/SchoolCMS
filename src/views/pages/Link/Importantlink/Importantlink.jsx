import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Importanttable from "./Importanttable"
import ImportantLinkModal from "../../../../components/Link/ImportantLinkModal";
const Importantlink = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="ImportantLink Master"
          title="Dashboard"
          subtitle="ImportantLink Master"
          modal="#add_user"
          name="Add ImportantLink"
        />
        <ImportantLinkModal setRefresh={setRefresh}/>
       <Importanttable refresh={refresh}/>
      </div>
    </div>
  );
};

export default Importantlink;
