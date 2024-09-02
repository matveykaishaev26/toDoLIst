import React from "react";
import { TodayList } from "../pages/TodayTasks/TodayTasks";
import Sidebar from "../shared/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import { CiStickyNote, CiCalendarDate, CiBoxList } from "react-icons/ci"; // Импортируем иконки
import { useState } from "react";
import s from "./App.module.scss";
import Header from "../shared/Header/Header";

export type typeSidebarTab = {
  value: string;
  icon: React.ComponentType;
  link: string;
};

function App() {
  const sidebarTabs: typeSidebarTab[] = [
    {
      value: "Входящие",
      icon: CiStickyNote,
      link: "/incoming",
    },
    {
      value: "Сегодня",
      icon: CiCalendarDate,
      link: "/today_tasks",
    },
    {
      value: "Все задачи",
      icon: CiBoxList,
      link: "/all_tasks",
    },
  ];

  const toggleSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  console.log(isSidebarOpen);

  return (
    <div className={s.app}>
      <Sidebar isSidebarOpen={isSidebarOpen} sidebarTabs={sidebarTabs} />
      <div className={s.appContentContainer}>
        <Header toggleSidebarOpen={toggleSidebarOpen}></Header>
        <div
          className={`${s.appContent} ${
            isSidebarOpen ? s.contentOpen : s.contentClose
          }`}
        >
          <Routes>
            {sidebarTabs.map((tab) => (
              <Route path={tab.link} element={<TodayList />} key={tab.value} />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

// import React, { useEffect, useState } from "react";
// import { Client, Databases, Query } from "appwrite";

// import {getAllFolders} from "../service/folderService";

// const DocumentList = () => {
//   const [documents, setDocuments] = useState([]);

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       const docs = await getAllFolders();
//       setDocuments(docs);
//     };

//     fetchDocuments();
//   }, []);

//   return (
//     <div>
//       <h1>Документы</h1>
//       <ul>
//       </ul>
//     </div>
//   );
// };

// export default DocumentList;
