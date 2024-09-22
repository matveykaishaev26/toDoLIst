import React from "react";
import { typeSidebarTab } from "../../types/types";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import { useState } from "react";
import s from "./QuestsPage.module.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import SubtaskInput from "./SubtaskInput/SubtaskInput";
import {
  CiStickyNote,
  CiCalendarDate,
  CiBoxList,
  CiTrash,
  CiBookmarkCheck,
} from "react-icons/ci"; // Импортируем иконки

const sidebarTabs: typeSidebarTab[] = [
  {
    value: "Сегодня",
    icon: CiCalendarDate,
    link: "/quests/today",
  },
  {
    value: "Следующие 7 дней",
    icon: CiStickyNote,
    link: "/quests/next7days",
  },

  {
    value: "Входящие",
    icon: CiBoxList,
    link: "/quests/incoming",
  },
  {
    value: "Выполнено",
    icon: CiBookmarkCheck,
    link: "/quests/completed",
  },
  {
    value: "Корзина",
    icon: CiTrash,
    link: "/quests/trash",
  },
];

const QuestsPage = () => {
  const toggleSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const location = useLocation();
  const currentTab =
    sidebarTabs.find((tab) => tab.link === location.pathname)?.value || "";

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  return (
    <div className={s.quests}>
      <Sidebar isSidebarOpen={isSidebarOpen} sidebarTabs={sidebarTabs} />
      <div className={s.questsContentContainer}>
        <Header
          pageName={currentTab}
          toggleSidebarOpen={toggleSidebarOpen}
        ></Header>

        <div
          className={`${s.questsContent} ${
            isSidebarOpen ? s.contentOpen : s.contentClose
          }`}
        >
        <SubtaskInput />  
          <Routes>
            {sidebarTabs.map((tab) => (
              <Route
                key={tab.value}
                path={tab.link}
                element={
                  <Header
                    toggleSidebarOpen={toggleSidebarOpen}
                    pageName={tab.value}
                  />
                }
              />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default QuestsPage;
