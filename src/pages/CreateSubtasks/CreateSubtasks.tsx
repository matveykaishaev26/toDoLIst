import React from "react";
import s from "./CreateSubtasks.module.scss";
import MyInput from "../../shared/MyInput/MyInput";
type Props = {};

export default function CreateSubtasks({}: Props) {
  return (
    <div className={s.createSubtasks}>
      <MyInput placeholder="Название подзадачи"></MyInput>
    </div>
  );
}
