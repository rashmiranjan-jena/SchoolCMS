import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AddOrganisationMaster from "../../../components/modelpopup/AddOrganisationMaster";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import { get,update,_delete } from "../../../utils/intercepter";
import Swal from 'sweetalert2';
const OrganisationMaster = () => {
  const [organizationData,setOrganizationData] =useState([]);

  const getOrganizationData = async() => {
    const result = await get('organization-master/');
    setOrganizationData(result);
    
  }

  useEffect(() => {
    getOrganizationData()
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const status = {status:newStatus}
    try {
      await update(`organization-master/?organization_master_id=`,id,status);
      getOrganizationData()
      Swal.fire("Updated!", "Status Changed.", "success");
    } catch (error) {
      Swal.fire("Error!", "There was an error while changing the status.", "error");
    }   
  };

  const handleDelete = async (id) => {
    const { value: confirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the record permanently. Do you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (confirmed) {
      const { value: finalConfirmed } = await Swal.fire({
        title: "Final Confirmation",
        text: "Please check the box to confirm you want to delete this record.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        input: 'checkbox',
        inputPlaceholder: 'I understand the consequences of deleting this record.',
        inputValidator: (result) => {
          if (!result) {
            return "You must confirm to delete.";
          }
        },
      });

      if (finalConfirmed) {
        try {
          const response = await _delete(`organization-master/?organization_master_id=`,id);
          if (response.status === 204) {
            Swal.fire("Deleted!", "The Organization has been deleted.", "success");
            getOrganizationData()
          } else {
            Swal.fire("Error!", "Failed to delete the Organization.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the Organization.", "error");
        }
      }
    }
  };


  const organizationExtendedData  = organizationData.map((item,index) =>({

    key:index + 1,
    organization_master_id:item.organization_master_id,
    bussiness_name:item.bussiness_name,
    registration_no:item.registration_no,
    registration_date:item.registration_date,
    affliation_no:item.affliation_no,
    affliation_body:item.affliation_body,
    type_of_organization:item.type_of_organization,
    udise_plus_no:item.udise_plus_no,
    address:item.address,
    city:item.city,
    state:item.state,
    country:item.country,
    zip_pin:item.zip_pin,
    email_id:item.email_id,
    website : item.website,
    status:item.status,


  }));
  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "organization_master_id",
      key: "organization_master_id",
      render: (text, record, index) => index + 1, 
    },
    {
      title: "Organisation Name",
      dataIndex: "bussiness_name",
      key: "bussiness_name",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Registration No.",
      dataIndex: "registration_no",
      key: "registration_no",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <div className="dropdown action-label">
          <Link
            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
            to="#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className={text === "Unpublished" ? "far fa-dot-circle text-danger" : "far fa-dot-circle text-success"}
            />{" "}
            {text}
          </Link>
          <div className="dropdown-menu">
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => handleStatusChange(record.organization_master_id, "Published")}
            >
              <i className="far fa-dot-circle text-success" /> Publish
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => handleStatusChange(record.organization_master_id, "Unpublished")}
            >
              <i className="far fa-dot-circle text-danger" /> Unpublish
            </Link>
          </div>
        </div>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Action",
      render: (_, record) => (
        <div className="action-icons">
          <Link to="#" className="action-icon" title="View">
            <i
              className="fa fa-eye m-r-5"
              style={{ color: "#FF902F", fontSize: "13px" }}
            ></i>
          </Link>
          <Link
           
            className="action-icon"
           
            title="Edit"
          >
            <i
              className="fa fa-pencil m-r-5 m-lg-4"
              style={{ color: "blue", fontSize: "13px" }}
            ></i>
          </Link>
          <Link
            to="#"
            className="action-icon"
            title="delete"
            onClick={() => handleDelete(record.organization_master_id)}
          >
            <i className="fa fa-trash m-r-5 m-lg-4" style={{color:'red', fontSize:'13px'}}></i>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Organisation"
            title="Organisation"
            subtitle="Organisation Master"
            modal="#add_Organisation"
            name="Organisation Master"
            Linkname="/AddOrganisationMaster"
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={organizationExtendedData}
                  className="table-striped"
                  rowKey={(record) => record.organization_master_id}
                />
              </div>
            </div>
          </div>
        </div>
        <AddOrganisationMaster />
        <DeleteModal Name="Delete Organisation" />
      </div>
    </>
  );
};

export default OrganisationMaster;
