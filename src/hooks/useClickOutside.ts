import { useCallback, useEffect} from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  isVisible: boolean,
  setIsVisible: (state: boolean) => void
) => {
  const clickHandler = useCallback(
    (e: MouseEvent) => {
      if (isVisible && !ref.current?.contains(e.target as Node)) {
        setIsVisible(false);
      }
    },
    [isVisible]
  );
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false); // Закрываем меню, если вкладка не активна
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.code == "Escape") {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickHandler);
    document.addEventListener("wheel", clickHandler);
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
      document.removeEventListener("wheel", clickHandler);
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [clickHandler, keyDownHandler]);
};
