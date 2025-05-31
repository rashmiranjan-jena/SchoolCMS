import React, { useState, useEffect } from "react";
import { Table, Button, Dropdown, Menu, Modal } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import AssetsSearchFilter from "./AssetsSearchFilter";

const AssetsTable = ({ refresh }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE}/api/committee_type/`
        );
        if (response.data && response.data.length > 0) {
          setData(response.data);
          setFilteredData(response.data);
        } else {
          Swal.fire("No Data", "No committee data found.", "info");
        }
      } catch (error) {
        Swal.fire(
          "Error",
          "Error fetching data. Please try again later.",
          "error"
        );
      }
    };

    fetchData();
  }, [refresh]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(data);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      setFilteredData(
        data.filter((item) =>
          item.committee_name.toLowerCase().includes(lowercasedQuery)
        )
      );
    }
  }, [searchQuery, data]);

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
            `${process.env.REACT_APP_BASE}/api/committee_type/?committee_type_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            const updatedData = data.map((item) =>
              item.committee_type_id === id ? { ...item, status } : item
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
          Swal.fire(
            "Error!",
            "There was an error updating the status.",
            "error"
          );
        }
      }
    });
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
                `${process.env.REACT_APP_BASE}/api/committee_type/?committee_type_id=${id}`
              );
              const updatedData = data.filter(
                (item) => item.committee_type_id !== id
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

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Committee Name",
      dataIndex: "committee_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu
            onClick={({ key }) =>
              handleStatusChange(record.committee_type_id, key)
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
      title: "Logo",
      dataIndex: "logo",
      render: (logo) => (
        <img
          src={`${process.env.REACT_APP_BASE}${logo}`}
          alt="Logo"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Action",
      render: (text, record) => (
        <div>
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
            onClick={() => handleDelete(record.committee_type_id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <AssetsSearchFilter setSearchQuery={setSearchQuery} />
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey={(record) => record.committee_type_id}
      />
      <Modal
        title="Committee Details :"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
    <Button key="close" onClick={handleCloseModal}>
      Close
    </Button>,
  ]}
      >
        {selectedItem && (
          <div>
            <p>
              <strong>Committee Name:</strong> {selectedItem.committee_name}
            </p>
            <p>
              <strong>Status:</strong> {selectedItem.status}
            </p>
            <p>
              <strong>Logo:</strong>{" "}
              <img
                src={`${process.env.REACT_APP_BASE}${selectedItem.logo}`}
                alt="Logo"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AssetsTable;
