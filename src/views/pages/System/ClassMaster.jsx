import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AddClassMaster from "../../../components/modelpopup/AddClassMaster";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import { get,update,_delete } from "../../../utils/intercepter";
import Swal from 'sweetalert2';

const ClassMaster = () => {

  const [classData,setClassData] = useState([])

  const getClassData= async() =>{
    const response = await get(`class-master/`);
    setClassData(response)
  }
  useEffect(() => {
   
    getClassData()
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const status = {status:newStatus}
    try {
      await update(`class-master/?class_master_id=`,id,status);
      getClassData()
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
          const response = await _delete(`class-master/?class_master_id=`,id);
          if (response.status === 204) {
            Swal.fire("Deleted!", "The Class has been deleted.", "success");
            getClassData()
          } else {
            Swal.fire("Error!", "Failed to delete the Class.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the Class.", "error");
        }
      }
    }
  };
  const columns = [
    {
      title: "Sl No.",
      dataIndex: "class_master_id",
      render: (text,value,index) => <span>{index+1}</span>,
      sorter: (a, b) => a.class_master_id - b.class_master_id,
    },
    {
      title: "Class Name  ",
      dataIndex: "class_name",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.class_name.localeCompare(b.class_name),
    },
    // {
    //   title: "Tenure",
    //   dataIndex: "Tenure",
    //   render: (text) => <span>{text}</span>,
    // },
    
    
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
              className={
                text === "Unpublished"
                  ? "far fa-dot-circle text-danger"
                  : "far fa-dot-circle text-success"
              }
            />{" "}
            {text}
          </Link>
          <div className="dropdown-menu">
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => handleStatusChange(record.class_master_id, "Published")}
            >
              <i className="far fa-dot-circle text-success" /> Publish
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => handleStatusChange(record.class_master_id, "Unpublished")}
            >
              <i className="far fa-dot-circle text-danger" /> Unpublish
            </Link>
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <div className="action-icons">
          <Link to="#" className="action-icon" title="View">
            <i className="fa fa-eye m-r-5" style={{ color: "#FF902F", fontSize: "13px" }}></i>
          </Link>
          <Link
            to="#"
            className="action-icon"
            // data-bs-toggle="modal"
            // data-bs-target="#edit_calenderyear"
            title="Edit"
          >
            <i className="fa fa-pencil m-r-5 m-lg-4" style={{ color: "blue", fontSize: "13px" }}></i>
          </Link>
          <Link
            to="#"
            className="action-icon"
            onClick={() => handleDelete(record.class_master_id)}
            title="Delete"
          >
            <i className="fa fa-trash m-r-5 m-lg-4" style={{ color: "red", fontSize: "13px" }}></i>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="ClassMaster"
          title="ClassMaster"
          subtitle="Master"
          modal="#add_ClassMaster"
          name="ClassMaster"
          Linkname="/AddClassMaster"
        />

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={classData}
                className="table-striped"
                rowKey={(record) => record.class_master_id}
              />
            </div>
          </div>
        </div>
      </div>
      <AddClassMaster />
      <DeleteModal Name="Delete Social Record" />
    </div>
  );
};

export default ClassMaster;
