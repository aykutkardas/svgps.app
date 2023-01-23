export const getIconSetLink = (iconSetName: string) =>
  iconSetName.replace(
    /(?:-(fill|sharp|outline|twotone-sharp|outline-rounded|outline-sharp|bold|light|thin|twotone|regular)$)/g,
    "/$1"
  );
