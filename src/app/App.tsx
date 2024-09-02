import React from "react";
import { TodayList } from "../pages/TodayTasks/TodayTasks";
import Sidebar from "../shared/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import { CiStickyNote, CiCalendarDate, CiBoxList } from "react-icons/ci"; // Импортируем иконки
import { useState, useEffect } from "react";
import s from "./App.module.scss";
import Header from "../shared/Header/Header";

import { getTask, createTask } from "../service/appwrite";
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


  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
        try {
            // Например, получить задачу с определенным ID
            const task = await getTask('example_task_id');
            setTasks([task]); // Используйте реальные данные
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    fetchTasks();
}, []);

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
