import { renderHook } from "@testing-library/react";
import { usePreventBodyScroll } from "../usePreventBodyScroll";

describe("usePreventBodyScroll", () => {
  it("should prevent body scroll when isOpen is true", () => {
    const { result } = renderHook(() => usePreventBodyScroll({ isOpen: true }));

    expect(result.current).toBe(true);
  });

  it("should unlock body scroll when isOpen is false", () => {
    const { result } = renderHook(() =>
      usePreventBodyScroll({ isOpen: false })
    );

    expect(result.current).toBe(false);
  });

  it("should restore the body overflow style when unmounted", () => {
    const { unmount } = renderHook(() =>
      usePreventBodyScroll({ isOpen: true })
    );

    unmount();
    const { overflow } = document.body.style;
    expect(document.body.style.overflow).toBe(overflow);
  });
});
