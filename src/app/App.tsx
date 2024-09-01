import React from "react";
import { TodayList } from "../pages/TodayTasks/TodayTasks";
import Sidebar from "../shared/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import { CiStickyNote, CiCalendarDate, CiBoxList } from "react-icons/ci"; // Импортируем иконки
import { useSelector } from "react-redux";
import { RootState } from "../store";
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

  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  return (
    <div className={s.app}>
      <Sidebar sidebarTabs={sidebarTabs} />
      <div className={s.appContentContainer}>
        <Header></Header>
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
