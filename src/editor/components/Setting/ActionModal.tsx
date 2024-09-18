import { Modal, Segmented } from "antd";
import { useEffect, useState } from "react";
import { ComponentEvent } from "../../stores/component-config";
import { GoToLink, GoToLinkConfig } from "./actions/GoToLink";
import { ShowMessage, ShowMessageConfig } from "./actions/ShowMesage";
import { CustomJS, CustomJSConfig } from "./actions/CustomJS";
import {
  ComponentMethod,
  ComponentMethodConfig,
} from "./actions/ComponentMethod";

export type ActionConfig =
  | GoToLinkConfig
  | ShowMessageConfig
  | CustomJSConfig
  | ComponentMethodConfig;

export const enum EventType {
  "Link" = "Link",
  "Message" = "Message",
  "CustomJS" = "CustomJs",
  "ComponentMethod" = "ComponentMethod",
}
const map = {
  goToLink: EventType.Link,
  showMessage: EventType.Message,
  customJS: EventType.CustomJS,
  componentMethod: EventType.ComponentMethod,
};
interface ActionModalProps {
  visible: boolean;
  eventConfig: ComponentEvent;
  handleOk: (config?: GoToLinkConfig | ShowMessageConfig) => void;
  handleCancel: () => void;
  action?: ActionConfig;
}

export function ActionModal(props: ActionModalProps) {
  const { visible, handleOk, eventConfig, handleCancel, action } = props;

  const [key, setKey] = useState<string>("Link");
  const [curConfig, setCurConfig] = useState<ActionConfig>();
  useEffect(() => {
    if (action?.type) {
      setKey(map[action.type]);
    }
  }, [action]);

  return (
    <Modal
      title="Action config"
      width={800}
      open={visible}
      okText="Add"
      cancelText="Cancel"
      onOk={() => {
        handleOk(curConfig);
      }}
      onCancel={() => {
        handleCancel();
      }}
    >
      <div className="h-[500px]">
        <Segmented
          value={key}
          onChange={setKey}
          block
          options={[
            EventType.Link,
            EventType.Message,
            EventType.CustomJS,
            EventType.ComponentMethod,
          ]}
        />
        {key === EventType.Link && (
          <GoToLink
            key="goToLink"
            value={action?.type === "goToLink" ? action.url : ""}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === EventType.Message && (
          <ShowMessage
            key="showMessage"
            value={action?.type === "showMessage" ? action.config : undefined}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === EventType.ComponentMethod && (
          <ComponentMethod
            key="showMessage"
            value={
              action?.type === "componentMethod" ? action.config : undefined
            }
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === EventType.CustomJS && (
          <CustomJS
            defaultValue=""
            key="customJS"
            value={action?.type === "customJS" ? action.code : ""}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
      </div>
    </Modal>
  );
}
