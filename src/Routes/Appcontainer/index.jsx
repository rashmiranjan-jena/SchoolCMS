/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import Header from "../../views/layout/Header";
import Sidebar from "../../views/layout/Sidebar";
import ChatSidebar from "../../components/Mainpages/chatSidebar";
import ComponentSidebar from "../../components/ComponentSidebar";
import EmailSidebar from "../../components/Mainpages/emailSidebar";
import SettingsSidebar from "../../components/SettingsSidebar";

import BasicInputs from "../../views/pages/Ui_Interface/Forms/BasicInputs";
import InputGroups from "../../views/pages/Ui_Interface/Forms/InputGroups";
import HorizontalForm from "../../views/pages/Ui_Interface/Forms/HorizontalForm";
import VerticalForm from "../../views/pages/Ui_Interface/Forms/VerticalForm";
import Formmask from "../../views/pages/Ui_Interface/Forms/Formmask";
import Formvalidation from "../../views/pages/Ui_Interface/Forms/Formvalidation";
import TablesBasic from "../../views/pages/Ui_Interface/Tables/TablesBasic";
import DataTables from "../../views/pages/Ui_Interface/Tables/DataTables";
import PerformanceIndicator from "../../views/pages/Performance/Performance/PerformanceIndicator";
import PerformanceReview from "../../views/pages/Performance/Performance/PerformanceReview";
import PerformanceAppraisal from "../../views/pages/Performance/Performance/PerformanceAppraisal";
import GoalTracking from "../../views/pages/Performance/Goals/GoalTracking";
import GoalType from "../../views/pages/Performance/Goals/GoalType";
import Trainers from "../../views/pages/Performance/Training/Trainers";
import Training from "../../views/pages/Performance/Training/Training";
import TrainingType from "../../views/pages/Performance/Training/TrainingType";

// import EmployeeProfile from "../../views/pages/Pages/profile/employeeprofile";
import AdminDashboard from "../../views/pages/MainPages/Dashboard/AdminDashboard/adminDashboard";
import EmployeeDashboard from "../../views/pages/MainPages/Dashboard/EmployeeDashboard";
import Chat from "../../views/pages/MainPages/Apps/chat";
import VoiceCall from "../../views/pages/MainPages/Apps/calls/voiceCall";
import VideoCall from "../../views/pages/MainPages/Apps/calls/VideoCall";
import Outgoing from "../../views/pages/MainPages/Apps/calls/outgoingCall";
import IncomingCall from "../../views/pages/MainPages/Apps/calls/incomingCall";
import Calendar from "../../views/pages/MainPages/Apps/calendar";
import Contacts from "../../views/pages/MainPages/Apps/contacts";
import Email from "../../views/pages/MainPages/Apps/Email";
import FileManager from "../../views/pages/MainPages/Apps/FileManager";
import Compose from "../../views/pages/MainPages/Apps/Email/compose";
import Estimates from "../../views/pages/HR/Sales/Estimates";
import CreateEstimate from "../../views/pages/HR/Sales/Estimates/createEstimate";
import EditEstimate from "../../views/pages/HR/Sales/Estimates/EditEstimate";
import Invoices from "../../views/pages/HR/Sales/Invoices/Index";
import CreateInvoice from "../../views/pages/HR/Sales/Invoices/createInvoice";
import EditInvoice from "../../views/pages/HR/Sales/Invoices/editInvoice";
import InvoiceView from "../../views/pages/HR/Sales/Invoices/invoiceView";
import Payments from "../../views/pages/HR/Sales/payments";
import Promotion from "../../views/pages/Performance/Promotion";
import Resignation from "../../views/pages/Performance/Resignation";
import Termination from "../../views/pages/Performance/Termination";
import Components from "../../views/pages/Ui_Interface/Components/Components";
import Settings from "../../views/pages/Administration/Settings/Settings";
import Localization from "../../views/pages/Administration/Settings/Localization";
import ThemeSettings from "../../views/pages/Administration/Settings/ThemeSettings";
import RolesPermissions from "../../views/pages/Administration/Settings/RolesPermissions";
import EmailSettings from "../../views/pages/Administration/Settings/EmailSettings";
import PerformanceSetting from "../../views/pages/Administration/Settings/Performance/PerformanceSetting";
import ApprovalSetting from "../../views/pages/Administration/Settings/ApprovalSetting";
import InvoiceSettings from "../../views/pages/Administration/Settings/InvoiceSettings";
import SalarySettings from "../../views/pages/Administration/Settings/SalarySettings";
import NotificationSettings from "../../views/pages/Administration/Settings/NotificationSettings";
import LeaveType from "../../views/pages/Administration/Settings/LeaveType";
import ToxboxSetting from "../../views/pages/Administration/Settings/ToxboxSetting";
import CronSetting from "../../views/pages/Administration/Settings/CronSetting";
import AllEmpoyee from "../../views/pages/Employees/AllEmpoyee";
import Holidays from "../../views/pages/Employees/Holidays";
import AdminLeave from "../../views/pages/Employees/AdminLeave";
import EmployeeLeave from "../../views/pages/Employees/EmployeeLeave";
import LeaveSettings from "../../views/pages/Employees/LeaveSetting";
import AttendenceAdmin from "../../views/pages/Employees/Attendenceadmin";
import AttendanceEmployee from "../../views/pages/Employees/AttendenceEmployee";
import Department from "../../views/pages/Employees/Department";
import Designation from "../../views/pages/Employees/Designation";
import TimeSheet from "../../views/pages/Employees/TimeSheet";
import ShiftScheduling from "../../views/pages/Employees/ShiftandSchedule";
import ShiftList from "../../views/pages/Employees/ShiftList";
import OverTime from "../../views/pages/Employees/OverTime";
import Clients from "../../views/pages/Employees/Clients";
import Project from "../../views/pages/Employees/Projects/Project";
import ClientList from "../../views/pages/Employees/ClientList";
import Tasks from "../../views/pages/Employees/Projects/Tasks";
import { SidebarProject } from "../../views/pages/Employees/Projects/SidebarProject";
import TaskBoard from "../../views/pages/Employees/Projects/TaskBoard";
import Leads from "../../views/pages/Employees/Leads";
import Ticket from "../../views/pages/Employees/Ticket";
import ClientProfile from "../../views/pages/Profile/ClientProfile";
import Profile from "../../views/pages/Profile/Profile";
import Subscribtions from "../../views/pages/Subscribtions/Subscribtions";
import SubscribedCompany from "../../views/pages/Subscribtions/SubscribedCompany";
import SubscribtionsCompany from "../../views/pages/Subscribtions/SubscribtionsCompany";
import Search from "../../views/pages/Pages/Search/Search";
import Faq from "../../views/pages/Pages/Faq";
import Terms from "../../views/pages/Pages/Terms";
import PrivacyPolicy from "../../views/pages/Pages/PrivacyPolicy";
import BlankPage from "../../views/pages/Pages/BlankPage";
import KnowledgeBase from "../../views/pages/Administration/Knowledgebase/KnowledgeBase";
import KnowledgeBaseView from "../../views/pages/Administration/Knowledgebase/KnowledgeBaseView";
import EmployeeList from "../../views/pages/Employees/EmployeeList";
import Expenses from "../../views/pages/HR/Sales/Expenses";
import Activities from "../../views/pages/Administration/Activities";
import ProvidentFund from "../../views/pages/HR/Sales/ProvidentFund";
import Taxes from "../../views/pages/HR/Sales/Taxes";
import Categories from "../../views/pages/HR/Accounting/Categories";
import SubCategory from "../../views/pages/HR/Accounting/Categories/subCategory";
import Budgets from "../../views/pages/HR/Accounting/Budgets.jsx";
import BudgetExpenses from "../../views/pages/HR/Accounting/BudgetExpenses";
import BudgetRevenues from "../../views/pages/HR/Accounting/BudgetRevenue";
import EmployeeSalary from "../../views/pages/HR/Payroll/EmployeeSalary.jsx";
import PaySlip from "../../views/pages/HR/Payroll/Payslip";
import PayrollItems from "../../views/pages/HR/Payroll/PayrollItems.jsx";
import Policies from "../../views/pages/HR/Policies";
import ExpenseReport from "../../views/pages/HR/Reports/ExpenseReport";
import InvoiceReport from "../../views/pages/HR/Reports/InvoiceReport";
import PaymentReport from "../../views/pages/HR/Reports/PaymentReport";
import ProjectReport from "../../views/pages/HR/Reports/ProjectReport";
import TaskReport from "../../views/pages/HR/Reports/TaskReport";
import UserReport from "../../views/pages/HR/Reports/UserReport";
import EmployeeReport from "../../views/pages/HR/Reports/EmployeeReports";
import PaySlipReports from "../../views/pages/HR/Reports/PaySlipReports";
import AttendanceReport from "../../views/pages/HR/Reports/AttendanceReport";
import LeaveReport from "../../views/pages/HR/Reports/LeaveReport";
import DailyReports from "../../views/pages/HR/Reports/DailyReports";
import Assets from "../../views/pages/Administration/Assets";
import UserDashboard from "../../views/pages/Administration/Jobs/UserJob/UserDashboard";
import UserAllJobs from "../../views/pages/Administration/Jobs/UserJob/UserAllJobs";
import SavedJobs from "../../views/pages/Administration/Jobs/UserJob/SavedJobs";
import AppliedJobs from "../../views/pages/Administration/Jobs/UserJob/AppliedJobs";
import Interviewing from "../../views/pages/Administration/Jobs/UserJob/Interviewing";
import JobAptitude from "../../views/pages/Administration/Jobs/UserJob/JobAptitude";
import Questions from "../../views/pages/Administration/Jobs/UserJob/Questions";
import UserOfferedJobs from "../../views/pages/Administration/Jobs/UserJob/UserOfferedJobs";
import VisitedJobs from "../../views/pages/Administration/Jobs/UserJob/VisitedJobs";
import ArchivedJobs from "../../views/pages/Administration/Jobs/UserJob/ArchivedJobs";
import JobsDashboard from "../../views/pages/Administration/Jobs/JobDashboard";
import ManageJobs from "../../views/pages/Administration/Jobs/ManageJobs";
import ManageJobResumes from "../../views/pages/Administration/Jobs/ManageResumes";
import ShortListCandidates from "../../views/pages/Administration/Jobs/ShortListCandidates";
import InterviewingQuestions from "../../views/pages/Administration/Jobs/InterviewingQuestions";
import OfferApprovals from "../../views/pages/Administration/Jobs/OfferApprovals";
import ExperienceLevel from "../../views/pages/Administration/Jobs/ExperienceLevel";
import CanditatesList from "../../views/pages/Administration/Jobs/CanditatesList";
import ScheduleTiming from "../../views/pages/Administration/Jobs/ScheduleTiming.jsx";
import AptitudeResults from "../../views/pages/Administration/Jobs/AptitudeResults";
import Users from "../../views/pages/Administration/Users";
import Commitemember from "../../views/pages/Administration/Commitemember/Commitemember.jsx";
import Stafflist from "../../views/pages/Administration/Stafflist/Stafflist.jsx";
import Stafftypemaster from "../../views/pages/Administration/Stafftypemaster/Stafftypemaster.jsx";
import Principallist from "../../views/pages/Administration/Principallist/Principallist.jsx";
import Presidentlist from "../../views/pages/Administration/Presidentlist/Presidentlist.jsx";
import Studentlist from "../../views/pages/Administration/Studentlist/Studentlist.jsx";
import ProjectList from "../../views/pages/Employees/Projects/ProjectList";
import ProjectView from "../../views/pages/Employees/Projects/ProjectView";
import OffCanvas from "../../components/OffCanvas";
import FormSelectTwo from "../../views/pages/Ui_Interface/Forms/FormSelectTwo.jsx";
import FileUpload from "../../views/pages/Ui_Interface/Forms/FileUpload.jsx";
import Ribbon from "../../views/pages/Ui_Interface/Elements/Ribbon.jsx";
import Clipboard from "../../views/pages/Ui_Interface/Elements/Clipboard.jsx";
import Dragdrop from "../../views/pages/Ui_Interface/Elements/Dragdrop.jsx";
import Ratings from "../../views/pages/Ui_Interface/Elements/Rating.jsx";
import Texteditor from "../../views/pages/Ui_Interface/Elements/Texteditor.jsx";
import Counter from "../../views/pages/Ui_Interface/Elements/Counter.jsx";
import Scrollbar from "../../views/pages/Ui_Interface/Elements/Scrollbar.jsx";
import Notification from "../../views/pages/Ui_Interface/Elements/Notification.jsx";
import Stickynotes from "../../views/pages/Ui_Interface/Elements/Stickynote.jsx";
import Timeline from "../../views/pages/Ui_Interface/Elements/Timeline.jsx";
import Formwizard from "../../views/pages/Ui_Interface/Elements/Formwizard.jsx";
import Apexchart from "../../views/pages/Ui_Interface/Charts/Apexcharts.jsx";
import ChartJs from "../../views/pages/Ui_Interface/Charts/Chartjs.jsx";
import MorrisCharts from "../../views/pages/Ui_Interface/Charts/Morrischarts.jsx";
import FlotCharts from "../../views/pages/Ui_Interface/Charts/Flotcharts.jsx";
import PeityCharts from "../../views/pages/Ui_Interface/Charts/Peitycharts.jsx";
import C3Charts from "../../views/pages/Ui_Interface/Charts/C3charts.jsx";
import FontAwesomeicons from "../../views/pages/Ui_Interface/Icons/Fontawesomeicons.jsx";
import FeatherIcons from "../../views/pages/Ui_Interface/Icons/Feathericons.jsx";
import IonicIcon from "../../views/pages/Ui_Interface/Icons/Ionicicons.jsx";
import MaterialIcons from "../../views/pages/Ui_Interface/Icons/Materialicons.jsx";
import Pe7Icon from "../../views/pages/Ui_Interface/Icons/Pe7icons.jsx";
import SimpleLine from "../../views/pages/Ui_Interface/Icons/Simpleicons.jsx";
import Themifyicons from "../../views/pages/Ui_Interface/Icons/Themifyicons.jsx";
import WeatherIcons from "../../views/pages/Ui_Interface/Icons/Weathericons.jsx";
import Typicons from "../../views/pages/Ui_Interface/Icons/Typicons.jsx";
import FlagIcons from "../../views/pages/Ui_Interface/Icons/Flagicons.jsx";
import ContactList from "../../views/pages/Crm/ContactList.jsx";
import ContactGrid from "../../views/pages/Crm/ContactGrid.jsx";
import DealsDashboard from "../../views/pages/MainPages/Dashboard/DealsDashboard/index.jsx";
import LeadsDashboard from "../../views/pages/MainPages/Dashboard/LeadsDashboard/index.jsx";
import ComingSoon from "../../views/pages/Pages/ComingSoon.jsx";
import TicketDetails from "../../views/pages/Employees/TicketDetails.jsx";
import Companies from "../../views/pages/Crm/companies.jsx";
import ContactDetails from "../../views/pages/Crm/ContactDetails.jsx";
import LeadsList from "../../views/pages/Crm/LeadsList.jsx";
import LeadsKanban from "../../views/pages/Crm/LeadsKanban.jsx";
import LeadsDetails from "../../views/pages/Crm/LeadsDetails.jsx";
import PipeLine from "../../views/pages/Crm/PipeLine.jsx";
import CompaniesGrid from "../../views/pages/Crm/CompaniesGrid.jsx";
import CompanyDetails from "../../views/pages/Crm/CompanyDetails.jsx";
import Deals from "../../views/pages/Crm/Deals.jsx";
import DealsKanban from "../../views/pages/Crm/DealsKanban.jsx";
import Analytics from "../../views/pages/Crm/Analytics.jsx";
import RecentFiles from "../../views/pages/MainPages/Apps/FileManager/recentFiles.jsx";
import EmailContent from "../../views/pages/MainPages/Apps/Email/emailContent.jsx";
import EmailView from "../../views/pages/MainPages/Apps/Email/emailView.jsx";
import DealsDetails from "../../views/pages/Crm/DealsDetails.jsx";

import CampaignCreation from "../../views/pages/Campaign/campaigncreation.jsx";
import AudienceSegment from "../../views/pages/Campaign/audiencesegment.jsx";
import MultiChannelCreation from "../../views/pages/Campaign/multichannelcreations.jsx";
import TemplateLibrary from "../../views/pages/Campaign/templatelibrary.jsx";
import ScheduleandAutomation from "../../views/pages/Campaign/scheduleandautomation.jsx";
import AddCampaign from "../../views/pages/Campaign/AddCampaign.jsx";
import AddAudience from "../../components/modelpopup/AddAudience.jsx";
import AddAudienceTab from "../../components/modelpopup/AddAudienceTab.jsx";

import CalendarYear from "../../views/pages/System/CalendarYear.jsx";
import OrganisationMaster from "../../views/pages/System/OrganisationMaster.jsx";
import BrandMaster from "../../views/pages/System/BrandMaster.jsx";
import Socialmaster from "../../views/pages/System/Socialmaster.jsx";
// import PresidentList from "../../views/pages/System/PresidentList.jsx";
// import CommitteeType from "../../views/pages/System/CommitteeType.jsx";
// import CommitteeMembers from "../../views/pages/System/CommitteeMembers.jsx";
// import Commitemember from "../../views/pages/Administration/Commitemember/Commitemember.jsx";
// import Reselections from "../../views/pages/System/Reselections.jsx";
import StreamMaster from "../../views/pages/System/StreamMaster.jsx";
import ClassMaster from "../../views/pages/System/ClassMaster.jsx";
import SubjectMaster from "../../views/pages/System/SubjectMaster.jsx";

import AddBrand from "../../views/pages/System/AddBrand.jsx";

import Clubmember from "../../views/pages/Club/ClubMember/Clubmember.jsx";
import Clubname from "../../views/pages/Club/Clubname/Clubname.jsx";

import Award from "../../views/pages/Achivers/Award/Award.jsx";
import Competitionnamemaster from "../../views/pages/Achivers/Competitionnamemaster/Competitionname.jsx";
import Examnamemaster from "../../views/pages/Achivers/Examnamemaster/Examname.jsx";
import Resultmaster from "../../views/pages/Achivers/Resultmaster/Result.jsx";

import Resolution from "../../views/pages/Resolution/Resolutiontable/Resolution.jsx";

import Blogcategory from "../../views/pages/Blog/Blogcategory/Blogcategory.jsx";
import Blogmaster from "../../views/pages/Blog/Blogmaster/Blogmaster.jsx";


import { elements } from "chart.js";
import Pollnamemaster from "../../views/pages/Polls/Pollnamemaster/Pollnamemaster.jsx";
import Pollmaster from "../../views/pages/Polls/Pollmaster/Pollmaster.jsx";
import Admission from "../../views/pages/Admission/Admissionform/Admission.jsx";
import Importantlink from "../../views/pages/Link/Importantlink/Importantlink.jsx";
import ContactUs from "../../views/pages/Contact/ContactUs/ContactUs.jsx";
import Subscribtion from "../../views/pages/Subscribe/Subscribtion/Subscribtion.jsx";
import Testimonials from "../../views/pages/Pages/Testimonial/Testimonials/Testimonials.jsx";
import AboutUs from "../../views/pages/About/AboutUs/AboutUs.jsx";
import MenuItem from "../../views/pages/Menu/MenuItem/MenuItem.jsx";
import Footermenu from "../../views/pages/Menu/Footer/Footermenu.jsx";
import Megamenu from "../../views/pages/Menu/Megamenu/Megamenu.jsx";
import FooterMega from "../../views/pages/Menu/FooterMega/FooterMega.jsx";
import Submenudata from "../../views/pages/Menu/Submenu/Submenudata.jsx";
import FooterMainmenu from "../../views/pages/Menu/Footermain/FooterMainmenu.jsx";
import FooterSubmenu from "../../views/pages/Menu/FooterSubmenu/FooterSubmenu.jsx";
import StatementMaster from "../../views/pages/System/StatementMaster.jsx";
import StatsMaster from "../../views/pages/System/StatsMaster.jsx";
import CourseMaster from "../../views/pages/System/CourseMaster.jsx";
import EventNameMaster from "../../views/pages/Evens/EventNameMaster.jsx";
import EventCategoryMaster from "../../views/pages/Evens/EventCategoryMaster.jsx";
import EventMaster from "../../views/pages/Evens/EventMaster.jsx";
import Noticeandnews from "../../views/pages/Newsandevent/Notice/Noticeandnews.jsx";
import Banner from "../../views/pages/Banner/Banner.jsx";
import Feehead from "../../views/pages/Feehead/Feehead.jsx";
import Infrastructure from "../../views/pages/Infrastructure/Infrastructure.jsx";
import OurPartner  from "../../components/Our Partner/OurPartner.jsx";
import ProductC from "../../components/Product/ProductC.jsx";
import MainBanner from "../../components/Product/MainBanner.jsx";
import MainBanner_S from "../../components/Service-S/MainBanner_S.jsx";
import Service from "../../components/Service-S/Service.jsx";






const AppContainer = () => {
  useEffect(() => {
    localStorage.setItem("colorschema", "orange");
    localStorage.setItem("layout", "vertical");
    localStorage.setItem("layoutwidth", "fixed");
    localStorage.setItem("layoutpos", "fluid");
    localStorage.setItem("topbartheme", "light");
    localStorage.setItem("layoutSized", "lg");
    localStorage.setItem("layoutStyling", "default");
    localStorage.setItem("layoutSidebarStyle", "dark");
  }, []);

  const routingObjects = [
    {
      id: 1,
      path: "form-basic-inputs",
      element: <BasicInputs />,
    },
    {
      id: 2,
      path: "admin-dashboard",
      element: <AdminDashboard />,
    },
    {
      id: 3,
      path: "form-horizontal",
      element: <HorizontalForm />,
    },
    {
      id: 4,
      path: "form-vertical",
      element: <VerticalForm />,
    },
    {
      id: 5,
      path: "form-mask",
      element: <Formmask />,
    },
    {
      id: 6,
      path: "form-validation",
      element: <Formvalidation />,
    },
    {
      id: 7,
      path: "tables-basic",
      element: <TablesBasic />,
    },
    {
      id: 8,
      path: "data-tables",
      element: <DataTables />,
    },
    {
      id: 9,
      path: "performance-indicator",
      element: <PerformanceIndicator />,
    },
    {
      id: 10,
      path: "performance",
      element: <PerformanceReview />,
    },
    {
      id: 11,
      path: "performance-appraisal",
      element: <PerformanceAppraisal />,
    },
    {
      id: 12,
      path: "goal-tracking",
      element: <GoalTracking />,
    },
    {
      id: 13,
      path: "goal-type",
      element: <GoalType />,
    },
    {
      id: 14,
      path: "trainers",
      element: <Trainers />,
    },
    {
      id: 15,
      path: "training",
      element: <Training />,
    },
    {
      id: 16,
      path: "training-type",
      element: <TrainingType />,
    },
    {
      id: 17,
      path: "employee-dashboard",
      element: <EmployeeDashboard />,
    },
    {
      id: 18,
      path: "activities",
      element: <Activities />,
    },
    {
      id: 19,
      path: "form-input-groups",
      element: <InputGroups />,
    },
    // {
    //   id: 20,
    //   path: "profile",
    //   element: <EmployeeProfile />,
    // },
    {
      id: 21,
      path: "events",
      element: <Calendar />,
    },
    {
      id: 22,
      path: "contacts",
      element: <Contacts />,
    },

    {
      id: 23,
      path: "file-manager",
      element: <FileManager />,
    },
    {
      id: 24,
      path: "estimates",
      element: <Estimates />,
    },
    {
      id: 25,
      path: "create-estimate",
      element: <CreateEstimate />,
    },
    {
      id: 26,
      path: "edit-estimate",
      element: <EditEstimate />,
    },
    {
      id: 27,
      path: "invoices",
      element: <Invoices />,
    },
    {
      id: 28,
      path: "create-invoice",
      element: <CreateInvoice />,
    },
    {
      id: 29,
      path: "edit-invoice",
      element: <EditInvoice />,
    },
    {
      id: 30,
      path: "invoice-view",
      element: <InvoiceView />,
    },
    {
      id: 31,
      path: "payments",
      element: <Payments />,
    },
    {
      id: 32,
      path: "promotion",
      element: <Promotion />,
    },
    {
      id: 33,
      path: "resignation",
      element: <Resignation />,
    },
    {
      id: 34,
      path: "termination",
      element: <Termination />,
    },
    {
      id: 34,
      path: "employees",
      element: <AllEmpoyee />,
    },
    {
      id: 35,
      path: "holidays",
      element: <Holidays />,
    },
    {
      id: 36,
      path: "adminleaves",
      element: <AdminLeave />,
    },
    {
      id: 37,
      path: "leaves-employee",
      element: <EmployeeLeave />,
    },
    {
      id: 38,
      path: "leave-settings",
      element: <LeaveSettings />,
    },
    {
      id: 39,
      path: "adminattendance",
      element: <AttendenceAdmin />,
    },
    {
      id: 40,
      path: "attendance-employee",
      element: <AttendanceEmployee />,
    },
    {
      id: 41,
      path: "departments",
      element: <Department />,
    },
    {
      id: 42,
      path: "designations",
      element: <Designation />,
    },
    {
      id: 43,
      path: "timesheet",
      element: <TimeSheet />,
    },
    {
      id: 43,
      path: "shift-scheduling",
      element: <ShiftScheduling />,
    },
    {
      id: 44,
      path: "shift-list",
      element: <ShiftList />,
    },
    {
      id: 45,
      path: "overtime",
      element: <OverTime />,
    },
    {
      id: 46,
      path: "clients",
      element: <Clients />,
    },
    {
      id: 47,
      path: "projects",
      element: <Project />,
    },
    {
      id: 48,
      path: "clients-list",
      element: <ClientList />,
    },
    {
      id: 49,
      path: "task-board",
      element: <TaskBoard />,
    },
    {
      id: 50,
      path: "leads",
      element: <Leads />,
    },
    {
      id: 51,
      path: "tickets",
      element: <Ticket />,
    },
    {
      id: 52,
      path: "client-profile",
      element: <ClientProfile />,
    },
    {
      id: 53,
      path: "profile",
      element: <Profile />,
    },
    {
      id: 54,
      path: "subscriptions",
      element: <Subscribtions />,
    },
    {
      id: 55,
      path: "subscribed-companies",
      element: <SubscribedCompany />,
    },
    {
      id: 56,
      path: "subscriptions-company",
      element: <SubscribtionsCompany />,
    },
    {
      id: 57,
      path: "search",
      element: <Search />,
    },
    {
      id: 58,
      path: "faq",
      element: <Faq />,
    },
    {
      id: 59,
      path: "terms",
      element: <Terms />,
    },
    {
      id: 60,
      path: "terms",
      element: <Terms />,
    },
    {
      id: 61,
      path: "privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      id: 62,
      path: "blank-page",
      element: <BlankPage />,
    },
    {
      id: 63,
      path: "knowledgebase",
      element: <KnowledgeBase />,
    },
    {
      id: 64,
      path: "knowledgebase-view",
      element: <KnowledgeBaseView />,
    },
    {
      id: 64,
      path: "employees-list",
      element: <EmployeeList />,
    },
    {
      id: 65,
      path: "expenses",
      element: <Expenses />,
    },
    {
      id: 66,
      path: "provident-fund",
      element: <ProvidentFund />,
    },
    {
      id: 67,
      path: "taxes",
      element: <Taxes />,
    },
    {
      id: 68,
      path: "categories",
      element: <Categories />,
    },
    {
      id: 69,
      path: "sub-category",
      element: <SubCategory />,
    },
    {
      id: 70,
      path: "budgets",
      element: <Budgets />,
    },
    {
      id: 71,
      path: "budget-expenses",
      element: <BudgetExpenses />,
    },
    {
      id: 72,
      path: "budget-revenues",
      element: <BudgetRevenues />,
    },
    {
      id: 73,
      path: "salary-view",
      element: <PaySlip />,
    },
    {
      id: 74,
      path: "payroll-items",
      element: <PayrollItems />,
    },
    {
      id: 75,
      path: "policies",
      element: <Policies />,
    },
    {
      id: 76,
      path: "salary",
      element: <EmployeeSalary />,
    },
    {
      id: 77,
      path: "expense-reports",
      element: <ExpenseReport />,
    },
    {
      id: 78,
      path: "invoice-reports",
      element: <InvoiceReport />,
    },

    {
      id: 79,
      path: "payments-reports",
      element: <PaymentReport />,
    },
    {
      id: 80,
      path: "project-reports",
      element: <ProjectReport />,
    },
    {
      id: 81,
      path: "task-reports",
      element: <TaskReport />,
    },
    {
      id: 82,
      path: "user-reports",
      element: <UserReport />,
    },
    {
      id: 83,
      path: "employee-reports",
      element: <EmployeeReport />,
    },
    {
      id: 84,
      path: "payslip-reports",
      element: <PaySlipReports />,
    },
    {
      id: 85,
      path: "attendance-reports",
      element: <AttendanceReport />,
    },
    {
      id: 86,
      path: "attendance-reports",
      element: <AttendanceReport />,
    },

    {
      id: 87,
      path: "leave-reports",
      element: <LeaveReport />,
    },
    {
      id: 88,
      path: "daily-reports",
      element: <DailyReports />,
    },
    {
      id: 89,
      path: "project-list",
      element: <ProjectList />,
    },
    {
      id: 90,
      path: "project-view",
      element: <ProjectView />,
    },
    {
      id: 91,
      path: "form-select2",
      element: <FormSelectTwo />,
    },
    {
      id: 92,
      path: "file-upload",
      element: <FileUpload />,
    },
    {
      id: 93,
      path: "ribbon",
      element: <Ribbon />,
    },
    {
      id: 94,
      path: "clipboard",
      element: <Clipboard />,
    },
    {
      id: 95,
      path: "dragdrop",
      element: <Dragdrop />,
    },
    {
      id: 96,
      path: "rating",
      element: <Ratings />,
    },
    {
      id: 97,
      path: "text-editor",
      element: <Texteditor />,
    },
    {
      id: 98,
      path: "counter",
      element: <Counter />,
    },
    {
      id: 99,
      path: "scrollbar",
      element: <Scrollbar />,
    },
    {
      id: 100,
      path: "notification",
      element: <Notification />,
    },
    {
      id: 101,
      path: "stickynote",
      element: <Stickynotes />,
    },
    {
      id: 102,
      path: "timeline",
      element: <Timeline />,
    },

    {
      id: 103,
      path: "form-wizard",
      element: <Formwizard />,
    },
    {
      id: 104,
      path: "apex-charts",
      element: <Apexchart />,
    },
    {
      id: 105,
      path: "chartjs",
      element: <ChartJs />,
    },
    {
      id: 106,
      path: "morris-charts",
      element: <MorrisCharts />,
    },
    {
      id: 107,
      path: "flot-charts",
      element: <FlotCharts />,
    },
    {
      id: 108,
      path: "peity-charts",
      element: <PeityCharts />,
    },
    {
      id: 109,
      path: "charts-c3",
      element: <C3Charts />,
    },
    {
      id: 110,
      path: "fontawesome-icons",
      element: <FontAwesomeicons />,
    },
    {
      id: 111,
      path: "feather-icons",
      element: <FeatherIcons />,
    },
    {
      id: 112,
      path: "ionic-icons",
      element: <IonicIcon />,
    },
    {
      id: 113,
      path: "material-icons",
      element: <MaterialIcons />,
    },
    {
      id: 114,
      path: "pe7-icons",
      element: <Pe7Icon />,
    },
    {
      id: 115,
      path: "simpleline-icons",
      element: <SimpleLine />,
    },
    {
      id: 116,
      path: "themify-icons",
      element: <Themifyicons />,
    },
    {
      id: 117,
      path: "weather-icons",
      element: <WeatherIcons />,
    },
    {
      id: 118,
      path: "typicons",
      element: <Typicons />,
    },
    {
      id: 119,
      path: "flag-icons",
      element: <FlagIcons />,
    },
    {
      id: 120,
      path: "contact-list",
      element: <ContactList />,
    },
    {
      id: 121,
      path: "contact-grid",
      element: <ContactGrid />,
    },
    {
      id: 122,
      path: "deals-dashboard",
      element: <DealsDashboard />,
    },
    {
      id: 123,
      path: "leads-dashboard",
      element: <LeadsDashboard />,
    },
    {
      id: 124,
      path: "ticket-details",
      element: <TicketDetails />,
    },
    {
      id: 125,
      path: "companies",
      element: <Companies />,
    },
    {
      id: 126,
      path: "contact-details",
      element: <ContactDetails />,
    },
    {
      id: 126,
      path: "leads-list",
      element: <LeadsList />,
    },
    {
      id: 127,
      path: "leads-kanban",
      element: <LeadsKanban />,
    },
    {
      id: 128,
      path: "leads-details",
      element: <LeadsDetails />,
    },
    {
      id: 128,
      path: "pipeline",
      element: <PipeLine />,
    },
    {
      id: 129,
      path: "Companies-grid",
      element: <CompaniesGrid />,
    },
    {
      id: 130,
      path: "company-details",
      element: <CompanyDetails />,
    },
    {
      id: 131,
      path: "deals",
      element: <Deals />,
    },
    {
      id: 132,
      path: "deals-kanban",
      element: <DealsKanban />,
    },
    {
      id: 130,
      path: "analytics",
      element: <Analytics />,
    },
    {
      id: 131,
      path: "deals-details",
      element: <DealsDetails />,
    },
    {
      id: 132,
      path: "campaign-creation",
      element: <CampaignCreation />,
    },
    {
      id: 133,
      path: "audience-segment",
      element: <AudienceSegment />,
    },
    {
      id: 134,
      path: "multichannel-creations",
      element: <MultiChannelCreation />,
    },
    {
      id: 135,
      path: "template-library",
      element: <TemplateLibrary />,
    },

    {
      id: 136,
      path: "scheduleandautomation",
      element: <ScheduleandAutomation />,
    },
    {
      id: 137,
      path: "AddCampaign",
      element: <AddCampaign />,
    },
    {
      id: 138,
      path: "AddAudience",
      element: <AddAudience />,
    },
    {
      id: 139,
      path: "AddAudienceTab",
      element: <AddAudienceTab />,
    },
    {
      id: 140,
      path: "Calendar-Year",
      element: <CalendarYear />,
    },
    {
      id: 141,
      path: "Organisation-Master",
      element: <OrganisationMaster />,
    },
    {
      id: 142,
      path: "Brand-Master",
      element: <BrandMaster />,
    },
    {
      id: 143,
      path: "Social-Master",
      element: <Socialmaster/>,
    },
    // {
    //   id: 144,
    //   path: "President-List",
    //   element: <PresidentList />,
    // },
    // {
    //   id: 145,
    //   path: "Committee-Type",
    //   element: <CommitteeType />,
    // },
    {
      id: 146,
      path: "Stream-Master",
      element: <StreamMaster/>,
    },
    {
      id: 149,
      path: "Class-Master",
      element: <ClassMaster/>,
    },
    {
      id: 147,
      path: "Subject-Master",
      element: <SubjectMaster/>,
    },
    {
      id: 148,
      path: "Statement-Master",
      element: <StatementMaster />,
    },
    {
      id: 150,
      path: "Stats-Master",
      element: <StatsMaster />,
    },
    {
      id: 151,
      path: "Course-Master",
      element: <CourseMaster />,
    },
    // {
    //   id: 150,
    //   path: "Page-Names",
    //   element: <PageNames/>,
    // },
    // {
    //   id: 151,
    //   path: "Page-Manager",
    //   element: <PageManager/>,
    // },
    {
      id: 152,
      path: "Event-Name-Master",
      element: <EventNameMaster />,
    },
    {
      id: 153,
      path: "Event-Category-Master",
      element: <EventCategoryMaster />,
    },
    {
      id: 154,
      path: "Event-Master",
      element: <EventMaster />,
    },
    {  
      id:155,
      path:"Our-Partner",
      element:<OurPartner />
    },
    {  
      id:156,
      path:"MainBanner-P",
      element:<MainBanner />
    },
    {  
      id:157,
      path:"Product-P",
      element:<ProductC />
    },
    {  
      id:158,
      path:"MainBanner-S",
      element:<MainBanner_S />
    },
    {  
      id:159,
      path:"Service-S",
      element:<Service />
    }
    // {
    //   id: 147,
    //   path: "AddBrand",
    //   element: <AddBrand/>,
    // },
  ];

  const ChatRoutingeObjects = [
    {
      id: 1,
      path: "chat",
      element: <Chat />,
    },
    {
      id: 2,
      path: "voice-call",
      element: <VoiceCall />,
    },
    {
      id: 3,
      path: "video-call",
      element: <VideoCall />,
    },
    {
      id: 4,
      path: "outgoing-call",
      element: <Outgoing />,
    },
    {
      id: 5,
      path: "incoming-call",
      element: <IncomingCall />,
    },
  ];
  const ComponentsRoutingeObjects = [
    {
      id: 1,
      path: "components",
      element: <Components />,
    },
  ];

  const EmailRoutingeObjects = [
    {
      id: 1,
      path: "inbox",
      element: <Email />,
    },
    {
      id: 2,
      path: "compose",
      element: <Compose />,
    },
    {
      id: 3,
      path: "mail-view",
      element: <EmailView />,
    },
  ];
  const SettingsRoutingeObjects = [
    {
      id: 1,
      path: "company-settings",
      element: <Settings />,
    },
    {
      id: 2,
      path: "localization",
      element: <Localization />,
    },
    {
      id: 3,
      path: "theme-settings",
      element: <ThemeSettings />,
    },
    {
      id: 4,
      path: "roles-permissions",
      element: <RolesPermissions />,
    },
    {
      id: 5,
      path: "email-settings",
      element: <EmailSettings />,
    },
    {
      id: 6,
      path: "performance-setting",
      element: <PerformanceSetting />,
    },
    {
      id: 7,
      path: "approval-setting",
      element: <ApprovalSetting />,
    },
    {
      id: 8,
      path: "invoice-settings",
      element: <InvoiceSettings />,
    },
    {
      id: 9,
      path: "salary-settings",
      element: <SalarySettings />,
    },
    {
      id: 10,
      path: "notifications-settings",
      element: <NotificationSettings />,
    },
    {
      id: 11,
      path: "leave-type",
      element: <LeaveType />,
    },
    {
      id: 14,
      path: "toxbox-setting",
      element: <ToxboxSetting />,
    },
    {
      id: 15,
      path: "cron-setting",
      element: <CronSetting />,
    },
  ];
  const ProjectRoutingeObjects = [
    {
      id: 1,
      path: "tasks",
      element: <Tasks />,
    },
  ];

  const AdministrationRoutingeObjects = [
    {
      id: 1,
      path: "assets",
      element: <Assets />,
    },
    {
      id: 2,
      path: "user-dashboard",
      element: <UserDashboard />,
    },
    {
      id: 3,
      path: "user-all-jobs",
      element: <UserAllJobs />,
    },
    {
      id: 4,
      path: "saved-jobs",
      element: <SavedJobs />,
    },
    {
      id: 5,
      path: "applied-jobs",
      element: <AppliedJobs />,
    },

    {
      id: 6,
      path: "interviewing",
      element: <Interviewing />,
    },
    {
      id: 7,
      path: "job-aptitude",
      element: <JobAptitude />,
    },
    {
      id: 8,
      path: "questions",
      element: <Questions />,
    },
    {
      id: 9,
      path: "offered-jobs",
      element: <UserOfferedJobs />,
    },
    {
      id: 10,
      path: "visited-jobs",
      element: <VisitedJobs />,
    },
    {
      id: 11,
      path: "archived-jobs",
      element: <ArchivedJobs />,
    },
    {
      id: 12,
      path: "jobs-dashboard",
      element: <JobsDashboard />,
    },
    {
      id: 13,
      path: "jobs",
      element: <ManageJobs />,
    },
    {
      id: 14,
      path: "manage-resumes",
      element: <ManageJobResumes />,
    },
    {
      id: 15,
      path: "shortlist-candidates",
      element: <ShortListCandidates />,
    },
    {
      id: 16,
      path: "interview-questions",
      element: <InterviewingQuestions />,
    },
    {
      id: 17,
      path: "offer_approvals",
      element: <OfferApprovals />,
    },
    {
      id: 18,
      path: "experiance-level",
      element: <ExperienceLevel />,
    },
    {
      id: 19,
      path: "candidates",
      element: <CanditatesList />,
    },
    {
      id: 21,
      path: "schedule-timing",
      element: <ScheduleTiming />,
    },
    {
      id: 22,
      path: "apptitude-result",
      element: <AptitudeResults />,
    },
    {
      id: 23,
      path: "users",
      element: <Users />,
    },
    {
      id: 24,
      path: "Commitemember",
      element: <Commitemember />,
    },
    {
      id: 25,
      path: "Stafftypemaster",
      element: <Stafftypemaster />,
    },
    {
      id: 26,
      path: "Stafflist",
      element: <Stafflist />,
    },
    {
      id: 27,
      path: "Principallist",
      element: <Principallist />,
    },

    {
      id: 28,
      path: "Presidentlist",
      element: <Presidentlist />,
    },
    {
      id: 29,
      path: "Studentlist",
      element: <Studentlist />,
    },
    {
      id: 30,
      path: "clubName",
      element: <Clubname />,
    },
    {
      id: 31,
      path: "clubMember",
      element: <Clubmember />,
    },
    {
      id: 32,
      path: "award",
      element: <Award />,
    },
    {
      id: 33,
      path: "competitionnamemaster",
      element: <Competitionnamemaster />,
    },
    {
      id: 34,
      path: "examnamemaster",
      element: <Examnamemaster />,
    },
    {
      id: 35,
      path: "resultmaster",
      element: <Resultmaster />,
    },

    {
      id: 36,
      path: "resolutiontable",
      element: <Resolution />,
    },
    {
      id: 37,
      path: "blogmaster",
      element: <Blogmaster />
    },
    {
      id: 38,
      path: "blogcategory",
      element: <Blogcategory />,
    },
    {
      id:39,
      path: "noticeandnews",
      element: <Noticeandnews />
    },
    {
      id:40,
      path:"pollmaster",
      element:<Pollmaster />
    },
    {
      id:41,
      path:"pollnamemaster",
      element:<Pollnamemaster />
    },
    {
      id:42,
      path:"admission",
      element:<Admission />
    },
    {
      id:43,
      path:"importantlink",
      element:<Importantlink />
    },
    {
      id:44,
      path:"contactus",
      element:<ContactUs />
    },
    {
      id:44,
      path:"subscribtion",
      element:<Subscribtion />
    },
    {
      id:45,
      path:"testimonials",
      element:<Testimonials />
    },
    {
      id:46,
      path:"aboutus",
      element:<AboutUs />
    },
    {  
      id:47,
      path:"menumaster",
      element:<MenuItem />
    },
    {  
      id:48,
      path:"submenu",
      element:<Footermenu />
    },
    {  
      id:49,
      path:"megamenu",
      element:<Megamenu />
    },
    {  
      id:50,
      path:"footermega",
      element:<FooterMega />
    },
    {  
      id:51,
      path:"submenu",
      element:<Submenudata />
    },
    {  
      id:52,
      path:"footermenu",
      element:<FooterMainmenu />
    },
    {  
      id:52,
      path:"footersubmenu",
      element:<FooterSubmenu />
    },
    {  
      id:53,
      path:"banner",
      element:<Banner />
    },
    {  
      id:54,
      path:"feehead",
      element:<Feehead />
    },
     {  
      id:55,
      path:"infrastructure",
      element:<Infrastructure />
    },
     
    
    
  ];

  const SidebarLayout = () => (
    <>
      <Header />
      <Sidebar />
      <OffCanvas />
      <Outlet />
    </>
  );
  const AuthendicationLayout = () => <div></div>;
  const ChatSidebarLayout = () => (
    <>
      <Header />
      <ChatSidebar />
      <Outlet />
    </>
  );
  const ComponentSidebarLayout = () => (
    <>
      <Header />
      <ComponentSidebar />
      <Outlet />
    </>
  );
  const EmailSidebarLayout = () => (
    <>
      <Header />
      <EmailSidebar />
      <Outlet />
    </>
  );
  const SettingsSidebarLayout = () => (
    <>
      <Header />
      <SettingsSidebar />
      <Outlet />
    </>
  );
  const ProjectSidebarLayout = () => (
    <>
      <Header />
      <SidebarProject />
      <Outlet />
    </>
  );
  const ClubSidebarLayout = () => {
    <>
      <Header />
      <SidebarProject />
      <Outlet />
    </>;
  };

  const mobileResponsive = (event) => {
    const excludedHeader = document.querySelector(".header");
    const excludedSidebar = document.querySelector(".sidebar");

    if (
      !excludedHeader.contains(event.target) &&
      !excludedSidebar.contains(event.target)
    ) {
      document.body.classList.remove("slide-nav");
    }
  };

  return (
    <>
      <div className="main-wrapper" onClick={mobileResponsive}>
        <Routes>
          <Route path={"/*"} element={<SidebarLayout />}>
            {routingObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>

          <Route path={"/*"} element={<ChatSidebarLayout />}>
            {ChatRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<ComponentSidebarLayout />}>
            {ComponentsRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<EmailSidebarLayout />}>
            {EmailRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<SettingsSidebarLayout />}>
            {SettingsRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route path={"/*"} element={<ProjectSidebarLayout />}>
            {ProjectRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>

          <Route path={"/*"} element={<SidebarLayout />}>
            {AdministrationRoutingeObjects.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Route>

          <Route path={"/*"} element={<SidebarLayout />}>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default AppContainer;
