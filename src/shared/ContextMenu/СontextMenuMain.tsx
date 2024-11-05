import {
  PropsWithChildren,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import s from "./ContextMenu.module.scss";

export type typeContextMenuItemHover =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue";
export type typeContextMenuItem = {
  id: string;
  caption: string;
  onClick?: () => void;
  hover?: typeContextMenuItemHover;
};

type Props = {
  id?: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  items: typeContextMenuItem[];
  defaultPosition?: {
    x: number;
    y: number;
  };
};

const ContextMenuMain = (props: PropsWithChildren<Props>) => {
  const { items, children, defaultPosition, isVisible, setIsVisible } = props;

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const ref = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultPosition?.x !== 0 || defaultPosition?.y !== 0) {
      setIsVisible(true);
      setPosition({
        x: defaultPosition?.x || 0,
        y: defaultPosition?.y || 0,
      });
    }
  }, [defaultPosition, setIsVisible]);

  const contextMenuHandler = (e: React.MouseEvent) => {
    if (parentRef.current?.contains(e.target as Node)) {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });

      setIsVisible(true);
    }
  };

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

  return (
    <>
      <div ref={parentRef} onContextMenu={contextMenuHandler}>
        {children}
      </div>
      {isVisible && (
        <div
          className={s.dropdownMenu}
          ref={ref}
          style={{ left: position.x, top: position.y }}
        >
          {items?.map((item) => (
            <div
              className={
                item.hover ? s.dropdownOption + " " + s[item.hover] : s.dropdownOption
              }
              key={item.id}
              onClick={item.onClick}
            >
              {item.caption}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ContextMenuMain;
