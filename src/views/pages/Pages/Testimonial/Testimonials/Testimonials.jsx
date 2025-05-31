import Breadcrumbs from "../../../../../components/Breadcrumbs";
import { useState } from "react";
import TestimonialsTable from "./TestimonialsTable";
import TestimonialModal from "../../../../../components/Testimonial/TestimonialModal";
const Testimonials = () => {
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Testimonials"
          title="Dashboard"
          subtitle="Testimonials"
          modal="#add_user"
          name="Add Testimonials"
        />
        <TestimonialModal setRefresh={setRefresh} />
        <TestimonialsTable refresh={refresh} />
      </div>
    </div>
  );
};

export default Testimonials;
