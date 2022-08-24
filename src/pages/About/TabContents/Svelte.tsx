import Highlighter from "src/components/Highlighter";
import Icon from "src/components/Icon";

const TabContentSvelte = () => (
  <div>
    <p>
      <a
        className="text-white"
        href="https://github.com/aykutkardas/svelte-icomoon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon icon="github" size={18} />
        svelte-icomoon
      </a>
      <a
        className="text-white"
        href="https://www.npmjs.com/package/svelte-icomoon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon icon="npm" size={16} color="#ea2039" />
        npm
      </a>
    </p>
    <p>Install</p>
    <Highlighter language="bash">{`npm install svelte-icomoon`}</Highlighter>
    <Highlighter language="bash">{`yarn add svelte-icomoon`}</Highlighter>
    <p>Define `Icon.svelte` component</p>
    <Highlighter language="html">
      {`
<script>
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

<Icomoon {...props} iconSet="{iconSet}" />
        `}
    </Highlighter>
    <p>And use</p>
    <Highlighter language="html">
      {`
<script>
  import Icon from "./Icon.svelte";
</script>

<Icon name="pencil" size="{30}" color="blue" />
        `}
    </Highlighter>
  </div>
);

export default TabContentSvelte;
