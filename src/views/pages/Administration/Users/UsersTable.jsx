import React, { useState, useEffect } from "react";
import { Table, Dropdown, Menu, Button, Modal } from "antd";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

const UsersTable = ({refresh}) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE}/api/designation/`
        );
        if (response.status === 200) {
          const formattedData = response.data.map((item) => ({
            id: item.designation_master_id,
            designation_name: item.designation_name,
            status: "Published", // Default status
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire("Error", "Failed to fetch data.", "error");
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
            `${process.env.REACT_APP_BASE}/api/designation/?designation_master_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            const updatedData = data.map((item) =>
              item.id === id ? { ...item, status } : item
            );
            setData(updatedData);
            Swal.fire(
              "Updated!",
              "Status has been updated successfully.",
              "success"
            );
          } else {
            Swal.fire("Error", "Failed to update status.", "error");
          }
        } catch (error) {
          Swal.fire("Error", "There was an error updating the status.", "error");
        }
      }
    });
  };

  const handleView = (record) => {
    setModalData(record);
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
        Swal.fire({
          title: "Final Confirmation",
          text: "Please check the box to confirm you want to delete this record.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
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
            confirmButton.disabled = true; 
            checkbox.addEventListener("change", () => {
              confirmButton.disabled = !checkbox.checked; 
            });
          }
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(
                `${process.env.REACT_APP_BASE}/api/designation/?designation_master_id=${id}` 
              );
              if (response.status === 204) {
                const updatedData = data.filter((item) => item.id !== id);
                setData(updatedData);
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
  const columns = [
    {
      title: "Designation Name",
      dataIndex: "designation_name",
      sorter: (a, b) => a.designation_name.localeCompare(b.designation_name),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleStatusChange(record.id, key)}>
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
      render: (_, record) => (
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
            onClick={() => handleDelete(record.id)} // Trigger delete on click
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
      <Modal
        title="Designation Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {modalData ? (
          <div>
            <p>
              <strong>Designation Name:</strong> {modalData.designation_name}
            </p>
            <p>
              <strong>Status:</strong> {modalData.status}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default UsersTable;
