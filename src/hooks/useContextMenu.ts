import { useState } from "react";

export const useContextMenu = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
    const [isVisible, setIsVisible] = useState(false);
    
    const handleClickOption = (e: React.MouseEvent<HTMLElement>) => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        });
      };

  return {
    position,
    setPosition,
      isVisible,
    handleClickOption,
    setIsVisible,
  };
};
