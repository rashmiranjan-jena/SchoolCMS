import { Table, Button, Menu, Dropdown, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'; 
import axios from 'axios'; 

const Blogmastertable = () => {
  const [data, setData] = useState([]); 
  const [selectedBlog, setSelectedBlog] = useState(null); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE}/api/blog-master/`);
        const transformedData = response.data.map((item) => ({
          id: item.blog_master_id,
          blogCategory: item.blog_category, 
          blogTitle: item.blog_title,
          date: item.blog_creation_date,
          shortDescription: item.blog_qoute,
          author: item.author_name,
          status: item.status,
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
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
            `${process.env.REACT_APP_BASE}/api/blog-master/?blog_id=${id}`,
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

  const handleViewClick = (record) => {
    setSelectedBlog(record); 
    setIsModalVisible(true);
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
          // Initially, disable the "Delete" button
          showLoaderOnConfirm: true,
          html: `
            <label>
              <input type="checkbox" id="confirmCheckbox" /> I understand the consequences of deleting this record.
            </label>
          `,
          preConfirm: () => {
            const checkbox = Swal.getPopup().querySelector('input[type="checkbox"]');
            // Return the state of the checkbox (isChecked)
            return checkbox.checked;
          },
          didOpen: () => {
            const confirmButton = Swal.getConfirmButton();
            confirmButton.disabled = true; // Disable the "Delete" button initially
            // Listen to checkbox change using React's state management
            const checkbox = Swal.getPopup().querySelector('input[type="checkbox"]');
            checkbox.addEventListener("change", (event) => {
              confirmButton.disabled = !event.target.checked; // Enable/disable based on checkbox state
            });
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(
                `${process.env.REACT_APP_BASE}/api/blog-master/?blog_id=${id}`
              );
              if (response.status === 204) {
                const updatedData = data.filter((item) => item.id !== id);
                setData(updatedData); // Remove the deleted blog from the state
                Swal.fire("Deleted!", "Blog has been deleted successfully.", "success");
              } else {
                Swal.fire("Error!", "Failed to delete blog.", "error");
              }
            } catch (error) {
              Swal.fire("Error!", "There was an error deleting the blog.", "error");
            }
          }
        });
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
      title: "Blog Category",
      dataIndex: "blogCategory",
      key: "blogCategory",
    },
    {
      title: "Blog Title",
      dataIndex: "blogTitle",
      key: "blogTitle",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
   
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
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
              className={`btn btn-white btn-sm btn-rounded dropdown-toggle ${text === "Unpublished" ? "text-danger" : "text-success"}`}
              onClick={(e) => e.preventDefault()}
            >
              <i className={text === "Unpublished" ? "far fa-dot-circle text-danger" : "far fa-dot-circle text-success"} /> {text}
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

      {/* Modal for View */}
      {selectedBlog && (
        <Modal
          title="Blog Details"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[<Button key="close" onClick={() => setIsModalVisible(false)}>Close</Button>]}
        >
          <p><strong>Blog Title:</strong> {selectedBlog.blogTitle}</p>
          <p><strong>Category:</strong> {selectedBlog.blogCategory}</p>
          <p><strong>Date:</strong> {selectedBlog.date}</p>
          <p><strong>Description:</strong> {selectedBlog.shortDescription}</p>
          <p><strong>Author:</strong> {selectedBlog.author}</p>
          <p><strong>Status:</strong> {selectedBlog.status}</p>
        </Modal>
      )}
    </div>
  );
};

export default Blogmastertable;
