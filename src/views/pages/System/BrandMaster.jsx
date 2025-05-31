import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AddBrandMaster from "../../../components/modelpopup/AddBrandMaster";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import { get,update,_delete } from "../../../utils/intercepter";
import Swal from 'sweetalert2';
const BrandMaster = () => {
  const [data,setData] = useState([])
const   imgURL = process.env.REACT_APP_BASE;

  const getBrandData = async () =>{
    const result = await get('brand-master/');
    setData(result)
  }

  useEffect(() => {
    getBrandData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const status = {status:newStatus}
    try {
      await update(`brand-master/?brand_master_id=`,id,status);
      getBrandData()
      Swal.fire("Updated!", "Status Changed.", "success");
    } catch (error) {
      Swal.fire("Error!", "There was an error while changing the status.", "error");
    }   
  };

  const handleDelete = async (id) => {
    const { value: confirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the record permanently. Do you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (confirmed) {
      const { value: finalConfirmed } = await Swal.fire({
        title: "Final Confirmation",
        text: "Please check the box to confirm you want to delete this record.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        input: 'checkbox',
        inputPlaceholder: 'I understand the consequences of deleting this record.',
        inputValidator: (result) => {
          if (!result) {
            return "You must confirm to delete.";
          }
        },
      });

      if (finalConfirmed) {
        try {
          const response = await _delete(`brand-master/?brand_master_id=`,id);
          if (response.status === 204) {
            Swal.fire("Deleted!", "The Brand Master has been deleted.", "success");
            getBrandData()
          } else {
            Swal.fire("Error!", "Failed to delete the Brand Master.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the Brand Master.", "error");
        }
      }
    }
  };
  const columns = [
    {
      title: "SL No.",
      dataIndex: "brand_master_id",
      render: (text, record, index) => index + 1, 
      sorter: (a, b) => a.brand_master_id - b.brand_master_id,
    },
    
    {
      title: "Header Logo",
      dataIndex: "header_logo",
      key: "header_logo",
      render: (header_logo) => <img src={`${imgURL}${header_logo}`} alt="Header Logo" style={{ width: "50px", height: "50px" }} />,
    },
    
    {
      title: "Footer Logo",
      dataIndex: "footer_logo",
      key: "footer_logo",
      render: (footer_logo) => <img src={`${imgURL}${footer_logo}`} alt="footer Logo" style={{ width: "50px", height: "50px" }} />,
    },
    {
      title: "FavIcon",
      dataIndex: "favicon",
      key: "favicon",
      render: (favicon) => <img src={`${imgURL}${favicon}`} alt="FavIcon" style={{ width: "50px", height: "50px" }} />,
    },
    {
      title: "Header Image",
      dataIndex: "header",
      key: "header",
      render: (header) => <img src={`${imgURL}${header}`} alt="Header" style={{ width: "50px", height: "50px" }} />,
    },
    {
      title: "Footer Image",
      dataIndex: "footer",
      key: "footer",
      render: (footer) => <img src={`${imgURL}${footer}`} alt="Footer" style={{ width: "50px", height: "50px" }} />,
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
              className={text === "Unpublished" ? "far fa-dot-circle text-danger" : "far fa-dot-circle text-success"}
            />{" "}
            {text}
          </Link>
          <div className="dropdown-menu">
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => handleStatusChange(record.brand_master_id, "Published")}
            >
              <i className="far fa-dot-circle text-success" /> Publish
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => handleStatusChange(record.brand_master_id, "Unpublished")}
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
          {/* <Link to="#" className="action-icon" title="View">
            <i className="fa fa-eye m-r-5" style={{ color: "#FF902F", fontSize: "13px" }}></i>
          </Link> */}
          <Link
            to="#"
            className="action-icon"
            // data-bs-toggle="modal"
            // data-bs-target="#edit_calenderyear"
            title="Edit"
          >
            <i className="fa fa-pencil m-r-5 m-lg-4" style={{ color: "blue", fontSize: "13px" }}></i>
          </Link>
          <Link
            to="#"
            className="action-icon"
            title="delete"
            onClick={()=>handleDelete(record.brand_master_id)}
          >
            <i className="fa fa-trash m-r-5 m-lg-4" style={{ color: "red", fontSize: "13px" }}></i>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Brand"
            title="Brand"
            subtitle="Brand Master"
            modal="#add_Brand"
            name="Brand Master"
            Linkname="/AddBrandMaster"
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  className="table-striped"
                  rowKey={(record) => record.brand_master_id}
                />
              </div>
            </div>
          </div>
        </div>
        <AddBrandMaster />
        <DeleteModal Name="Delete Organisation" />
      </div>
    </>
  );
};

export default BrandMaster;
