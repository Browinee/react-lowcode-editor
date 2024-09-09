import React, { useEffect } from "react";
import { useComponentConfigStore } from "../stores/component-config";
import { Component, useComponentsStore } from "../stores/components";
import { useHover } from "../hooks";
import HoverMask from "./HoverMask";

export function EditArea() {
  const { components, addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.component) {
        return null;
      }

      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  }
  const { hoverComponentId, handleMouseOver, handleMouseLeave } = useHover();
  return (
    <div className="h-[100%] edit-area" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      {renderComponents(components)}
      {hoverComponentId && (
        <HoverMask
          containerClassName="edit-area"
          componentId={hoverComponentId}
        />
      )}
    </div>
  );
}
