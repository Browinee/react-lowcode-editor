import { Button as AntdButton } from "antd";
import { ButtonType } from "antd/es/button";
import { CommonComponentProps } from "../../interface";
import { useDrag } from "react-dnd";

export interface ButtonProps {
  type: ButtonType;
  text: string;
  id: number;
}

const Button = ({ id, type, text, styles }: CommonComponentProps) => {
  const [_, drag] = useDrag({
    type: "Button",
    item: {
      type: "Button",
      dragType: "move",
      id,
    },
  });

  return (
    <AntdButton ref={drag} data-component-id={id} style={styles} type={type}>
      {text}
    </AntdButton>
  );
};

export default Button;
