import { Button, Collapse, CollapseProps } from "antd";
import { useState } from "react";
import {
  ComponentEvent,
  useComponentConfigStore,
} from "../../stores/component-config";
import { useComponentsStore } from "../../stores/components";
import { ActionModal } from "./ActionModal";
import { GoToLinkConfig } from "./actions/GoToLink";
import { ShowMessageConfig } from "./actions/ShowMesage";
import { DeleteOutlined } from "@ant-design/icons";

export function Event() {
  const { curComponentId, curComponent, updateComponentProps } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  if (!curComponent) return null;

  const handleModalOk = (config?: GoToLinkConfig | ShowMessageConfig) => {
    if (!config || !curEvent || !curComponent) {
      return;
    }

    updateComponentProps(curComponent.id, {
      [curEvent.name]: {
        actions: [
          ...(curComponent.props[curEvent.name]?.actions || []),
          config,
        ],
      },
    });

    setActionModalOpen(false);
  };

  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [curEvent, setCurEvent] = useState<ComponentEvent>();
  const deleteAction = (event: ComponentEvent, index: number) => {
    if (!curComponent) {
      return;
    }

    const actions = curComponent.props[event.name]?.actions;

    actions.splice(index, 1);

    updateComponentProps(curComponent.id, {
      [event.name]: {
        actions,
      },
    });
  };
  const items: CollapseProps["items"] = (
    componentConfig[curComponent.name].events || []
  ).map((event) => {
    return {
      key: event.name,
      label: (
        <div className="flex justify-between leading-[30px]">
          {event.label}
          <Button
            type="primary"
            onClick={() => {
              setCurEvent(event);
              setActionModalOpen(true);
            }}
          >
            Add
          </Button>
        </div>
      ),
      children: (
        <div>
          {(curComponent.props[event.name]?.actions || []).map(
            (item: GoToLinkConfig | ShowMessageConfig, index: number) => {
              return (
                <div key={item.type + index}>
                  {item.type === "goToLink" ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                      <div className="text-[blue]">Link</div>
                      <div>{item.url}</div>
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          cursor: "pointer",
                        }}
                        onClick={() => deleteAction(event, index)}
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  ) : null}
                  {item.type === "showMessage" ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                      <div className="text-[blue]">Message</div>
                      <div>{item.config.type}</div>
                      <div>{item.config.text}</div>
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          cursor: "pointer",
                        }}
                        onClick={() => deleteAction(event, index)}
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            }
          )}
        </div>
      ),
    };
  });

  return (
    <div className="px-[10px]">
      <Collapse
        className="mb-[10px]"
        items={items}
        defaultActiveKey={componentConfig[curComponent.name].events?.map(
          (item) => item.name
        )}
      />
      <ActionModal
        visible={actionModalOpen}
        eventConfig={curEvent!}
        handleOk={handleModalOk}
        handleCancel={() => {
          setActionModalOpen(false);
        }}
      />
    </div>
  );
}
