import { Table, Image } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PaymentTable = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE}/api/pastevent-name-master/`)
      .then((res) => {
        const pastEvents = res.data.filter((event) =>
          new Date(event.date_to) < new Date()
        );
        setEvents(pastEvents);
      })
      .catch((error) => console.error("Error fetching past events:", error));
  }, []);

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
      render: (venue) => {
        try {
          const parsedVenue = JSON.parse(venue);
          return parsedVenue.address || "N/A";
        } catch (e) {
          return "N/A";
        }
      },
    },
    {
      title: "Club",
      dataIndex: "club_name",
      render: (club_name) => club_name || "N/A",
    },
    {
      title: "Event Image", // Add new column for the image
      dataIndex: "display_photo",
      key: "display_photo",
      render: (photo) => {
        const imageUrl = `${process.env.REACT_APP_BASE}${photo}`;
        return photo ? (
          <Image
            width={80}
            height={40}
            src={imageUrl}
            alt="Event"
            style={{
              borderRadius: "20%",
              cursor: "pointer",
            }}
            preview={{ src: imageUrl }} // Enable image preview on click
          />
        ) : (
          "No Image"
        );
      },
    },
  ];

  return (
    <div className="col-md-12 d-flex">
      <div className="card card-table flex-fill">
        <div className="card-header">
          <h3 className="card-title mb-0">Past Events</h3>
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
    </div>
  );
};

export default PaymentTable;
