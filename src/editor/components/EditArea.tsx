import React, { useEffect } from "react";
import { useComponentConfigStore } from "../stores/component-config";
import { Component, useComponentsStore } from "../stores/components";
import { useHover } from "../hooks";
import HoverMask from "./HoverMask";
import { useClick } from "../hooks/useClick";
import SelectedMask from "./SelectedMask";

export function EditArea() {
  const { components, addComponent, curComponentId, setCurComponentId } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.editing) {
        return null;
      }

      return React.createElement(
        config.editing,
        {
          key: component.id,
          id: component.id,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  }
  const { hoverComponentId, handleMouseOver, handleMouseLeave } = useHover();
  const { handleClick } = useClick();
  return (
    <div
      className="h-[100%] edit-area"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      {renderComponents(components)}
      {hoverComponentId && hoverComponentId !== curComponentId && (
        <HoverMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={hoverComponentId}
        />
      )}
      {curComponentId && (
        <SelectedMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={curComponentId}
        />
      )}
      <div className="portal-wrapper"></div>
    </div>
  );
}
