import { Table, Button, Dropdown, Menu, Modal } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Importanttable = ({refresh}) => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false); // To control modal visibility
  const [selectedRecord, setSelectedRecord] = useState(null); // To store selected record for viewing

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE}/api/important-links/`);
        if (response.status === 200) {
          setData(response.data);
        } else {
          Swal.fire("Error!", "Failed to fetch data.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "There was an error fetching the data.", "error");
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
            `${process.env.REACT_APP_BASE}/api/important-links/?link_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            const updatedData = data.map((item) =>
              item.important_links_id === id ? { ...item, status } : item
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
                `${process.env.REACT_APP_BASE}/api/important-links/?link_id=${id}`
              );
              if (response.status === 204) {
                // Remove the deleted item from the state
                const updatedData = data.filter((item) => item.important_links_id !== id)
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

  // Define handleView function to open the modal
  const handleView = (record) => {
    setSelectedRecord(record); // Set the selected record data
    setVisible(true); // Show the modal
  };

  // Define columns for the table
  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "important_links_id",
      key: "important_links_id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Link Name",
      dataIndex: "link_name",
      key: "link_name",
    },
    {
      title: "URL",
      dataIndex: "link_url",
      key: "link_url",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
          {text}
        </a>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleStatusChange(record.important_links_id, key)}>
            <Menu.Item key="Published">Published</Menu.Item>
            <Menu.Item key="Unpublished">Unpublished</Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              className={`btn btn-white btn-sm btn-rounded dropdown-toggle ${
                text === "Unpublished" ? "text-danger" : "text-success"
              }`}
              onClick={(e) => e.preventDefault()}
            >
              <i
                className={
                  text === "Unpublished" ? "far fa-dot-circle text-danger" : "far fa-dot-circle text-success"
                }
              />{" "}
              {text}
            </Button>
          </Dropdown>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="action-icons">
          <Button
            type="link"
            icon={<i className="fa fa-eye" style={{ color: "blue" }} />}
            title="View"
            onClick={() => handleView(record)}
          />
          <Button type="link" icon={<i className="fa fa-pencil" style={{ color: "green" }} />} title="Edit" />
          <Button
            type="link"
            icon={<i className="fa fa-trash" style={{ color: "red" }} />}
            title="Delete"
            onClick={() => handleDelete(record.important_links_id)}
          />
        </div>
      ),
    },
  ];

  const renderModal = () => (
    <Modal
      title="View Link Details"
      visible={visible}
      onCancel={() => setVisible(false)} 
      footer={null} 
    >
      {selectedRecord && (
        <div>
          <p><strong>Link Name:</strong> {selectedRecord.link_name}</p>
          <p><strong>URL:</strong> <a href={selectedRecord.link_url} target="_blank" rel="noopener noreferrer">{selectedRecord.link_url}</a></p>
          <p><strong>Description:</strong> {selectedRecord.description}</p>
          <p><strong>Status:</strong> {selectedRecord.status}</p>
        </div>
      )}
      <Button onClick={() => setVisible(false)} type="primary">Close</Button>
    </Modal>
  );

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive">
          <Table
            className="table-striped"
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.important_links_id}
          />
        </div>
      </div>
      {renderModal()} 
    </div>
  );
};

export default Importanttable;
