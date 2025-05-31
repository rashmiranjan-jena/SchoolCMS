import { Table, Button } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { get ,update,_delete } from "../../../../utils/intercepter";


const Noticeandnewstable = () => {
  const [data,setData] = useState([])
  const   imgURL = process.env.REACT_APP_BASE;


const getNewsAndNoticeData = async() =>{
 const result = await get('notices-news/');
 setData(result)
}
  
  useEffect(() => {
    getNewsAndNoticeData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const status = {status:newStatus}
    try {
      await update(`notices-news/?notice_news_id=`,id,status);
      getNewsAndNoticeData()
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
          const response = await _delete(`notices-news/?notice_news_id=`,id);
          if (response.status === 204) {
            Swal.fire("Deleted!", "The Statement Master has been deleted.", "success");
            getNewsAndNoticeData()
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
      title: "Sl. No.",
      dataIndex: "notices_news_master_id",
      key: "id",
      render: (text, record, index) => index + 1, 
    },
    {
      title: "Creation Date",
      dataIndex: "creation_date",
    },
    {
      title: "Publication Date",
      dataIndex: "publication_date",
    },
    {
      title: "Up To Date",
      dataIndex: "till_date",
    },
    {
      title: "Name",
      dataIndex: "notice_title",
    },
    {
      title: "Notice / News",
      dataIndex: "notice_details",
    },
    {
      title: "Committee / Club",
      render: (text, record) => record.committee_name_name ?? record.club_name_name,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => <img src={`${imgURL}${images}`} alt="Notice and news photo" style={{ width: "50px", height: "50px" }} />,
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
              onClick={() => handleStatusChange(record.notices_news_master_id, "Published")}
            >
              <i className="far fa-dot-circle text-success" /> Publish
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => handleStatusChange(record.notices_news_master_id, "Unpublished")}
            >
              <i className="far fa-dot-circle text-danger" /> Unpublish
            </Link>
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="action-icons">
          {/* <Button
            type="link"
            icon={<i className="fa fa-eye" style={{ color: "blue" }} />}
            title="View"
          /> */}
          <Button
            type="link"
            icon={<i className="fa fa-pencil" style={{ color: "green" }} />}
            title="Edit"
            // onClick={() => handleEditClick(record)}
          />
          <Button
            type="link"
            icon={<i className="fa fa-trash" style={{ color: "red" }} />}
            title="Delete"
            onClick={() => handleDelete(record.notices_news_master_id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="d-flex justify-content-between mb-4">
          <Button type="primary">Add New</Button>
        </div>
        <div className="table-responsive">
          <Table
            className="table-striped"
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.notices_news_master_id}
          />
        </div>
      </div>
    </div>
  );
};

export default Noticeandnewstable;
