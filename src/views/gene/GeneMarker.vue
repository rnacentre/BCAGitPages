<template>
  <div class="wrap">
    <b-pane label="ATLAS">
      <atlasBrains isGene @change="changeAtlas" />
    </b-pane>
    <b-pane>
      <div>
        <el-button :type="atlasMarkerBtn=='Region'?'primary':''" @click="setAtlasMarkerBtn('Region')">By Region</el-button>
        <el-button :type="atlasMarkerBtn=='CellType'?'primary':''" @click="setAtlasMarkerBtn('CellType')">By CellType</el-button>
        <!-- <p class="adult-method-cont">Search maker genes in selected markersBy{{atlasMarkerBtn}}.</p> -->
        <p class="adult-method-cont">Search for <span class="strong">differentially expressed genes (DEG)</span> of selected{{ atlasMarkerBtn=='Region'?byRegionTips:byCelltypeTips }}</p>
      </div>
      <el-row :gutter="10" type="flex" align="bottom">
        <el-col :md="8" :sm="24" class="mb10">
          <markerRegion v-model="params.region" :data="regionData" v-if="atlasMarkerBtn=='Region'" @change="regionChange" />
          <cellType v-model="params.cellType" :data="cellTypeData" v-if="atlasMarkerBtn=='CellType'" @change="cellTypeChange" />
        </el-col>
        <el-col :md="8" :sm="24" class="mb10">
          <cellType v-model="params.cellType" :data="cellTypeData" v-if="atlasMarkerBtn=='Region'" @change="cellTypeChange" />
          <markerRegion v-model="params.region" :data="regionData" v-if="atlasMarkerBtn=='CellType'" @change="regionChange" />
        </el-col>
        <el-col :md="4" :sm="4" :xs="8" align="right">
          <el-button type="primary" class="mb10" @click="getParams">
            Markers
          </el-button>
        </el-col>
      </el-row>
    </b-pane>
    <markers ref="markers" :params="params" :atlasMarkerBtn="atlasMarkerBtn" />
  </div>
</template>
<script>
/**
 * 默认展示的：
ByRegion:
Adult_Cerebellum_Oligodendrocyte
Fetal_Prefrontal cortex_Glioblast
Tumour_Pons_Astrocyte
Organoid_Pons_Committed oligodendrocyte precursor
 * byCellType:
Adult_Cingulate cortex_Medium spiny neuron
Fetal_Cerebral cortex_Neural crest
Tumour_Frontal lobe_Oligodendrocyte
Organoid_Cortex_Ependymal
 */
const staticParams = {
  AdultRegion: { atlas: "Adult", region: "Piriform cortex", cellType: "Eccentric medium spiny neuron", },
  FetalRegion: { atlas: "Fetal", region: "Prefrontal cortex", cellType: "Glioblast", },
  TumourRegion: { atlas: "Tumour", region: "Pons", cellType: "Astrocyte", },
  OrganoidRegion: { atlas: "Organoid", region: "Pons", cellType: "Committed oligodendrocyte precursor", },
  MouseRegion: { atlas: "Mouse", region: "", cellType: "", },
  AdultCellType: { atlas: "Adult", region: "Cingulate cortex", cellType: "Medium spiny neuron", },
  FetalCellType: { atlas: "Fetal", region: "Cerebral cortex", cellType: "Neural crest", },
  TumourCellType: { atlas: "Tumour", region: "Frontal lobe", cellType: "Oligodendrocyte", },
  OrganoidCellType: { atlas: "Organoid", region: "Cortex", cellType: "Ependymal", },
  MouseCellType: { atlas: "Mouse", region: "", cellType: "", },
}


import VolcanoByCellType from "@/utils/VolcanoByCellType.json";
import VolcanoByRegion from '@/utils/VolcanoByRegion.json';
export default {
  name: "GeneMarker",
  components: {
    atlasBrains: () => import("@/views/index/components/atlasBrains.vue"),
    markerRegion: () => import("./components/markerRegion.vue"),
    cellType: () => import("./components/cellType.vue"),
    geneMethod: () => import("./components/geneMethod.vue"),
    markers: () => import("./components/markers.vue"),
  },
  data () {
    return {
      params: {
        atlas: "Adult",
        region: "Cerebellum",
        cellType: "Oligodendrocyte",
      },
      atlasMarkerBtn: 'Region',
      regionData: [],
      cellTypeData: [],
      byRegionTips: ' cell type compared to others in the selected brain region.',
      byCelltypeTips: ' brain region compared to others in the selected cell type.'
    }
  },
  watch: {
    // 'params.atlas': {
    //   handler (val) {
    //     if (this.atlasMarkerBtn == 'Region') {
    //       this.regionData = VolcanoByRegion[val] ? Object.keys(VolcanoByRegion[val]) : []
    //       this.cellTypeData = []
    //     } else {
    //       this.cellTypeData = VolcanoByCellType[val] ? Object.keys(VolcanoByCellType[val]) : []
    //       this.regionData = []
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // },
  },
  methods: {
    regionChange (val) {
      console.log('regionChange', val)
      if (this.atlasMarkerBtn == 'Region') {
        this.cellTypeData = VolcanoByRegion[this.params.atlas] ? VolcanoByRegion[this.params.atlas][val] : []
      }
    },
    cellTypeChange (val) {
      if (this.atlasMarkerBtn == 'CellType') {
        this.regionData = VolcanoByCellType[this.params.atlas] ? VolcanoByCellType[this.params.atlas][val] : []
      }
    },
    getParams () {
      this.$refs.markers.fetchMarkers(this.params);
    },
    setAtlasMarkerBtn (val) {
      this.atlasMarkerBtn = val
      this.resetParams(this.params.atlas)
    },
    changeAtlas (val) {
      const atlas = val.name.split(" ")[0];
      this.resetParams(atlas)
    },
    resetParams (atlasValue) {
      const { atlas = atlasValue, region = '', cellType = '' } = staticParams[`${atlasValue}${this.atlasMarkerBtn}`] ?? {} //获取默认的参数
      if (this.atlasMarkerBtn == 'Region') {
        this.regionData = VolcanoByRegion[atlas] ? Object.keys(VolcanoByRegion[atlas]) : []
        this.regionChange(region)
      } else {
        this.cellTypeData = VolcanoByCellType[atlas] ? Object.keys(VolcanoByCellType[atlas]) : []
        this.cellTypeChange(cellType)
      }
      // debugger;
      this.params = { atlas, region, cellType };
      console.log('resetParams', this.params, atlasValue)
      this.$nextTick(() => {
        setTimeout(() => {
          this.getParams()
        }, 300);
      })
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
.adult-method-cont {
  margin: 10px 0;
  // color: #666;
  font-size: 16px;
  .strong {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
