import React, { useEffect, useState } from 'react';
import { Table, Button, Dropdown, Menu, Modal } from 'antd';
import { Link } from 'react-router-dom';
import AddPollMaster from './AddPollMaster';
import { get,update,_delete } from '../../../../utils/intercepter';
import Swal from 'sweetalert2';

const Pollmastertable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      "Poll Name": "Test 1",
      "Committee / Club": "Club",
      "date": "2024-10-22",
      status: "Unpublish",
      fromDate:'22-07-2024',
      toDate:'22-07-2024',
      question: "What is your favorite color?",
      totalVotes: 100,
      options: [
        { name: "Red", votes: 45, percentage: 45 },
        { name: "Blue", votes: 35, percentage: 35 },
        { name: "Green", votes: 20, percentage: 20 }
      ]
    },
    {
      id: 2,
      "Poll Name": "Test 2",
      "Committee / Club": "Committee",
      "date": "2024-10-23",
      status: "Publish",
      fromDate:'22-07-2024',
      toDate:'22-07-2024',
      question: "Which programming language do you prefer?",
      totalVotes: 150,
      options: [
        { name: "Python", votes: 75, percentage: 50 },
        { name: "JavaScript", votes: 45, percentage: 30 },
        { name: "Java", votes: 30, percentage: 20 }
      ]
    },
  ]);


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPollResult, setSelectedPollResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPollForEdit, setSelectedPollForEdit] = useState(null);
const [pollData,setPollData] = useState([])


const getPollData = async() =>{
  const result = await get('poll_master/');
  setPollData(result)
}

useEffect(()=>{
  getPollData()
},[])
const handleStatusChange = async (id, newStatus) => {
  const status = {status:newStatus}
  try {
    await update(`poll_master/?poll_id=`,id,status);
    getPollData()
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
        const response = await _delete(`poll_master/?poll_id=`,id);
        if (response.status === 204) {
          Swal.fire("Deleted!", "The Poll  has been deleted.", "success");
          getPollData()
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

  const handleEditClick = (record) => {
    setSelectedPollForEdit(record);
    setIsModalOpen(true);
  };

  const showResultModal = (record) => {
    setSelectedPollResult(record);
    setIsModalVisible(true);
  };

  const handleResultModalClose = () => {
    setIsModalVisible(false);
    setSelectedPollResult(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPollForEdit(null);
  };

  const handleSubmit = (payload) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              ...payload,
              fromDate: formatDate(payload.fromDate),
              toDate: formatDate(payload.toDate),
              date: formatDate(payload.date),
            }
          : item
      )
    );
    handleCloseModal();
  };



  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1, 
    },
    {
      title: "Poll Name",
      dataIndex: "poll_name_name",
      key: "poll_name_name",
    },
    {
      title: "Committee / Club",
      key: "committee_or_club_name",
      render: (text, record) => record.committee_name_name ?? record.club_name_name,
    },
    
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => formatDate(text),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
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
    },
    {
      title: "Result",
      key: "result",
      render: (text, record) => (
        <Button
          type="link"
          icon={<i className="fa fa-eye" style={{ color: "blue" }} />}
          title="View Result"
          onClick={() => showResultModal(record)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="action-icons">
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
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <Table
              className="table-striped"
              style={{ overflowX: "auto" }}
              columns={columns}
              dataSource={pollData}
              rowKey={(record) => record.id}
            />
          </div>
        </div>
      </div>

      {/* Result Modal */}
      <Modal
        title={`Poll Result: ${selectedPollResult ? selectedPollResult['Poll Name'] : ''}`}
        visible={isModalVisible}
        onCancel={handleResultModalClose}
        footer={null}
      >
        {selectedPollResult && (
          <div>
            <h4>Question: {selectedPollResult.question}</h4>
            <p>Total Votes: {selectedPollResult.totalVotes}</p>
            <table className="table">
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Votes</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {selectedPollResult.options.map((option, index) => (
                  <tr key={index}>
                    <td>{option.name}</td>
                    <td>{option.votes}</td>
                    <td>{option.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>

      {isModalOpen && (
        <AddPollMaster
          mode="edit"
          initialData={selectedPollForEdit}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Pollmastertable;