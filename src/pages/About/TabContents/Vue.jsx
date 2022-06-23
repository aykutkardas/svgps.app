import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import styles from "../About.module.css";

const TabContentVue = () => (
  <div>
    <p>Install</p>
    <SyntaxHighlighter
      language="bash"
      style={a11yDark}
    >{`npm install vue-icomoon`}</SyntaxHighlighter>
    <SyntaxHighlighter
      language="bash"
      style={a11yDark}
    >{`yarn add vue-icomoon`}</SyntaxHighlighter>
    <p>Define `Icon.vue` component</p>
    <SyntaxHighlighter style={a11yDark}>
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
    </SyntaxHighlighter>
    <p>And use</p>
    <SyntaxHighlighter style={a11yDark}>
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
    </SyntaxHighlighter>
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
