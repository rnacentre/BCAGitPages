<template>
  <div style="background:white;">
    <!-- <div class="wrap"> -->
    <!-- <component :is="component" :key="component.name" :atlasName="atlasName" /> -->
    <IndexComp />
    <div class="wrap">
    <div class="contact-wrap">
    <div class="mtit">
        <div class="t">Cite us</div>
        <div class="f">
          <p>Chen, Xinyue & Huang, Yin & Huang, Ziliang & Xu, Lahong & Huang, Liangfeng & Ye, Mingli & You, Renke & Zhang, Xuegong & Miao, Zhichao*. (2023). Brain Cell Atlas: An Integrative Ensemble of Cell Transcriptomes Across Human Brain Regions. 10.21203/rs.3.rs-3221500/v1. </p>
        </div>
      </div>
    </div>
  </div>
    <div style="height: 30px"></div>
    <!-- </div> -->

  </div>
</template>
<script>
export default {
  name: "index",
  components: {
    AnatomyBrain: () => import("./components/AnatomyBrain.vue"),
    IndexComp: () => import("./components/IndexComp.vue"),
  },
  data () {
    return {
      atlasName: "",
      component: "IndexComp",
    };
  },
  watch: {
    $route (to, from) {
      console.log(to);
      if (to.query.atlasName && to.path == "/index") {
        this.component = "AnatomyBrain";
        const { atlasName } = to.query;
        this.atlasName = atlasName;
      } else if (!to.query.atlasName && to.path == "/index") {
        this.component = "IndexComp";
      }
    },
  },
  mounted () {
    if (this.$route.query.atlasName && this.$route.path == "/index") {
      this.component = "AnatomyBrain";
      const { atlasName } = this.$route.query;
      this.atlasName = atlasName;
    } else if (!this.$route.query.atlasName && this.$route.path == "/index") {
      this.component = "IndexComp";
    }
  },
};
</script>
<style lang="scss" scoped>
.contact-wrap {
  margin-top: 60px;
}
.mtit {
  .t {
    font-size: 24px;
    line-height: 62px;
  }
  .f p {
    padding-top: 0px;
  }
}
</style>