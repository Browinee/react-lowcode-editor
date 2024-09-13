import { Input } from "antd";
import { useComponentsStore } from "../../../stores/components";
import { ComponentEvent } from "../../../stores/component-config";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export interface GoToLinkConfig {
  type: "goToLink";
  url: string;
}

export interface GoToLinkProps {
  defaultValue?: string;
  onChange?: (config: GoToLinkConfig) => void;
}
export function GoToLink(props: GoToLinkProps) {
  const { defaultValue, onChange } = props;

  const [value, setValue] = useState(defaultValue);

  const { curComponentId, curComponent, updateComponentProps } =
    useComponentsStore();

  function urlChange(value: string) {
    if (!curComponentId) return;

    setValue(value);

    onChange?.({
      type: "goToLink",
      url: value,
    });
  }

  return (
    <div className="mt-[40px]">
      <div className="flex items-center gap-[10px]">
        <div>Link</div>
        <div>
          <TextArea
            style={{ height: 200, width: 500, border: "1px solid #000" }}
            onChange={(e) => {
              urlChange(e.target.value);
            }}
            value={value || ""}
          />
        </div>
      </div>
    </div>
  );
}
