import { renderHook, act } from "@testing-library/react";
import { useCopyToClipboard } from "../useCopyToClipboard";

describe("useCopyToClipboard", () => {
  it("should copy the text to clipboard and set isCopied to true", () => {
    const text = "https://urlToBeCopied.com";
    const { result } = renderHook(() => useCopyToClipboard(text));
    const [, handleCopy] = result.current;
    const writeTextMock = jest.fn();
    const originalClipboard = navigator.clipboard;
    // Replace the navigator clipboard API with our mock implementation
    // so we can spy on it.
    (navigator as any).__defineGetter__("clipboard", () => ({
      writeText: writeTextMock,
    }));

    // Click the button to copy the text
    act(() => {
      handleCopy();
    });

    expect(writeTextMock).toHaveBeenCalledWith(text);

    expect(result.current[0]).toBe(true);

    (navigator as any).__defineGetter__("clipboard", () => originalClipboard);
  });
});
