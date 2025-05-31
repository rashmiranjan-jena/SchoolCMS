import { Table, Button, Modal, Menu, Dropdown } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const Clubmembertable = ({ refresh }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [committeeMembers, setCommitteeMembers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE}/api/club_member_master/`)
      .then((response) => {
        console.log("API Response:", response.data);

        const formattedData = response.data.flatMap((club) =>
          club.members.map((member) => ({
            id: member.member_id,
            club_name: club.club_name,
            designation: member.designation,
            member_name: member.member_name,
            academicYear: member.calender_year,
            status: member.status,
            appointment_date: member.appointment_date,
            resignation_date: member.resignation_date,
          }))
        );

        setData(formattedData);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [refresh]);
  const fetchCommitteeMembers = (id) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE}/api/club_member_master/?club_member_master_id=${id}`
      )
      .then((response) => {
        const clubData = response.data;

        const members = [
          {
            key: clubData.club_member_master_id,
            srNo: 1,
            from_date: clubData.appointment_date,
            club_name: clubData.club_name,
            member_name: clubData.member_name,
            qualification: clubData.qualification,
            relation: clubData.relation,
            photo: clubData.photo,
            signature: clubData.signature,
            appointment_letter: clubData.appointment_letter,
            designation_name: clubData.designation_name,
            doj: clubData.doj,
            dol: clubData.dol,
            dob: clubData.dob,
            status: clubData.status,
            calender_year: clubData.calender_year_name,
          },
        ];

        setCommitteeMembers(members);
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
            `${process.env.REACT_APP_BASE}/api/club_member_master/?club_member_master_id=${id}`,
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
            confirmButton.disabled = true;

            checkbox.addEventListener("change", () => {
              confirmButton.disabled = !checkbox.checked;
            });
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(
                `${process.env.REACT_APP_BASE}/api/club_member_master/?club_member_master_id=${id}`
              );
              if (response.status === 204) {
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
      title: "Acedemic Year",
      dataIndex: "calender_year",
      key: "calender_year",
    },
    {
      title: "club Name",
      dataIndex: "club_name",
      key: "club_name",
    },

    {
      title: "Member Name",
      dataIndex: "member_name",
      key: "member_name",
    },
    {
      title: "Designation",
      dataIndex: "designation_name",
      key: "designation_name",
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
              handleStatusChange(record.club_member_master_id, key)
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
      render: (record, text) => (
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
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  // Toggle the modal visibility
  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive">
          <Table
            className="table-striped"
            style={{ overflowX: "auto" }}
            columns={[
              {
                title: "Club Name",
                dataIndex: "club_name",
                sorter: (a, b) => a.club_name.length - b.club_name.length,
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
                      onClick={() => showModal(record)}
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

      {/* Total Members Modal */}
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
      >
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <Table
            columns={committeeMemberColumns}
            dataSource={committeeMembers}
            rowKey={(record) => record.id}
            pagination={false}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Clubmembertable;
