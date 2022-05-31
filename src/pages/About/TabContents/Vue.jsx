import Highlight from "react-highlight";

import styles from "../About.module.css";

const TabContentVue = () => (
  <div>
    <p>Install</p>
    <Highlight className="bash">{`npm install vue-icomoon`}</Highlight>
    <Highlight className="bash">{`yarn add vue-icomoon`}</Highlight>
    <p>Define `Icon.vue` component</p>
    <Highlight className="vue">
      {`
<template>
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
</script>
        `}
    </Highlight>
    <p>And use</p>
    <Highlight className="react">
      {`
<template>
  <icon name="camera" :size="50" color="#5096ec" />
</template>

<script>
  import Icon from "./components/Icon/Icon.vue";

  export default {
    components: {
      Icon,
    },
  };
</script>
        `}
    </Highlight>
    <p>
      <a
        className={styles.Link}
        href="https://github.com/aykutkardas/vue-icomoon"
        target="_blank"
        rel="noopener noreferrer"
      >
        vue-icomoon
      </a>
    </p>
  </div>
);

export default TabContentVue;
