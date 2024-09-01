import { useState, useCallback } from "react";

export default function useDropdown(initialState: boolean) {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, toggle };
}
