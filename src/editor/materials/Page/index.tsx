import { PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import { message } from "antd";
import { CommonComponentProps } from "../../interface";
import { useComponentConfigStore } from "../../stores/component-config";
import { useComponentsStore } from "../../stores/components";
import { useMaterialDrop } from "../../hooks";

function Page({ children, id, name }: CommonComponentProps) {
  const { canDrop, drop } = useMaterialDrop(["Button", "Container"], id);
  return (
    <div
      ref={drop}
      className={`p-[20px] h-[100%] box-border ${
        canDrop ? "border-2 border-blue-500" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default Page;
