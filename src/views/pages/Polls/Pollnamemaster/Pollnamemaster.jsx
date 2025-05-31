import React from 'react'
import Breadcrumbs from '../../../../components/Breadcrumbs';
import AddPoolNameMaster from '../../../../components/modelpopup/AddPoolNameMaster';
import PoolTable from './PoolTable';

const Pollnamemaster = () => {
    
  return (
    <div className="page-wrapper">
    <div className="content container-fluid">
      <Breadcrumbs
        maintitle="Poll Name Master "
        title="Dashboard"
        subtitle="Poll Name Master"
        modal="#Add_pool_Name_Master"
        name="Add Pool Name Master"
      />
      
    </div>
        <PoolTable />
      <AddPoolNameMaster />
  </div>
  )
}

export default Pollnamemaster