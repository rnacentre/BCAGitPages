<template>
  <!-- CellType DEG -->
  <div class="wrap">
    <b-pane label="ATLAS">
      <atlasBrains isGene @change="changeAtlas" />
    </b-pane>
    <!-- <b-pane label="METHOD">
      <span>Search</span>
      <el-select v-model="selectMethod" filterable placeholder="Select a method" style="width: 400px; margin: 0 10px">
        <el-option v-for="item in METHODS" :key="item.label" :label="item.label" :value="item.label">
        </el-option>
      </el-select>
      <el-tag v-if="selectMethod && selectMethod !== ''">{{
        selectMethod
      }}</el-tag>
    </b-pane> -->
    <b-pane label="EXPRESSIONS">
      <div>
        <span>Atlas: </span>
        <el-tag v-if="params.atlas && params.atlas !== ''">{{ params.atlas }}</el-tag>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <!-- <span>Method: </span>
        <el-tag v-if="selectMethod && selectMethod !== ''">{{
          selectMethod
        }}</el-tag> -->
        <cellType v-model="params.cellType" cellTypeDEG :atlas="params.atlas" style="width: 250px;" />
        <!-- 图片 -->
        <div class="img-wrap" v-show="params.atlasBrains!=''&&params.cellType!=''">
          <p class="img-title">Expression levels of top 3 DEG across different brain regions in {{params.cellType}}</p>
<!--          第一次是请求方式读取资源-->
<!--          <el-image v-if="params.cellType!=''" :src="`${NODE_ENV}/data/volcano/CellTypeDEG/${params.atlas}_${params.cellType}.png`" alt="">-->
<!--          第二次是更换资源读取方式&#45;&#45;读取项目中public目录下面的资源-->
          <el-image v-if="params.cellType!=''" :src="`${apiBaseUrl}/volcano/CellTypeDEG/${params.atlas}_${params.cellType}.png`" alt="">
            <template #error>
              <div class="image-slot">
                <el-empty description="Not available in current version of Brain Cell Atals"></el-empty>
              </div>
            </template>
          </el-image>
        </div>
      </div>
    </b-pane>
  </div>
</template>
<script>
/**
 * Adult_Lower rhombic lip
Fetal_Fibroblast
Tumour_Committed oligodendrocyte precursor
Organoid_Ependymal
 */
const staticParams = {
  Adult: { atlas: "Adult", cellType: "Lower rhombic lip", },
  Fetal: { atlas: "Fetal", cellType: "Fibroblast", },
  Tumour: { atlas: "Tumour", cellType: "Committed oligodendrocyte precursor", },
  Organoid: { atlas: "Organoid", cellType: "Ependymal", },
  Mouse: { atlas: "Mouse", cellType: "", },
}
import { METHODS } from "@/utils/Atlas";
export default {
  name: "GeneMarker",
  components: {
    atlasBrains: () => import("@/views/index/components/atlasBrains.vue"),
    geneMethod: () => import("./components/geneMethod.vue"),
    cellType: () => import("./components/cellType.vue"),
  },
  data () {
    return {
      selectMethod: "",
      METHODS,
      params: {
        atlas: "Adult",
        cellType: "Lower rhombic lip",
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
      const { atlas = atlas, cellType = '' } = staticParams[`${atlasValue}`] ?? {} //获取默认的参数
      this.params = { atlas, cellType };
      console.log(this.params, cellType)
    },
  },
  mounted () {
    this.resetParams('Adult')
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
