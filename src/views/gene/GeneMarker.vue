<template>
  <div id="browserWrap" class="iframe-wrap" style="height: calc(100vh)">
    <c-iframe :openUrl="openUrl" cid="dataBrowser" pid="browserWrap" ref="iframe"></c-iframe>
  </div>
</template>
<script>
export default {
  name: "geneformarker",
  data () {
    return {
      openUrl: "https://brain.ifr.unifiedcellatlas.org:61011/#/geneformarker",
    };
  },
  components: {
    // CIframe: () => import("./components/Ciframe.vue"),
  },
};
</script>
<style lang="scss"></style>
