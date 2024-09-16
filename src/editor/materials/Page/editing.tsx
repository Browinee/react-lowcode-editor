import { PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import { message } from "antd";
import { CommonComponentProps } from "../../interface";
import { useComponentConfigStore } from "../../stores/component-config";
import { useComponentsStore } from "../../stores/components";
import { useMaterialDrop } from "../../hooks";

function Page({ children, id, name, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterialDrop(
    ["Button", "Container", "Modal", "Table"],
    id
  );
  return (
    <div
      data-component-id={id}
      ref={drop}
      style={styles}
      className={`p-[20px] h-[100%] box-border ${
        canDrop ? "border-2 border-blue-500" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default Page;
