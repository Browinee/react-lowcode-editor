import { Modal, Segmented } from "antd";
import { useState } from "react";
import { ComponentEvent } from "../../stores/component-config";
import { GoToLink, GoToLinkConfig } from "./actions/GoToLink";
import { ShowMessage, ShowMessageConfig } from "./actions/ShowMesage";
import { CustomJS, CustomJSConfig } from "./actions/CustomJS";

export type ActionConfig = GoToLinkConfig | ShowMessageConfig | CustomJSConfig;

interface ActionModalProps {
  visible: boolean;
  eventConfig: ComponentEvent;
  handleOk: (config?: GoToLinkConfig | ShowMessageConfig) => void;
  handleCancel: () => void;
}

export function ActionModal(props: ActionModalProps) {
  const { visible, handleOk, eventConfig, handleCancel } = props;

  const [key, setKey] = useState<string>("Link");
  const [curConfig, setCurConfig] = useState<ActionConfig>();

  return (
    <Modal
      title="Action config"
      width={800}
      open={visible}
      okText="Add"
      cancelText="Cancel"
      onOk={() => handleOk(curConfig)}
      onCancel={handleCancel}
    >
      <div className="h-[500px]">
        <Segmented
          value={key}
          onChange={setKey}
          block
          options={["Link", "Message", "CustomizedJS"]}
        />
        {key === "Link" && (
          <GoToLink
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === "Message" && (
          <ShowMessage
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === "CustomizedJS" && (
          <CustomJS
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
      </div>
    </Modal>
  );
}
