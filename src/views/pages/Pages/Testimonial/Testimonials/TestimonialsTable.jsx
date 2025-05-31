import { Table, Button, Dropdown, Menu, Modal } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TestimonialsTable = ({ refresh }) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false); // To handle image preview modal
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null); // To store the selected testimonial details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE}/api/testimoni-responses/`
        );
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
            `${process.env.REACT_APP_BASE}/api/testimoni-responses/?testimoni_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            const updatedData = data.map((item) =>
              item.testimoni_response_id === id ? { ...item, status } : item
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
        // Second confirmation with checkbox
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
            const checkbox = Swal.getPopup().querySelector(
              'input[type="checkbox"]'
            );
            return checkbox.checked;
          },
          didOpen: () => {
            const confirmButton = Swal.getConfirmButton();
            confirmButton.disabled = true;

            const checkbox = Swal.getPopup().querySelector(
              'input[type="checkbox"]'
            );
            checkbox.addEventListener("change", (event) => {
              confirmButton.disabled = !event.target.checked;
            });
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(
                `${process.env.REACT_APP_BASE}/api/testimoni-responses/?testimoni_id=${id}`
              );
              if (response.status === 204) {
                const updatedData = data.filter(
                  (item) => item.testimoni_response_id !== id
                );
                setData(updatedData);
                Swal.fire("Deleted!", "Testimoni has been deleted.", "success");
              } else {
                Swal.fire("Error!", "Failed to delete the Testimoni.", "error");
              }
            } catch (error) {
              Swal.fire(
                "Error!",
                "There was an error deleting the Testimoni.",
                "error"
              );
            }
          }
        });
      }
    });
  };

  const handleView = (record) => {
    setSelectedTestimonial(record); // Set the selected testimonial data
    setIsModalVisible(true); // Open the modal
  };

  const handleImagePreview = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageModalVisible(true); // Open the image preview modal
  };

  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "testimoni_response_id",
      key: "testimoni_response_id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Description Title",
      dataIndex: "description_title",
      key: "description_title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Roll No.",
      dataIndex: "roll_no",
      key: "roll_no",
      render: (text) => text || "N/A", // To handle null values
    },
    {
      title: "Name",
      dataIndex: "testimoni_name",
      key: "testimoni_name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Other Designation",
      dataIndex: "other_designation",
      key: "other_designation",
      render: (text) => text || "N/A", // To handle null values
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => {
        // Assuming that process.env.REACT_APP_BASE contains the base URL for your media
        const imageUrl = `${process.env.REACT_APP_BASE}${photo}`;
        return (
          <img
            src={imageUrl || "/path/to/default/image.png"} // Default image if no image exists
            alt="Testimonial Photo"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => handleImagePreview(imageUrl)}
          />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu
            onClick={({ key }) =>
              handleStatusChange(record.testimoni_response_id, key)
            }
          >
            <Menu.Item key="Published">Published</Menu.Item>
            <Menu.Item key="Unpublished">Unpublished</Menu.Item>
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
            onClick={() => handleDelete(record.testimoni_response_id)}
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
            rowKey={(record) => record.testimoni_response_id}
          />
        </div>
      </div>

      <Modal
        visible={isModalVisible}
        footer={[<Button key="close" onClick={() => setIsModalVisible(false)}>Close</Button>]}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        {selectedTestimonial && (
          <div>
            <p><strong>Description Title:</strong></p>
            <p>{selectedTestimonial.description_title}</p>
            <p><strong>Description:</strong></p>
            <p>{selectedTestimonial.description}</p>
            <p><strong>Name:</strong></p>
            <p>{selectedTestimonial.testimoni_name}</p>
            <p><strong>Designation:</strong></p>
            <p>{selectedTestimonial.designation}</p>
            <p><strong>Image:</strong></p>
            <img
              src={`${process.env.REACT_APP_BASE}${selectedTestimonial.photo}`}
              alt="Testimonial"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
        )}
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        visible={isImageModalVisible}
        footer={[<Button key="close" onClick={() => setIsImageModalVisible(false)}>Close</Button>]}
        onCancel={() => setIsImageModalVisible(false)}
        width={800}
      >
        <img
          src={selectedImage}
          alt="Selected Testimonial Image"
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </Modal>
    </div>
  );
};

export default TestimonialsTable;
