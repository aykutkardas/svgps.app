export const data = [
  {
    value: "react",
    syntax: "jsx",
    icon: "react",
    label: "React",
    link: {
      title: "react-icomoon",
      url: "https://github.com/aykutkardas/react-icomoon",
    },
    sample: `import IcoMoon from "react-icomoon";
import iconSet from "./selection.json";

const Icon = (props) => (
  <IcoMoon iconSet={iconSet} {...props} />
);

export default Icon;`,
  },
  {
    value: "react-native",
    syntax: "jsx",
    icon: "react",
    label: "React Native",
    link: {
      title: "react-icomoon",
      url: "https://github.com/aykutkardas/react-icomoon#react-native---demo",
    },
    sample: `import IcoMoon from "react-icomoon";
import { Svg, Path } from "react-native-svg";
import iconSet from "./selection.json";

const Icon = (props) => (
  <IcoMoon
    native
    SvgComponent={Svg}
    PathComponent={Path}
    iconSet={iconSet}
    {...props}
  />
);

export default Icon;`,
  },
  {
    value: "preact",
    syntax: "jsx",
    icon: "preact",
    label: "Preact",
    link: {
      title: "preact-icomoon",
      url: "https://github.com/aykutkardas/preact-icomoon",
    },
    sample: `import IcoMoon from "preact-icomoon";
import iconSet from "./selection.json";

const Icon = (props) => (
  <IcoMoon iconSet={iconSet} {...props} />
);

export default Icon;`,
  },
  {
    value: "vue",
    syntax: "javascript",
    icon: "vue",
    label: "Vue",
    link: {
      title: "vue-icomoon",
      url: "https://github.com/aykutkardas/vue-icomoon",
    },
    sample: `<template>
  <icomoon :iconSet="iconSet" v-bind="props" />
</template>

<script>
  import { Icomoon } from "vue-icomoon";
  import iconSet from "./selection.json";

  export default {
    name: "Icon",
    components: {
      Icomoon,
    },
    props: {
      name: {
        type: String,
        required: true,
      },
      // ...
    },
    setup(props) {
      return {
        props,
        iconSet,
      };
    },
  };
</script>`,
  },
  {
    value: "svelte",
    syntax: "javascript",
    icon: "svelte",
    label: "Svelte",
    link: {
      title: "svelte-icomoon",
      url: "https://github.com/aykutkardas/svelte-icomoon",
    },
    sample: `<script>
import Icomoon from "svelte-icomoon";
import iconSet from "./selection.json";

export let name;
export let title;
export let color;
export let size = 16;
export let disableFill = false;
export let removeInitialStyle = false;
export const style = {};
const props = { 
  name, 
  title, 
  color, 
  size, 
  disableFill, 
  removeInitialStyle 
};
</script>

<Icomoon {...props} iconSet="{iconSet}" />`,
  },
];
