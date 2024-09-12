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
import { CiBookmarkCheck } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { typeSidebarTab } from "../types/types";
import MainSidebar from "../shared/MainSidebar/MainSidebar";
import { BsCalendarDateFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { IoIosSync } from "react-icons/io";
function App() {
  const mainSidebarTabs: typeSidebarTab[] = [
    {
      value: "Задача",
      icon: BsBookmarkCheckFill,
      link: "/",
    },
    {
      value: "Календарное представлнение",
      icon: BsCalendarDateFill,
      link: "/",
    },
    {
      value: "Поиск",
      icon: IoSearch,
      link: "/",
    },
    {
      value: "Синхронизация",
      icon: IoIosSync,
      link: "/",
    },
  ];
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
    {
      value: "Выполнено",
      icon: CiBookmarkCheck,
      link: "/completed",
    },
    {
      value: "Корзина",
      icon: CiTrash,
      link: "/trash",
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
      <MainSidebar tabs={mainSidebarTabs} />
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
              <Route path={tab.link} element={<TodayList />} key={tab.link} />
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
