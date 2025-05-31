import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AddEventMaster from "../../../components/modelpopup/AddEventMaster";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import Swal from 'sweetalert2';
import { get,update,_delete } from "../../../utils/intercepter";
const EventMaster = () => {
  const [eventData,setEventData] = useState([])
  const   imgURL = process.env.REACT_APP_BASE;

  const getEventData = async() =>{
    const result = await get('event-master-view/');
    setEventData(result)
  }
  
  useEffect(()=>{
    getEventData()
  },[])
  const handleStatusChange = async (id, newStatus) => {
    const status = {status:newStatus}
    try {
      await update(`event-master-view/?event_master_id=`,id,status);
      getEventData()
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
          const response = await _delete(`event-master-view/?event_master_id=`,id);
          if (response.status === 204) {
            Swal.fire("Deleted!", "The Poll  has been deleted.", "success");
            getEventData()
          } else {
            Swal.fire("Error!", "Failed to delete the Poll .", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the Poll .", "error");
        }
      }
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1, 
    },
    { title: "Event Name", dataIndex: "event_name", render: (text) => <span>{text}</span> },
    { title: "Event Category", dataIndex: "event_category_name", render: (text) => <span>{text}</span> },
    {
      title: "Stage",
      dataIndex: "Stage",
      render: (_, record) => {
        const today = new Date();
        const dateFrom = new Date(record.date_from);
        const dateTo = new Date(record.date_to);
    
        if (today < dateFrom) {
          return <span>Upcoming</span>;
        } else if (today > dateTo) {
          return <span>Past</span>;
        } else {
          return <span>Ongoing</span>;
        }
      },
    },
    {
      title: "Date",
      render: (_, record) => {
        const dateFrom = new Date(record.date_from);
        const dateTo = new Date(record.date_to);
        return (
          <span>{`${dateFrom.toLocaleDateString()} - ${dateTo.toLocaleDateString()}`}</span>
        );
      },
    },
    {
      title: "Time",
      render: (_, record) => {
        const startTime = new Date(`1970-01-01T${record.start_time}`);
        const endTime = new Date(`1970-01-01T${record.end_time}`);
        return (
          <span>{`${startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}</span>
        );
      },
    },
    {
      title: "Venue",
      dataIndex: "venue",
      render: (_, record) => {
        let venue = {};
        try {
          venue = JSON.parse(record.venue); 
        } catch (error) {
          console.error("Error parsing venue JSON:", error);
        }
        return (
          <span>{venue.address || "No address available"}</span>
        );
      },
    } ,    
    {
      title: "Event Letter",
      dataIndex: "event_letter",
      key: "event_letter",
      render: (event_letter) => (
        <a 
          href={`${imgURL}${event_letter}`} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: "underline", color: "blue" }}
        >
          View PDF
        </a>
      ),
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
          onClick={() => handleStatusChange(record.event_master_id, "Published")}
        >
          <i className="far fa-dot-circle text-success" /> Publish
        </Link>
        <Link
          className="dropdown-item"
          to="#"
          onClick={() => handleStatusChange(record.event_master_id, "Unpublished")}
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
        onClick={()=>handleDelete(record.event_master_id)}
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
          maintitle="Event Master"
          title="Events"
          subtitle="Event Management"
          modal="#add_EventMaster"
          name="EventMaster"
          Linkname="/AddEventMaster"
        />
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={eventData}
                className="table-striped"
                rowKey={(record) => record.event_master_id}
              />
            </div>
          </div>
        </div>
      </div>
      <AddEventMaster />
      <DeleteModal Name="Delete Event Record" />
    </div>
  );
};

export default EventMaster;
