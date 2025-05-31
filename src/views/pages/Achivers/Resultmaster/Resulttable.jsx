import { Table, Button, Menu, Dropdown, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Resulttable = ({ refresh }) => {
  const [data, setData] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE}/api/results-master/`);
        if (response.status === 200) {
          const flattenedData = response.data.map((item) =>
            item.student_marks.map((student) => ({
              results_master_id: item.results_master_id,
              exam_name: item.exam_name,
              board_name: item.board_name,
              exam_date: item.exam_date,
              student_name: student.student_name,
              full_mark: student.full_mark,
              achieved_mark: student.achieved_mark,
              percentage: student.percentage,
              grade: student.grade,
              status: item.status, // Status remains the same for all students in this record
            }))
          );
          // Flatten the array of arrays into a single array
          setData([].concat(...flattenedData));
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
            `${process.env.REACT_APP_BASE}/api/competition-master/?competition_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            // Update the data state without mutating
            setData((prevData) => {
              return prevData.map((item) =>
                item.results_master_id === id
                  ? { ...item, status }
                  : item
              );
            });
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

  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Exam Name",
      dataIndex: "exam_name",
      key: "exam_name",
    },
    {
      title: "Board",
      dataIndex: "board_name",
      key: "board_name",
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Full Marks",
      dataIndex: "full_mark",
      key: "full_mark",
    },
    {
      title: "Achieved Marks",
      dataIndex: "achieved_mark",
      key: "achieved_mark",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu
            onClick={({ key }) =>
              handleStatusChange(record.results_master_id, key)
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
      title: "Action",
      key: "action",
      render: () => (
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

export default Resulttable;
