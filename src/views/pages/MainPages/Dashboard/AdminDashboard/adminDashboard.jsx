import React, { useEffect, useState } from "react";
import axios from "axios";
import Charts from "./charts";
import Reports from "./Reports";
import Statistics from "./statistics";
import InvoiceTable from "./invoiceTable";
import PaymentTable from "./paymentTable";
import ClientTable from "./clientTable";
import RecentTable from "./recentTable";
import Breadcrumbs from "../../../../../components/Breadcrumbs";

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalStudents: "N/A",
    totalStaffs: "N/A",
    totalCourses: "N/A",
    totalClubs: "N/A",
    totalCommittees: "N/A",
    totalResolutions: "N/A",
    totalEvents: "N/A",
    pastEvents: "N/A",
    upcomingEvents: "N/A",
    notices: "N/A",   
  });

  const icons = {
    totalStudents: "fa-users",
    totalStaffs: "fa-user-tie",
    totalCourses: "fa-book",
    totalClubs: "fa-futbol",
    totalCommittees: "fa-users-cog",
    totalResolutions: "fa-scroll",
    totalEvents: "fa-calendar-alt",
    pastEvents: "fa-calendar-check",
    upcomingEvents: "fa-calendar-plus",
    notices: "fa-bullhorn",   
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const baseApi = process.env.REACT_APP_BASE;

        const endpoints = {
          totalStudents: `${baseApi}/api/student_list/`,
          totalStaffs: `${baseApi}/api/staff_list/`,
          totalCourses: `${baseApi}/api/course-master/`,
          totalClubs: `${baseApi}/api/club_member_master/`,
          totalCommittees: `${baseApi}/api/committee_type/`,
          totalResolutions: `${baseApi}/api/resolutions/`,
          totalEvents: `${baseApi}/api/events-name-master/`,
          notices: `${baseApi}/api/notices-news/`,  
        };

        const metricPromises = Object.keys(endpoints).map(async (key) => {
          try {
            const response = await axios.get(endpoints[key]);
            if (Array.isArray(response.data)) {
              return { [key]: response.data.length };
            } else if (response.data && response.data.count !== undefined) {
              return { [key]: response.data.count };
            }
            return { [key]: "N/A" };
          } catch (error) {
            console.error(`Error fetching ${key}:`, error);
            return { [key]: "N/A" };
          }
        });

        const results = await Promise.all(metricPromises);
        const updatedMetrics = results.reduce(
          (acc, curr) => ({ ...acc, ...curr }),
          {}
        );
        setMetrics(updatedMetrics);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs maintitle="Welcome Admin!" title="Dashboard" />
          {/* /Page Header */}
          <div className="row">
            {Object.entries(metrics).map(([key, value]) => (
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3" key={key}>
                <div className="card dash-widget">
                  <div className="card-body">
                    <span className={`dash-widget-icon fa ${icons[key]}`} />
                    <div className="dash-widget-info">
                      <h3>{value}</h3>
                      <span>
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* /Charts */}
          <Charts />
          {/* /Charts */}
          {/* <Reports /> */}
          <Statistics />
          <div className="row">
            <InvoiceTable />
            <PaymentTable />
          </div>

          <div className="row">
            <ClientTable />
            <RecentTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
