import { Button, Space } from "antd";
import { useComponentsStore } from "../stores/components";

export function Header() {
  const { mode, setMode, setCurComponentId } = useComponentsStore();

  return (
    <div className="w-[100%] h-[100%]">
      <div className="h-[50px] flex justify-between items-center px-[20px]">
        <div>LowCode</div>
        <Space>
          {mode === "edit" && (
            <Button
              onClick={() => {
                setMode("preview");
                setCurComponentId(null);
              }}
              type="primary"
            >
              Preview
            </Button>
          )}
          {mode === "preview" && (
            <Button
              onClick={() => {
                setMode("edit");
              }}
              type="primary"
            >
              Exit preview
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
}
