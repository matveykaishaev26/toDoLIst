import { useEffect } from "react";

type Props = {
  ref: React.RefObject<HTMLElement>;
  callback: () => void;
};

export const useClickOutside = ({ ref, callback }: Props) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.code == "Escape") {
      callback();
    }
  };
  const rightClickHandler = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.button === 2) {
      callback();
    }
  };
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        callback(); // Закрываем меню, если вкладка не активна
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", rightClickHandler);

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("contextmenu", rightClickHandler);
    };
  }, [ref, callback]);
};
