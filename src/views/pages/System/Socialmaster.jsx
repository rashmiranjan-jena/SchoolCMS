import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AddSocialmaster from "../../../components/modelpopup/AddSocialmaster";
import DeleteModal from "../../../components/modelpopup/DeleteModal";

const Socialmaster = () => {
  const [users, setUsers] = useState([]);

  // Dummy data
  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        SocialName: "Facebook",
        Icon: "fa-facebook",
        URL: "https://www.facebook.com",
        status: "Unpublish",
      },
      {
        id: 2,
        SocialName: "Twitter",
        Icon: "fa-twitter",
        URL: "https://www.twitter.com",
        status: "Publish",
      },
      {
        id: 3,
        SocialName: "LinkedIn",
        Icon: "fa-linkedin",
        URL: "https://www.linkedin.com",
        status: "Unpublish",
      },
      {
        id: 4,
        SocialName: "Instagram",
        Icon: "fa-instagram",
        URL: "https://www.instagram.com",
        status: "Publish",
      },
    ];
    setUsers(dummyData);
  }, []);

  // Handle status change (Publish/Unpublish)
  const handleStatusChange = (id, newStatus) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
  };

  const userElements = users.map((user, index) => ({
    key: index,
    id: user.id,
    SocialName: user.SocialName,
    Icon: user.Icon,
    URL: user.URL,
    status: user.status,
  }));

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Social Name",
      dataIndex: "SocialName",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.SocialName.localeCompare(b.SocialName),
    },
    {
      title: "Icon",
      dataIndex: "Icon",
      render: (text) => <i className={`fa ${text}`} />,
    },
    {
      title: "URL",
      dataIndex: "URL",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <div className="dropdown action-label">
          <Link
            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
            to="#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className={
                text === "Unpublish"
                  ? "far fa-dot-circle text-danger"
                  : "far fa-dot-circle text-success"
              }
            />{" "}
            {text}
          </Link>
          <div className="dropdown-menu">
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => handleStatusChange(record.id, "Publish")}
            >
              <i className="far fa-dot-circle text-success" /> Publish
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => handleStatusChange(record.id, "Unpublish")}
            >
              <i className="far fa-dot-circle text-danger" /> Unpublish
            </Link>
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <div className="action-icons">
          <Link to="#" className="action-icon" title="View">
            <i className="fa fa-eye m-r-5" style={{ color: "#FF902F", fontSize: "13px" }}></i>
          </Link>
          <Link
            to="#"
            className="action-icon"
            data-bs-toggle="modal"
            data-bs-target="#edit_calenderyear"
            title="Edit"
          >
            <i className="fa fa-pencil m-r-5 m-lg-4" style={{ color: "blue", fontSize: "13px" }}></i>
          </Link>
          <Link
            to="#"
            className="action-icon"
            data-bs-toggle="modal"
            data-bs-target="#edit_calenderyear"
            title="Delete"
          >
            <i className="fa fa-trash m-r-5 m-lg-4" style={{ color: "red", fontSize: "13px" }}></i>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Social"
          title="Social"
          subtitle="Social Master"
          modal="#add_Social"
          name="Social Master"
          Linkname="/AddSocial"
        />

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={userElements}
                className="table-striped"
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      </div>
      <AddSocialmaster />
      <DeleteModal Name="Delete Social Record" />
    </div>
  );
};

export default Socialmaster;
