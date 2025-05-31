import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Blogcategoryfilter from "./Blogcategoryfilter";
import Blogcategorytable from "./Blogcategorytable";
import BlogcategoryModal from "../../../../components/Blogcategory/BlogcategoryModel";

const Blogcategory = () => {
  const[refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Blogcategory Master "
          title="Dashboard"
          subtitle="Blogcategory Master"
          modal="#add_user"
          name="Add Blogcategory"
        />
        <Blogcategoryfilter />
        <Blogcategorytable refresh={refresh}/>
        <BlogcategoryModal setRefresh={setRefresh}/>
      </div>
    </div>
  );
};

export default Blogcategory;
