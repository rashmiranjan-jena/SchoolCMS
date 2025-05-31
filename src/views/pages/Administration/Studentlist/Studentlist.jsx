import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import StudentModal from "../../../../components/Administration/Students/StudentModal";
import StudentFilter from "./StudentFilter";
import Studentlisttable from "./Studentlisttable";
const Studentlist = () => {
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Studentlist Master "
          title="Dashboard"
          subtitle="Studentlist Master"
          modal="#add_user"
          name="Add Students"
        />

        <StudentModal setRefresh={setRefresh} />
        <StudentFilter />
        <Studentlisttable  refresh={refresh}/>
      </div>
    </div>
  );
};

export default Studentlist;
