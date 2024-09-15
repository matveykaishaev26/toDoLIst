import React from "react";
import { typeSidebarTab } from "../../types/types";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import { useState } from "react";
import s from "./QuestsPage.module.scss";
import { Routes, Route } from "react-router-dom";
import MyInput from "../../shared/MyInput/MyInput";
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

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  return (
    <div className={s.quests}>
      <Sidebar isSidebarOpen={isSidebarOpen} sidebarTabs={sidebarTabs} />
      <div className={s.questsContentContainer}>
        <Header toggleSidebarOpen={toggleSidebarOpen}></Header>

        <div
          className={`${s.questsContent} ${
            isSidebarOpen ? s.contentOpen : s.contentClose
          }`}
        >
          <MyInput placeholder="Добавить задачу" className={ s.subtaskInput} />
          <Routes>
            {sidebarTabs.map((tab) => (
              <Route
                key={tab.value}
                path={tab.link}
                element={<div>{tab.value}</div>}
              />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default QuestsPage;
