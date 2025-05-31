import { Table, Button, Menu, Modal } from "antd";
import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Feeheadtable = ({ refresh }) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFeeHead, setSelectedFeeHead] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE}/api/fee-heads/`
        );
        if (response.status === 200) {
          setData(response.data);
        } else {
          Swal.fire("Error", "Failed to fetch data", "error");
        }
      } catch (error) {
        Swal.fire("Error", "There was an error fetching the data.", "error");
      }
    };
    fetchData();
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
            `${process.env.REACT_APP_BASE}/api/fee-heads/?fee_head_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            const updatedData = data.map((item) =>
              item.fee_head_id === id ? { ...item, status } : item
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
    setSelectedFeeHead(record);
    setIsModalVisible(true);
  };
  const handleDelete = async (id) => {
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
            try {
              const response = await axios.delete(
                `${process.env.REACT_APP_BASE}/api/fee-heads/?fee_head_id=${id}`
              );
              if (response.status === 204) {
                const updatedData = data.filter((item) => item.fee_head_id !== id);
                setData(updatedData);
                Swal.fire("Deleted!", "The fee head has been deleted.", "success");
              } else {
                Swal.fire("Error!", "Failed to delete the fee head.", "error");
              }
            } catch (error) {
              Swal.fire("Error!", "There was an error deleting the fee head.", "error");
            }
          }
        });
      }
    });
  };

  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "fee_head_id",
      key: "fee_head_id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Head Name",
      dataIndex: "head_name",
      key: "head_name",
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (text) => (text ? text : "N/A"), // Handle null or undefined amounts
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleStatusChange(record.fee_head_id, key)}>
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
      key: "action",
      render: (text, record) => (
        <div className="action-icons">
          <Button
            type="link"
            icon={<i className="fa fa-eye" style={{ color: "blue" }} />}
            title="View"
            onClick={() => handleViewClick(record)}
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
            onClick={() => handleDelete(record.fee_head_id)}
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
            rowKey={(record) => record.fee_head_id}
          />
        </div>
      </div>
      <Modal
        title="Fee Head Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedFeeHead && (
          <div>
            <p><strong>Course:</strong> {selectedFeeHead.course}</p>
            <p><strong>Head Name:</strong> {selectedFeeHead.head_name}</p>
            <p><strong>Total Amount:</strong> {selectedFeeHead.total_amount || "N/A"}</p>
            <p><strong>Status:</strong> {selectedFeeHead.status}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Feeheadtable;
