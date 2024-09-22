import {
  PropsWithChildren,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import s from "./ContextMenu.module.scss";
export type typeContextMenuItem = {
  id: string;
  caption: string;
};

type Props = {
  id?: string;
  items: ContextMenuItem[];
  onItemClicked: (item: ContextMenuItem) => void;
  defaultPosition?: {
    x: number;
    y: number;
  };
};

export type ContextMenuItem = {
  id: string;
  caption: string;
};

const ContextMenuMain = (props: PropsWithChildren<Props>) => {
  const { items, children, onItemClicked, defaultPosition } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultPosition?.x !== 0 || defaultPosition?.y !== 0) {
      setIsVisible(true);
      setPosition({
        x: defaultPosition?.x || 0,
        y: defaultPosition?.y || 0,
      });
    }
  }, [defaultPosition]);

  const contextMenuHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });

    setIsVisible(true);
  };

  const clickHandler = useCallback(
    (e: MouseEvent) => {
      if (isVisible) {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
          if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY > rect.top ||
            e.clientY < rect.bottom
          ) {
            setIsVisible(false);
          }
        }
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
      document.addEventListener("keydown", keyDownHandler);
    };
  }, [clickHandler, keyDownHandler]);

  return (
    <>
      <div onContextMenu={contextMenuHandler}>{children}</div>
      {isVisible && (
        <div
          className={s.dropdownMenu}
          ref={ref}
          style={{ left: position.x, top: position.y }}
        >
          {items?.map((item) => (
            <div
              className={s.dropdownOption}
              key={item.id}
              onClick={() => {
                onItemClicked(item);
              }}
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
