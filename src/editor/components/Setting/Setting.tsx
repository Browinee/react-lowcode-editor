import { Segmented } from "antd";
import { useState } from "react";
import { Attribute } from "./Attribute";
import { Event } from "./Event";
import { Style } from "./Style";
import { useComponentsStore } from "../../stores/components";

export const enum SettingType {
  Attribute = "Attribute",
  Style = "Style",
  Event = "Event",
}

export function Setting() {
  const { curComponentId } = useComponentsStore();

  const [key, setKey] = useState<string>(SettingType.Attribute);

  if (!curComponentId) return null;

  return (
    <div>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={[SettingType.Attribute, SettingType.Style, SettingType.Event]}
      />
      <div className="pt-[20px]">
        {key === SettingType.Attribute && <Attribute />}
        {key === SettingType.Style && <Style />}
        {key === SettingType.Event && <Event />}
      </div>
    </div>
  );
}
