// https://github.com/aykutkardas/react-icomoon/blob/master/src/index.tsx#L8
export type IconSetItem = {
  properties: {
    name: string;
    iconSetName?: string;
  };
  icon: {
    paths: string[];
    attrs?: Record<string, string | number>[];
    width?: number;
  };
  id?: string;
  __meta?: {
    id?: number | string;
    _selected?: boolean;
    content?: string;
  };
  [key: string]: unknown;
};

export type IconSet = {
  generatorSource?: string;
  IcoMoonType?: string;
  icons: IconSetItem[];
};
