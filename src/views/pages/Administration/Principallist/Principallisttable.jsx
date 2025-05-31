import React, { useState, useEffect } from "react";
import { Table, Button, Menu, Dropdown, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios
import Swal from "sweetalert2"; // Import Swal for SweetAlert2
import { jsPDF } from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import jsPDF autotable plugin

const Principallisttable = ({ refresh }) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE}/api/principal_list/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching principal list:", error);
      });
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
            `${process.env.REACT_APP_BASE}/api/principal_list/?principal_list_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            const updatedData = data.map((item) =>
              item.principal_list_id === id ? { ...item, status } : item
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
                `${process.env.REACT_APP_BASE}/api/principal_list/?principal_list_id=${id}`
              );
              if (response.status === 204) {
                const updatedData = data.filter((item) => item.principal_list_id !== id);
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

  const showModal = (record) => {
    setModalData(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalData(null);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Principal Name", "Tenure (From - To)", "Status", "Designation"];
    const tableRows = data.map((row) => [
      row.principal_name,
      row.tenure,
      row.status,
      "Principal",  
    ]);
  
    doc.autoTable(tableColumn, tableRows);
    doc.save("principal_list.pdf");
  };
  

  const columns = [
    {
      title: "Principal Name",
      dataIndex: "principal_name",
      sorter: (a, b) => a.principal_name.localeCompare(b.principal_name),
    },
    {
      title: "Tenure (From - To)",
      dataIndex: "tenure",
      sorter: (a, b) => a.tenure.localeCompare(b.tenure),
    },
    {
      title: "Designation",  // New column for Designation
      dataIndex: "designation",
      render: () => "Principal",  // Hardcoded value for all entries
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
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleStatusChange(record.principal_list_id, key)}>
            <Menu.Item key="Ongoing">Ongoing</Menu.Item>
            <Menu.Item key="Past">Past</Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Link
              className={`btn btn-white btn-sm btn-rounded dropdown-toggle ${text === "Past" ? "text-danger" : "text-success"}`}
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
          />
          <Button
            type="link"
            icon={<i className="fa fa-trash" style={{ color: "red" }} />}
            title="Delete"
            onClick={() => handleDelete(record.principal_list_id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive">
          <Button onClick={downloadPDF} type="primary" style={{ marginBottom: "20px" }}>
            Download PDF
          </Button>
          <Table
            className="table-striped"
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.principal_list_id}
          />
        </div>
      </div>

      {/* Modal to display principal data */}
      <Modal
        title="Principal Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {modalData && (
          <div>
            <p><strong>Name:</strong> {modalData.principal_name}</p>
            <p><strong>Tenure:</strong> {modalData.tenure}</p>
            <p><strong>Status:</strong> {modalData.status}</p>
            <p><strong>Designation:</strong> Principal</p> {/* Added designation */}
            <img
              src={`${process.env.REACT_APP_BASE}${modalData.photo}`}
              alt="Principal"
              style={{ width: 100, height: 50, borderRadius: "20%" }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Principallisttable;
