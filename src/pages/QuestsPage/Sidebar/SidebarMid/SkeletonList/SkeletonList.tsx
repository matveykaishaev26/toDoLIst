import React from "react";
import Skeleton from "react-loading-skeleton";
import s from "../SidebarFolderList/SidebarFolderList.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonList() {
  return (
    <div className={s.sidebarFolderTasks}>
      <Skeleton />

      <div className={s.sidebarTasksListContainer}>
        <Skeleton count={2} />
      </div>
      <Skeleton />
      <div className={s.sidebarTasksListContainer}>
        <Skeleton count={1} />
      </div>
      <Skeleton />
      <div className={s.sidebarTasksListContainer}>
        <Skeleton count={1} />
      </div>
      <Skeleton />
    </div>
  );
}

export default SkeletonList;
