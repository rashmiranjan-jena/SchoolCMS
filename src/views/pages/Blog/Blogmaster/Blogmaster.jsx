import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import BlogmasterModal from "../../../../components/Blogmaster/BlogmasterModal";
import Blogmastertable from "./Blogmastertable";
import Blogmasterfilter from "./Blogmasterfilter"
const Blogmaster = () => {
  const[refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Blog Master"
          title="Dashboard"
          subtitle="Blog Master"
          modal="#add_user"
          name="Add Blog Master"
        />
        <Blogmasterfilter />
        <Blogmastertable refresh={refresh}/>
        <BlogmasterModal setRefresh={setRefresh}/>
      </div>
    </div>
  );
};

export default Blogmaster;
