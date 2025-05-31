import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import AboutUstable from "./AboutUstable";
import AboutUsModal from "../../../../components/About/AboutUsModal";
const AboutUs = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="AboutUs Master"
          title="Dashboard"
          subtitle="AboutUs Master"
          modal="#add_user"
          name="Add AboutUs"
        />
        <AboutUsModal setRefresh={setRefresh}/>
       <AboutUstable refresh={refresh}/>
      </div>
    </div>
  );
};

export default AboutUs;
