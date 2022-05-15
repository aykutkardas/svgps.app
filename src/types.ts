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
