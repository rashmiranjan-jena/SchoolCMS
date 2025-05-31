import React from 'react'
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Resolutiontable from './Resolutiontable';
import Resolutionfilter from './Resolutionfilter';
import ResolutionModal from '../../../../components/Resolution/ResolutionModal';
const Resolution = () => {
  
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Resolution Master "
          title="Dashboard"
          subtitle="Resolution Master"
          modal="#add_user"
          name="Add Resolutions"
        />
        <ResolutionModal/>
        <Resolutionfilter/>
        <Resolutiontable />
        
      </div>
    </div>
  )
}

export default Resolution
