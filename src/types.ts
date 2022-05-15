export type IconType = {
  _selected?: boolean;
  id: string;
  name: string;
  content: string;
  paths: string[];
  fills: string[];
  width: number;
  height: number;
  viewBox: string;
};

export type IconsType = IconType[];

// https://github.com/aykutkardas/react-icomoon/blob/master/src/index.tsx#L8
type IconSetItem = {
  properties: {
    name: string;
  };
  icon: {
    paths: string[];
    attrs?: Object[];
    width?: number | string;
  };
};

export type IconSet = {
  generatorSource?: string;
  IcoMoonType?: string;
  icons: IconSetItem[];
};
