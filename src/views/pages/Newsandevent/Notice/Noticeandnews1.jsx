import React from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Noticeandnewsfilter from "./Noticeandnewsfilter";
import Noticeandnewstable from "./Noticeandnewstable";
import NoticeandnewsModal from "../../../../components/Noticeandnews/NoticeandnewsModal";

const Noticeandnews1 = () => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Noticeandnews Master "
          title="Dashboard"
          subtitle="Noticeandnews Master"
          modal="#NoticeAndNews"
          name="Add Noticeandnews"
        />
        <NoticeandnewsModal/>
        <Noticeandnewsfilter/>
        <Noticeandnewstable/>
        
      </div>
    </div>
  );
};

export default Noticeandnews1;
