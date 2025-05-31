import React, { useEffect, useState } from 'react';
import { Table, Button, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import AddPoolNameMaster from '../../../../components/modelpopup/AddPoolNameMaster';
import { get, update,_delete } from '../../../../utils/intercepter';
import Swal from 'sweetalert2';

const PoolTable = () => {
  const [data, setData] = useState([
  ]);
  
  const [editingData, setEditingData] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);


  const getPoolData = async() =>{
    const result = await get('poll_name_master');
    setData(result)

  }
useEffect(()=>{
  getPoolData()
},[]);

const handleStatusChange = async (id, newStatus) => {
  const status = {status:newStatus}
  try {
    await update(`poll_name_master/?poll_name_master_id=`,id,status);
    getPoolData()
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
        const response = await _delete(`poll_name_master/?poll_name_master_id=`,id);
        if (response.status === 204) {
          Swal.fire("Deleted!", "The Pool Name Master has been deleted.", "success");
          getPoolData()
        } else {
          Swal.fire("Error!", "Failed to delete the Pool Name Master.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "There was an error deleting the Pool Name Master.", "error");
      }
    }
  }
};

  const columns = [
    { title: "Sr. No.", dataIndex: "poll_name_master_id", key: "id", render: (text, record, index) => index + 1 },
    { title: "Poll Name", dataIndex: "poll_name", key: "poll_name" },
    {
      title: "Committee / Club",
      key: "committee_or_club_name",
      render: (text, record) => record.committee_name_name ?? record.club_name_name,
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
              onClick={() => handleStatusChange(record.poll_name_master_id, "Published")}
            >
              <i className="far fa-dot-circle text-success" /> Publish
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => handleStatusChange(record.poll_name_master_id, "Unpublished")}
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
            onClick={() => handleDelete(record.poll_name_master_id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive">
          <Table
            className="table-striped"
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.poll_name_master_id}
          />
        </div>
      </div>
      {isModalOpen && (
        <AddPoolNameMaster
          editData={editingData}
          // onClose={handleCloseModal}
          // onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default PoolTable;
