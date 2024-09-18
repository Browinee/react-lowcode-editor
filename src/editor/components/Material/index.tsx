import { useMemo } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { MaterialItem } from "./materialItem";

export function Material() {
  const { componentConfig } = useComponentConfigStore();
  const components = useMemo(() => {
    console.log("components", Object.values(componentConfig));

    return Object.values(componentConfig);
  }, [componentConfig]);

  return (
    <div>
      {components.map((item, index) => {
        return (
          <MaterialItem
            desc={item.desc}
            key={item.name + index}
            name={item.name}
          />
        );
      })}
    </div>
  );
}
