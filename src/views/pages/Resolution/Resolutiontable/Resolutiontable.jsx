import { Table, Button, Menu, Dropdown, Modal } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Resolutiontable = () => {
  const [data, setData] = useState([]);
  const [viewData, setViewData] = useState(null);  // For storing data to display in modal
  const [isModalVisible, setIsModalVisible] = useState(false);  // For controlling modal visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE}/api/resolutions/`);
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
            `${process.env.REACT_APP_BASE}/api/resolutions/?resolution_id=${id}`,
            { status }
          );
          if (response.status === 200) {
            const updatedData = data.map((item) =>
              item.resoltions_id === id ? { ...item, status } : item
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
                `${process.env.REACT_APP_BASE}/api/resolutions/?resolution_id=${id}`
              );
              if (response.status === 204) {
                const fetchData = async () => {
                  try {
                    const response = await axios.get(`${process.env.REACT_APP_BASE}/api/resolutions/`);
                    if (response.status === 200) {
                      setData(response.data); // Update the state with fresh data
                      Swal.fire("Deleted!", "Resolution has been deleted.", "success");
                    } else {
                      Swal.fire("Error!", "Failed to fetch updated data.", "error");
                    }
                  } catch (error) {
                    Swal.fire("Error!", "There was an error fetching the data.", "error");
                  }
                };
                fetchData(); 
              } else {
                Swal.fire("Error!", "Failed to delete the Resolution.", "error");
              }
            } catch (error) {
              Swal.fire("Error!", "There was an error deleting the Resolution.", "error");
            }
          }
        });
      }
    });
  };

  const handleView = (record) => {
    setViewData(record); 
    setIsModalVisible(true); 
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); 
    setViewData(null);
  };

  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Committee Name",
      dataIndex: "committee_name",  
      key: "committee_name",
      render: (text) => text || "N/A",  
    },
    {
      title: "Club Name",
      dataIndex: "club_name", 
      key: "club_name",
      render: (text) => text || "N/A",  
    },
    {
      title: "Resolution No.",
      dataIndex: "resolutions_no",  
      key: "resolutions_no",
    },
    {
      title: "Academic Year",
      dataIndex: "academic_year_name",  
      key: "academic_year_name",
    },
    {
      title: "Status",
      dataIndex: "status",  
      render: (text, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleStatusChange(record.resoltions_id, key)}>
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
                className={text === "Unpublished" ? "far fa-dot-circle text-danger" : "far fa-dot-circle text-success"}
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
            onClick={() => handleDelete(record.resoltions_id)}
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
            rowKey={(record) => record.resoltions_id}
          />
        </div>
      </div>
      <Modal
  title="Resolution Details"
  visible={isModalVisible}
  onCancel={handleCloseModal}
  footer={[
    <Button key="close" onClick={handleCloseModal}>
      Close
    </Button>,
  ]}
>
  {viewData && (
    <div>
      <p><strong>Resolution No.:</strong> {viewData.resolutions_no}</p>
      <p><strong>Year:</strong> {viewData.academic_year}</p>
      <p><strong>Committee Name:</strong> {viewData.committee_name}</p>
      <p><strong>Present Members:</strong></p>
      {viewData.present_members && Object.entries(viewData.present_members).length > 0 ? (
        <ul>
          {Object.entries(viewData.present_members).map(([key, value], index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      ) : (
        <p>No members available</p>
      )}
      <p><strong>Resolutions:</strong> {viewData.resoltions_id}</p>
      <p><strong>Status:</strong> {viewData.status}</p>
    </div>
  )}
</Modal>

    </div>
  );
};

export default Resolutiontable;
