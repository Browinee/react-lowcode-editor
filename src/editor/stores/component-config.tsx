import { create } from "zustand";
import ContainerEditing from "../materials/Container/editing";
import ContainerPreview from "../materials/Container/preview";
import ButtonEditing from "../materials/Button/editing";
import ButtonPreview from "../materials/Button/preview";
import PageEditing from "../materials/Page/editing";
import PagePreview from "../materials/Page/preview";
import ModalPreview from "../materials/Modal/preview";
import ModalEditing from "../materials/Modal/editing";

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

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  editing: any;
  preview: any;
  events?: ComponentEvent[];
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
      desc: "Modal",
      preview: ModalPreview,
      editing: ModalEditing,
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
