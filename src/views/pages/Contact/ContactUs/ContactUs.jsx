import Breadcrumbs from "../../../../components/Breadcrumbs";
import ContactTable from "./ContactTable";
const ContactUs = () => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="ContactUS"
          title="Dashboard"
          subtitle="ContactUS"
        />
      <ContactTable/>
      </div>
    </div>
  );
};

export default ContactUs;