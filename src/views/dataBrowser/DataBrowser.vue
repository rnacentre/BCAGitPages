<template>
  <div class="custom-body-container">
    <div class="wrap">
      <!--      &nbsp; &nbsp; &nbsp; <span class="strong">↓</span> You can choose to display cells from a specific region based on the REGION column below. (Or other categories of interest.)-->
      <!--     参数区域-->
      <HeaderParams @submitParams="submitParams" :datasetParams="datasetParams"></HeaderParams>
      <!--      绘制散点图区域-->

      <div class="scatter-container">
        <div class="params-container">
          <span class="params-text">Color By</span>
          <el-select
            class="select-space"
            v-model="colorBy"
            clearable
            filterable
            :filter-method="filterValue"
            placeholder="please select color"
            @change="switchUmapType(colorBy)"
          >
            <el-option
              v-for="(item) in colorByOptions"
              :label="item['label']"
              :value="item['value']"
              :key="item['value']"
            ></el-option>
          </el-select>
          <div class="left-scatter" v-loading="plotLoadingL">
            <div ref="scatterChartRefLeft" id="scatterChartRefLeft"></div>
          </div>
        </div>

        <div class="params-container">
          <span class="params-text">Features</span>
          <el-select
            ref="geneSelect"
            :loading="loading"
            class="select-space"
            v-model="geneFeatures"
            placeholder="please select gene"
            @change="switchUmapGene(geneFeatures)"
            :filter-method="filterValue"
            clearable
            filterable
          >
            <el-option
              v-for="(item) in sliceGeneOptions"
              :label="item['label']"
              :value="item['value']"
              :key="item['value']"
            ></el-option>
          </el-select>
          <div class="right-scatter" v-loading="plotLoadingR">
            <div ref="scatterChartRefRight" id="scatterChartRefRight"></div>
          </div>
        </div>
      </div>
    </div>

    <!--    <router-view></router-view>-->
  </div>
</template>
<script>
import Plotly from "plotly.js-dist-min";
import HeaderParams from "@/components/DataViewer/HeaderParams";
import { chartColor, celltypeColors } from "../../../mock/chartcolor";
import color_keys from "../../../mock/BCAWebJson/json/color_keys.json";
import axios from "axios";
export default {
  name: "dataBrowser",
  components: {
    HeaderParams
  },
  data() {
    return {
      chartInfo: {
        //存储umap图例点击信息
        selectedGroupIndex: -1, //不要改这个key
        selectedGeneGroupIndex: -1 //不要改这个key
      },
      colorBy: "cell_type", //存储当前选中的color by的参数
      geneFeatures: "MAP2", //存储当前选中的features参数
      colorByOptions: [],
      geneOptions: [],
      datasetParams: {
        //存储页面初始默认展示的参数
        atlas: "Adult",
        region: "all" //Tumour_Pons_umap
      },
      sliceGeneOptions: [],
      loading: false,
      noMore: false,
      plotLoadingL: true,
      plotLoadingR: true
    };
  },
  watch: {
    $route: {
      handler(val) {
        let { region, atlas } = val["query"];
        if (region) {
          this.datasetParams["region"] = region;
          this.datasetParams["atlas"] = atlas;
          if (this.datasetParams.atlas === "Mouse") {
            this.geneFeatures = "Map2";
          } else {
            this.geneFeatures = "MAP2";
          }
          this.colorBy = "cell_type";
          this.getLoadData(this.datasetParams, this.colorBy, this.geneFeatures);
          this.$set(
            this,
            "colorByOptions",
            color_keys[this.datasetParams["atlas"]]
          );
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    filterValue(query) {
      if (query !== "") {
        let filterOptions = this.geneOptions.filter(item => {
          // 这里是用的value选项筛选，默认是label
          return item.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
        let options = filterOptions.slice(0, 20);
        this.$set(this, "sliceGeneOptions", options);
      } else {
        this.sliceGeneOptions = [];
      }
    },
    async loadMore() {
      if (this.loading) return;
      this.loading = true;
      let options = this.geneOptions.slice(
        this.sliceGeneOptions.length,
        this.sliceGeneOptions.length + 4
      );
      this.sliceGeneOptions = this.sliceGeneOptions.concat(options);
      this.timer = setTimeout(() => {
        this.loading = false;
      }, 500);

      if (this.geneOptions.length === this.sliceGeneOptions.length) {
        this.$refs.geneSelect.$refs.scrollbar.$refs.wrap.removeEventListener(
          "scroll",
          this.scolling()
        );
        this.noMore = true;
      }
    },
    scolling() {
      let e = this.$refs.geneSelect.$refs.scrollbar.$refs.wrap;
      if (this.noMore) return;
      // 到底时触发 loadMore
      let loadMore = e.scrollHeight - e.scrollTop - 5 < e.clientHeight;

      if (loadMore) {
        this.loadMore();
      }
    },
    async switchUmapGene(geneVal) {
      this.plotLoadingR = true;
      this.chartInfo.selectedGeneGroupIndex = -1;
      await this.getLoadData(this.datasetParams, this.colorBy, geneVal);
    },
    async switchUmapType(chartType) {
      this.plotLoadingL = true;
      this.chartInfo.selectedGroupIndex = -1;
      await this.getLoadData(this.datasetParams, chartType);
    },
    submitParams(params) {
      this.$set(this, "datasetParams", params);
      if (this.datasetParams.atlas === "Mouse") {
        this.geneFeatures = "Map2";
      } else {
        this.geneFeatures = "MAP2";
      }
      this.$set(this, "colorByOptions", color_keys[params["atlas"]]);
      this.plotLoadingL = true;
      this.plotLoadingR = true;
      this.getLoadData(params, this.colorBy, this.geneFeatures);
    },
    async getLoadData(params, chartType, geneVal) {
      //let jsonDataModule1 = await import(`../../../mock/BCAWebJson/json/${params['atlas']}_${params['region'].trim()}_umap.json`);
      let res = await axios.get(
        `${apiBaseUrl}/json/${params["atlas"]}_${params["region"]}_umap.json`
      );
      console.log(
        166,
        `/json/${params["atlas"]}_${params["region"]}_umap.json`,
        res.data
      );
      console.log(223, celltypeColors["Amygdala excitatory"]);
      let xyJsonData = res.data; // 提取默认导出的散点图 JSON 数据
      const umapChartData = this.dealUmapData(xyJsonData, chartType, []);
      //绘制左边第一个散点图
      this.drawUMAPChart(
        umapChartData,
        this.$refs.scatterChartRefLeft,
        "selectedGroupIndex",
        chartType
      );

      //绘制右边表达量散点图
      if (geneVal) {
        //let jsonDataModule2 = await import(`/json/gene/${params['atlas']}/${params['region'].trim()}/${geneVal}.json`);
        const res2 = await axios.get(
          `${apiBaseUrl}/json/gene/${params["atlas"]}/${params["region"]}/${geneVal}.json`
        );
        console.log(
          177,
          `/json/gene/${params["atlas"]}/${params["region"]}/${geneVal}.json`
        );
        let expJsonData = res2.data; // 提取默认导出的表达量 JSON 数据
        let expsDataArr = expJsonData.exps.split(",").map(item => Number(item));
        await this.selectUmapGene(
          geneVal,
          xyJsonData,
          "cell_type",
          expsDataArr
        );
      }

      //获取gene下拉框的数据
      //let jsonDataModule3 = await import(`../../../mock/BCAWebJson/json/geneIndex/${params['atlas']}.json`);
      let geneRes = await axios.get(
        `${apiBaseUrl}/json/geneIndex/${params["atlas"]}.json`
      );
      console.log(187, `/json/geneIndex/${params["atlas"]}.json`);
      let geneJsonData = geneRes.data; // 提取默认导出的基因 JSON 数据
      this.sliceGeneOptions = geneJsonData.slice(0, 20);
      this.$set(this, "geneOptions", geneJsonData);
      this.plotLoadingL = false;
      this.plotLoadingR = false;
    },
    async selectUmapGene(geneVal, xyJsonData, chartType, expsDataArr) {
      const geneUmapData = this.dealUmapData(
        xyJsonData,
        "cell_type",
        expsDataArr
      );
      this.drawUMAPChart(
        geneUmapData,
        this.$refs.scatterChartRefRight,
        "selectedGeneGroupIndex",
        geneVal
      );
    },
    //画散点图
    drawUMAPChart(chartData, container, selectedGroupIndex, groupName) {
      const elements = document.getElementsByClassName("left-scatter");
      //设置图片导出的参数
      let config = {
        toImageButtonOptions: {
          format: "svg", // 设置图片导出格式
          filename: "image", //设置导出命名
          scale: 1 // 导出图片放大比例 1为不缩放
        }
      };
      let layout = {
        // title:{
        //   text:  _.upperFirst(groupName),
        //   margin:{
        //     t:0
        //   },
        // },
        legend: {
          x: 0,
          y: -0.04,
          itemsizing: "constant", //设置图例大小为固定值
          orientation: "h",
          traceorder: "normal" //调整图例的顺序
        },
        margin: {
          t: 50,
          r: 50
        },
        aspectratio: {
          x: 1, // 横向比例
          y: 1 // 纵向比例
        },
        hovermode: "closest", //默认开启 Show closest data on hover
        width: elements[0]?.offsetWidth, // 初始宽度
        height: elements[0]?.offsetHeight // 初始高度
      };
      Plotly.newPlot(container, chartData, layout, config);

      container.on("plotly_legendclick", data => {
        const dataLength = data.data.length;
        const dataArr = _.range(dataLength);
        const otherArr = dataArr.filter(
          item => item !== this.chartInfo[selectedGroupIndex]
        );
        if (data.expandedIndex === this.chartInfo[selectedGroupIndex]) {
          //用户已经选中当前节点，再点击图例时，相当于查看全部节点
          Plotly.restyle(container, { opacity: 1 }, otherArr); //把其它点的opacity设置为1
          this.chartInfo[selectedGroupIndex] = -1;
        } else {
          //用户点击其它图例
          if (this.chartInfo[selectedGroupIndex] !== -1) {
            Plotly.restyle(container, { opacity: 0.1 }, [
              this.chartInfo[selectedGroupIndex]
            ]); //把上次选中的点的opacity设置为0.1
          } else {
            Plotly.restyle(container, { opacity: 0.1 }, otherArr); //把其它点的opacity设置为0.1
          }
          Plotly.restyle(container, { opacity: 1 }, [data.expandedIndex]); //把用户当前点击的设置成1
          this.chartInfo[selectedGroupIndex] = data.expandedIndex;
        }
        return false;
      });
      window.addEventListener("resize", () => {
        // 获取新的窗口大小
        const newWidth = elements[0]?.offsetWidth;
        const newHeight = elements[0]?.offsetHeight;

        // 使用 relayout 方法重新布局图表
        Plotly.relayout(container, {
          width: newWidth,
          height: newHeight
        });
      });
      // this.rightOverlay = false //关闭右边Umap的遮罩
    },
    //处理散点图的逻辑
    dealUmapData(umapData, groupName, expressions) {
      //let cmin = _.min(expressions)
      let cmax = _.max(expressions);
      let data = [];
      let chartData = {}; //存储分组信息
      umapData.forEach((item, index) => {
        if (chartData[item[groupName]]) {
          chartData[item[groupName]][0].push(item.x); //x轴
          chartData[item[groupName]][1].push(item.y); //y轴
          if (groupName === "cell_type" && expressions.length) {
            //gene表达量
            chartData[item[groupName]][2].push(expressions[index]); //表达量
          }
        } else {
          //初始化数值
          let firstExp = _.get(expressions, index, null);
          chartData[item[groupName]] = [[item.x], [item.y], [firstExp]];
        }
      });
      if (groupName === "cell_type" && expressions.length) {
        //gene表达量
        for (let groupName in chartData) {
          chartData[groupName][2].unshift(_.mean(chartData[groupName][2]));
        }
      }
      let marker = {
        size: 2,
        symbol: "circle",
        opacity: 1
      };
      //箱线图的必须排序 和 箱线图的保持一致，所以排序Umap数据
      let orderedChartData = {};
      Object.keys(chartData)
        .sort()
        .forEach(function(key) {
          orderedChartData[key] = chartData[key];
        });
      //组合celltype颜色的key
      let colorKey = []; //存储颜色的key
      let diagramColorData = {}; //组合饼图颜色数据
      for (let color in orderedChartData) {
        colorKey.push(color);
      }
      for (let i = 0; i < colorKey.length; i++) {
        diagramColorData[colorKey[i]] = chartColor[i];
      }
      for (let info in orderedChartData) {
        let marker = {
          size: 2,
          symbol: "circle",
          opacity: 1
        };
        //选择gene的时候
        if (expressions.length && groupName === "cell_type") {
          //gene表达量
          marker = {
            color: chartData[info][2],
            size: 2,
            cmin: 0,
            cmax,
            colorscale: "Reds" //设置规定的颜色
          };
        }
        //指定umap celltype的颜色
        if (!expressions.length && groupName === "cell_type") {
          marker.color = celltypeColors[info];
        }
        data.push({
          x: chartData[info][0],
          y: chartData[info][1],
          mode: "markers",
          type: "scattergl",//使用scattergl加速
          name: info,
          //设置鼠标悬浮到点上的信息
          hovertemplate: chartData[info][0].map((item, index) => {
            if (groupName === "cell_type" && expressions.length) {
              //在第一行显示表达量值
              return `Expression: ${chartData[info][2][index]}<br>x:${item}<br>y:${chartData[info][1][index]}<br>`;
            } else {
              return `x:${item}<br>y:${chartData[info][1][index]}<br>`;
            }
          }),
          marker
        });
      }
      // 存储颜色的 key 顺序
      let colorKeyOrder = Object.keys(celltypeColors);
      // 重新排序 data 数组
      data.sort((a, b) => {
          return colorKeyOrder.indexOf(a.name) - colorKeyOrder.indexOf(b.name);
      });
      return data;
    }
  },
  mounted() {
    this.$refs.geneSelect.$refs.scrollbar.$refs.wrap.addEventListener(
      "scroll",
      this.scolling
    );
    //绘制散点图
    this.getLoadData(this.datasetParams, this.colorBy, this.geneFeatures);
    this.$set(this, "colorByOptions", color_keys[this.datasetParams["atlas"]]);
  }
};
</script>
<style lang="scss">
</style>
