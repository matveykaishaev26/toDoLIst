import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import s from "./App.module.scss";
import Authorization from "../pages/Authorization/Authorization";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import QuestsPage from "../pages/QuestsPage/QuestsPage";
import PrivateRoute from "../utils/router/privateRoute";

function App() {

  React.useEffect(() => {
    if (!document.documentElement.hasAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);
  
  // const mainSidebarTabs: typeSidebarTab[] = [
  //   {
  //     value: "Задачи",
  //     icon: BsBookmarkCheckFill,
  //     link: "/quests",
  //   },
  //   {
  //     value: "Календарное представление",
  //     icon: BsCalendarDateFill,
  //     link: "/calendar",
  //   },
  //   {
  //     value: "Поиск",
  //     icon: IoSearch,
  //     link: "/search",
  //   },
  //   {
  //     value: "Синхронизация",
  //     icon: GoSync,
  //     link: "/synchronization",
  //   },
  //   {
  //     value: "Уведомления",
  //     icon: FaBell,
  //     link: "/notifications",
  //   },
  //   {
  //     value: "Больше",
  //     icon: BsFillQuestionSquareFill,
  //     link: "/more",
  //   },
  // ];

  const { token } = useSelector((state: RootState) => state.user);

  return (
    <div className={s.app}>
      {/* {token && <MainSidebar tabs={mainSidebarTabs} />} */}
      <div className={s.appContentContainer}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={token ? "/quests/today" : "/signup"} />}
          />

          <Route element={<PrivateRoute />}>
            <Route path="/quests/*" element={<QuestsPage />} />
          </Route>

          <Route path="/signup" element={<Authorization />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
