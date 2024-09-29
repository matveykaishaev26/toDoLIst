import React from "react";
import { FaRegCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoSunnyOutline } from "react-icons/io5";
import { LuCloudSun } from "react-icons/lu";
import s from "./MyCalendar.module.scss";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { useClickOutside } from "../../../hooks/useClickOutside";

import { useState } from "react";
import { useRef } from "react";
const daysOfWeek = ["ВС.", "ПН.", "ВТ.", "СР.", "ЧТ.", "ПТ.", "СБ."];

type calendarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
};
const MyCalendar: React.FC<calendarProps> = ({
  isOpen,
  setIsOpen,
  setSelectedDate,
  selectedDate,
}: calendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, isOpen, setIsOpen);
  // Функция для получения количества дней в месяце
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Функция для получения первого дня месяца (какой это день недели)
  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Переключение на предыдущий месяц
  const goToPreviousMonth = () => {
    const prevDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(prevDate);
  };

  // Переключение на следующий месяц
  const goToNextMonth = () => {
    const nextDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    console.log(nextDate);

    setCurrentDate(nextDate);
  };

  const setActiveDate = (date: string) => {
    const [day, month, year] = date.split("-");
    const [currentDay, currentMonth, currentYear] = currentDate.toJSON().slice(0, 10).split("-");

    if (month !== currentMonth || year !== currentYear) { 
      setCurrentDate(new Date(year, day, currentMonth - 1,));
      setActiveDate(date);
    }
    else {
      setSelectedDate(date);
    }

  };

  // Генерация дней для текущего месяца
  const generateDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);

    const previousMonth = new Date(currentDate);
    previousMonth.setMonth(currentDate.getMonth() - 1);
    const prev = getDaysInMonth(previousMonth);

    // Пустые дни для выравнивания первого дня месяца
    const days: JSX.Element[] = [];
    for (let i = prev - firstDayOfMonth + 1; i <= prev; i++) {
      const key = `${i}-${previousMonth.getMonth()}-${previousMonth.getFullYear()}`;
      days.push(
        <div
          key={key}
          className={
            selectedDate === key
              ? `${s.day} ${s.active}`
              : `${s.day} ${s.hidden}`
          }
          onClick={() => setActiveDate(key)}
        >
          {i}
        </div>
      );
    }

    // Добавляем реальные дни
    for (let i = 1; i <= daysInMonth; i++) {
      const today = new Date();

      const isCurrentDay =
        today.getFullYear() === currentDate.getFullYear() &&
        today.getMonth() === currentDate.getMonth() &&
        i === today.getDate();
      const key = `${i}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
      console.log(key);

      days.push(
        isCurrentDay ? (
          <div
            key={i}
            className={`${s.day} ${s.currentDay}`}
            onClick={() => setSelectedDate(key)}
          >
            {i}
          </div>
        ) : (
          <div
            key={i}
            className={key === selectedDate ? `${s.day} ${s.active}` : s.day}
            onClick={() => setSelectedDate(key)}
          >
            {i}
          </div>
        )
      );
    }

    for (let i = 1; i <= 42 - daysInMonth - firstDayOfMonth; i++) {
      const key = `${i}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;
      days.push(
        <div
          key={`${i}-${
            currentDate.getMonth() + 1
          }-${currentDate.getFullYear()}`}
          className={
            key === selectedDate
              ? `${s.day} ${s.active}`
              : `${s.day} ${s.hidden}`
          }
          onClick={() => setSelectedDate(key)}
        >
          {i}
        </div>
      );
    }

    const daysOfWeekContent: JSX.Element[] = daysOfWeek.map((day) => (
      <div className={s.dayOfWeek} key={day}>
        {day}
      </div>
    ));

    days.unshift(...daysOfWeekContent);

    return days;
  };

  return (
    <div ref={ref} className={s.calendar}>
      <div className={s.types}>
        <div className={s.typeIconWrapper}>
          <IoSunnyOutline className={s.typeIcon} />
          <div className={s.typeName}>Сегодня</div>
        </div>
        <div className={s.typeIconWrapper}>
          <LuCloudSun className={s.typeIcon} />
          <div className={s.typeName}>Завтра</div>
        </div>
        <div className={s.typeIconWrapper}>
          <IoCalendarClearOutline className={s.typeIcon} />
          <div className={s.typeName}>След. неделя</div>
        </div>
        <div className={s.typeIconWrapper}>
          <IoMoonOutline className={s.typeIcon} />
          <div className={s.typeName}>След. месяц</div>
        </div>
      </div>
      <div className={s.header}>
        <div className={s.currentDateHeader}>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </div>
        <div className={s.monthNav}>
          <div
            onClick={goToPreviousMonth}
            className={`${s.iconWrapper} ${s.left}`}
          >
            <MdOutlineKeyboardArrowDown className={s.navIcon} />
          </div>
          <FaRegCircle
            onClick={() => setCurrentDate(new Date())}
            className={s.currentDateCurcle}
          />
          <div
            onClick={goToNextMonth}
            className={`${s.iconWrapper} ${s.right}`}
          >
            <MdOutlineKeyboardArrowDown className={s.navIcon} />
          </div>
        </div>
      </div>
      <div className={s.week}>
        <div className={s.daysOfWeek}></div>
      </div>

      <div className={s.daysGrid}>{generateDays()}</div>
    </div>
  );
};

export default MyCalendar;
