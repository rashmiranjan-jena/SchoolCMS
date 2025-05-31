import React, { useState, useEffect } from "react";
import { Table, Button, Dropdown, Menu, Modal } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";  // Import jsPDF

const Presidentlisttable = ({ refresh }) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPresident, setSelectedPresident] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE}/api/president_list`);
        const updatedData = response.data.map(item => ({
          ...item,
          designation: 'President' // Add the designation field
        }));
        setData(updatedData);
      } catch (error) {
        console.error("Error fetching data", error);
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
            `${process.env.REACT_APP_BASE}/api/president_list/?president_list_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            const updatedData = data.map((item) =>
              item.president_list_id === id ? { ...item, status } : item
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
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(
                `${process.env.REACT_APP_BASE}/api/president_list/?president_list_id=${id}`
              );
              if (response.status === 204) {
                setData(data.filter((item) => item.president_list_id !== id));
                Swal.fire("Deleted!", "The record has been deleted.", "success");
              } else {
                Swal.fire("Error!", "Failed to delete the record.", "error");
              }
            } catch (error) {
              Swal.fire("Error!", "There was an error deleting the record.", "error");
            }
          }
        });
      }
    });
  };

  const showModal = (record) => {
    setSelectedPresident(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPresident(null);
  };

  // PDF generation function
  const handlePDFDownload = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text("President List", 20, 20);

    // Add table headers
    const headers = ["President Name", "Tenure", "Designation", "Status"];
    const rows = data.map(item => [
      item.president_name,
      item.tenure,
      item.designation, // Add the designation value
      item.status
    ]);

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 30, // Start below title
    });

    // Save the PDF
    doc.save("president_list.pdf");
  };

  const columns = [
    {
      title: "President Name",
      dataIndex: "president_name",
      sorter: (a, b) => a.president_name.localeCompare(b.president_name),
    },
    {
      title: "Tenure (From - To)",
      dataIndex: "tenure",
      sorter: (a, b) => a.tenure.localeCompare(b.tenure),
    },
    {
      title: "Designation",  // New column
      dataIndex: "designation",  // Display the 'designation' field
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
            style={{
              width: 80,
              height: 40,
              borderRadius: "20%",
              objectFit: "cover",
            }}
          />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleStatusChange(record.president_list_id, key)}>
            <Menu.Item key="Ongoing">Ongoing</Menu.Item>
            <Menu.Item key="Past">Past</Menu.Item>
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
            onClick={() => showModal(record)}
          />
          <Button
            type="link"
            icon={<i className="fa fa-pencil" style={{ color: "green" }} />}
            title="Edit"
            onClick={() => console.log("Edit", record.president_list_id)}
          />
          <Button
            type="link"
            icon={<i className="fa fa-trash" style={{ color: "red" }} />}
            title="Delete"
            onClick={() => handleDelete(record.president_list_id)}
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
            <Button
              type="primary"
              onClick={handlePDFDownload}
              style={{ marginBottom: 20 }}
            >
              Download PDF
            </Button>
            <Table
              className="table-striped"
              style={{ overflowX: "auto" }}
              columns={columns}
              dataSource={data}
              rowKey={(record) => record.president_list_id}
            />
          </div>
        </div>
      </div>

      <Modal
        title="President Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[<Button key="close" onClick={handleCancel}>Close</Button>]}
      >
        {selectedPresident && (
          <div>
            <p><strong>President Name:</strong> {selectedPresident.president_name}</p>
            <p><strong>Tenure:</strong> {selectedPresident.tenure}</p>
            <p><strong>Status:</strong> {selectedPresident.status}</p>
            <p><strong>Designation:</strong> {selectedPresident.designation}</p> {/* Display designation */}
          </div>
        )}
      </Modal>
    </>
  );
};

export default Presidentlisttable;
