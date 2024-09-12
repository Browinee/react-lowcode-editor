import { Form, Input, Select } from "antd";
import { useComponentsStore } from "../../stores/components";
import {
  ComponentConfig,
  ComponentSetter,
  useComponentConfigStore,
} from "../../stores/component-config";
import { useEffect } from "react";

export function Attribute() {
  const [form] = Form.useForm();
  const { curComponentId, curComponent, updateComponentProps } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.props });
  }, [curComponent]);
  if (!curComponentId || !curComponent) return null;

  const renderFormElement = (setting: ComponentSetter) => {
    const { type, options } = setting;

    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <Input />;
    }
  };

  const valueChange = (changeValues: ComponentConfig) => {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  };

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item label="ID">
        <Input value={curComponent.id} disabled />
      </Form.Item>
      <Form.Item label="Name">
        <Input value={curComponent.name} disabled />
      </Form.Item>
      <Form.Item label="Description">
        <Input value={curComponent.desc} disabled />
      </Form.Item>
      {componentConfig[curComponent.name]?.setter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElement(setter)}
        </Form.Item>
      ))}
    </Form>
  );
}
