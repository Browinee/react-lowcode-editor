import { MouseEventHandler, useState } from "react";

export function useHover() {
  const [hoverComponentId, setHoverComponentId] = useState<number>();

  const handleMouseOver: MouseEventHandler = (e) => {
    console.log("e.native", e.nativeEvent.composedPath());

    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset?.componentId;
      if (componentId) {
        setHoverComponentId(+componentId);
        return;
      }
    }
  };
  const handleMouseLeave = () => {
    setHoverComponentId(undefined)
  }
  return {
    handleMouseOver, hoverComponentId,
    handleMouseLeave
  }
}
