<template>
  <!-- Region DEG -->
  <div class="wrap">
    <b-pane label="ATLAS">
      <atlasBrains isGene @change="changeAtlas" />
    </b-pane>
    <b-pane label="EXPRESSIONS">
      <div>
        <span>Atlas : </span><el-tag v-if="params.atlas && params.atlas !== ''">{{
          params.atlas
        }}</el-tag>
      </div>
      <markerRegion v-model="params.region" regionDEG :atlas="params.atlas" style="width:250px" />
      <!-- 图片 -->
      <div class="img-wrap" v-show="params.atlasBrains!=''&&params.region!=''">
        <p class="img-title">Expression levels of top 3 DEG across different cell types in {{params.region}}</p>
<!--          第一次是请求方式读取资源-->
<!--        <el-image v-if="params.region!=''" :src="`${NODE_ENV}/data/volcano/RegionDEG/${params.atlas}_${params.region}.png`" alt="">-->
<!--          第二次是更换资源读取方式&#45;&#45;读取项目中public目录下面的资源-->
       <el-image :src="`${apiBaseUrl}/volcano/RegionDEG/${params.atlas}_${params.region}.png`" alt="" style="width:58%">
        <template #error>
            <div class="image-slot">
              <el-empty description="Not available in current version of Brain Cell Atals"></el-empty>
            </div>
          </template>
        </el-image>
      </div>
    </b-pane>
  </div>
</template>
<script>
/**
 * Adult_Medulla oblongata
Fetal_Medulla
Tumour_Parietal lobe
Organoid_Parietal lobe
 */
const staticParams = {
  Adult: { atlas: "Adult", region: "Medulla oblongata", },
  Fetal: { atlas: "Fetal", region: "Medulla", },
  Tumour: { atlas: "Tumour", region: "Parietal lobe", },
  Organoid: { atlas: "Organoid", region: "Parietal lobe", },
  Mouse: { atlas: "Mouse", region: "", },
}
export default {
  name: "GeneMarker",
  components: {
    atlasBrains: () => import("@/views/index/components/atlasBrains.vue"),
    markerRegion: () => import("./components/markerRegion.vue"),
  },
  data () {
    return {
      params: {
        atlas: "Adult",
        region: "Medulla oblongata",
      },
      imgSrc: "",
      // NODE_ENV: process.env.NODE_ENV === "production" ? "" : "/api",
      apiBaseUrl: "https://data.braincellatlas.org",
    };
  },
  methods: {
    changeAtlas (val) {
      const atlas = val.name.split(" ")[0];
      this.resetParams(atlas)
    },
    resetParams (atlasValue) {
      const { atlas = atlasValue, region } = staticParams[`${atlasValue}`] ?? {} //获取默认的参数
      this.params = { atlas, region };
      console.log('resetParams', this.params, region, staticParams[`${atlasValue}`])
    },
  },
  mounted () {

    // setTimeout(() => {
    this.resetParams('Adult')
    // }, 300);
  },
};
</script>
<style lang="scss" scoped>
.img-wrap {
  text-align: center;
  padding: 20px;
  .img-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  img {
    max-width: 100%;
  }
}
</style>
