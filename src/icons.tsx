import SimpleLineIcons from "./assets/icons/demo/simple-line-icons.json";
import ElementPlus from "./assets/icons/demo/element-plus.json";
import Nimbus from "./assets/icons/demo/nimbus.json";
import Zondicons from "./assets/icons/demo/zondicons.json";
import Feather from "./assets/icons/demo/feather.json";
import GoogleMaterialIcons from "./assets/icons/demo/google-material-icons.json";
import HeroIcons from "./assets/icons/demo/heroicons.json";
import BootstrapIcons from "./assets/icons/demo/bootstrap-icons.json";
import IcomoonFree from "./assets/icons/demo/icomoon-free.json";
import LineAwesome from "./assets/icons/demo/line-awesome.json";
import Carbon from "./assets/icons/demo/carbon.json";
import FluentUISystemIcons from "./assets/icons/demo/fluent-ui-system-icons.json";
import Phosphor from "./assets/icons/demo/phosphor.json";
import Zwicon from "./assets/icons/demo/zwicon.json";
import MaterialSymbols from "./assets/icons/demo/material-symbols.json";
import Majesticons from "./assets/icons/demo/majesticons.json";
import Linecons from "./assets/icons/demo/linecons.json";
import _60Vicons from "./assets/icons/demo/60-vicons.json";
import Entypo from "./assets/icons/demo/entypo.json";
import FontAwesome from "./assets/icons/demo/font-awesome.json";
import FontAwesomeBrands from "./assets/icons/demo/font-awesome-brands.json";
import Fontisto from "./assets/icons/demo/fontisto.json";
import IonIcons from "./assets/icons/demo/ion-icons.json";
import Unicons from "./assets/icons/demo/unicons.json";
import EverIcons from "./assets/icons/demo/evericons.json";
import Hawcons from "./assets/icons/demo/hawcons.json";

export type Variant = {
  name: string;
  icon: string;
  default?: boolean;
};

export const VARIANTS = {
  regular: {
    name: "Regular",
    slug: "regular",
    icon: "v-rounded-outline",
  },
  fill: {
    name: "Fill",
    slug: "fill",
    icon: "v-rounded-fill",
  },
  "fill-sharp": {
    name: "Fill Sharp",
    slug: "fill-sharp",
    icon: "v-sharp-fill",
  },
  sharp: {
    name: "Sharp",
    slug: "sharp",
    icon: "v-sharp-outline",
  },
  twotone: {
    name: "Twotone",
    slug: "twotone",
    icon: "v-rounded-twotone",
  },
  "twotone-sharp": {
    name: "Sharp Twotone",
    slug: "twotone-sharp",
    icon: "v-sharp-twotone",
  },
  bold: {
    name: "Bold",
    slug: "bold",
    icon: "v-rounded-bold",
  },
  light: {
    name: "Light",
    slug: "light",
    icon: "v-rounded-light",
  },
  thin: {
    name: "Thin",
    slug: "thin",
    icon: "v-rounded-thin",
  },
  rounded: {
    name: "Rounded",
    slug: "rounded",
    icon: "v-rounded-outline",
  },
  outline: {
    name: "Outline",
    slug: "outline",
    icon: "v-rounded-outline",
  },
  "outline-sharp": {
    name: "Outline-Sharp",
    slug: "outline-sharp",
    icon: "v-sharp-outline",
  },
  "outline-rounded": {
    name: "Outline-Rounded",
    slug: "outline-rounded",
    icon: "v-rounded-outline",
  },
};

const icons = [
  {
    slug: "simple-line-icons",
    name: "Simple Line Icons",
    creator: "Sabbir Ahmed",
    link: "https://github.com/thesabbir/simple-line-icons",
    licence: "MIT",
    licenceLink:
      "https://github.com/thesabbir/simple-line-icons/blob/master/LICENSE.md",
    count: 194,
    icons: SimpleLineIcons,
    variants: [VARIANTS.outline],
  },
  {
    slug: "element-plus",
    name: "Element Plus",
    creator: "Element Plus",
    link: "https://github.com/element-plus/element-plus-icons",
    licence: "MIT",
    licenceLink:
      "https://github.com/element-plus/element-plus-icons/blob/main/LICENSE",
    count: 293,
    icons: ElementPlus,
    variants: [VARIANTS.outline],
  },
  {
    slug: "nimbus",
    name: "Nimbus",
    creator: "Linkedstore S.A.",
    link: "https://github.com/TiendaNube/nimbus-icons",
    licence: "MIT",
    licenceLink:
      "https://github.com/TiendaNube/nimbus-icons/blob/develop/LICENSE",
    count: 136,
    icons: Nimbus,
    variants: [VARIANTS.outline],
  },
  {
    slug: "zondicons",
    name: "Zondicons",
    creator: "Steve Schoger",
    link: "https://github.com/dukestreetstudio/zondicons",
    licence: "MIT",
    licenceLink:
      "https://github.com/dukestreetstudio/zondicons/blob/master/LICENSE",
    count: 301,
    icons: Zondicons,
    variants: [VARIANTS.fill],
  },
  {
    slug: "feather",
    name: "Feather",
    creator: "Feather",
    link: "https://github.com/feathericons/feather",
    licence: "MIT",
    licenceLink: "https://github.com/feathericons/feather/blob/master/LICENSE",
    count: 287,
    icons: Feather,
    variants: [VARIANTS.outline],
  },
  {
    slug: "material-symbols",
    name: "Material Symbols",
    creator: "Google",
    link: "https://github.com/google/material-design-icons",
    licence: "Apache 2.0",
    licenceLink:
      "https://github.com/google/material-design-icons/blob/master/LICENSE",
    count: 2300 + 1391 + 1077 + 815 + 1762 + 1009,
    icons: MaterialSymbols,
    variants: [
      VARIANTS.fill,
      VARIANTS.sharp,
      VARIANTS.rounded,
      VARIANTS.outline,
      VARIANTS["outline-sharp"],
      VARIANTS["outline-rounded"],
    ],
  },
  {
    slug: "google-material-icons",
    name: "Google Material Icons",
    creator: "Material Design Authors",
    link: "https://github.com/material-icons/material-icons",
    licence: "Apache 2.0",
    licenceLink:
      "https://github.com/material-icons/material-icons/blob/master/LICENSE",
    count: 2191 + 2191 + 2191 + 2191,
    icons: GoogleMaterialIcons,
    variants: [
      VARIANTS.fill,
      VARIANTS.outline,
      VARIANTS.sharp,
      VARIANTS["twotone-sharp"],
    ],
  },
  {
    slug: "heroicons",
    name: "Heroicons",
    creator: "Tailwind Labs",
    link: "https://github.com/tailwindlabs/heroicons",
    licence: "MIT",
    licenceLink:
      "https://github.com/tailwindlabs/heroicons/blob/master/LICENSE",
    count: 292 + 292,
    icons: HeroIcons,
    variants: [VARIANTS.fill, VARIANTS.outline],
  },
  {
    slug: "bootstrap-icons",
    name: "Bootstrap Icons",
    creator: "The Bootstrap Authors",
    link: "https://github.com/twbs/icons",
    licence: "MIT",
    licenceLink: "https://github.com/twbs/icons/blob/main/LICENSE.md",
    count: 1214 + 603,
    icons: BootstrapIcons,
    variants: [VARIANTS.outline, VARIANTS.fill],
  },
  {
    slug: "icomoon-free",
    name: "Icomoon Free",
    creator: "Keyamoon",
    link: "https://github.com/Keyamoon/IcoMoon-Free",
    licence: "GPL",
    licenceLink:
      "https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt",
    count: 491,
    icons: IcomoonFree,
    variants: [VARIANTS.fill],
  },
  {
    slug: "line-awesome",
    name: "Line Awesome",
    creator: "Icons8",
    link: "https://github.com/icons8/line-awesome",
    licence: "MIT",
    licenceLink:
      "https://github.com/icons8/line-awesome/blob/master/LICENSE.md",
    count: 1544,
    icons: LineAwesome,
    variants: [VARIANTS.outline],
  },
  {
    slug: "carbon",
    name: "Carbon",
    creator: "IBM",
    link: "https://github.com/carbon-design-system/carbon/tree/main/packages/icons",
    licence: "Apache 2.0",
    licenceLink:
      "https://github.com/carbon-design-system/carbon/blob/main/LICENSE",
    count: 1942,
    icons: Carbon,
    variants: [VARIANTS.outline],
  },
  {
    slug: "fluent-ui-system-icons",
    name: "Fluent UI System Icons",
    creator: "Microsoft Corporation",
    link: "https://github.com/microsoft/fluentui-system-icons",
    licence: "MIT",
    licenceLink:
      "https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE",
    count: 2082 + 2077,
    icons: FluentUISystemIcons,
    variants: [VARIANTS.outline, VARIANTS.fill],
  },
  {
    slug: "phosphor",
    name: "Phosphor",
    creator: "Phosphor Icons",
    link: "https://github.com/phosphor-icons/phosphor-icons",
    licence: "MIT",
    licenceLink:
      "https://github.com/phosphor-icons/phosphor-icons/blob/master/LICENSE",
    count: 1046 + 1047 + 1049 + 1053 + 1048 + 1047,
    icons: Phosphor,
    variants: [
      VARIANTS.outline,
      VARIANTS.twotone,
      VARIANTS.fill,
      VARIANTS.bold,
      VARIANTS.light,
      VARIANTS.thin,
    ],
  },
  {
    slug: "zwicon",
    name: "Zwicon",
    creator: "Zwoelf",
    link: "https://www.zwicon.com/cheatsheet.html",
    licence: "CC BY-ND 4.0",
    licenceLink: "https://creativecommons.org/licenses/by-nd/4.0/",
    count: 546,
    icons: Zwicon,
    variants: [VARIANTS.outline],
  },
  {
    slug: "majesticons",
    name: "Majesticons",
    creator: "Gerrit Halfmann",
    link: "https://github.com/halfmage/majesticons",
    licence: "MIT",
    licenceLink: "https://github.com/halfmage/majesticons/blob/main/LICENSE",
    count: 380,
    icons: Majesticons,
    variants: [VARIANTS.outline],
  },
  {
    slug: "linecons",
    name: "Linecons",
    creator: "Sergey Shmidt",
    link: "https://designmodo.com/linecons-free/",
    licence: "CC BY-SA 3.0",
    licenceLink: "https://creativecommons.org/licenses/by-sa/3.0/us/",
    count: 48,
    icons: Linecons,
    variants: [VARIANTS.outline],
  },
  {
    slug: "60-vicons",
    name: "60 Vicons",
    creator: "Victor Erixon",
    link: "https://dribbble.com/shots/1663443-60-Vicons-Free-Icon-Set",
    licence: "Custom",
    licenceLink: "https://dribbble.com/shots/1663443-60-Vicons-Free-Icon-Set",
    count: 60,
    icons: _60Vicons,
    variants: [VARIANTS.outline],
  },
  {
    slug: "entypo",
    name: "Entypo",
    creator: "Daniel Bruce",
    link: "http://www.entypo.com/",
    licence: "CC BY-SA 4.0",
    licenceLink: "https://creativecommons.org/licenses/by-sa/4.0/",
    count: 385,
    icons: Entypo,
    variants: [VARIANTS.fill],
  },
  {
    slug: "font-awesome",
    name: "Font Awesome",
    creator: "Dave Gandy",
    link: "https://github.com/FortAwesome/Font-Awesome",
    licence: "CC BY 4.0",
    licenceLink: "https://creativecommons.org/licenses/by/4.0/",
    count: 1394 + 164,
    icons: FontAwesome,
    variants: [VARIANTS.fill, VARIANTS.regular],
  },
  {
    slug: "font-awesome-brands",
    name: "Font Awesome Brands",
    creator: "Dave Gandy",
    link: "https://github.com/FortAwesome/Font-Awesome",
    licence: "CC BY 4.0",
    licenceLink: "https://creativecommons.org/licenses/by/4.0/",
    count: 488,
    icons: FontAwesomeBrands,
    variants: [VARIANTS.fill],
  },
  {
    slug: "fontisto",
    name: "Fontisto",
    creator: "Kenan Gündoğan",
    link: "https://github.com/kenangundogan/fontisto",
    licence: "MIT",
    licenceLink:
      "https://github.com/kenangundogan/fontisto/blob/master/LICENSE",
    count: 615,
    icons: Fontisto,
    variants: [VARIANTS.fill],
  },
  {
    slug: "ion-icons",
    name: "Ion Icons",
    creator: "Ben Sperry",
    link: "https://github.com/ionic-team/ionicons",
    licence: "MIT",
    licenceLink: "https://github.com/ionic-team/ionicons/blob/main/LICENSE",
    count: 1333 + 414 + 589,
    icons: IonIcons,
    variants: [VARIANTS.fill, VARIANTS.outline, VARIANTS.sharp],
  },
  {
    slug: "unicons",
    name: "Unicons",
    creator: "Iconscout",
    link: "https://github.com/Iconscout/unicons",
    licence: "Custom",
    licenceLink: "https://github.com/Iconscout/unicons/blob/master/LICENSE",
    count: 1207,
    icons: Unicons,
    variants: [VARIANTS.outline],
  },
  {
    slug: "evericons",
    name: "Evericons",
    creator: "Aleksey Popov",
    link: "http://www.evericons.com/",
    licence: "CC0 1.0",
    licenceLink: "https://creativecommons.org/publicdomain/zero/1.0/",
    count: 462,
    icons: EverIcons,
    variants: [VARIANTS.outline],
  },
  {
    slug: "hawcons",
    name: "Hawcons",
    creator: "Yannick Lung",
    link: "https://hawcons.com/",
    licence: "Custom",
    licenceLink: "https://hawcons.com/faq/",
    count: 520 + 516,
    icons: Hawcons,
    variants: [VARIANTS.outline, VARIANTS.fill],
  },
].sort((a, b) => a.name.localeCompare(b.name));

export default icons;
