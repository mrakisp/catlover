import { useState, useEffect } from "react";

type UsePreventBodyScrollProps = {
  isOpen: boolean;
};

//hook example: when modal is mounted , disable overflow in body
export const usePreventBodyScroll = ({ isOpen }: UsePreventBodyScrollProps) => {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const body = document.body;

    if (body && isOpen) {
      const { overflow } = body.style;

      body.style.overflow = "hidden";
      setIsLocked(true);

      return () => {
        body.style.overflow = overflow;
        setIsLocked(false);
      };
    }
  }, [isOpen]);

  return isLocked;
};
