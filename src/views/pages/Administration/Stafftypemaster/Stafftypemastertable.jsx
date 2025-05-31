import React, { useState, useEffect } from "react";
import { Table, Button, Menu, Dropdown, Modal } from "antd"; 
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import axios from "axios"; 

const Stafftypemastertable = ({refresh}) => {
  const [data, setData] = useState([]); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [modalData, setModalData] = useState(null); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE}/api/staff_type/`
        );
        setData(response.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire("Error", "Failed to fetch data", "error");
      }
    };

    fetchData();
  }, [refresh]); 

  // Handle status change (Unpublished/Published)
  const handleStatusChange = async (id, status) => {
    // First confirmation: Confirm if the user wants to change the status
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to change the status to ${status}. Do you want to proceed?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Proceed to update the status after confirmation
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_BASE}/api/staff_type/?staff_type_master_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            const updatedData = data.map((item) =>
              item.staff_type_master_id === id ? { ...item, status } : item
            );
            setData(updatedData);
            Swal.fire(
              "Updated!",
              "Status has been updated successfully.",
              "success"
            );
          } else {
            Swal.fire("Error!", "Failed to update status.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "There was an error updating the status.", "error");
        }
      }
    });
  };
  
  const handleDelete = async (id) => {
    // First confirmation
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the record permanently. Do you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Second confirmation with checkbox
        Swal.fire({
          title: "Final Confirmation",
          text: "Please check the box to confirm you want to delete this record.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          // Initially, disable the "Delete" button
          showLoaderOnConfirm: true,
          html: `
            <label>
              <input type="checkbox" id="confirmCheckbox" /> I understand the consequences of deleting this record.
            </label>
          `,
          preConfirm: () => {
            const checkbox = document.getElementById("confirmCheckbox");
            return checkbox.checked;
          },
          didOpen: () => {
            const checkbox = document.getElementById("confirmCheckbox");
            const confirmButton = Swal.getConfirmButton();
  
            // Disable the "Delete" button until the checkbox is checked
            confirmButton.disabled = true;  // Ensure the button is disabled initially
  
            checkbox.addEventListener("change", () => {
              confirmButton.disabled = !checkbox.checked; // Enable/disable the button based on checkbox
            });
          }
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(
                `${process.env.REACT_APP_BASE}/api/staff_type/?staff_type_master_id=${id}` // Your delete endpoint
              );
              if (response.status === 204) {
                const updatedData = data.filter(item => item.staff_type_master_id !== id);
                setData(updatedData); // Remove the deleted item from the state
                Swal.fire("Deleted!", "The record has been deleted.", "success");
              } else {
                Swal.fire("Error", "Failed to delete the record", "error");
              }
            } catch (error) {
              Swal.fire("Error", "There was an error deleting the record", "error");
            }
          }
        });
      }
    });
  };
  
  
  // Handle modal view
  const handleView = (record) => {
    setModalData(record); // Set the record data for the modal
    setModalVisible(true); // Show the modal
  };

  // Close the modal
  const handleModalClose = () => {
    setModalVisible(false); // Close the modal
    setModalData(null); // Clear the modal data
  };

  const columns = [
    {
      title: "Staff Type Name",
      dataIndex: "staff_type_name",
      sorter: (a, b) => a.staff_type_name.length - b.staff_type_name.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu
            onClick={({ key }) => handleStatusChange(record.staff_type_master_id, key)}
          >
            <Menu.Item key="Published">Published</Menu.Item>
            <Menu.Item key="Unpublished">Unpublished</Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Link
              className={`btn btn-white btn-sm btn-rounded dropdown-toggle ${
                text === "Unpublished" ? "text-danger" : "text-success"
              }`}
              to="#"
              onClick={(e) => e.preventDefault()}
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
          </Dropdown>
        );
      },
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="action-icons">
          <Button
            type="link"
            icon={<i className="fa fa-eye" style={{ color: "blue" }} />}
            title="View"
            onClick={() => handleView(record)} // Trigger modal on view click
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
            onClick={() => handleDelete(record.staff_type_master_id)} // Trigger delete on click
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
            dataSource={data} // Use the fetched data
            rowKey={(record) => record.staff_type_master_id} // Use the unique id from the data
          />
        </div>
      </div>

      {/* Modal for viewing data */}
      <Modal
        title="Staff Type Details"
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {modalData && (
          <div>
            <p><strong>Staff Type Name:</strong> {modalData.staff_type_name}</p>
            <p><strong>Status:</strong> {modalData.status}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Stafftypemastertable;
