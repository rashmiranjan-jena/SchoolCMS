import React,{useState} from "react";

import "react-datepicker/dist/react-datepicker.css";

import Breadcrumbs from "../../../../components/Breadcrumbs";

import AssetsTable from "./AssetsTable";
import AddAssetpopup from "../../../../components/modelpopup/Assets/AddAssetpopup";
import EditAssetpopup from "../../../../components/modelpopup/Assets/EditAssetpopup";
import DeleteModal from "../../../../components/modelpopup/deletePopup";

const Assets = () => {
  const [refresh,setRefresh]=useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Commmittee Name"
          title="Dashboard"
          subtitle="Commmittee Name"
          modal="#add_asset"
          name="Add Commmittee Name"
        />
       
        <AssetsTable refresh={refresh}/>
        <AddAssetpopup setRefresh={setRefresh}/>
        <EditAssetpopup />
        <DeleteModal Name="Delete Asset" />
      </div>
    </div>
  );
};

export default Assets;
