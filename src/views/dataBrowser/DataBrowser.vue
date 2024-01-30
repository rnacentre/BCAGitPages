<template>
  <div>
    <div class="tips">
<!--      &nbsp; &nbsp; &nbsp; <span class="strong">↓</span> You can choose to display cells from a specific region based on the REGION column below. (Or other categories of interest.)-->
<!--     参数区域-->
     <HeaderParams
     @submitParams="submitParams"
     ></HeaderParams>
<!--      绘制散点图区域-->

      <div class="scatter-container">
        <div class="params-container">
          <span class="params-text">Color By</span>
          <el-select
            class="select-space"
            v-model="form.color"
            placeholder="please select color"
            @change="switchUmapType(form.color)"
          >
            <el-option
              v-for="(item) in colorByOptions"
              :label="item['label']"
              :value="item['value']"
              :key="item['value']"
            >
            </el-option>
          </el-select>
          <div class="left-scatter">
            <div ref="scatterChartRefLeft" id="scatterChartRefLeft"></div>
          </div>
        </div>

        <div class="params-container">
          <span class="params-text">Features</span>
          <el-select class="select-space" v-model="form.atlas" placeholder="please select gene">

            <el-option
              v-for="(item) in geneOptions"
              :label="item['label']"
              :value="item['value']"
              :key="item['value']"
            >
            </el-option>
          </el-select>
          <div class="right-scatter" >

            <div id="scatterChartRefRight"></div>
          </div>
        </div>
      </div>

    </div>

<!--    <router-view></router-view>-->
  </div>
</template>
<script>
import Plotly from  'plotly.js-basic-dist'
import HeaderParams from "@/components/DataViewer/HeaderParams";
import { chartColor } from "../../../mock/chartcolor"
import color_keys from "../../../mock/TumourForTest/color_keys.json"
export default {
  name: "dataBrowser",
  components:{
    HeaderParams
  },
  data() {
    return {
      form: {
        color: '',
        region: '',
      },
      colorByOptions:[],
      geneOptions:[
        { "label": 'ZNF277',
          "value": 'ZNF277'
        },
        { "label": 'BRCA2',
          "value": 'BRCA2'
        },
        { "label": 'KCTD9',
          "value": 'KCTD9'
        },
        { "label": 'IGFBP6',
          "value": 'IGFBP6'
        },
      ],
      datasetParams:{
        "atlas": "Tumour",
        "region": "Cerebral cortex "
      },
    };
  },
  methods:{
    async switchUmapType(chartType) {
      let jsonDataModule = await import(`../../../mock/TumourForTest/${ this.datasetParams['atlas']}_${ this.datasetParams['region']}_umap.json`);
      let jsonData = jsonDataModule.default; // 提取默认导出的 JSON 数据
      const umapChartData = this.dealUmapData(jsonData, chartType, [])
      this.drawUMAPChart(umapChartData, this.$refs.scatterChartRefLeft, "selectedGroupIndex", chartType)
    },
    submitParams(params){
      this.datasetParams = params
      this.$set(this,"colorByOptions",color_keys[params['atlas']])
      this.getLoadData(params)
    },
    async getLoadData(params) {
      let chartType = 'cell_type'
      let jsonDataModule = await import(`../../../mock/TumourForTest/${params['atlas']}_${params['region']}_umap.json`);
      let jsonData = jsonDataModule.default; // 提取默认导出的 JSON 数据
      const umapChartData = this.dealUmapData(jsonData, chartType, [])
      this.drawUMAPChart(umapChartData, this.$refs.scatterChartRefLeft, "selectedGroupIndex", chartType)
    },
    async selectUmapGene(geneVal) {
      if(!geneVal){
        // geneVal = this.itemsGene[0]  //默认展示第一个基因的数据
      }

      let exp = [-2.295, 8.16, -2.401, 15.52, -2.172, 14.076, -1.677,]
      // let expsDataArr = exp.split(',').map(item=>Number(item))

      let num = '02'
      let jsonDataModule = await import(`../../../mock/scatter${num}.json`);
      let jsonData = jsonDataModule.default; // 提取默认导出的 JSON 数据
      const geneUmapData = this.dealUmapData(jsonData, "celltype", exp)
      this.drawUMAPChart(geneUmapData, this.$refs.scatterChartRefRight, "selectedGeneGroupIndex", geneVal)
    },
    //画散点图
    drawUMAPChart(chartData, container, selectedGroupIndex, groupName) {
      const elements = document.getElementsByClassName('left-scatter');
      //设置图片导出的参数
      let  config = {
        toImageButtonOptions: {
          format: 'svg', // 设置图片导出格式
          filename: 'image',//设置导出命名
          scale: 1 // 导出图片放大比例 1为不缩放
        }
      };
      let layout = {
        title:{
          text:  _.upperFirst(groupName),
          margin:{
            t:0
          },
        },
        legend: {
          x:1,
          itemsizing: "constant",//设置图例大小为固定值
          orientation:'v',
          traceorder:'reversed' //调整图例的顺序
        },
        margin: {
          r:0,
        },
        hovermode: 'closest',//默认开启 Show closest data on hover
        width: elements[0].offsetWidth,  // 初始宽度
        height: elements[0].offsetHeight,  // 初始高度
      };
      Plotly.newPlot(container, chartData,layout,config)

      container.on("plotly_legendclick", (data) => {
        const dataLength = data.data.length
        const dataArr = _.range(dataLength)
        const otherArr = dataArr.filter(item => item !== this.chartInfo[selectedGroupIndex])
        if (data.expandedIndex === this.chartInfo[selectedGroupIndex]) {
          //用户已经选中当前节点，再点击图例时，相当于查看全部节点
          Plotly.restyle(container, { opacity: 1 }, otherArr)//把其它点的opacity设置为1
          this.chartInfo[selectedGroupIndex] = -1
        } else {
          //用户点击其它图例
          if (this.chartInfo[selectedGroupIndex] !== -1) {
            Plotly.restyle(container, { opacity: 0.1 }, [this.chartInfo[selectedGroupIndex]])//把上次选中的点的opacity设置为0.1
          } else {
            Plotly.restyle(container, { opacity: 0.1 }, otherArr)//把其它点的opacity设置为0.1
          }
          Plotly.restyle(container, { opacity: 1 }, [data.expandedIndex])//把用户当前点击的设置成1
          this.chartInfo[selectedGroupIndex] = data.expandedIndex
        }
        return false;
      })
      window.addEventListener('resize', () => {
        // 获取新的窗口大小
        const newWidth = elements[0].offsetWidth;
        const newHeight = elements[0].offsetHeight;

        // 使用 relayout 方法重新布局图表
        Plotly.relayout('scatterChartRefLeft', {
          width: newWidth,
          height: newHeight
        });
      });
      // this.rightOverlay = false //关闭右边Umap的遮罩
    },
    //处理散点图的逻辑
    dealUmapData(umapData, groupName, expressions) {
      //let cmin = _.min(expressions)
      let cmax = _.max(expressions)
      let data = []
      let chartData = {}//存储分组信息
      umapData.forEach((item, index) => {
        if (chartData[item[groupName]]) {
          chartData[item[groupName]][0].push(item.x)//x轴
          chartData[item[groupName]][1].push(item.y)//y轴
          if(groupName === "celltype" && expressions.length){
            //gene表达量
            chartData[item[groupName]][2].push(expressions[index])//表达量
          }
        }else{
          //初始化数值
          let firstExp = _.get(expressions, index, null)
          chartData[item[groupName]] = [[item.x],[item.y],[firstExp]]
        }
      })
      if(groupName === "celltype" && expressions.length){
        //gene表达量
        for(let groupName in chartData){
          chartData[groupName][2].unshift(_.mean(chartData[groupName][2]))
        }
      }
      let marker = {
        size: 2,
        symbol: 'circle',
        opacity: 1
      }
      //箱线图的必须排序 和 箱线图的保持一致，所以排序Umap数据
      let orderedChartData = {};
      Object.keys(chartData).sort().forEach(function(key) {
        orderedChartData[key] = chartData[key];
      });
      //组合celltype颜色的key
      let colorKey = []  //存储颜色的key
      let diagramColorData = {} //组合饼图颜色数据
      for(let color  in orderedChartData){
        colorKey.push(color)
      }
      for(let i = 0;i < colorKey.length;i++){
        diagramColorData[colorKey[i]] = chartColor[i]
      }
      for (let info in orderedChartData) {
        //选择celltype的时候  必须在基因表达量的判断前面
        if(this.selectType ===  "celltype" && groupName === "celltype" ){
          marker = {
            color: celltyleColorData[info],
            size: 2,
          }
        }
        //选择gene的时候
        if(expressions.length &&  groupName === "celltype"  ){
          this.datasetCelltype.push(info)  //datasetCelltype 传走给gene between species页面用
          //gene表达量
          marker = {
            color: chartData[info][2],
            size: 2,
            cmin:0,
            cmax,
            colorscale:"Reds"  //设置规定的颜色
          }
        }
        //选择cluster的时候
        if(groupName === "cluster"){
          this.datasetCluter.push(info)  //datasetCluster 传走给gene between species页面用
          marker = {
            color: diagramColorData[info],
            size: 2,
          }
        }
        //先择species的时候
        if(groupName === "species"){
          marker = {
            color: this.speciesColor[info],
            size: 2,
          }
        }
        data.push({
          x: chartData[info][0],
          y: chartData[info][1],
          mode: 'markers',
          type: 'scatter',
          name: info,
          //设置鼠标悬浮到点上的信息
          hovertemplate: chartData[info][0].map((item, index) => {
            if(groupName === "celltype" && expressions.length){
              //在第一行显示表达量值
              return `Expression: ${chartData[info][2][index]}<br>x:${item}<br>y:${chartData[info][1][index]}<br>`
            }else{
              return `x:${item}<br>y:${chartData[info][1][index]}<br>`
            }
          }),
          marker
        })
      }
      return data;
    },
    //画扇形图的逻辑
    drawPieChart(){
      const elements = document.getElementsByClassName('right-scatter');
      let data = [{
        values: [19, 26, 55],
        labels: ['Residential', 'Non-Residential', 'Utility'],
        type: 'pie'
      }];

      let layout = {
        // width: window.innerWidth,  // 初始宽度
        width: elements[0].offsetWidth,  // 初始宽度
        // height: window.innerHeight,  // 初始高度width: window.innerWidth,  // 初始宽度
        height: elements[0].offsetHeight,  // 初始高度
      };

      Plotly.newPlot('scatterChartRefRight', data, layout);
      window.addEventListener('resize', () => {
        // 获取新的窗口大小
        const newWidth = elements[0].offsetWidth;
        const newHeight = elements[0].offsetHeight;

        // 使用 relayout 方法重新布局图表
        Plotly.relayout('scatterChartRefRight', {
          width: newWidth,
          height: newHeight
        });
      });
    },
    async loadData() {
      let chartType = 'Sample'
      let num = '02'
      let jsonDataModule = await import(`../../../mock/scatter${num}.json`);
      let jsonData = jsonDataModule.default; // 提取默认导出的 JSON 数据
      const umapChartData = this.dealUmapData(jsonData, chartType, [])
      this.drawUMAPChart(umapChartData, this.$refs.scatterChartRefLeft, "selectedGroupIndex", chartType)

    }
  },
  mounted(){
    // this.drawPieChart() //绘制扇形图
    //绘制散点图
    this.getLoadData(this.datasetParams)
    this.$set(this,"colorByOptions",color_keys[this.datasetParams['atlas']])

    // let jsonData = import(`../../../mock/scatter01.json`)
    // this.loadData()
    //
   //绘制含有表达量的散点图
   //  this.selectUmapGene("ADARB2")
  }
};
</script>
<style lang="scss">
.tips{
  background-color:rgb(247,248,250);
  padding: 15px;
}

.select-space{
  margin-left: 60px;
}
.submit-button{
  width: 150px;
}
.scatter-container{
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
  //background-color: lemonchiffon;
}
.scatter-container .params-container{
  width: 49%
}
.scatter-container .params-container{
  padding: 5px;
  border-radius: 20px;
  background-color: white;

}
.scatter-container .params-container .params-text{
  font-size: 24px;
  font-weight: bold;
  margin-left: 20px;
}
.scatter-container .left-scatter,.right-scatter{
  width:100%;
  height:700px;
}
.scatter-container div:first-child{
  margin-right: 20px;
}

</style>
