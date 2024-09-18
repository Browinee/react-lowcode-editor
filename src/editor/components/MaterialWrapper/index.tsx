import { Segmented } from "antd";
import { useState } from "react";
import { Material } from "../Material";
import { Outline } from "../Outline";
import { Source } from "../Source";

const enum MaterialType {
  Material = "Material",
  Outline = "Outline",
  SourceCode = "SourceCode",
}
export function MaterialWrapper() {
  const [key, setKey] = useState<string>(MaterialType.Material);

  return (
    <div>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={[
          MaterialType.Material,
          MaterialType.Outline,
          MaterialType.SourceCode,
        ]}
      />
      <div
        className="pt-[20px] h-[calc(100vh-60px-30px-20px)]
"
      >
        {key === MaterialType.Material && <Material />}
        {key === MaterialType.Outline && <Outline />}
        {key === MaterialType.SourceCode && <Source />}
      </div>
    </div>
  );
}
