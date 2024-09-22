import React from "react";
import s from "./SubtaskInput.module.scss";
import MyInput from "../../../shared/MyInput/MyInput";
import { CiCalendar } from "react-icons/ci";
import { RxDropdownMenu } from "react-icons/rx";
type Props = {
};

const SubtaskInput = (props: Props) => {
    
  return (
    <div className={s.inputWrapper}>
      <MyInput
        isAutosize={true}
        placeholder="Добавить задачу"
        className={s.subtaskInput}
      />
      <div className={s.iconsWrapper}>
        <div className={s.iconWrapper}>
          <CiCalendar className={s.calendarIcon} />
        </div>
        <div className={s.iconWrapper}>
          <RxDropdownMenu className={s.calendarIcon} />
        </div>
      </div>
    </div>
  );
};

export default SubtaskInput;
