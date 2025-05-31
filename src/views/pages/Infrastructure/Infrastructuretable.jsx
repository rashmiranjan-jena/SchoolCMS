import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Menu, Dropdown } from "antd";
import axios from "axios";
import Swal from "sweetalert2";


const Infrastructuretable = ({ refresh }) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE}/api/infra-structure/`);
        if (response.status === 200) {
          setData(response.data);
        } else {
          Swal.fire("Error!", "Failed to fetch data.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "Could not fetch data.", "error");
      }
    };

    fetchData();
  }, [refresh]);

  // Function to handle image click and open it in a modal
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Set the selected image
    setIsModalVisible(true); // Show the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null); // Reset the selected image
  };


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
            `${process.env.REACT_APP_BASE}/api/infra-structure/?infra_structure_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            setData((prevData) =>
              prevData.map((item) =>
                item.infra_structure_id === id ? { ...item, status } : item
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




  // Handle view
  const handleView = (record) => {
    // Logic to handle view action, e.g., redirect to a detailed view
    console.log("Viewing record:", record);
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
                `${process.env.REACT_APP_BASE}/api/infra-structure/?infra_structure_id=${id}`
              );
              if (response.status === 204) {
                const updatedData = data.filter((item) => item.infra_structure_id !== id);
                setData(updatedData);
                Swal.fire("Deleted!", "The infra-structure has been deleted.", "success");
              } else {
                Swal.fire("Error!", "Failed to delete the infra-structure.", "error");
              }
            } catch (error) {
              Swal.fire("Error!", "There was an error deleting the infra-structure.", "error");
            }
          }
        });
      }
    });
  };

  const columns = [
    {
      title: "Sr. No.",
      key: "sr_no", 
      render: (_, record, index) => index + 1,  
    },
    {
      title: "Infrastructurename",
      dataIndex: "infra_structure_name",
      key: "infra_structure_name",
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
            style={{ width: 50, height: 50, objectFit: "cover", cursor: "pointer" }}
            onClick={() => handleImageClick(imageUrl)}
          />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleStatusChange(record.infra_structure_id, key)}>
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
            onClick={() => handleDelete(record.infra_structure_id)}
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
        rowKey="about_us_id"
        pagination={{ pageSize: 5 }}
      />

      {/* Modal to display selected image */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        title="Image Preview"
      >
        <img
          src={selectedImage}
          alt="Selected"
          style={{ width: "100%", height: "auto" }}
        />
      </Modal>
    </>
  );
};

export default Infrastructuretable;
