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
    <el-button class="submit-button" type="primary" @click="submitParams(form)">Submit</el-button>
  </el-form>
</div>
</template>

<script>
import regionOptions from "../../../mock/BCAWebJson/json/atlas_region.json"
export default {
  name: "HeaderParams",
  props:{
    datasetParams:{
      type:Object,
      default: function (){
        return {}
      }
    }
  },
  watch:{
    datasetParams:{ //监听从dataviewer页面传来的参数
      handler(value){
        if(!_.isEmpty(value)){
          this.$set(this,"form",value)
        }
      },
      immediate:true,
      deep:true
    }
  },
  data(){
    return{
      form: {
        atlas: 'Adult',
        region: 'all',
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
    this.changeAtlas('Adult')
  }
}
</script>

<style scoped>
.params-form{
  height: 88px;
  border-radius: 20px;
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around; /* 可以根据需要调整对齐方式 */
  background-color: white;
}
.params-form :deep(.el-form-item__label){
  font-size: 24px;
  font-weight: bold;
  color:#333333
}
.params-form .el-form-item {
  width: 18%; /* 设置每个 el-form-item 的宽度，总和小于 100% 实现两个并排 */
  margin-bottom: 0;
}
</style>
