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
