import { Table, Button, Dropdown, Menu, Modal } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Bannertable = ({ refresh }) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isImagePreviewVisible, setIsImagePreviewVisible] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE}/api/banners/`)
      .then((response) => {
        const formattedData = response.data.map((banner, index) => ({
          srNo: index + 1,
          image: banner.image,
          order: banner.order,
          status: banner.status,
          banner_id:banner.banner_id,
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
            `${process.env.REACT_APP_BASE}/api/banners/?banner_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            setData((prevData) =>
              prevData.map((item) =>
                item.banner_id === id ? { ...item, status } : item
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

  const handleDelete = async (bannerId) => {
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
                `${process.env.REACT_APP_BASE}/api/banners/?banner_id=${bannerId}`
              );
              if (response.status === 204) {
                // Remove deleted item from the data
                const updatedData = data.filter((item) => item.banner_id !== bannerId);
  
                // Recalculate srNo for the updated data
                const formattedData = updatedData.map((banner, index) => ({
                  ...banner,
                  srNo: index + 1, // Reassign srNo based on the new order
                }));
  
                setData(formattedData); // Update state with the new srNo values
                Swal.fire("Deleted!", "The banner has been deleted.", "success");
              } else {
                Swal.fire("Error!", "Failed to delete the banner.", "error");
              }
            } catch (error) {
              Swal.fire("Error!", "There was an error deleting the banner.", "error");
            }
          }
        });
      }
    });
  };
  

  const handleView = (record) => {
    setSelectedBanner(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedBanner(null);
  };

  const handleImageClick = (imageUrl) => {
    setImagePreviewUrl(imageUrl);
    setIsImagePreviewVisible(true);
  };

  const handleImagePreviewClose = () => {
    setIsImagePreviewVisible(false);
    setImagePreviewUrl("");
  };

  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "srNo",
      key: "srNo",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        const imageUrl = `${process.env.REACT_APP_BASE}${image}`;
        return (
          <img
            src={imageUrl || "/path/to/default/image.png"}
            alt="Banner Image"
            style={{ width: 50, height: 50, objectFit: "cover", cursor: 'pointer' }}
            onClick={() => handleImageClick(imageUrl)} // On click, open preview modal
          />
        );
      },
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleStatusChange(record.banner_id, key)}>
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
            onClick={() => handleDelete(record.banner_id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Modal for viewing the banner details */}
      <Modal
        title="Banner Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedBanner && (
          <div>
            <p>
              <strong>Image:</strong>
            </p>
            <img
              src={`${process.env.REACT_APP_BASE}${selectedBanner.image}`}
              alt="Banner Image"
              style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
            />
            <p>
              <strong>Order:</strong> {selectedBanner.order}
            </p>
            <p>
              <strong>Status:</strong> {selectedBanner.status}
            </p>
          </div>
        )}
      </Modal>

      {/* Modal for previewing the image */}
      <Modal
        title="Image Preview"
        visible={isImagePreviewVisible}
        onCancel={handleImagePreviewClose}
        footer={[
          <Button key="close" onClick={handleImagePreviewClose}>
            Close
          </Button>,
        ]}
      >
        <img
          src={imagePreviewUrl}
          alt="Preview"
          style={{ width: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      </Modal>
    </>
  );
};

export default Bannertable;
