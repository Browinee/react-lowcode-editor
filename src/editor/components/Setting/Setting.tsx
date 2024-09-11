import { Segmented } from "antd";
import { useState } from "react";
import { Attribute } from "./Attribute";
import { Event } from "./Event";
import { Style } from "./Style";
import { useComponentsStore } from "../../stores/components";

export function Setting() {
  const { curComponentId } = useComponentsStore();

  const [key, setKey] = useState<string>("Attribute");

  if (!curComponentId) return null;

  return (
    <div>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={["Attribute", "Style", "Event"]}
      />
      <div className="pt-[20px]">
        {key === "Attribute" && <Attribute />}
        {key === "Style" && <Style />}
        {key === "Event" && <Event />}
      </div>
    </div>
  );
}
