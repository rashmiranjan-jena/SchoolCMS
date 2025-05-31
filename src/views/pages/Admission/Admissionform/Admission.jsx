import Breadcrumbs from "../../../../components/Breadcrumbs";
import Admissiontable from "../Admissiontable";
const Admission = () => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Admission Form"
          title="Dashboard"
          subtitle="Admission Form Master"
          modal="#admission_form" 
          name="Add Admission Form"
        />
      
        <Admissiontable/>
      </div>
    </div>
  );
};

export default Admission;
