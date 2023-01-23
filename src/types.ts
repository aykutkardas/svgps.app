// https://github.com/aykutkardas/react-icomoon/blob/master/src/index.tsx#L8
export type IconSetItem = {
  properties: {
    name: string;
    iconSetName?: string;
  };
  icon: {
    paths: string[];
    attrs?: Object[];
    width?: number;
  };
  [key: string]: any;
};

export type IconSet = {
  generatorSource?: string;
  IcoMoonType?: string;
  icons: IconSetItem[];
};
