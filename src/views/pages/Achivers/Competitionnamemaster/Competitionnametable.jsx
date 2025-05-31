import { Table, Button, Menu, Dropdown, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Competitionnametable = () => {
  const [data, setData] = useState([]); // Initialize state as empty array
  const [selectedCompetition, setSelectedCompetition] = useState(null); // State to store selected competition
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  useEffect(() => {
    // Fetch competition data on component mount
    const fetchCompetitionData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE}/api/competition-master/`);
        if (response.status === 200) {
          setData(response.data); // Set the data received from the API
        } else {
          Swal.fire("Error!", "Failed to fetch competition data.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "There was an error fetching the data.", "error");
      }
    };

    fetchCompetitionData();
  }, []); // Empty dependency array ensures this runs only once

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
            `${process.env.REACT_APP_BASE}/api/competition-master/?competition_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            // Update the data state without mutating
            setData((prevData) => {
              return prevData.map((item) =>
                item.competition_master_id === id
                  ? { ...item, status } // Update only the status for the matching item
                  : item
              );
            });
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
  

  const showModal = (record) => {
    setSelectedCompetition(record); // Set the selected competition for the modal
    setIsModalVisible(true); // Show the modal
  };

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
              await axios.delete(
                `${process.env.REACT_APP_BASE}/api/competition-master/?competition_id=${id}`
              );
              const updatedData = data.filter(
                (item) => item.competition_master_id !== id
              );
              setData(updatedData);
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
            } catch (error) {
              Swal.fire(
                "Error!",
                "There was an error deleting the item.",
                "error"
              );
            }
          }
        });
      }
    });
  };

  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "competition_master_id",
      key: "competition_master_id",
      render: (text, record, index) => index + 1, // Display row number
    },
    {
      title: "Competition Name",
      dataIndex: "competition_name",
      key: "competition_name",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Organiser",
      dataIndex: "organiser",
      key: "organiser",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu
            onClick={({ key }) =>
              handleStatusChange(record.competition_master_id, key) // Adjusted to use the correct key
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
            onClick={() => showModal(record)} // Show modal on view
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
            onClick={() => handleDelete(record.competition_master_id)} // Handle delete
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
            rowKey={(record) => record.competition_master_id} // Use competition_master_id as row key
          />
        </div>
      </div>

      {/* Modal to show competition details */}
      <Modal
        title="Competition Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)} // Close modal
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedCompetition && (
          <div>
            <p><strong>Competition Name:</strong> {selectedCompetition.competition_name}</p>
            <p><strong>Level:</strong> {selectedCompetition.level}</p>
            <p><strong>Organiser:</strong> {selectedCompetition.organiser}</p>
            <p><strong>Status:</strong> {selectedCompetition.status}</p>
            {/* Add other details here */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Competitionnametable;
