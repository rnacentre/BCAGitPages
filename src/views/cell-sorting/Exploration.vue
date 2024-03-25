<template>
  <div class="custom-body-container">
    <div class="wrap">
      <HeaderParams @submitParams="submitParams"></HeaderParams>
      <!--    绘制扇形图区域-->
      <div class="canvas-container">
        <div class="params-container">
          <span class="params-text">Cell Proportion</span>
          <div class="left-scatter canvas-h">
            <div id="pieChartContainer" ref="pieChartContainer"></div>
          </div>
        </div>

        <div class="params-container">
          <span class="params-text"></span>
          <div class="right-scatter canvas-h">
            <div id="barChartContainer" ref="barChartContainer"></div>
          </div>
        </div>
      </div>
      <!--    绘制箱线图-->
      <div class="canvas-container">
        <div class="box-container" style="width:100%;margin-bottom: 10px">
          <div style="margin-bottom: 10px">
            <span class="params-text">Features</span>
            <el-select ref="geneSelect" :loading="loading" class="select-space" clearable filterable
              v-model="geneFeatures" placeholder="please select gene" :filter-method="filterValue"
              @change="switchUmapGene(geneFeatures)">

              <el-option v-for="(item) in sliceGeneOptions" :label="item['label']" :value="item['value']"
                :key="item['value']">
              </el-option>
            </el-select>
          </div>

          <div class="box-chart box-canvas-h">
            <div id="boxChartContainer" ref="expBoxPlot"></div>
          </div>
        </div>

      </div>
      <!--    绘制热图-->
      <!-- <div class="canvas-container last-container">
        <div class="heat-map-container canvas-h" ref="heatmapChartRef"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import HeaderParams from "@/components/DataViewer/HeaderParams";
import Plotly from 'plotly.js-dist-min'
import { celltypeColors, chartColor } from "../../../mock/chartcolor"
import { heatmapData, textColor } from "../../../mock/heatmapData";
import axios from "axios";
export default {
  name: "Exploration",
  components: {
    HeaderParams
  },
  data() {
    return {
      // geneFeatures:'A1BG',//存储当前选中的features参数
      geneFeatures: 'MAP2',//测试gene1:GAPDH 测试gene2:RPS19
      datasetParams: {//存储页面初始默认展示的参数
        "atlas": "Adult",
        "region": "all"
      },
      geneOptions: [],
      sliceGeneOptions: [],
      filterOptions: [],
      loading: false,
      noMore: false,
    }
  },
  watch: {
    datasetParams: {
      handler(val) {
        if (this.datasetParams.atlas === 'Mouse') {
          this.geneFeatures = 'Map2'
        } else {
          this.geneFeatures = 'MAP2'
        }
      }
    }
  },
  methods: {
    filterValue(query) {
      if (query !== "") {
        let filterOptions = this.geneOptions.filter((item) => {
          // 这里是用的value选项筛选，默认是label
          return item.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
        let options = filterOptions.slice(0, 20)
        this.$set(this, "sliceGeneOptions", options)
      } else {
        this.sliceGeneOptions = [];
      }
    },
    async loadMore() {
      if (this.loading) return
      this.loading = true
      let options = this.geneOptions.slice(this.sliceGeneOptions.length, this.sliceGeneOptions.length + 4)
      this.sliceGeneOptions = this.sliceGeneOptions.concat(options)
      this.timer = setTimeout(() => {
        this.loading = false
      }, 500)

      if (this.geneOptions.length === this.sliceGeneOptions.length) {
        this.$refs.geneSelect.$refs.scrollbar.$refs.wrap.removeEventListener('scroll', this.scolling())
        this.noMore = true
      }
    },
    scolling() {
      let e = this.$refs.geneSelect.$refs.scrollbar.$refs.wrap
      if (this.noMore) return
      // 到底时触发 loadMore
      let loadMore = e.scrollHeight - e.scrollTop - 5 < e.clientHeight

      if (loadMore) {
        this.loadMore()
      }
    },
    //画热图 drawHeatMapData
    drawHeatMapData(heatmapData, textColor) {
      let allLayout = {
        title: 'human & mouse',
        margin: {
          l: 130, //解决Y轴显示的值超出
          b: 115,
        },
        xaxis: {
          tickmode: "array",
          tickangle: -60,
          zeroline: false,//不显示纵坐标轴
          autotick: false, //是否绘制刻度线标签
        },
      }
      //设置图片导出的参数
      let config = {
        toImageButtonOptions: {
          format: 'svg', // 设置图片导出格式
          filename: 'image',//设置导出命名
          scale: 1 // 导出图片放大比例 1为不缩放
        }
      };
      let layout = _.cloneDeep(allLayout)
      layout["xaxis"]["ticktext"] = textColor
      layout["xaxis"]["tickvals"] = heatmapData[0]["x"]
      Plotly.newPlot(this.$refs.heatmapChartRef, heatmapData, layout, config);

    },
    //将数据按照celltype分组基因表达量
    async groupCellType(cellTypeData, expsData, cellorder) {
      let groupedData = expsData.reduce((result, value, index) => {
        let type = cellTypeData[index];

        // 初始化数组，如果不存在
        if (!result[type]) {
          result[type] = [];
        }

        // 将值添加到对应的分组中
        result[type].push(value);

        return result;
      }, {});
      //绘制箱线图
      await this.getGeneBoxplot(groupedData, cellorder)
    },
    async getGeneBoxplot(jsonData, cellorder) {
      const elementsBox = document.getElementsByClassName('box-chart');
      let data = [] //存储箱线图的数据
      // 存储颜色的 key 顺序
      let colorKeyOrder = Object.keys(celltypeColors);
      // 自定义排序规则，按对象的id排序
      var sortedObjKeys = Object.keys(jsonData).sort((a, b) => {
        return colorKeyOrder.indexOf(a) - colorKeyOrder.indexOf(b);
      });
      for (const groupedDataKey of sortedObjKeys) {
        data.push({
          'type': 'box',
          'name': groupedDataKey,
          'y': jsonData[groupedDataKey],
          'marker': {
            'color': celltypeColors[groupedDataKey] || chartColor[colorKeyOrder.indexOf(groupedDataKey) % chartColor.length] // 根据顺序选择默认颜色 // 指定箱的颜色，如果颜色字典中不存在该细胞类型，则使用默认颜色
          }
        })
      }
      const layout = {
        height: 400,//和绘图外面的盒子高度保持一致
        margin: {
          t: 30,
          b: 140,
        },
        autosize: true
      };
      Plotly.newPlot('boxChartContainer', data, layout);
      window.addEventListener('resize', () => {
        // 获取新的窗口大小
        const newWidth = elementsBox[0].offsetWidth;
        const newHeight = elementsBox[0].offsetHeight;

        // 使用 relayout 方法重新布局图表
        Plotly.relayout('boxChartContainer', {
          width: newWidth,
          height: newHeight
        });
      });
    },
    async switchUmapGene(geneVal) {
      await this.getLoadData(this.datasetParams, geneVal)
    },
    async submitParams(params) {
      this.$set(this, "datasetParams", params) //更新dataset的参数
      if (this.datasetParams.atlas === "Mouse") {
        this.geneFeatures = "Map2";
      } else {
        this.geneFeatures = "MAP2";
      }
      await this.getLoadData(params, this.geneFeatures)
    },

    /**
     * 画饼图和堆叠图
     * @param pieChartData
     * @param speciesCountValues
     */
    drawPieAndBarChart(pieChartData, speciesCountValues) {
      const elementsLeft = document.getElementsByClassName('left-scatter');
      const elementsRight = document.getElementsByClassName('right-scatter');
      //设置图片导出的参数
      let config = {
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
        margin: {
          t: 80, //调整图之间的间距
          b: 100
        },
        title: {
          text: `${this.datasetParams['atlas']} ${this.datasetParams['region']}`,
          font: {
            size: 16,
          },
          position: 'top center'
        },
        // grid: {rows:1, columns:1},
        uniformtext: {  //设置比较小的占比数不显示
          minsize: 10,
          mode: 'hide',
        },
        legend: {
          traceorder: 'normal',
          itemclick: false,//控制图例点击效果
          itemdoubleclick: false,//控制双击图例效果
          x: 1,//调整图例的位置
          y: 1,
          font: {
            size: 10,  //设置图例字的大小
          },
        }
      };
      //堆叠图样式配置参数
      let barLayout = {
        width: elementsRight[0].offsetWidth,  // 初始宽度
        height: elementsRight[0].offsetHeight,  // 初始高度
        legend: {
          itemclick: false,//控制图例点击效果
          itemdoubleclick: false,//控制双击图例效果
        },
        xaxis: {
          title: 'celltype',//设置坐标提示字的内容
          titlefont: {
            size: 20, //设置坐标提示字的大小
          },
          tickfont: {  //设置刻度字的大小
            size: 10,
          },
          tickangle: 30
        },
        yaxis: {
          title: 'cell number',
          titlefont: {
            size: 20,
          },
          tickfont: {
            size: 10,
          }
        },
        barmode: 'stack',//堆叠类型
        margin: {
          t: 30, //调整图的间距
          b: 150
        },
      };
      // 画图
      Plotly.newPlot(this.$refs.pieChartContainer, pieChartData, pieLayout, config);
      Plotly.newPlot(this.$refs.barChartContainer, speciesCountValues, barLayout, config);
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
    async dealChartData(jsonData) {
      let humanCountData = [] //human的count
      let nameValueArr = [] //存储图例的内容
      let humanTrace  //存储Human堆叠图的数据
      let speciesCountValues = [] //存储分物种堆叠图所有的数据
      let pieChartData //存储饼图的数据
      // 获取默认颜色中的不重复颜色
      const defaultColors = chartColor.filter(color => !Object.values(celltypeColors).includes(color));
      for (let i = 0; i < jsonData.length; i++) {
        humanCountData.push(jsonData[i].count)
        nameValueArr.push(jsonData[i].cell_type)
      }
      // for (let i = 0; i < nameValueArr.length; i++) {
      //   //组合堆叠图数据  cluster为x轴   每个柱子为去1个cluster,堆叠不同cluster的species的count数
      humanTrace = {
        x: nameValueArr,
        y: humanCountData,
        // name: 'human',
        name: `${this.datasetParams['atlas']}_${this.datasetParams['region']}`,
        type: 'bar',
        // orientation:'h',
        width: 0.6,
        marker: {   //控制人类色柱的颜色
          // color: '#62A3CB',
          color: nameValueArr.map(cellType => celltypeColors[cellType] || defaultColors.shift()) // 匹配颜色，没有的使用默认颜色
        }
      }
      // }
      speciesCountValues.push(humanTrace)
      let pieChartColors = [chartColor, []]; //存储饼图对应的颜色数据
      // 组合饼图数据
      pieChartData = [
        {
          values: humanCountData,  //human数据
          labels: nameValueArr,
          type: 'pie',
          insidetextorientation: 'radial',
          textposition: "inside",
          marker: {
            colors: humanTrace.marker.color // 与bar用一样的颜色
          },
          domain: {
            row: 0,
            column: 0
          },
          hoverinfo: 'label+percent',
          textinfo: 'percent',
        }]
      await this.drawPieAndBarChart(pieChartData, speciesCountValues) //绘制扇形图
      return nameValueArr;
    },
    //动态获取json数据
    async getLoadData(params, geneVal) {
      const res1 = await axios.get(`${apiBaseUrl}/json/pie/${params['atlas']}_${params['region']}.json`)
      console.log(366, `/json/pie/${params['atlas']}_${params['region']}.json`)
      let jsonData = res1.data; // 提取默认导出的 JSON 数据
      const cellorder = await this.dealChartData(jsonData)

      //组合箱线图数据
      let res2 = await axios.get(`${apiBaseUrl}/json/${params['atlas']}_${params['region']}_umap.json`)
      console.log(373, `/json/${params['atlas']}_${params['region']}_umap.json`)
      //let jsonDataModule2 = await import(`../../../mock/BCAWebJson/json/${params['atlas']}_${params['region'].trim()}_umap.json`);
      //let jsonDataModule2 = res2.data; // 提取SON 数据
      let xyJsonData = res2.data; // 提取默认导出的散点图 JSON 数据

      if (geneVal) {
        res2 = await axios.get(`${apiBaseUrl}/json/gene/${params['atlas']}/${params['region']}/${geneVal}.json`)
        //let jsonDataModule2 =  await import(`../../../mock/BCAWebJson/json/gene/Fetal/Pons/${geneVal}.json`);
        //let jsonDataModule2 =  res2.data; // 提取SON 数据
        let jsonData2 = res2.data; // 提取默认导出的 JSON 数据
        let cellType = []
        for (let i = 0; i < xyJsonData.length; i++) {
          cellType.push(xyJsonData[i]['cell_type'])
        }
        let expData = jsonData2.exps.split(',')
        await this.groupCellType(cellType, expData, cellorder)

      }

      //获取gene下拉框的数据
      const res3 = await axios.get(`${apiBaseUrl}/json/geneIndex/${params['atlas']}.json`)
      console.log(395, `/json/geneIndex/${params['atlas']}.json`)
      //let jsonDataModule3 = await import(`../../../mock/BCAWebJson/json/geneIndex/${params['atlas']}.json`);
      //let jsonDataModule3 = res3.data; // 提取SON 数据
      let geneJsonData = res3.data// 提取默认导出的基因 JSON 数据
      this.sliceGeneOptions = geneJsonData.slice(0, 20)
      this.$set(this, "geneOptions", geneJsonData)
    },
  },
  async mounted() {
    // this.drawHeatMapData(heatmapData,textColor)
    await this.getLoadData(this.datasetParams, this.geneFeatures)

    this.$refs.geneSelect.$refs.scrollbar.$refs.wrap.addEventListener('scroll', this.scolling)

  }
}
</script>

<style scoped>
.canvas-container {
  margin-top: 15px;
  border-radius: 20px;
  padding: 5px;
  display: flex;
  justify-content: space-around;
  background-color: white;
}

.canvas-container .params-container {
  width: 49%
}

.canvas-container .left-scatter,
.right-scatter {
  width: 100%;
}

.box-chart {
  width: 100%;
}

.heat-map-container {
  width: 100%;
}

.canvas-h {
  height: 600px;
}

.box-canvas-h {
  height: 400px;
}

.last-container {
  margin-bottom: 15px
}
</style>
