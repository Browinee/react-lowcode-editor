import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  component: any;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  component: any;
  desc: string;
  setter?: ComponentSetter[];
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
      component: Container,
      desc: "Container",
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "Button",
      },
      desc: "Button",
      component: Button,
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
    },
    Page: {
      name: "Page",
      defaultProps: {},
      component: Page,
      desc: "Page",
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
