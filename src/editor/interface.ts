import { PropsWithChildren } from "react";

export interface CommonComponentProps extends PropsWithChildren {
  id: number;
  name: string;
  styles?: React.CSSProperties;
  [key: string]: any;
}
