import React, { useState, useEffect } from "react";
import { Table, Button, Menu, Dropdown, Modal } from "antd";
import Swal from "sweetalert2";
import axios from "axios";

const Studentlisttable = ({refresh}) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE}/api/student_list/`
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
            `${process.env.REACT_APP_BASE}/api/student_list/?student_list_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            const updatedData = data.map((item) =>
              item.student_list_id === id ? { ...item, status } : item
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
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(
                `${process.env.REACT_APP_BASE}/api/student_list/?student_list_id=${id}`
              );
              if (response.status === 204) {
                const updatedData = data.filter(item => item.student_list_id !== id);
                setData(updatedData);
                Swal.fire("Deleted!", "Student has been deleted.", "success");
              } else {
                Swal.fire("Error!", "Failed to delete student.", "error");
              }
            } catch (error) {
              Swal.fire("Error!", "There was an error deleting the student.", "error");
            }
          }
         
        });
      }
    });
  };

  const handleView = (student) => {
    setStudentData(student);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Sr. No.",
      render: (_, __, index) => index + 1,
      key: "srNo",
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
      sorter: (a, b) => a.student_name.localeCompare(b.student_name),
    },
    {
      title: "Enrollment No.",
      dataIndex: "enrollment_no",
      key: "enrollment_no",
      sorter: (a, b) => a.enrollment_no.localeCompare(b.enrollment_no),
    },
    {
      title: "Course",
      dataIndex: "course_name",
      key: "course_name",
      sorter: (a, b) => a.course_name.localeCompare(b.course_name),
    },
    {
      title: "Stream",
      dataIndex: "stream_name",
      key: "stream_name",
      sorter: (a, b) => a.stream_name.localeCompare(b.stream_name),
    },
    {
      title: "Class",
      dataIndex: "class_name",
      key: "class_name",
      sorter: (a, b) => a.class_name.localeCompare(b.class_name),
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <img
          src={`${process.env.REACT_APP_BASE}${photo}`}
          alt="Logo"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleStatusChange(record.student_list_id, key)}>
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
              <i className={text === "Unpublished" ? "far fa-dot-circle text-danger" : "far fa-dot-circle text-success"} />{" "}
              {text}
            </Button>
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
            onClick={() => handleDelete(record.student_list_id)}
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
            rowKey={(record) => record.student_list_id}
          />
        </div>
      </div>

      <Modal
        title="Student Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
    <Button key="close"  onClick={() => setIsModalVisible(false)}>
      Close
    </Button>,
  ]}
      >
        {studentData && (
          <div>
            <p><strong>Student Name:</strong> {studentData.student_name}</p>
            <p><strong>Enrollment No.:</strong> {studentData.enrollment_no}</p>
            <p><strong>Course:</strong> {studentData.course_name}</p>
            <p><strong>Stream:</strong> {studentData.stream_name}</p>
            <p><strong>Class:</strong> {studentData.class_name}</p>
            <p><strong>Status:</strong> {studentData.status}</p>
            
          </div>
        )}
      </Modal>  
    </div>
  );
};

export default Studentlisttable;
