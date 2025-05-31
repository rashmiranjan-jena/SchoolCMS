import React, { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import BannerModal from "../../../components/Banner/BannerModal";
import Bannertable from "./Bannertable";
const Banner = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Banner Master"
          title="Dashboard"
          subtitle="Banner Master"
          modal="#add_user"
          name="Add Banner"
        />
        <BannerModal setRefresh={setRefresh}/>
       <Bannertable refresh={refresh}/>
      </div>
    </div>
  );
};

export default Banner;
