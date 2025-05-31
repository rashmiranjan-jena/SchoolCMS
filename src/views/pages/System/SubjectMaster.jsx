import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AddSubjectMaster from "../../../components/modelpopup/AddSubjectMaster";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import { get,update,_delete } from "../../../utils/intercepter";
import Swal from 'sweetalert2';

const SubjectMaster = () => {
  const [data,setData] = useState([])
  const   imgURL = process.env.REACT_APP_BASE;


const getStatementData = async() =>{
 const result = await get('subject-master/');
 setData(result)
}
  
  useEffect(() => {
    getStatementData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const status = {status:newStatus}
    try {
      await update(`subject-master/?subject_master_id=`,id,status);
      getStatementData()
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
          const response = await _delete(`subject-master/?subject_master_id=`,id);
          if (response.status === 204) {
            Swal.fire("Deleted!", "The Statement Master has been deleted.", "success");
            getStatementData()
          } else {
            Swal.fire("Error!", "Failed to delete the Statement Master.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the Statement Master.", "error");
        }
      }
    }
  };


  const columns = [
    {
      title: "SL No.",
      dataIndex: "subject_master_id",
      render: (text, record, index) => index + 1, 
      sorter: (a, b) => a.subject_master_id - b.subject_master_id,
    },
    {
      title: "Subject Name",
      dataIndex: "subject_name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={`${imgURL}${image}`} alt="statement Image" style={{ width: "50px", height: "50px" }} />,
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
            onClick={() => handleStatusChange(record.subject_master_id, "Published")}
          >
            <i className="far fa-dot-circle text-success" /> Publish
          </Link>
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => handleStatusChange(record.subject_master_id, "Unpublished")}
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
          {/* <Link to="#" className="action-icon" title="View">
            <i className="fa fa-eye m-r-5" style={{ color: "#FF902F", fontSize: "13px" }}></i>
          </Link> */}
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
            title="delete"
            onClick={()=>handleDelete(record.subject_master_id)}
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
          maintitle="SubjectMaster"
          title="SubjectMaster"
          subtitle="Master"
          modal="#add_SubjectMaster"
          name="SubjectMaster"
          Linkname="/AddSubjectMaster"
        />

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={data}
                className="table-striped"
                rowKey={(record) => record.subject_master_id}
              />
            </div>
          </div>
        </div>
      </div>
      <AddSubjectMaster />
      <DeleteModal Name="Delete Social Record" />
    </div>
  );
};

export default SubjectMaster;
