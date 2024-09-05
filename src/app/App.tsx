import React, { useEffect } from "react";
import { TodayList } from "../pages/TodayTasks/TodayTasks";
import Sidebar from "../shared/Sidebar/Sidebar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CiStickyNote, CiCalendarDate, CiBoxList } from "react-icons/ci"; // Импортируем иконки
import { useState } from "react";
import s from "./App.module.scss";
import Header from "../shared/Header/Header";
import Authorization from "../pages/Authorization/Authorization";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
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
  const { token } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/home");
    } else {
      navigate("/signup");
    }
  }, [token, navigate]);
  const mainContent = (
    <>
      {" "}
      <Sidebar isSidebarOpen={isSidebarOpen} sidebarTabs={sidebarTabs} />
      <div className={s.appContentContainer}>
        <Header toggleSidebarOpen={toggleSidebarOpen}></Header>
        <div
          className={`${s.appContent} ${
            isSidebarOpen ? s.contentOpen : s.contentClose
          }`}
        >
          <Routes>
            <Route path="/signup" element={<Authorization />} />;
            {sidebarTabs.map((tab) => (
              <Route path={tab.link} element={<TodayList />} key={tab.value} />
            ))}
          </Routes>
        </div>
      </div>
    </>
  );
  return (
    <>
      <div className={s.app}>
        <Routes>
          <Route path="/signup" element={<Authorization />} />
          <Route path="/home" element={mainContent} />
        </Routes>
      </div>
    </>
  );
}

export default App;
