import React, { useState, useEffect } from "react";
import { Table, Button, Dropdown, Menu, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Stafflisttable = ({refresh}) => {
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [viewData, setViewData] = useState(null); // State for view data modal

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE}/api/staff_list/`);
        if (response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching staff data:", error);
        Swal.fire("Error", "Failed to fetch staff data.", "error");
      }
    };
    fetchStaffData();
  }, [refresh]);

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
            `${process.env.REACT_APP_BASE}/api/staff_list/?staff_list_master_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            const updatedData = data.map((item) =>
              item.staff_list_master_id === id ? { ...item, status } : item
            );
            setData(updatedData);
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

  const handleViewClick = (record) => {
    setViewData(record); // Set the data to be shown in the modal
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
            const checkbox = Swal.getPopup().querySelector('input[type="checkbox"]');
            // Return the state of the checkbox (isChecked)
            return checkbox.checked;
          },
          didOpen: () => {
            const confirmButton = Swal.getConfirmButton();
            confirmButton.disabled = true; // Disable the "Delete" button initially
  
            // Listen to checkbox change using React's state management
            const checkbox = Swal.getPopup().querySelector('input[type="checkbox"]');
            checkbox.addEventListener("change", (event) => {
              confirmButton.disabled = !event.target.checked; // Enable/disable based on checkbox state
            });
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            // Proceed with deletion if checkbox is checked
            try {
              const response = await axios.delete(
                 `${process.env.REACT_APP_BASE}/api/staff_list/?staff_list_master_id=${id}`
              );
              if (response.status === 204) {
                // Remove the deleted item from the state
                const updatedData = data.filter((item) => item.staff_list_master_id !== id);
                setData(updatedData);
                Swal.fire("Deleted!", "The principal has been deleted.", "success");
              } else {
                Swal.fire("Error!", "Failed to delete the principal.", "error");
              }
            } catch (error) {
              Swal.fire("Error!", "There was an error deleting the principal.", "error");
            }
          }
        });
      }
    });
  };
  
  const columns = [
    {
      title: "Employee Code",
      dataIndex: "employee_code",
      sorter: (a, b) => a.employee_code.localeCompare(b.employee_code),
    },
    {
      title: "Staff Type",
      dataIndex: "staff_type",
      sorter: (a, b) => (a.staff_type || "").localeCompare(b.staff_type || ""),
    },
    {
      title: "Staff Name",
      dataIndex: "staff_name",
      sorter: (a, b) => a.staff_name.localeCompare(b.staff_name),
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      sorter: (a, b) => a.qualification.localeCompare(b.qualification),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      sorter: (a, b) => (a.designation || "").localeCompare(b.designation || ""),
    },
    {
      title: "Photo",
      dataIndex: "photo",
      render: (photo) => {
        const imageUrl = `${process.env.REACT_APP_BASE}${photo}`;
        return (
          <img
            src={imageUrl}
            alt="photo"
            style={{ width: 80, height: 40, borderRadius: "20%" }}
          />
        );
      },
    },
    {
      title: "Signature",
      dataIndex: "signature",
      render: (signature) => {
        const imageUrl = `${process.env.REACT_APP_BASE}${signature}`;
        return (
          <img
            src={imageUrl}
            alt="photo"
            style={{ width: 80, height: 40, borderRadius: "20%" }}
          />
        );
      },
    },
    {
      title: "DOJ (Date of Joining)",
      dataIndex: "doj",
      sorter: (a, b) => new Date(a.doj) - new Date(b.doj),
    },
    {
      title: "DOL (Date of Leaving)",
      dataIndex: "dol",
      sorter: (a, b) => new Date(a.dol) - new Date(b.dol),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleStatusChange(record.staff_list_master_id, key)}>
            <Menu.Item key="Published">Published</Menu.Item>
            <Menu.Item key="UnPublished">UnPublished</Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Link
              className={`btn btn-white btn-sm btn-rounded dropdown-toggle ${
                text === "Past" ? "text-danger" : "text-success"
              }`}
              to="#"
              onClick={(e) => e.preventDefault()}
            >
              <i
                className={text === "Past" ? "far fa-dot-circle text-danger" : "far fa-dot-circle text-success"}
              />{" "}
              {text}
            </Link>
          </Dropdown>
        );
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <div className="action-icons">
          <Button
            type="link"
            icon={<i className="fa fa-eye" style={{ color: "blue" }} />}
            title="View"
            onClick={() => handleViewClick(record)} // Open modal with staff data
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
            onClick={() => handleDelete(record.staff_list_master_id)} // Delete staff data
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
            rowKey={(record) => record.staff_list_master_id}
          />
        </div>
      </div>

      {/* Modal for View Staff Data */}
      <Modal
        title="Staff Details"
        visible={viewData !== null}
        onCancel={() => setViewData(null)} // Close modal
        footer={null}
      >
        {viewData && (
          <div>
            <p><strong>Employee Code:</strong> {viewData.employee_code}</p>
            <p><strong>Staff Type:</strong> {viewData.staff_type}</p>
            <p><strong>Staff Name:</strong> {viewData.staff_name}</p>
            <p><strong>Qualification:</strong> {viewData.qualification}</p>
            <p><strong>Designation:</strong> {viewData.designation}</p>
            <p><strong>DOJ:</strong> {viewData.doj}</p>
            <p><strong>DOL:</strong> {viewData.dol}</p>
            <p><strong>Status:</strong> {viewData.status}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Stafflisttable;
