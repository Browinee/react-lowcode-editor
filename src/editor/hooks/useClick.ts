import { MouseEventHandler } from "react";
import { useComponentsStore } from "../stores/components";

export function useClick() {
  const { setCurComponentId } = useComponentsStore();

  const handleClick: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset?.componentId;
      if (componentId) {
        setCurComponentId(+componentId);
        return;
      }
    }
  };

  return {
    handleClick,
  };
}
