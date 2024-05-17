<template>
  <div class="wrap">
    <div class="flex-space">
      <b-pagetitle label=" "></b-pagetitle>
      <div align="right">
        <el-input v-model="searchKey" class="dataset-search" @change="searchChange">
          <span slot="prepend">Search</span>
        </el-input>
      </div>
    </div>
    <el-table v-if="tableData.length>0" :data="tableData" style="width: 100%" ref="table" class="reference-table" empty-text="No Data" max-height="600" header-row-class-name="headerRowClass">
      <el-table-column prop="Species" label="Species" sortable>
        <el-table-column prop="Species" width="100">
          <template #header>
<!--            <el-select placeholder="filter" v-model="columnSelect['Species']" @change="(value) => headerChange(value, 'Species')" clearable>-->
<!--              <el-option value="">All </el-option>-->
<!--              <el-option v-for="(item, index) in selectKeyArray['Species']" :key="`${item}${index}`" :value="item">{{ item }}-->
<!--              </el-option>-->
<!--            </el-select>-->
            <el-input placeholder="filter" v-model="columnSelect['Species']" clearable  @input="headerChange(columnSelect['Species'], 'Species')"></el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="Atlas" label="Atlas" sortable>
        <el-table-column prop="Atlas" show-overflow-tooltip width="100">
          <template #header>
<!--            <el-select placeholder="filter" v-model="columnSelect['Atlas']" @change="(value) => headerChange(value, 'Atlas')">-->
<!--              <el-option value="">All </el-option>-->
<!--              <el-option v-for="(item, index) in selectKeyArray['Atlas']" :key="`${item}${index}`" :value="item">{{ item }}-->
<!--              </el-option>-->
<!--            </el-select>-->
            <el-input placeholder="filter" v-model="columnSelect['Atlas']" clearable  @input="headerChange(columnSelect['Atlas'], 'Atlas')"></el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="Tissue" label="Tissue" sortable>
        <el-table-column prop="Tissue" show-overflow-tooltip>
          <template #header>
<!--            <el-select placeholder="filter" v-model="columnSelect['Tissue']" @change="(value) => headerChange(value, 'Tissue')">-->
<!--              <el-option value="">All </el-option>-->
<!--              <el-option v-for="(item, index) in selectKeyArray['Tissue']" :key="`${item}${index}`" :value="item">{{ item }}</el-option>-->
<!--            </el-select>-->
            <el-input placeholder="filter" v-model="columnSelect['Tissue']" clearable  @input="headerChange(columnSelect['Tissue'], 'Tissue')"></el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="Status" label="Status" sortable>
        <el-table-column prop="Status">
          <template #header>
<!--            <el-select placeholder="filter" v-model="columnSelect['Status']" @change="(value) => headerChange(value, 'Status')">-->
<!--              <el-option value="">All </el-option>-->
<!--              <el-option v-for="(item, index) in selectKeyArray['Status']" :key="`${item}${index}`" :value="item">{{ item }}</el-option>-->
<!--            </el-select>-->
            <el-input placeholder="filter" v-model="columnSelect['Status']" clearable  @input="headerChange(columnSelect['Status'], 'Status')"></el-input>
          </template>
          <template slot-scope="scope">
            {{ scope.row["Status"] || "-" }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="Platform" label="Platform" sortable>
        <el-table-column prop="Platform">
          <template #header>
<!--            <el-select placeholder="filter" v-model="columnSelect['Platform']" @change="(value) => headerChange(value, 'Platform')">-->
<!--              <el-option value="">All </el-option>-->
<!--              <el-option v-for="(item, index) in selectKeyArray['Platform']" :key="`${item}${index}`" :value="item">{{ item }}</el-option>-->
<!--            </el-select>-->
            <el-input placeholder="filter" v-model="columnSelect['Platform']" clearable  @input="headerChange(columnSelect['Platform'], 'Platform')"></el-input>
          </template>
          <template slot-scope="scope">
            {{ scope.row["Platform"] || "-" }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="Seq-type" sortable>
        <el-table-column prop="Seq-type">
          <template #header>
<!--            <el-select placeholder="filter" v-model="columnSelect['Seq-type']" @change="(value) => headerChange(value, 'Seq-type')">-->
<!--              <el-option value="">All </el-option>-->
<!--              <el-option v-for="(item, index) in selectKeyArray['Seq-type']" :key="`${item}${index}`" :value="item">{{ item }}</el-option>-->
<!--            </el-select>-->
            <el-input placeholder="filter" v-model="columnSelect['Seq-type']" clearable  @input="headerChange(columnSelect['Seq-type'], 'Seq-type')"></el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="Year" label="Year" sortable>
        <el-table-column prop="Year" width="100">
          <template #header>
<!--            <el-select placeholder="filter" v-model="columnSelect['Year']" @change="(value) => headerChange(value, 'Year')">-->
<!--              <el-option value="">All </el-option>-->
<!--              <el-option v-for="(item, index) in selectKeyArray['Year']" :key="`${item}${index}`" :value="item">{{ item }}</el-option>-->
<!--            </el-select>-->
            <el-input placeholder="filter" v-model="columnSelect['Year']" clearable  @input="headerChange(columnSelect['Year'], 'Year')"></el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="Accession" label="Accession" sortable>
        <el-table-column prop="Accession">
          <template #header>
<!--            <el-select placeholder="filter" v-model="columnSelect['Accession']" @change="(value) => headerChange(value, 'Accession')">-->
<!--              <el-option value="">All </el-option>-->
<!--              <el-option v-for="(item, index) in selectKeyArray['Accession']" :key="`${item}${index}`" :value="item">{{ item }}</el-option>-->
<!--            </el-select>-->
            <el-input placeholder="filter" v-model="columnSelect['Accession']" clearable  @input="headerChange(columnSelect['Accession'], 'Accession')"></el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="Link" label="Link" width="70">
        <template slot-scope="scope">
          <span class="link" @click="toLink(scope.row&&scope.row.Link)" :title="scope.row&&scope.row.Link">Link</span>
        </template>
      </el-table-column>
      <el-table-column prop="Download" label="Download" width="170">
        <template slot-scope="scope">
          <span class="link" @click="toLink(scope.row&&scope.row.Download)" :title="scope.row&&scope.row.Download">Raw&Processed Data</span>
        </template>
      </el-table-column>
    </el-table>
    <el-table v-else :data="[]" height="500">
      <el-table-column v-for="column in columnList" :key="column" :prop="column" :label="column" :sortable="column!=='Link'">
        <el-table-column :prop="column" v-if="column!=='Link'">
          <template #header>

<!--            <el-select placeholder="filter" v-model="columnSelect['Species']" @change="(value) => headerChange(value, 'Species')" clearable>-->
<!--              <el-option value="">All </el-option>-->
<!--            </el-select>-->
            <el-input placeholder="filter" v-model="columnSelect[column]"  @input="headerChange(columnSelect[column], column)"></el-input>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { postCSV } from "@/api/system.js";
import Papa from 'papaparse';
import { Loading } from 'element-ui';
export default {
  data () {
    return {
      searchKey: "",
      tableData: [],
      frozenData: [],
      reference: {},
      columnSelect: {
        Species: '',
        Atlas: '',
        Tissue: '',
        Status: '',
        Platform: '',
        'Seq-type': '',
        Year: '',
        Accession: '',
        Link: '',
        Download: ''
      },
      selectKeyArray: {},
      columnList: ['Species', 'Atlas', 'Tissue', 'Status', 'Platform', 'Seq-type', 'Year', 'Accession', 'Link', 'share'],
      loading: true,
      columnFilters:{}
    }
  },
  computed: {
  },
  methods: {
    //更换文件数据获取方式
    async getTableData(){
      const csvFilePath = `${apiBaseUrl}/datasets_view.csv`
      const csvContent = await fetch(csvFilePath)
        .then(response => response.text())
        .then(csvText => {
          Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: result => {
              let jsonData = result.data;
              for (let i = 0; i < jsonData.length; i++) {
                this.tableData.push({
                  Species: jsonData[i]['Species'],
                  Atlas: jsonData[i]['Atlas'],
                  Tissue: jsonData[i]['Tissue'],
                  Status: jsonData[i]['Status'],
                  Platform: jsonData[i]['Platform'],
                  'Seq-type': jsonData[i]['Seq-type'],
                  Year: jsonData[i]['Year'],
                  Accession: jsonData[i]['Accession'],
                  Link: jsonData[i]['Link'],
                  Download: jsonData[i]['share']
                })
              }
              this.frozenData = this._.cloneDeep(this.tableData)

            },
            error: error => {
              console.error('Error parsing CSV:', error.message);
            },
          });
        })
    },
    toLink(link) {
      if (link)
        window.open(link)
      else
        return
    },
    async fetchDetail() {
      // const loading = Loading.service({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   // background: 'rgba(0, 0, 0, 0.7)',
      //   target: '.reference-table',
      //   fullscreen: false
      // });
      let tableData = []
      try {

        const result = await postCSV({
          fileName: "csv/datasets_view.csv",
        })
        result.Species.forEach((item, i) => {
          tableData.push({
            Species: result["Species"][i],
            Atlas: result["Atlas"][i],
            Tissue: result["Tissue"][i],
            Status: result["Status"][i],
            Platform: result["Platform"][i],
            'Seq-type': result["Seq-type"][i],
            Year: result["Year"][i],
            Accession: result["Accession"][i],
            Link: result["Link"][i],
            Download: result["share"][i]
          })
        })
        const keys = Object.keys(result)
        keys.forEach(key => {
          this.selectKeyArray[key] = [...(new Set(result[key]))]
        })
        this.tableData = tableData
        this.frozenData = this._.cloneDeep(this.tableData)
        this.reference = result
        // loading.close()
      } catch (error) {
        this.tableData = tableData
        // loading.close()
      }
    },
    headerChange(value, objName) {
      // const selectMap = Object.keys(this.columnSelect).filter((key) => {
      //   return this.columnSelect[key] != ""
      // })
      // let tableData = []
      //
      // selectMap.forEach((key) => {
      //   tableData = this.frozenData.filter(
      //     (value) => value[key] === this.columnSelect[key]
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

      this.searchKey = ''
    },
    // search事件，回车时触发,搜索全局数据
    searchChange(value) {
      if (value === '' || !value) {
        this.tableData = this.frozenData
        return
      }
      const searchKey = this.searchKey  // 搜索关键词
      const searchList = []  // 匹配到的数据
      this.frozenData.filter((item) => {
        const keys = Object.keys(item)
        keys.forEach((key) => {
          if (item[key] && item[key].toString().toLowerCase().indexOf(searchKey.toLowerCase()) > -1 && key !== 'Link' && key !== 'Download') {
            searchList.push(item)
          }
        })
      })
      this.tableData = searchList.length < 1 ? [] : searchList

      for (const key in this.columnSelect) {
        if (Object.hasOwnProperty.call(this.columnSelect, key)) {
          this.columnSelect[key] = ''
        }
      }

    }
  },
  async mounted() {
    // await this.fetchDetail() //请求不通(500)先注释了
    await this.getTableData() //更换文件数据获取方式(public文件下面的数据的)
  }
}
</script>
<style lang="scss" scoped>
.reference-table {
  min-height: calc(100vh - 300px);
  margin-bottom: 20px;
  // overflow-y: auto;
}

.el-dropdown {
  color: #909399;
}

.link {
  color: #409eff;
  text-decoration: underline;
  cursor: pointer;
}
</style>
<style lang="scss">
.dataset-search {
  .el-input-group__append,
  .el-input-group__prepend {
    background-color: none;
    border: none;
    color: #333;
  }
}

.el-table th.el-table__cell > .cell {
  word-break: break-word;
}
</style>
