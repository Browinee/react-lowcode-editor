import { create } from "zustand";
import ContainerEditing from "../materials/Container/editing";
import ContainerPreview from "../materials/Container/preview";
import ButtonEditing from "../materials/Button/editing";
import ButtonPreview from "../materials/Button/preview";
import PageEditing from "../materials/Page/editing";
import PagePreview from "../materials/Page/preview";
import ModalPreview from "../materials/Modal/preview";
import ModalEditing from "../materials/Modal/editing";
import TablePreview from "../materials/Table/preview";
import TableEditing from "../materials/Table/editing";
import TableColumnPreview from "../materials/TableColumn/preview";
import TableColumnEditing from "../materials/TableColumn/editing";
import FormEditing from "../materials/Form/editing";
import FormPreview from "../materials/Form/preview";
import FormItemEditing from "../materials/FormItem/editing";
import FormItemPreview from "../materials/FormItem/preview";

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}
export interface ComponentEvent {
  name: string;
  label: string;
}
export interface ComponentMethod {
  name: string;
  label: string;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  editing: any;
  preview: any;
  events?: ComponentEvent[];
  methods?: ComponentMethod[];
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: "Container",
      defaultProps: {},
      desc: "Container",
      editing: ContainerEditing,
      preview: ContainerPreview,
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "Button",
      },
      desc: "Button",
      setter: [
        {
          name: "type",
          label: "Button Type",
          type: "select",
          options: [
            { label: "primary", value: "primary" },
            { label: "secondary", value: "default" },
          ],
        },
        {
          name: "text",
          label: "text",
          type: "input",
        },
      ],
      stylesSetter: [
        {
          name: "width",
          label: "width",
          type: "inputNumber",
        },
        {
          name: "height",
          label: "height",
          type: "inputNumber",
        },
      ],
      editing: ButtonEditing,
      preview: ButtonPreview,
      events: [
        {
          name: "onClick",
          label: "Click",
        },
        {
          name: "onDoubleClick",
          label: "Double Click",
        },
      ],
    },
    Page: {
      name: "Page",
      defaultProps: {},
      desc: "Page",
      editing: PageEditing,
      preview: PagePreview,
    },
    Modal: {
      name: "Modal",
      defaultProps: {
        title: "Modal",
      },
      setter: [
        {
          name: "title",
          label: "title",
          type: "input",
        },
      ],
      stylesSetter: [],
      events: [
        {
          name: "onOk",
          label: "Ok",
        },
        {
          name: "onCancel",
          label: "Cancel",
        },
      ],
      methods: [
        {
          name: "open",
          label: "Open modal",
        },
        {
          name: "close",
          label: "Close modal",
        },
      ],
      desc: "Modal",
      preview: ModalPreview,
      editing: ModalEditing,
    },
    Table: {
      name: "Table",
      defaultProps: {},
      desc: "Table",
      setter: [
        {
          name: "url",
          label: "url",
          type: "input",
        },
      ],
      editing: TableEditing,
      preview: TablePreview,
    },
    TableColumn: {
      name: "TableColumn",
      desc: "TableColumn",
      defaultProps: {
        dataIndex: `col_${new Date().getTime()}`,
        title: "Column Name",
      },
      setter: [
        {
          name: "type",
          label: "type",
          type: "select",
          options: [
            {
              label: "text",
              value: "text",
            },
            {
              label: "date",
              value: "date",
            },
          ],
        },
        {
          name: "title",
          label: "title",
          type: "input",
        },
        {
          name: "dataIndex",
          label: "key",
          type: "input",
        },
      ],
      editing: TableColumnEditing,
      preview: TableColumnPreview,
    },
    Form: {
      name: "Form",
      defaultProps: {},
      desc: "Form",
      setter: [
        {
          name: "title",
          label: "input",
          type: "input",
        },
      ],
      events: [
        {
          name: "onFinish",
          label: "Finish",
        },
      ],
      methods: [
        {
          name: "submit",
          label: "submit",
        },
      ],
      editing: FormEditing,
      preview: FormPreview,
    },
    FormItem: {
      name: "FormItem",
      desc: "FormItem",
      defaultProps: {
        name: new Date().getTime(),
        label: "Name",
      },
      editing: FormItemEditing,
      preview: FormItemPreview,
      setter: [
        {
          name: "type",
          label: "type",
          type: "select",
          options: [
            {
              label: "text",
              value: "input",
            },
            {
              label: "date",
              value: "date",
            },
          ],
        },
        {
          name: "label",
          label: "label",
          type: "input",
        },
        {
          name: "name",
          label: "name",
          type: "input",
        },
        {
          name: "rules",
          label: "rules",
          type: "select",
          options: [
            {
              label: "required",
              value: "required",
            },
          ],
        },
      ],
    },
  },
  registerComponent: (name: string, componentConfig: ComponentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
