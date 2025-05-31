

import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
// import AddEventNameMaster from "../modelpopup/AddEventNameMaster";
import AddOurPartner from "../modelpopup/AddOurPartner";
import DeleteModal from "../modelpopup/DeleteModal";
import { get,update,_delete } from "../../utils/intercepter";
import Swal from 'sweetalert2';

const OurPartner = () => {
  const [data,setData] = useState([])
  const   imgURL = process.env.REACT_APP_BASE;
  const getEventNames = async() =>{
    const result = await get('events-name-master/');
    setData(result);
  }
  useEffect(() => {
    getEventNames()
  }, []);

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
          const response = await _delete(`events-name-master/?event_master_id=`,id);
          if (response.status === 204) {
            Swal.fire("Deleted!", "The Event Name Master has been deleted.", "success");
            getEventNames()
          } else {
            Swal.fire("Error!", "Failed to delete the Event Name Master.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the Event Name Master.", "error");
        }
      }
    }
  };


  const columns = [
    {
      title: "SL No.",
      dataIndex: "event_master_id",
      render: (text, record, index) => index + 1, 
      sorter: (a, b) => a.event_master_id - b.event_master_id,
    },
    // {
      
    //   title: "Event Name  ",
    //   dataIndex: "event_name",
    //   render: (text) => <span>{text}</span>,
    // },
    // {
    //   title: "Event ID",
    //   dataIndex: "event_id",
    //   render: (text) => <span>{text}</span>,
    // },
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => <img src={`${imgURL}${photo}`} alt="event photo" style={{ width: "50px", height: "50px" }} />,
    }, {
      title: "Logo Tittle",
      dataIndex: "event_description",
      render: (text) => <span>{text}</span>,
    },
   
    {
        title: "Action",
        render: (_, record) => (
          <div className="action-icons">
{/*   
            <Link
              to="#"
              className="action-icon"
              data-bs-toggle="modal"
              data-bs-target="#edit_calenderyear"
              title="Create"
            >
              <i className="fa fa-plus-circle m-r-5" style={{ color: "#5efc88", fontSize: "13px" }}></i>
            </Link> */}
            {/* <Link to="#" className="action-icon" title="View">
              <i className="fa fa-eye m-r-5 m-lg-4" style={{ color: "#FF902F", fontSize: "13px" }}></i>
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
              onClick={()=>handleDelete(record.event_master_id)}
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
          maintitle="Our-Partner"
          title="Our"
          subtitle="Our Partner"
          modal="#add_OurPartner"
          name="Our-Partner"
          Linkname="/AddOurPartner"
        />

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={data}
                className="table-striped"
                rowKey={(record) => record.event_master_id}
              />
            </div>
          </div>
        </div>
      </div>
      <AddOurPartner getEventNames={getEventNames}/>
      <DeleteModal Name="Delete Social Record" />
    </div>
  );
};

export default OurPartner;

