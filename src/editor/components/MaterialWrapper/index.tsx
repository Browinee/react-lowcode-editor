import { Segmented } from "antd";
import { useState } from "react";
import { Material } from "../Material";
import { Outline } from "../Outline";
import { Source } from "../Source";

export function MaterialWrapper() {
  const [key, setKey] = useState<string>("Material");

  return (
    <div>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={["Material", "Outline", "SourceCode"]}
      />
      <div
        className="pt-[20px] h-[calc(100vh-60px-30px-20px)]
"
      >
        {key === "Material" && <Material />}
        {key === "Outline" && <Outline />}
        {key === "SourceCode" && <Source />}
      </div>
    </div>
  );
}
