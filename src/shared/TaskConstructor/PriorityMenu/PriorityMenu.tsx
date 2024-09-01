import React from "react";
import s from "./PriorityMenu.module.scss";
import { CiFlag1 } from "react-icons/ci";
type Props = {
  setMenuOpen: React.Dispatch<React.SetStateAction<string>>;
  setPriorityState: React.Dispatch<React.SetStateAction<string>>;
};



export default function PriorityMenu({ setMenuOpen, setPriorityState }: Props) {
  const handleTabClick = (type: string) => {
    setMenuOpen("");
    setPriorityState(type);
  };
  return (
    <div className={s.taskOptionMenu}>
      <div onClick={() => handleTabClick("1")} className={s.taskOptionMenuItem}>
        <CiFlag1
          className={`${s.taskOptionMenuIcon} ${s.taskOptionMenuIconRed}`}
          size={22}
        />
        Приоритет 1
      </div>
      <div onClick={() => handleTabClick("2")} className={s.taskOptionMenuItem}>
        <CiFlag1
          className={`${s.taskOptionMenuIcon} ${s.taskOptionMenuIconOrange}`}
          size={22}
        />
        Приоритет 2
      </div>
      <div onClick={() => handleTabClick("3")} className={s.taskOptionMenuItem}>
        <CiFlag1
          className={`${s.taskOptionMenuIcon} ${s.taskOptionMenuIconGreen}`}
          size={22}
        />
        Приоритет 3
      </div>
      <div onClick={() => handleTabClick("4")} className={s.taskOptionMenuItem}>
        <CiFlag1 className={s.taskOptionMenuIcon} size={22} />
        Приоритет 4
      </div>
    </div>
  );
}
