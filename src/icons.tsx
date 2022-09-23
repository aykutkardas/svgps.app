import SimpleLineIcons from "./assets/icons/demo/simple-line-icons.json";
import ElementPlus from "./assets/icons/demo/element-plus.json";
import Nimbus from "./assets/icons/demo/nimbus.json";
import Zondicons from "./assets/icons/demo/zondicons.json";
import Feather from "./assets/icons/demo/feather.json";
import GoogleMaterialIcons from "./assets/icons/demo/google-material-icons.json";
import HeroIcons from "./assets/icons/demo/heroicons.json";
import HeroIconsOutline from "./assets/icons/demo/heroicons-outline.json";
import BootstrapIcons from "./assets/icons/demo/bootstrap-icons.json";
import BootstrapIconsFill from "./assets/icons/demo/bootstrap-icons-fill.json";
import IcomoonFree from "./assets/icons/demo/icomoon-free.json";
import LineAwesome from "./assets/icons/demo/line-awesome.json";
import Carbon from "./assets/icons/demo/carbon.json";
import FluentUISystemIcons from "./assets/icons/demo/fluent-ui-system-icons.json";
import FluentUISystemIconsFill from "./assets/icons/demo/fluent-ui-system-icons-fill.json";
import Phosphor from "./assets/icons/demo/phosphor.json";

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
  },
  {
    slug: "google-material-icons",
    name: "Google Material Icons",
    creator: "Material Design Authors",
    link: "https://github.com/material-icons/material-icons",
    licence: "Apache 2.0",
    licenceLink:
      "https://github.com/material-icons/material-icons/blob/master/LICENSE",
    count: 2191,
    icons: GoogleMaterialIcons,
  },
  {
    slug: "heroicons",
    name: "Heroicons",
    creator: "Tailwind Labs",
    link: "https://github.com/tailwindlabs/heroicons",
    licence: "MIT",
    licenceLink:
      "https://github.com/tailwindlabs/heroicons/blob/master/LICENSE",
    count: 292,
    icons: HeroIcons,
  },
  {
    slug: "heroicons-outline",
    name: "Heroicons - Outline",
    creator: "Tailwind Labs",
    link: "https://github.com/tailwindlabs/heroicons",
    licence: "MIT",
    licenceLink:
      "https://github.com/tailwindlabs/heroicons/blob/master/LICENSE",
    count: 292,
    icons: HeroIconsOutline,
  },
  {
    slug: "bootstrap-icons",
    name: "Bootstrap Icons",
    creator: "The Bootstrap Authors",
    link: "https://github.com/twbs/icons",
    licence: "MIT",
    licenceLink: "https://github.com/twbs/icons/blob/main/LICENSE.md",
    count: 1214,
    icons: BootstrapIcons,
  },
  {
    slug: "bootstrap-icons-fill",
    name: "Bootstrap Icons - Fill",
    creator: "The Bootstrap Authors",
    link: "https://github.com/twbs/icons",
    licence: "MIT",
    licenceLink: "https://github.com/twbs/icons/blob/main/LICENSE.md",
    count: 603,
    icons: BootstrapIconsFill,
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
  },
  {
    slug: "fluent-ui-system-icons",
    name: "Fluent UI System Icons",
    creator: "Microsoft Corporation",
    link: "https://github.com/microsoft/fluentui-system-icons",
    licence: "MIT",
    licenceLink:
      "https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE",
    count: 2082,
    icons: FluentUISystemIcons,
  },
  {
    slug: "fluent-ui-system-icons-fill",
    name: "Fluent UI System Icons - Fill",
    creator: "Microsoft Corporation",
    link: "https://github.com/microsoft/fluentui-system-icons",
    licence: "MIT",
    licenceLink:
      "https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE",
    count: 2077,
    icons: FluentUISystemIconsFill,
  },
  {
    slug: "phosphor",
    name: "Phosphor",
    creator: "Phosphor Icons",
    link: "https://github.com/phosphor-icons/phosphor-icons",
    licence: "MIT",
    licenceLink:
      "https://github.com/phosphor-icons/phosphor-icons/blob/master/LICENSE",
    count: 1046,
    icons: Phosphor,
  },
];

export default icons;
