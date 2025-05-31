import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AddCalendarYear from "../../../components/modelpopup/AddCalendarYear";
import { _delete,get,update } from "../../../utils/intercepter";
import Swal from 'sweetalert2';

const CalendarYear = () => {
  const [calenderYear,setCalenderYear] = useState([])
  const [selectedYear, setSelectedYear] = useState(null);
  const [mode, setMode] = useState('add');
  useEffect(() => {
    getCalenderYear()
  }, []);

  const getCalenderYear = async() => {
    const _result = await get('calender-year/');
    setCalenderYear(_result)
    
  }

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
          const response = await _delete(`calender-year/?calender_year_id=`,id);
          if (response.status === 204) {
            Swal.fire("Deleted!", "The Calender year has been deleted.", "success");
            getCalenderYear()
          } else {
            Swal.fire("Error!", "Failed to delete the Calender year.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the Calender year.", "error");
        }
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const status = {status:newStatus}
    try {
      await update(`calender-year/?calender_year_id=`,id,status);
      getCalenderYear()
      Swal.fire("Updated!", "Status Changed.", "success");
    } catch (error) {
      Swal.fire("Error!", "There was an error while changing the status.", "error");
    }
    
   
    
  };
  const handleEdit = (year) => {
    setSelectedYear(year);
    setMode('edit'); 
  };

  const yearData = calenderYear.map((item,index) =>({
    key:index + 1,
    id:item.calender_year_id,
    calender_year:item.calender_year,
    status:item.status,
    from_date:item.from_date,
    to_date:item.to_date


  }));
  const columns = [
    {
      title: "Sl No.",
      dataIndex: "key",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Calendar Year",
      dataIndex: "calender_year",
      render: (text) => <span>{text}</span>,
      
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
              className={text === "Unpublish" ? "far fa-dot-circle text-danger" : "far fa-dot-circle text-success"}
            />{" "}
            {text}
          </Link>
          <div className="dropdown-menu">
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => handleStatusChange(record.id, "Published")}
            >
              <i className="far fa-dot-circle text-success" /> Publish
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => handleStatusChange(record.id, "Unpublished")}
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
            <i className="fa fa-eye m-r-5" style={{color:'#FF902F', fontSize:'13px'}}></i>
          </Link>
          <Link
            className="action-icon"
            title="Edit"
            data-bs-toggle="modal"
            data-bs-target="#add_calender"
            onClick={() => handleEdit(record)}
          >
            <i className="fa fa-pencil m-r-5 m-lg-4" style={{color:'blue', fontSize:'13px'}}></i>
          </Link>
          <Link
            to="#"
            className="action-icon"
            title="delete"
            onClick={() => handleDelete(record.id)}
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
        maintitle="Calendar"
        title="Calendar"
        subtitle="Calendar Year"
        modal="#add_calender"
        name="Calendar Year"
        Linkname="/AddCalendarYear"
      />

      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <Table
              columns={columns}
              dataSource={yearData?.length > 0 ? yearData : []}
              className="table-striped"
              rowKey={(record) => record.id}
            />
          </div>
        </div>
      </div>
    </div>

    {mode === 'edit' && selectedYear ? (
      <AddCalendarYear getCalenderYear={getCalenderYear} selectedYear={selectedYear} mode={mode} setMode={setMode} />
    ) : (
      <AddCalendarYear mode='add' setMode={setMode} getCalenderYear={getCalenderYear} />
    )}
  </div>
</>

  );
};

export default CalendarYear;
