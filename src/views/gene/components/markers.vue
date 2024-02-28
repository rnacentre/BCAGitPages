<template>
  <div>
    <el-empty description="Click the Markers button to show" v-if="!showMarker"></el-empty>
    <div v-else>

      <b-pane label="VOLCANO PLOT">
        <div class="search-by">
          <span class="t">Search by </span>
          <ul>
            <li>
              <span>Region : </span>
              <el-tag>{{ params.region }}</el-tag>
            </li>
            <li>
              <span>Cell type : </span>
              <el-tag>{{ params.cellType }}</el-tag>
            </li>
          </ul>
        </div>
        <div class="mt10" align="center">
<!--          第一次是请求方式读取资源-->
<!--          <el-image :src="`${NODE_ENV}/data/volcano/VolcanoBy${atlasMarkerBtn}/${params.atlas}_${params.region}_${params.cellType}.png`" alt="" style="width:58%">-->
<!--         第二次是更换资源读取方式--读取项目中public目录下面的资源-->
          <el-image :src="`${apiBaseUrl}/volcano/VolcanoBy${atlasMarkerBtn}/${params.atlas}_${params.region}_${params.cellType}.png`" alt="" style="width:45%">
            <template #error>
              <div class="image-slot">
                <el-empty description="Not available in current version of Brain Cell Atals"></el-empty>
              </div>
            </template>
          </el-image>
          <!-- <img :src="`${NODE_ENV}/data/volcano/VolcanoByRegion/${params.atlas}_${params.region}_${params.cellType}.png`" alt="" style="max-width:100%;"> -->
        </div>
      </b-pane>
      <b-pane label="MARKERS">
        <div class="search-by">
          <span class="t">Search by </span>
          <ul>
            <li>
              <span>Region : </span>
              <el-tag>{{ params.region }}</el-tag>
            </li>
            <li>
              <span>Cell type : </span>
              <el-tag>{{ params.cellType }}</el-tag>
            </li>
          </ul>
        </div>
        <div class="download-show">
          <div class="mt10">
            Download :
            <el-button type="text" @click="downloadFile('csv')">csv</el-button>
            <el-button type="text" @click="downloadFile('pdf')">pdf</el-button>
          </div>
          <div>
            Show : <el-button>P-Value</el-button>
            <span>
              Top
              <a href="javascript:void();" class="page-size" v-for="item in pageSizes" :key="item" :class="{ line: item == pageSize }" @click="choosePagesize(item)">
                {{ item }}
              </a>
            </span>
          </div>
        </div>
        <el-table v-if="tableData.length<1" :data="[]" height="500">
          <el-table-column v-for="column in columnList" :key="column" :prop="column" :label="column" :sortable="column!=='Link'">
            <el-table-column :prop="column" v-if="column!=='Link'">
              <template #header>
<!--                <el-select placeholder="filter" v-model="columnSelect['Species']" @change="(value) => headerChange(value, 'Species')" clearable>-->
<!--                  <el-option value="">All </el-option>-->
<!--                </el-select>-->
                <el-input placeholder="filter" v-model="columnSelect[column]"  @input="headerChange(columnSelect[column], column)"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-table v-else :data="tableData" class="mt10" empty-text="Not available in current version of Brain Cell Atals" v-loading="loading" height="600px" header-row-class-name="headerRowClass">
          <el-table-column prop="C0" label="genes" sortable>
            <el-table-column prop="C0">
              <template #header>
<!--                <el-select placeholder="filter" v-model="columnSelect['C0']" @change="(value) => headerChange(value, 'C0')">-->
<!--                  <el-option value="">All </el-option>-->
<!--                  <el-option v-for="(item, index) in selectKeyArray['C0']" :key="`C0${item}${index}`" :value="item">{{ item }}</el-option>-->
<!--                </el-select>-->

                <el-input placeholder="filter" v-model="columnSelect['C0']" clearable  @input="headerChange(columnSelect['C0'], 'C0')"></el-input>
              </template>
              <template slot-scope="scope">
                {{ scope.row["C0"] || "-" }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="avg_log2FC" label="avg_log2FC" sortable>
            <el-table-column prop="avg_log2FC">
              <template #header>
<!--                <el-select placeholder="filter" v-model="columnSelect['avg_log2FC']" @change="(value) => headerChange(value, 'avg_log2FC')">-->
<!--                  <el-option value="">All </el-option>-->
<!--                  <el-option v-for="(item, index) in selectKeyArray['avg_log2FC']" :key="`avg_log2FC${item}${index}`" :value="item">{{ item }}</el-option>-->
<!--                </el-select>-->

                <el-input placeholder="filter" v-model="columnSelect['avg_log2FC']" clearable  @input="headerChange(columnSelect['avg_log2FC'], 'avg_log2FC')"></el-input>
              </template>
              <template slot-scope="scope">
                {{ scope.row["avg_log2FC"] || "-" }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="p_val" label="p_val" sortable>
            <el-table-column prop="p_val">
              <template #header>
<!--                <el-select placeholder="filter" v-model="columnSelect['p_val']" @change="(value) => headerChange(value, 'p_val')">-->
<!--                  <el-option value="">All </el-option>-->
<!--                  <el-option v-for="(item, index) in selectKeyArray['p_val']" :key="`p_val${item}${index}`" :value="item">{{ item }}</el-option>-->
<!--                </el-select>-->

                <el-input placeholder="filter" v-model="columnSelect['p_val']" clearable  @input="headerChange(columnSelect['p_val'], 'p_val')"></el-input>
              </template>
              <template slot-scope="scope">
                {{ scope.row["p_val"]  }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="p_val_adj" label="p_val_adj" sortable>
            <el-table-column prop="p_val_adj">
              <template #header>
<!--                <el-select placeholder="filter" v-model="columnSelect['p_val_adj']" @change="(value) => headerChange(value, 'p_val_adj')">-->
<!--                  <el-option value="">All </el-option>-->
<!--                  <el-option v-for="(item, index) in selectKeyArray['p_val_adj']" :key="`p_val_adj${item}${index}`" :value="item">{{ item }}</el-option>-->
<!--                </el-select>-->

                <el-input placeholder="filter" v-model="columnSelect['p_val_adj']" clearable  @input="headerChange(columnSelect['p_val_adj'], 'p_val_adj')"></el-input>
              </template>
              <template slot-scope="scope">
                {{ scope.row["p_val_adj"]  }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="pct.1" label="pct.1" sortable>
            <el-table-column prop="pct.1">
              <template #header>
<!--                <el-select placeholder="filter" v-model="columnSelect['pct.1']" @change="(value) => headerChange(value, 'pct.1')">-->
<!--                  <el-option value="">All </el-option>-->
<!--                  <el-option v-for="(item, index) in selectKeyArray['pct.1']" :key="`pct1${item}${index}`" :value="item">{{ item }}</el-option>-->
<!--                </el-select>-->

                <el-input placeholder="filter" v-model="columnSelect['pct.1']" clearable  @input="headerChange(columnSelect['pct.1'], 'pct.1')"></el-input>
              </template>
              <template slot-scope="scope">
                {{ scope.row["pct.1"] || "-" }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="pct.2" label="pct.2" sortable>
            <!-- <template slot-scope="scope">
              <span>{{ scope.row["pct.2"] }}</span>
            </template> -->
            <el-table-column prop="pct.2">
              <template #header>
<!--                <el-select placeholder="filter" v-model="columnSelect['pct.2']" @change="(value) => headerChange(value, 'pct.2')">-->
<!--                  <el-option value="">All </el-option>-->
<!--                  <el-option v-for="(item, index) in selectKeyArray['pct.2']" :key="`pct2${item}${index}`" :value="item">{{ item }}</el-option>-->
<!--                </el-select>-->

                <el-input placeholder="filter" v-model="columnSelect['pct.2']" clearable  @input="headerChange(columnSelect['pct.2'], 'pct.2')"></el-input>
              </template>
              <template slot-scope="scope">
                {{ scope.row["pct.2"] || "-" }}
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </b-pane>
    </div>
  </div>
</template>
<script>
import { postCSV } from "@/api/system.js";
import Papa from 'papaparse';
export default {
  name: "Markers",
  props: {
    params: {
      type: Object,
      default: () => ({}),
    },
    atlasMarkerBtn: {
      type: String,
      default: "Region",
    },
  },
  data () {
    return {
      showMarker: false,
      frozenData: [],
      tableData: [],
      tabelKeys: [],
      pageSize: 9999,
      pageSizes: [50, 100],
      loading: true,
      VolcanoMarkerBy: "VolcanoByRegion",
      // NODE_ENV: process.env.NODE_ENV === "production" ? "" : "/api",
      apiBaseUrl: "https://data.braincellatlas.org",
      columnSelect: { C0: '', avg_log2FC: '', p_val: '', p_val_adj: '', 'pct.1': '', 'pct.2': '' },
      selectKeyArray: {},
      columnList: ['C0', 'avg_log2FC', 'p_val', 'p_val_adj', 'pct.1', 'pct.2'],
      columnFilters:{}
    }
  },
  watch: {
    params: {
      handler (val) {
        this.showMarker = false;
        this.tableData = [];
      },
      deep: true,
    },
    atlasMarkerBtn: {
      handler (val) {
        this.VolcanoMarkerBy = 'VolcanoBy' + val
      },
      immediate: true
    }
  },
  methods: {
    downloadFile (type) {
      if (this.tableData.length < 1) return
      // const fsURl = `${this.NODE_ENV}/data/csv/markersBy${this.atlasMarkerBtn}/${this.params.atlas}_${this.params.region}_${this.params.cellType}_cell_type.${type}`
      //更换下载的数据文件-->读取public下面的文件的数据
      const fsURl = `/markersBy${this.atlasMarkerBtn}/${this.params.atlas}_${this.params.region}_${this.params.cellType}_cell_type.${type}`
      if (type === 'pdf') {
        fetch(fsURl).then(res => {
          res.blob().then(blob => {
            const a = document.createElement('a')
            const url = window.URL.createObjectURL(blob)
            const filename = `${this.params.atlas}_${this.params.region}_${this.params.cellType}_cell_type.${type}`
            a.href = url
            a.download = filename
            a.click()
            window.URL.revokeObjectURL(url)
          })
        })
      } else {
        window.open(fsURl)
      }
    },
    choosePagesize (item) {
      this.pageSize = item;
      this.fetchMarkers(this.params)
    },
    async getTableData(params){
      const csvFilePath = `${apiBaseUrl}/markersBy${this.atlasMarkerBtn}/${params.atlas}_${params.region}_${params.cellType}_cell_type.csv`
      let jsonData
      const csvContent = await fetch(csvFilePath)
        .then(response => response.text())
        .then(csvText => {
          Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: result => {
              jsonData = result.data;
            },
            error: error => {
              console.error('Error parsing CSV:', error.message);
            },
          });
        })
      //处理csv文件中数据的表头是空值的逻辑
      let modifiedTable = jsonData.map(item => {
        for (const itemKey in item) {
          if (itemKey === '') {
            item['C0'] = item[''];
            delete item[''];
          }
        }
        return item;
      });
      return modifiedTable
    },
    async fetchMarkers (params) {
      if (params.atlas === 'Mouse') {
        this.tableData = []
        return
      }
      const vals = Object.values(this.params)
      if (vals.includes("")) {
        this.$message.error("Please select all options")
        return
      }
      this.showMarker = true
      this.loading = true
      try {
        // const result = await postCSV({
        //   fileName: `csv/markersBy${this.atlasMarkerBtn}/${params.atlas}_${params.region}_${params.cellType}_cell_type.csv`,
        //   maxLength: this.pageSize
        // })
        // const tabelKeys = Object.keys(result)
        // let tableData = []
        // result.C0.forEach((item, index) => {
        //   tableData.push(
        //     tabelKeys.reduce((obj, key) => {
        //       obj[key] = result[key][index];
        //       return obj
        //     }, {})
        //   )
        // })
        let tableData = await this.getTableData(params)
        this.tableData = tableData
        this.frozenData = [...tableData]
        // this.tabelKeys = tabelKeys
        // tabelKeys.forEach(key => {
        //   this.selectKeyArray[key] = [...(new Set(result[key]))]
        // })
        this.loading = false
      } catch (error) {
        // this.$message.info(`No data found`);
        this.tableData = []
        this.loading = false
      }
    },
    headerChange (value, objName) {
      // const selectMap = Object.keys(this.columnSelect).filter((key) => {
      //   return this.columnSelect[key] != ""
      // })
      // let tableData = []
      //
      // selectMap.forEach((key) => {
      //   tableData = this.frozenData.filter(
      //     // (value) => value[key] === this.columnSelect[key]
      //     (value) => String(value[key]).toLowerCase().includes(String(this.columnSelect[key]).toLowerCase())
      //   )
      // })
      // this.tableData = selectMap.length < 1 ? this.frozenData : tableData
      // this.$nextTick(() => {
      //   this.$set(this.columnSelect, objName, value)
      //   this.$forceUpdate()
      // })

      // 将输入的值转换为小写，方便不区分大小写进行比较
      const lowercasedValue = value.toLowerCase();

      // 如果当前列的筛选条件为空，则将其初始化为一个空数组
      if (!this.columnFilters[objName]) {
        this.columnFilters[objName] = [];
      }

      // 更新当前列的筛选条件数组
      this.columnFilters[objName] = lowercasedValue ? [lowercasedValue] : [];

      // 使用过滤函数筛选数据
      const filteredData = this.frozenData.filter((item) => {
        // 对于每一行数据，检查所有列的筛选条件是否都满足
        return Object.keys(this.columnFilters).every((key) => {
          // 如果当前列的筛选条件数组不为空，则检查当前行的值是否满足条件
          if (this.columnFilters[key].length > 0) {
            const columnValue = String(item[key]).toLowerCase();
            return this.columnFilters[key].some((filter) => columnValue.includes(filter));
          }
          // 如果当前列的筛选条件数组为空，则说明不需要对当前列进行筛选，直接返回true
          return true;
        });
      });
      // 将筛选后的数据赋值给表格数据，实现数据的更新
      this.tableData = filteredData;

    }
  }
}
</script>
<style lang="scss" scoped>
.search-by {
  display: flex;
  align-items: center;
  .t {
    margin-right: 10px;
    font-size: 16px;
    font-weight: bold;
    color: $themeColor;
  }
  ul {
    display: flex;
    align-items: center;
    li {
    }
  }
  span {
    margin-right: 10px;
    vertical-align: middle;
  }
}
.download-show {
  display: flex;
  justify-content: space-between;
  .page-size {
    color: $themeColor;
    display: inline-block;
    margin-left: 10px;
    &.line {
      border-bottom: 1px solid $themeColor;
    }
  }
}
</style>
