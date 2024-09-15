  import { LuMenu } from "react-icons/lu";
  import { SlOptions } from "react-icons/sl";
  import { typeTask } from "../../../../../types/types";
  import s from "./SidebarMidTask.module.scss"
  import c from "../../../../../styles/taskTypesColors.module.scss";
  type Props = {
    task: typeTask;
  };

  const SidebarMidTask = ({ task }: Props) => {
    return (
      <div className={s.tab} key={task.id}>
        <div className={s.iconWrapper}>
          <LuMenu className={s.tabIcon} />
          <div className={s.taskTitle}>{task.title} </div>
        </div>
        <div className={s.iconWrapper}>
          <div className={`${s.taskColor} ${c[task.color]}`}></div>
          <SlOptions className={s.sidebarTasksOptions} />
        </div>
      </div>
    );
  };

  export default SidebarMidTask;
