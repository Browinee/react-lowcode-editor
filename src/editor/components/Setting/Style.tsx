import { Form, Input, InputNumber, Select } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import {
  ComponentConfig,
  ComponentSetter,
  useComponentConfigStore,
} from "../../stores/component-config";
import { useComponentsStore } from "../../stores/components";
import CssEditor from "./CssEditor";
import { debounce } from "lodash-es";
import styleToObject from "style-to-object";

export function Style() {
  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentStyles } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [css, setCss] = useState<string>(`.comp{\n\n}`);
  useEffect(() => {
    form.resetFields();
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.styles });
    setCss(toCSSStr(curComponent?.styles!));
  }, [curComponent]);

  const toCSSStr = (styles: Record<string, any>) => {
    let str = `.comp {\n`;
    for (let key in styles) {
      let value = styles[key];
      if (!value) {
        continue;
      }
      if (
        ["width", "height"].includes(key) &&
        !value.toString().endsWith("px")
      ) {
        value += "px";
      }

      str += `\t${key}: ${value};\n`;
    }
    str += `}`;
    return str;
  };

  if (!curComponentId || !curComponent) return null;

  const renderFormElememt = (setting: ComponentSetter) => {
    const { type, options } = setting;

    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <Input />;
    } else if (type === "inputNumber") {
      return <InputNumber />;
    }
  };

  const valueChange = (changeValues: CSSProperties) => {
    if (curComponentId) {
      updateComponentStyles(curComponentId, changeValues);
    }
  };
  const handleEditorChange = debounce((value) => {
    const css: Record<string, any> = {};

    try {
      const cssStr = value
        .replace(/\/\*.*\*\//, "") // 去掉注释 /** */
        .replace(/(\.?[^{]+{)/, "") // 去掉 .comp {
        .replace("}", ""); // 去掉 }

      styleToObject(cssStr, (name, value) => {
        console.log(name, value);

        css[
          name.replace(/-\w/, (item) => {
            console.log("time", item);

            return item.toUpperCase().replace("-", "");
          })
        ] = value;
      });

      updateComponentStyles(
        curComponentId,
        { ...form.getFieldsValue(), ...css },
        true
      );
    } catch (e) {}
  }, 500);

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      {componentConfig[curComponent.name]?.stylesSetter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElememt(setter)}
        </Form.Item>
      ))}
      <div className="h-[200px] border-[1px] border-[#ccc]">
        <CssEditor value={css} onChange={handleEditorChange} />
      </div>
    </Form>
  );
}
