import React from "react";
import s from "./SubtaskInput.module.scss";
import MyInput from "../../../shared/MyInput/MyInput";
import { CiCalendar } from "react-icons/ci";
import { RxDropdownMenu } from "react-icons/rx";
import { useState } from "react";
import MyCalendar from "../../../shared/ContextMenu/MyCalendar/MyCalendar";
import el from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
type Props = {};

const SubtaskInput = (props: Props) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);   
  return (
    <div className={s.inputWrapper}>
      <MyInput
        isAutosize={true}
        placeholder="Добавить задачу"
        className={s.subtaskInput}
      />
      <div className={s.iconsWrapper}>
        <div
          onClick={() => setOpenCalendar(!openCalendar)}
          className={s.iconWrapper}
        >
          {selectedDate ? <span>{selectedDate.toLocaleDateString("ru", { day: "numeric", month: "long", year: "numeric" })}</span> : <CiCalendar className={s.calendarIcon} />}
        </div>
        <div className={s.iconWrapper}>
           <RxDropdownMenu className={s.calendarIcon} />
        </div>
      </div>
      {openCalendar && <MyCalendar isOpen={openCalendar} setIsOpen={setOpenCalendar} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>}
    </div>
  );
};

export default SubtaskInput;
