import React from 'react'
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Noticeandnewsfilter from "./Noticeandnewsfilter";
import Noticeandnewstable from "./Noticeandnewstable";
import NoticeandnewsModal from "../../../../components/Noticeandnews/NoticeandnewsModal";
const Noticeandnews = () => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Notice And News Master "
          title="Dashboard"
          subtitle="Noticeandnews Master"
          modal="#NoticeAndNews"
          name="Add Notice And News"
        />
        <NoticeandnewsModal/>
        <Noticeandnewsfilter/>
        <Noticeandnewstable/>
        
      </div>
    </div>
  )
}

export default Noticeandnews