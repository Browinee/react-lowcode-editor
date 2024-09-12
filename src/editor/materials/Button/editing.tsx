import { Button as AntdButton } from "antd";
import { ButtonType } from "antd/es/button";
import { CommonComponentProps } from "../../interface";

export interface ButtonProps {
  type: ButtonType;
  text: string;
  id: number;
}

const Button = ({ id, type, text, styles }: CommonComponentProps) => {
  return (
    <AntdButton data-component-id={id} style={styles} type={type}>
      {text}
    </AntdButton>
  );
};

export default Button;
