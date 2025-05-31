import { Table, Button, Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ContactTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE}/api/links/`);
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
  }, []);

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
            `${process.env.REACT_APP_BASE}/api/links/?link_id=${id}`,
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
        try {
          const response = await axios.delete(
            `${process.env.REACT_APP_BASE}/api/links/?link_id=${id}`
          );
          if (response.status === 204) {
            const updatedData = data.filter((item) => item.id !== id);
            setData(updatedData);
            Swal.fire("Deleted!", "Link has been deleted.", "success");
          } else {
            Swal.fire("Error!", "Failed to delete the link.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the link.", "error");
        }
      }
    });
  };

  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Link Name",
      dataIndex: "link_name",
      key: "link_name",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
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
          <Menu onClick={({ key }) => handleStatusChange(record.id, key)}>
            <Menu.Item key="Active">Active</Menu.Item>
            <Menu.Item key="Inactive">Inactive</Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              className={`btn btn-white btn-sm btn-rounded dropdown-toggle ${
                text === "Inactive" ? "text-danger" : "text-success"
              }`}
              onClick={(e) => e.preventDefault()}
            >
              <i
                className={
                  text === "Inactive"
                    ? "far fa-dot-circle text-danger"
                    : "far fa-dot-circle text-success"
                }
              /> {text}
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
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactTable;
