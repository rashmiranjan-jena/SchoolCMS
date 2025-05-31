import Breadcrumbs from "../../../../components/Breadcrumbs";
import SubscribtionTable from "./SubscribtionTable";
const Subscribtion = () => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Subscriptions"
          title="Dashboard"
          subtitle="Subscriptions"
        />
      <SubscribtionTable/>
      </div>
    </div>
  );
};

export default Subscribtion;