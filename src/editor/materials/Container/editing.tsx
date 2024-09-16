import { useComponentsStore } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";
import { useDrag, useDrop } from "react-dnd";
import { CommonComponentProps } from "../../interface";
import { useMaterialDrop } from "../../hooks";
import { useEffect, useRef } from "react";

const Container = ({ id, name, children, styles }: CommonComponentProps) => {
  const { canDrop, drop } = useMaterialDrop(
    ["Button", "Container", "Table", "Form"],
    id
  );
  const divRef = useRef<HTMLDivElement>(null);

  const [_, drag] = useDrag({
    type: "Container",
    item: {
      type: "Container",
      dragType: "move",
      id: id,
    },
  });

  useEffect(() => {
    drop(divRef);
    drag(divRef);
  }, []);
  return (
    <div
      data-component-id={id}
      ref={divRef}
      style={styles}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? "border-[2px] border-[blue]" : "border-[1px] border-[#000]"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
