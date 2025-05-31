import React, { useState } from "react";

import Breadcrumbs from "../../../../components/Breadcrumbs";
import UserFilter from "./UserFilter";
import UsersTable from "./UsersTable";
import AddUserModal from "../../../../components/Administration/Users/AddUseModal";

const Users = () => {
  const[refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Designation Master "
          title="Dashboard"
          subtitle="Designation Master"
          modal="#add_user"
          name="Add Designation Master"
        />
        <UserFilter />
        <UsersTable refresh={refresh}/>
        <AddUserModal setRefresh={setRefresh}/>
      </div>
    </div>
  );
};

export default Users;
