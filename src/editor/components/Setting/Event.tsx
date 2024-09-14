import { Button, Collapse, CollapseProps } from "antd";
import { useState } from "react";
import {
  ComponentEvent,
  useComponentConfigStore,
} from "../../stores/component-config";
import { getComponentById, useComponentsStore } from "../../stores/components";
import { ActionConfig, ActionModal } from "./ActionModal";
import { GoToLinkConfig } from "./actions/GoToLink";
import { ShowMessageConfig } from "./actions/ShowMesage";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export function Event() {
  const { curComponentId, components, curComponent, updateComponentProps } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  if (!curComponent) return null;

  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [curEvent, setCurEvent] = useState<ComponentEvent>();
  const [curAction, setCurAction] = useState<ActionConfig>();
  const [curActionIndex, setCurActionIndex] = useState<number>();

  const handleModalOk = (config?: ActionConfig) => {
    if (!config || !curEvent || !curComponent) {
      return;
    }

    if (curAction) {
      updateComponentProps(curComponent.id, {
        [curEvent.name]: {
          actions: curComponent.props[curEvent.name]?.actions.map(
            (item: ActionConfig, index: number) => {
              return index === curActionIndex ? config : item;
            }
          ),
        },
      });
    } else {
      updateComponentProps(curComponent.id, {
        [curEvent.name]: {
          actions: [
            ...(curComponent.props[curEvent.name]?.actions || []),
            config,
          ],
        },
      });
    }
    setCurAction(undefined);
    setCurActionIndex(undefined);

    setActionModalOpen(false);
  };

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
  const editAction = (config: ActionConfig, index: number) => {
    if (!curComponent) {
      return;
    }
    setCurAction(config);
    setCurActionIndex(index);
    setActionModalOpen(true);
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
            onClick={(e) => {
              e.stopPropagation();
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
            (item: ActionConfig, index: number) => {
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
                          right: 30,
                          cursor: "pointer",
                        }}
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
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
                          right: 30,
                          cursor: "pointer",
                        }}
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
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
                  {item.type === "customJS" ? (
                    <div
                      key="customJS"
                      className="border border-[#aaa] m-[10px] p-[10px] relative"
                    >
                      <div className="text-[blue]">Customized JS</div>
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 30,
                          cursor: "pointer",
                        }}
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
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
                  {item.type === "componentMethod" ? (
                    <div
                      key="componentMethod"
                      className="border border-[#aaa] m-[10px] p-[10px] relative"
                    >
                      <div className="text-[blue]">Component method</div>
                      <div>
                        {
                          getComponentById(item.config.componentId, components)
                            ?.desc
                        }
                      </div>
                      <div>{item.config.componentId}</div>
                      <div>{item.config.method}</div>
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 30,
                          cursor: "pointer",
                        }}
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
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
        action={curAction}
        handleCancel={() => {
          setActionModalOpen(false);
          setCurAction(undefined);
          setCurActionIndex(undefined);
        }}
      />
    </div>
  );
}
