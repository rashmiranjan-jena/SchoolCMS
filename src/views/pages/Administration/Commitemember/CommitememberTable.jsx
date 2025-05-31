import { Table, Button, Modal, Menu, Dropdown } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const CommitememberTable = ({ refresh }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibles, setIsModalVisibles] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [data, setData] = useState([]);
  const [committeeMembers, setCommitteeMembers] = useState([]);


  const handleView = (memberData) => {
    setSelectedMember(memberData); 
    setIsModalVisibles(true); 
  };
 
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE}/api/committee_member/`)
      .then((response) => {
        console.log("API Response:", response.data);
        const formattedData = response.data.map((item) => ({
          id: item.committee_member_master_id,
          committee_name: item.committee_name,
          designation: item.designation,
          assetuser: item.member_name,
          calender_year_name: item.calender_year_name,
          academicYear: item.calender_year_name,
          status: item.status,
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [refresh]);

  const fetchCommitteeMembers = (committeeId) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE}/api/committee_member/?committee_member_master_id=${committeeId}`
      )
      .then((response) => {
        const members = response.data;
        if (!Array.isArray(members)) {
          setCommitteeMembers([members]);
        } else {
          setCommitteeMembers(members);
        }
        setIsModalVisible(true);
      })
      .catch((error) => {
        console.error("Error fetching committee members:", error);
      });
  };

  const handleStatusChange = async (id, status) => {
    console.log(id);
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
            `${process.env.REACT_APP_BASE}/api/committee_member/?committee_member_master_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            const updatedData = data.map((item) =>
              item.id === id ? { ...item, status } : item
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
    // First confirmation
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
          // Initially, disable the "Delete" button
          showLoaderOnConfirm: true,
          html: `
            <label>
              <input type="checkbox" id="confirmCheckbox" /> I understand the consequences of deleting this record.
            </label>
          `,
          preConfirm: () => {
            const checkbox = document.getElementById("confirmCheckbox");
            return checkbox.checked;
          },
          didOpen: () => {
            const checkbox = document.getElementById("confirmCheckbox");
            const confirmButton = Swal.getConfirmButton();

            // Disable the "Delete" button until the checkbox is checked
            confirmButton.disabled = true; // Ensure the button is disabled initially

            checkbox.addEventListener("change", () => {
              confirmButton.disabled = !checkbox.checked; // Enable/disable the button based on checkbox
            });
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(
                `${process.env.REACT_APP_BASE}/api/committee_member/?committee_member_master_id=${id}`
              );
              if (response.status === 204) {
                // Remove the deleted item from the state
                const updatedData = data.filter((item) => item.id !== id);
                setData(updatedData);
                Swal.fire(
                  "Deleted!",
                  "The principal has been deleted.",
                  "success"
                );
              } else {
                Swal.fire("Error!", "Failed to delete the principal.", "error");
              }
            } catch (error) {
              Swal.fire(
                "Error!",
                "There was an error deleting the principal.",
                "error"
              );
            }
          }
        });
      }
    });
  };

  const committeeMemberColumns = [
    {
      title: "Sr. No.",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Academic Year",
      dataIndex: "calender_year_name",
      key: "calender_year_name",
    },
    {
      title: "Member Name",
      dataIndex: "member_name",
      key: "member_name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "DOJ",
      dataIndex: "doj",
      key: "doj",
    },
    {
      title: "DOL",
      dataIndex: "dol",
      key: "dol",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const menu = (
          <Menu
            onClick={({ key }) =>
              handleStatusChange(record.committee_member_master_id, key)
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
                text === "Past" ? "text-danger" : "text-success"
              }`}
              to="#"
              onClick={(e) => e.preventDefault()}
            >
              <i
                className={
                  text === "Past"
                    ? "far fa-dot-circle text-danger"
                    : "far fa-dot-circle text-success"
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

  // Toggle the modal visibility
  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibles(false);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive">
          <Table
            className="table-striped"
            style={{ overflowX: "auto" }}
            columns={[
              {
                title: "Committee Name",
                dataIndex: "committee_name",
                sorter: (a, b) =>
                  a.committee_name.length - b.committee_name.length,
              },
              {
                title: "Designation",
                dataIndex: "designation",
                sorter: (a, b) => a.designation.length - b.designation.length,
              },
              {
                title: "Total Members",
                dataIndex: "totalMembers",
                render: (text, record) => (
                  <Button
                    onClick={() => fetchCommitteeMembers(record.id)}
                    type="link"
                  >
                    View Members
                  </Button>
                ),
              },
              {
                title: "Academic Year",
                dataIndex: "academicYear",
                sorter: (a, b) => a.academicYear.length - b.academicYear.length,
              },
              {
                title: "Status",
                dataIndex: "status",
                render: (text, record) => {
                  const menu = (
                    <Menu
                      onClick={({ key }) => handleStatusChange(record.id, key)}
                    >
                      <Menu.Item key="Published">Published</Menu.Item>
                      <Menu.Item key="Unpublished">Unpublished</Menu.Item>
                    </Menu>
                  );

                  return (
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <Link
                        className={`btn btn-white btn-sm btn-rounded dropdown-toggle ${
                          text === "Past" ? "text-danger" : "text-success"
                        }`}
                        to="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i
                          className={
                            text === "Past"
                              ? "far fa-dot-circle text-danger"
                              : "far fa-dot-circle text-success"
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
                render: (text, record) => (
                  <div className="action-icons">
                    <Button
                      type="link"
                      icon={
                        <i className="fa fa-eye" style={{ color: "blue" }} />
                      }
                      title="View"
                      onClick={() => handleView(record)}
                    />
                    <Button
                      type="link"
                      icon={
                        <i
                          className="fa fa-pencil"
                          style={{ color: "green" }}
                        />
                      }
                      title="Edit"
                    />
                    <Button
                      type="link"
                      icon={
                        <i className="fa fa-trash" style={{ color: "red" }} />
                      }
                      title="Delete"
                      onClick={() => handleDelete(record.id)}
                    />
                  </div>
                ),
              },
            ]}
            dataSource={data}
            rowKey={(record) => record.id}
          />
        </div>
      </div>

      <Modal
        title="Total Members"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1500}
        style={{ marginLeft: "300px" }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
        bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
      >
        <Table
          columns={committeeMemberColumns}
          dataSource={committeeMembers}
          rowKey={(record) => record.id}
          pagination={false}
          scroll={{ y: 400 }}
        />
      </Modal>

      <Modal
        title="Member Details"
        visible={isModalVisibles}
        onCancel={handleCancel}
        width={800}
      >
        {selectedMember && (
          <div>
            <p><strong>Name:</strong> {selectedMember.member_name}</p>
            <p><strong>Designation:</strong> {selectedMember.designation}</p>
            <p><strong>Committee Name:</strong> {selectedMember.committee_name}</p>
            <p><strong>From Date:</strong> {selectedMember.from_date}</p>
            <p><strong>To Date:</strong> {selectedMember.to_date}</p>
            <p><strong>Qualification:</strong> {selectedMember.qualification}</p>
            <p><strong>Relation:</strong> {selectedMember.relation}</p>
            <p><strong>Appointment Date:</strong> {selectedMember.appointment_date}</p>
            <p><strong>Resignation Date:</strong> {selectedMember.resignation_date}</p>
            <p><strong>Date of Birth:</strong> {selectedMember.dob}</p>
            <p><strong>Date of Joining:</strong> {selectedMember.doj}</p>
            <p><strong>Date of Leaving:</strong> {selectedMember.dol}</p>
            <p><strong>Status:</strong> {selectedMember.status}</p>
           
           
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CommitememberTable;
