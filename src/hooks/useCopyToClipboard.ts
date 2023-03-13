import { useEffect, useState } from "react";

export const useCopyToClipboard = (text: string): [boolean, () => void] => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  useEffect(() => {
    let timeoutId: number | null = null;
    if (isCopied) {
      timeoutId = window.setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [isCopied]);

  return [isCopied, handleCopy];
};
