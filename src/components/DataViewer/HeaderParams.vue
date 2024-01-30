<template>
<div>
  <el-form class="params-form" ref="form" :model="form" label-width="80px">
    <el-form-item label="Atlas">
      <el-select
        class="select-space"
        filterable
        clearable
        v-model="form.atlas"
        placeholder="please select atlas"
        @change="changeAtlas(form.atlas)"
      >
        <el-option
          v-for="(item) in altasOptionsData"
          :label="item['label']"
          :value="item['value']"
          :key="item['value']"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Region">
      <el-select
        class="select-space"
        v-model="form.region"
        filterable
        clearable
        placeholder="please select region">
        <el-option
          v-for="(item) in regionOptionsData"
          :label="item['label']"
          :value="item['value']"
          :key="item['value']"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-button class="submit-button" type="primary" @click="submitParams(form)">Submits</el-button>
  </el-form>
</div>
</template>

<script>
import regionOptions from "../../../mock/TumourForTest/atlas_region.json"
export default {
  name: "HeaderParams",
  data(){
    return{
      form: {
        atlas: 'Tumour',
        region: 'Cerebral cortex',
      },
      altasOptionsData:[
        {
          "label": "Adult",
          "value": "Adult"
        },
        {
          "label": "Fetal",
          "value": "Fetal"
        },
        {
          "label": "Tumour",
          "value": "Tumour"
        },
        {
          "label": "Organoid",
          "value": "Organoid"
        },
        {
          "label": "Mouse",
          "value": "Mouse"
        }
      ],
      regionOptionsData:[],
    }
  },
  methods:{
    changeAtlas(atlas){
      if(atlas){
        this.$set(this,"regionOptionsData",regionOptions[atlas])
      }
    },
    submitParams(params){
      this.$emit("submitParams",params)
    }
  },
  mounted(){
    this.changeAtlas('Tumour')
  }
}
</script>

<style scoped>
.params-form{
  height: 130px;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around; /* 可以根据需要调整对齐方式 */
  background-color: white;
}
.params-form :deep(.el-form-item__label){
  font-size: 24px;
  font-weight: bold;
}
.params-form .el-form-item {
  width: 40%; /* 设置每个 el-form-item 的宽度，总和小于 100% 实现两个并排 */
  margin-bottom: 0;
}
</style>
