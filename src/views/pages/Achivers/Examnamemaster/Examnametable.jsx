import React, { useState, useEffect } from "react";
import { Table, Button, Dropdown, Menu, Modal } from "antd";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

const Examnametable = () => {
  const [data, setData] = useState([]);  // State to manage the data for the table
  const [isModalVisible, setIsModalVisible] = useState(false);  // State to handle modal visibility
  const [selectedExam, setSelectedExam] = useState(null);  // State to store selected exam data

  // Fetch exam data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE}/api/exam-name-master`); 
        if (response.status === 200) {
          const formattedData = response.data.map((item) => ({
            id: item.exam_master_id,
            examName: item.exam_name,
            board: item.borad_name,
            status: "Unpublish", 
          }));
          setData(formattedData);
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to fetch exam data.", "error");
      }
    };

    fetchData();
  }, []); 

  // Handle status change
  const handleStatusChange = async (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to change the status to ${status}. Do you want to proceed?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_BASE}/api/exam-name-master/?exam_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            // Update the data state without mutating
            setData((prevData) =>
              prevData.map((item) =>
                item.id === id ? { ...item, status } : item
              )
            );
            Swal.fire("Updated!", "Status has been updated successfully.", "success");
          } else {
            Swal.fire("Error!", "Failed to update status.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "There was an error updating the status.", "error");
        }
      }
    });
  };

  // Handle View icon click
  const handleView = (exam) => {
    setSelectedExam(exam);
    setIsModalVisible(true);
  };
 
  // Handle Delete icon click
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Are you absolutely sure?",
          text: "This is a Parent Details. If you are deleting this, the child data would also be deleted which you can't revert!",
          icon: "error",
          showCancelButton: true,
          cancelButtonText: "No, keep it",
          confirmButtonText: "Yes, really delete it!",
          html: `
            <div>
              <input type="checkbox" id="confirmCheckbox" />
              <label for="confirmCheckbox">I understand the consequences of deleting this item.</label>
            </div>
          `,
          preConfirm: () => {
            return document.getElementById("confirmCheckbox").checked;
          },
          willOpen: () => {
            const confirmButton = Swal.getConfirmButton();
            confirmButton.disabled = true;
            document
              .getElementById("confirmCheckbox")
              .addEventListener("change", (e) => {
                confirmButton.disabled = !e.target.checked;
              });
          },
        }).then(async (finalResult) => {
          if (finalResult.isConfirmed) {
            try {
              const response = await axios.delete(
                `${process.env.REACT_APP_BASE}/api/exam-name-master/?exam_id=${id}`
              );
              if (response.status === 204) {
                setData((prevData) => prevData.filter((item) => item.id !== id));
                Swal.fire("Deleted!", "The exam has been deleted successfully.", "success");
              } else {
                Swal.fire("Error!", "Failed to delete exam.", "error");
              }
            } catch (error) {
              Swal.fire("Error!", "There was an error deleting the exam.", "error");
            }
          }
        });
      }
    });
  };
  

  // Table columns
  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Exam Name",
      dataIndex: "examName",
      key: "examName",
    },
    {
      title: "Board",
      dataIndex: "board",
      key: "board",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu
            onClick={({ key }) =>
              handleStatusChange(record.id, key)
            }
          >
            <Menu.Item key="Published">Published</Menu.Item>
            <Menu.Item key="Unpublished">Unpublished</Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Link
              className={`btn btn-white btn-sm btn-rounded dropdown-toggle ${
                text === "Unpublished"
                  ? "text-danger"
                  : text === "Published"
                  ? "text-success"
                  : "text-info"
              }`}
              to="#"
              onClick={(e) => e.preventDefault()}
            >
              <i
                className={
                  text === "Unpublished"
                    ? "far fa-dot-circle text-danger"
                    : text === "Published"
                    ? "far fa-dot-circle text-success"
                    : "far fa-dot-circle text-info"
                }
              />{" "}
              {text}
            </Link>
          </Dropdown>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="action-icons">
          <Button
            type="link"
            icon={<i className="fa fa-eye" style={{ color: "blue" }} />}
            title="View"
            onClick={() => handleView(record)}  
          />
          <Button
            type="link"
            icon={<i className="fa fa-pencil" style={{ color: "green" }} />}
            title="Edit"
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
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive">
          <Table
            className="table-striped"
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
          />
        </div>
      </div>

      {/* Modal for View */}
      <Modal
        title="Exam Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedExam && (
          <div>
            <p><strong>Exam Name:</strong> {selectedExam.examName}</p>
            <p><strong>Board:</strong> {selectedExam.board}</p>
            <p><strong>Status:</strong> {selectedExam.status}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Examnametable;
