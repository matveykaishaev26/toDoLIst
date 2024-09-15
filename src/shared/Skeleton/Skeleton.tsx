// Skeleton.js
import React from "react";
import s from "./Skeleton.module.scss";

type Props = {
  className?: string;
};

const Skeleton = ({ className }: Props) => {
  return <div className={s.skeleton + " " + className} />;
};

export default Skeleton;
