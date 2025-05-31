import { Table, Button, Modal, Dropdown, Menu } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const MenuTable = ({ refresh }) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE}/api/header_menu_handler/`)
      .then((response) => {
        const formattedData = response.data.map((item, index) => ({
          key: item.id, // Unique key for each row
          srno: index + 1, // Serial number
          menuname: item.name,
          order: item.order,
          slug: item.slug,
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
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
            `${process.env.REACT_APP_BASE}/api/header_menu_handler/${id}/`,
            { status }
          );
          if (response.status === 200) {
            const updatedData = data.map((item) =>
              item.id === id ? { ...item, status } : item
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
  

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the record permanently. Do you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Use the correct API endpoint format
          const response = await axios.delete(
            `${process.env.REACT_APP_BASE}/api/header_menu_handler/${id}/`
          );
          if (response.status === 204) {
            const updatedData = data.filter((item) => item.id !== id);
            setData(updatedData);
            Swal.fire("Deleted!", "The menu item has been deleted.", "success");
          } else {
            Swal.fire("Error!", "Failed to delete the menu item.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the menu item.", "error");
        }
      }
    });
  };
  

  const handleView = (record) => {
    setSelectedItem(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "Menu Name",
      dataIndex: "menuname",
      key: "menuname",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
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
            <Button
              className={`btn btn-white btn-sm btn-rounded dropdown-toggle ${
                text === "Unpublished" ? "text-danger" : "text-success"
              }`}
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
            </Button>
          </Dropdown>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
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
            onClick={() => handleDelete(record.id)}
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
            columns={columns}
            dataSource={data}
            rowKey="key"
          />
        </div>
      </div>
      {/* Modal for viewing details */}
      <Modal
        title="Menu Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={<Button onClick={handleModalClose}>Close</Button>}
      >
        {selectedItem && (
          <div>
            <p><strong>Menu Name:</strong> {selectedItem.menuname}</p>
            <p><strong>Order:</strong> {selectedItem.order}</p>
            <p><strong>Slug:</strong> {selectedItem.slug}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MenuTable;
