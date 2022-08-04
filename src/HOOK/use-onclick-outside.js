import { useEffect } from "react";

// Hook
function useOnClickOutside(ref, handler1, handler2, handler3, handler4) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler1(event);
      handler2(event);
      handler3(event);
      handler4(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler1, handler2, handler3, handler4]);
}
export default useOnClickOutside;
