import { Table, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Dropdown, Menu } from "antd";

const Blogcategorytable = ({ refresh }) => {
  const [data, setData] = useState([]);
  const [viewData, setViewData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE}/api/blog-category/`
        );
        setData(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error fetching blog categories",
        });
      }
    };
    fetchData();
  }, [refresh]);

  const handleStatusChange = async (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Change the status to ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_BASE}/api/blog-category/?category_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            setData((prevData) =>
              prevData.map((item) =>
                item.blog_category_id === id ? { ...item, status } : item
              )
            );
            Swal.fire("Success!", "Status updated successfully.", "success");
          } else {
            Swal.fire("Error!", "Failed to update status.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Could not update status.", "error");
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
            const checkbox = Swal.getPopup().querySelector('input[type="checkbox"]');
            return checkbox.checked;
          },
          didOpen: () => {
            const confirmButton = Swal.getConfirmButton();
            confirmButton.disabled = true;
  
            const checkbox = Swal.getPopup().querySelector('input[type="checkbox"]');
            checkbox.addEventListener("change", (event) => {
              confirmButton.disabled = !event.target.checked;
            });
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(
                `${process.env.REACT_APP_BASE}/api/blog-category/?category_id=${id}`
              );
              if (response.status === 204) {
                setData(data.filter((item) => item.blog_category_id !== id));
                Swal.fire("Deleted!", "Blog Category has been deleted.", "success");
              }
            } catch (error) {
              Swal.fire("Error!", "There was an error deleting the Blog category.", "error");
            }
          }
        });
      }
    });
  };

  const showModal = (category) => {
    setViewData(category);
    setIsModalVisible(true);
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Handle image preview
  const handleImagePreview = (imageUrl) => {
    setImagePreview(imageUrl);
  };

  // Close image preview modal
  const handleImagePreviewClose = () => {
    setImagePreview(null);
  };

  // Define table columns
  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1, // Row number
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={`${process.env.REACT_APP_BASE}${text}`}
          alt="Category"
          style={{ width: 40, height: 40, borderRadius: "50%", cursor: "pointer" }}
          onClick={() => handleImagePreview(`${process.env.REACT_APP_BASE}${text}`)}
        />
      ),
    },
    {
      title: "About",
      dataIndex: "about",
      key: "about",
      render: (text) => (
        <div style={{ maxWidth: "300px", whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleStatusChange(record.blog_category_id, key)}>
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
            onClick={() => handleDelete(record.blog_category_id)}
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
            rowKey={(record) => record.blog_category_id}
          />
        </div>
      </div>

      {/* Modal for Category Details */}
      <Modal
        title="Category Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {viewData && (
          <div>
            <p>
              <strong>Category Name:</strong> {viewData.category_name}
            </p>
            <p>
              <strong>Category Image:</strong>
            </p>
            <img
              src={`${process.env.REACT_APP_BASE}${viewData.image}`}
              alt="Category"
              style={{ width: 100, height: 100, borderRadius: "10px" }}
            />
            <p>
              <strong>Status:</strong> {viewData.status}
            </p>
            <p>
              <strong>About:</strong> {viewData.about}
            </p>
          </div>
        )}
      </Modal>

      {/* Modal for Image Preview */}
      <Modal
        visible={!!imagePreview}
        footer={null}
        onCancel={handleImagePreviewClose}
        centered
      >
        <img
          alt="Preview"
          src={imagePreview}
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </Modal>
    </div>
  );
};

export default Blogcategorytable;
