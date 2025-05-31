import React, { useState, useEffect } from "react";
import { Table, Button, Menu, Dropdown, Modal } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Awardtable = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control the modal visibility
  const [selectedAward, setSelectedAward] = useState(null); // State to store selected award for the modal

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE}/api/awards/`
        );
        console.log("Fetched Data:", response.data); // Check if all fields are returned
        setData(response.data); // Set the data to state
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Function to handle the status change of an award
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
            `${process.env.REACT_APP_BASE}/api/awards/?award_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            // Update the data state without mutating
            setData((prevData) => {
              return prevData.map((item) =>
                item.awards_id === id ? { ...item, status } : item
              );
            });
            Swal.fire(
              "Updated!",
              "Status has been updated successfully.",
              "success"
            );
          } else {
            Swal.fire("Error!", "Failed to update status.", "error");
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            "There was an error updating the status.",
            "error"
          );
        }
      }
    });
  };

  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "awards_id",
      key: "awards_id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Academic Year",
      dataIndex: "calender_year",
      key: "calender_year",
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
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu
            onClick={({ key }) => handleStatusChange(record.awards_id, key)}
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
      render: (_, record) => (
        <div className="action-icons">
          {/* View Icon */}
          <Button
            type="link"
            icon={<i className="fa fa-eye" style={{ color: "blue" }} />}
            title="View"
            onClick={() => handleViewClick(record)}
          />
          {/* Edit Icon */}
          <Button
            type="link"
            icon={<i className="fa fa-pencil" style={{ color: "green" }} />}
            title="Edit"
          />
          {/* Delete Icon */}
          <Button
            type="link"
            icon={<i className="fa fa-trash" style={{ color: "red" }} />}
            title="Delete"
            onClick={() => handleDelete(record.awards_id)}
          />
        </div>
      ),
    },
  ];

  const handleViewClick = (record) => {
    setSelectedAward(record);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
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
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(
                `${process.env.REACT_APP_BASE}/api/awards/?award_id=${id}`
              );
              if (response.status === 204) {
                setData((prevData) =>
                  prevData.filter((item) => item.awards_id !== id)
                ); // Remove the deleted item from state
                Swal.fire(
                  "Deleted!",
                  "The award has been deleted successfully.",
                  "success"
                );
              } else {
                Swal.fire("Error!", "Failed to delete the award.", "error");
              }
            } catch (error) {
              Swal.fire(
                "Error!",
                "There was an error deleting the award.",
                "error"
              );
            }
          }
        });
      }
    });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive">
          <Table
            className="table-striped"
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.awards_id}
          />
        </div>
      </div>

      {/* Modal to display the award details */}
      <Modal
        title="Award Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
      >
        {selectedAward && (
          <div>
            <p>
              <strong>Student Name:</strong> {selectedAward.student_name}
            </p>
            <p>
              <strong>Academic Year:</strong>{" "}
              {selectedAward.calender_year_name}
            </p>
            <p>
              <strong>Competition Name:</strong>{" "}
              {selectedAward.competition_name}
            </p>
            <p>
              <strong>Level:</strong> {selectedAward.level}
            </p>
            <p>
              <strong>Organiser:</strong> {selectedAward.organiser}
            </p>
            <p>
              <strong>Date:</strong> {selectedAward.date}
            </p>
            <p>
              <strong>Position:</strong> {selectedAward.position}
            </p>
            <p>
              <strong>Status:</strong> {selectedAward.status}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Awardtable;
