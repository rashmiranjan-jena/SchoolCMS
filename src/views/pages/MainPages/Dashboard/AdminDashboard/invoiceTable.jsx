import { Table, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const InvoiceTable = () => {
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Fetch upcoming events
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE}/api/upcomingevent-name-master/`)
      .then((res) => {
        const upcomingEvents = res.data.filter(
          (event) => new Date(event.date_from) > new Date()
        );
        setEvents(upcomingEvents);
      })
      .catch((error) => console.error("Error fetching upcoming events:", error));
  }, []);

  // Open image preview modal
  const handlePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setIsModalVisible(true);
  };

  // Close image preview modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setPreviewImage(""); 
  };

  const columns = [
    {
      title: "Event Name",
      dataIndex: "event_name",
      sorter: (a, b) => a.event_name.localeCompare(b.event_name),
    },
    {
      title: "Category",
      dataIndex: "event_category",
      sorter: (a, b) => a.event_category.localeCompare(b.event_category),
    },
    {
      title: "Start Date",
      dataIndex: "date_from",
      sorter: (a, b) => new Date(a.date_from) - new Date(b.date_from),
    },
    {
      title: "End Date",
      dataIndex: "date_to",
      sorter: (a, b) => new Date(a.date_to) - new Date(b.date_to),
    },
    {
      title: "Venue",
      dataIndex: "venue",
      render: (venue) => venue?.a || "N/A", // Safely handle missing venue
    },
    {
      title: "Club",
      dataIndex: "club_name",
      render: (club_name) => club_name || "N/A",
    },
    {
      title: "Event Photo",
      dataIndex: "display_photo",
      key: "display_photo",
      render: (photo) => {
        const imageUrl = `${process.env.REACT_APP_BASE}${photo}`;
        return photo ? (
          <img
            src={imageUrl}
            alt="Event"
            style={{
              width: 80,
              height: 40,
              borderRadius: "20%",
              cursor: "pointer",
            }}
            onClick={() => handlePreview(imageUrl)} 
          />
        ) : (
          "No Photo Available"
        );
      },
    },
  ];

  return (
    <div className="col-md-12 d-flex">
      <div className="card card-table flex-fill">
        <div className="card-header">
          <h3 className="card-title mb-0">Upcoming Events</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <Table
              dataSource={events}
              columns={columns}
              pagination={false}
              rowKey={(record) => record.event_id}
            />
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <img
          alt="Event Preview"
          src={previewImage}
          style={{ width: "100%", height: "auto" }}
        />
      </Modal>
    </div>
  );
};

export default InvoiceTable;
