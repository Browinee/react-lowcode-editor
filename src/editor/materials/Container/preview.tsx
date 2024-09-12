import { CommonComponentProps } from "../../interface";

const Container = ({ id, children, styles }: CommonComponentProps) => {
  return (
    <div style={styles} className={`min-h-[100px] p-[20px] `}>
      {children}
    </div>
  );
};

export default Container;
