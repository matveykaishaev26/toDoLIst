// import React from "react";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import s from "../SidebarFolderList/SidebarFolderList.module.scss";
// import "react-loading-skeleton/dist/skeleton.css";

// function SkeletonList() {
//   return (
//     <SkeletonTheme baseColor="#202020" highlightColor="#444">
//       <Skeleton />

//       <div className={s.sidebarTasksListContainer}>
//         <Skeleton count={2} />
//       </div>
//       <Skeleton style={{ padding: "9px" }} />
//       <div className={s.sidebarTasksListContainer}>
//         <Skeleton count={1} />
//       </div>
//       <Skeleton />
//       <div className={s.sidebarTasksListContainer}>
//         <Skeleton count={1} />
//       </div>
//       <Skeleton className="skeletonTab" />
//     </SkeletonTheme>
//   );
// }

// export default SkeletonList;

import React from "react";
import s from "../SidebarFolderList/SidebarFolderList.module.scss";
import Skeleton from "../../../../../shared/Skeleton/Skeleton";
function SkeletonList() {
  return (
    <div className={s.sidebarFolderTasks}>
      <Skeleton />

      <div className={s.sidebarTasksListContainer}>
        <Skeleton />
      </div>
      <Skeleton />
      <div className={s.sidebarTasksListContainer}>
        <Skeleton />
      </div>
      <Skeleton />
      <div className={s.sidebarTasksListContainer}>
        <Skeleton />
      </div>
      <Skeleton />
    </div>
  );
}

export default SkeletonList;
