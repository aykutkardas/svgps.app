export const data = [
  {
    value: "react",
    icon: "react",
    label: "React",
    link: "https://github.com/aykutkardas/react-icomoon",
    example: `import IcoMoon from "react-icomoon";
import iconSet from "./selection.json";

const Icon = (props) => (
  <IcoMoon iconSet={iconSet} {...props} />
);

export default Icon;`,
  },
  {
    value: "react-native",
    icon: "react",
    label: "React Native",
    link: "https://github.com/aykutkardas/react-icomoon#react-native---demo",
    example: `import IcoMoon from "react-icomoon";
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
    value: "vue",
    icon: "vue",
    label: "Vue",
    link: "https://github.com/aykutkardas/vue-icomoon",
    example: `<template>
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
    icon: "svelte",
    label: "Svelte",
    link: "https://github.com/aykutkardas/svelte-icomoon",
    example: `<script>
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
    name, title, color, size, disableFill, removeInitialStyle 
  };
</script>

<Icomoon {...props} iconSet="{iconSet}" />`,
  },
];
