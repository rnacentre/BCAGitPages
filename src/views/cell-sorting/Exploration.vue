<template>
  <div class="tips">
    <HeaderParams
      @submitParams="submitParams"
    ></HeaderParams>
<!--    绘制扇形图区域-->
    <div class="scatter-container">
      <div class="params-container">
        <span class="params-text">Cell Proportion</span>
        <div class="left-scatter">
          <div id="pieChartContainer" ref="pieChartContainer"></div>
        </div>
      </div>

      <div class="params-container">
        <span class="params-text"></span>
        <div class="right-scatter">
          <div id="barChartContainer" ref="barChartContainer"></div>
        </div>
      </div>
    </div>
<!--    绘制箱线图-->
    <div class="canvas-container" style="background-color: white;height: 700px;margin-top: 15px;border-radius: 20px;">
      <div class="params-container">
        <span class="params-text">Features</span>
        <el-select
          class="select-space"
          v-model="geneFeatures"
          placeholder="please select gene"
          @change="switchUmapGene(geneFeatures)"
        >

          <el-option
            v-for="(item) in geneOptions"
            :label="item['label']"
            :value="item['value']"
            :key="item['value']"
          >
          </el-option>
        </el-select>
      </div>
      <div id="boxChartContainer" ref="expBoxPlot"></div>
    </div>
  </div>
</template>

<script>
import HeaderParams from "@/components/DataViewer/HeaderParams";
import Plotly from "plotly.js-basic-dist";
import { celltyleColorData } from "../../../mock/chartcolor"
export default {
  name: "Exploration",
  components: {
    HeaderParams
  },
  data() {
    return {
      geneFeatures:'A1BG',//存储当前选中的features参数
      datasetParams:{//存储页面初始默认展示的参数
        "atlas": "Fetal",
        "region": "Pons"
      },
      geneOptions:[],
    }
  },
  methods: {
    switchUmapGene(geneVal){

    },
    async submitParams(params) {
      await this.getLoadData(params)
    },

    /**
     * 画饼图和堆叠图
     * @param pieChartData
     * @param speciesCountValues
     */
    drawPieAndBarChart(pieChartData,speciesCountValues){
      const elementsLeft = document.getElementsByClassName('left-scatter');
      const elementsRight = document.getElementsByClassName('right-scatter');
      //设置图片导出的参数
      let  config = {
        toImageButtonOptions: {
          format: 'svg', // 设置图片导出格式
          filename: 'image',//设置导出命名
          scale: 1 // 导出图片放大比例 1为不缩放
        }
      };
      //饼图样式配置参数
      let pieLayout = {
        width: elementsLeft[0].offsetWidth,  // 初始宽度
        height: elementsLeft[0].offsetHeight,  // 初始高度
        margin:{
          t:15, //调整图之间的间距
          b:0
        },
        grid: {rows:1, columns:2},
        uniformtext:{  //设置比较小的占比数不显示
          minsize:10,
          mode:'hide',
        },
        legend:{
          traceorder:'reversed',
          itemclick:false,//控制图例点击效果
          itemdoubleclick:false,//控制双击图例效果
          x:1,//调整图例的位置
          y:1,
          font:{
            size:10,  //设置图例字的大小
          },
        }
      };
      //堆叠图样式配置参数
      let barLayout = {
        width: elementsRight[0].offsetWidth,  // 初始宽度
        height: elementsRight[0].offsetHeight,  // 初始高度
        legend:{
          itemclick:false,//控制图例点击效果
          itemdoubleclick:false,//控制双击图例效果
        },
        xaxis: {
          title:'celltype',//设置坐标提示字的内容
          titlefont:{
            size:20, //设置坐标提示字的大小
          },
          tickfont:{  //设置刻度字的大小
            size:10,
          }
        },
        yaxis: {
          title: 'cell number',
          titlefont:{
            size:20,
          },
          tickfont:{
            size:10,
          }
        },
        barmode: 'stack',//堆叠类型
        margin: {
          t: 30, //调整图的间距
        },
      };
      // 画图
      Plotly.newPlot(this.$refs.pieChartContainer,pieChartData ,pieLayout,config);
      Plotly.newPlot(this.$refs.barChartContainer, speciesCountValues, barLayout,config);
      window.addEventListener('resize', () => {
        // 获取新的窗口大小
        const newWidth = elementsLeft[0].offsetWidth;
        const newHeight = elementsLeft[0].offsetHeight;

        // 使用 relayout 方法重新布局图表
        Plotly.relayout('pieChartContainer', {
          width: newWidth,
          height: newHeight
        });
      });
      window.addEventListener('resize', () => {
        // 获取新的窗口大小
        const newWidth = elementsRight[0].offsetWidth;
        const newHeight = elementsRight[0].offsetHeight;

        // 使用 relayout 方法重新布局图表
        Plotly.relayout('barChartContainer', {
          width: newWidth,
          height: newHeight
        });
      });
    },
    async dealChartData(jsonData){
      let humanCountData = [] //human的count
      let nameValueArr = [] //存储图例的内容
      let humanTrace  //存储Human堆叠图的数据
      let speciesCountValues = [] //存储分物种堆叠图所有的数据
      let pieChartData //存储饼图的数据
      for (let i = 0; i < jsonData.length; i++) {
        humanCountData.push(jsonData[i].count)
        nameValueArr.push(jsonData[i].cell_type)
      }
      for (let i = 0; i < nameValueArr.length; i++) {
        //组合堆叠图数据  cluster为x轴   每个柱子为去1个cluster,堆叠不同cluster的species的count数
        humanTrace = {
          x: nameValueArr,
          y: humanCountData,
          name: 'human',
          type: 'bar',
          // orientation:'h',
          width:0.6,
          marker: {   //控制人类色柱的颜色
            color: '#62A3CB',
          }
        }
      }
      speciesCountValues.push(humanTrace)
      let pieChartColors = [celltyleColorData,[]]; //存储饼图对应的颜色数据
      // 组合饼图数据
      pieChartData = [
        {
          values: humanCountData,  //human数据
          labels: nameValueArr,
          type: 'pie',
          title: {
            text: 'Human',
            font:{
              size:16,
            },
            position:'top center'
          },
          insidetextorientation:'radial',
          textposition: "inside",
          marker: {
            colors:pieChartColors[0]
          },
          domain: {
            row: 0,
            column: 0
          },
          hoverinfo: 'label+percent',
          textinfo:'percent',
        }]

      await this.drawPieAndBarChart(pieChartData,speciesCountValues) //绘制扇形图
    },
    //动态获取json数据
    async getLoadData(params) {
      // let jsonDataModule = await import(`../../../mock/BCAWebJson/json/pie/Fetal_Pons.json`);
      let jsonDataModule = await import(`../../../mock/BCAWebJson/json/pie/${params['atlas']}_${params['region'].trim()}.json`);
      let jsonData = jsonDataModule.default; // 提取默认导出的 JSON 数据
      await this.dealChartData(jsonData)
    }
  },
  async mounted(){
    await this.getLoadData(this.datasetParams)

  }
}
</script>

<style scoped>

</style>
