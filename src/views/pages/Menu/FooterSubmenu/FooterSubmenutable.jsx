import { Table, Button, Dropdown, Menu } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const FooterSubmenutable = ({ refresh }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE}/api/footer_sub_menu_handler/`)
      .then((response) => {
        const formattedData = response.data.map((item, index) => ({
          srNo: index + 1, 
          menuname: item.name,          // Menu Name
          megamenuname: item.menu_name, // Mega Menu Name
          submenuorder: item.order,    // Submenu Order
          slug: item.slug,             // Slug
          status: item.status || "Unpublished",
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
            `${process.env.REACT_APP_BASE}/api/club_member_master/?club_member_master_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            const updatedData = data.map((item) =>
              item.arno === id ? { ...item, status } : item
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
            `${process.env.REACT_APP_BASE}/api/club_member_master/?club_member_master_id=${id}`
          );
          if (response.status === 204) {
            const updatedData = data.filter((item) => item.arno !== id);
            setData(updatedData);
            Swal.fire("Deleted!", "The member has been deleted.", "success");
          } else {
            Swal.fire("Error!", "Failed to delete the member.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the member.", "error");
        }
      }
    });
  };

  const menu = (
    <Menu
      onClick={({ key }) =>
        handleStatusChange(key, key === "Published" ? "Published" : "Unpublished")
      }
    >
      <Menu.Item key="Published">Published</Menu.Item>
      <Menu.Item key="Unpublished">Unpublished</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "SR No.",
      dataIndex: "srNo",
      key: "srNo",
    },
    {
      title: "Menu",
      dataIndex: "menuname",
      key: "menuname",
    },
    {
      title: "Mega Menu",
      dataIndex: "megamenuname",
      key: "megamenuname",
    },
    {
      title: "Submenu Order",
      dataIndex: "submenuorder",
      key: "submenuorder",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Dropdown overlay={menu} trigger={["click"]}>
          <Link to="#" onClick={(e) => e.preventDefault()}>
            {text === "Published" ? (
              <span className="text-success">Published</span>
            ) : (
              <span className="text-danger">Unpublished</span>
            )}
          </Link>
        </Dropdown>
      ),
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
            onClick={() => handleDelete(record.arno)}
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
            rowKey={(record) => record.arno}
          />
        </div>
      </div>
    </div>
  );
};

export default FooterSubmenutable;
