<template>
  <div class="wrap">
    <div class="title">
      <ul>
        <li>
          <a id="TData Viewer" href="#Data Viewer">Data Viewer</a>
        </li>
        <li>
          <a id="TPortrait" href="#Portrait">Portrait</a>
        </li>
        <li>
          <a id="TGenes" href="#Genes">Genes</a>
        </li>
        <li>
          <a id="TCell Sorting" href="#Cell Sorting">Exploration</a>
        </li>
        <li>
          <a id="TDatasets" href="#Datasets">Dataset</a>
        </li>
      </ul>
    </div>
    <div class="mtit">
      <div class="f">
        <p>Brain Cell Atlas is a comprehensive and unified atlas of the brain that was built across studies, regions, diseases and sequencing platforms. We integrated the majority of the single-nuclei/single-cell transcriptomic datasets published from 2016 to present from a diverse source of human brain samples that provide a unified cell type and manually curated metadata annotated framework for brain cell research in health, disease as well as in the development.</p>
      </div>
    </div>
    <div class="mtit mt10">
      <div class="t">
        <a id="Data Viewer" href="#TData Viewer">Data Viewer</a>
        <span style="font-size:14px;">&nbsp;&nbsp;Click to the top</span>
      </div>
      <el-divider></el-divider>
      <div class="f">
        <p>
          <em>
            <strong>The Data Viewer may take dozens of seconds to load due to the substantial volume of data present in the Brain Cell Atlas.</strong>
          </em>
        </p>
        <p>The Data Viewer page features the UMAP that presents the sample characteristics and gene expressions in the Brain Cell Atlas.</p>
        <p>From the "Atlas" tab, you can choose to view a particular UMAP from Adult Brain, Fetal Brain, Tumour and Organoids. Then, select a brain region from the "Region" tab and click on the "Submit" button:</p>
        <div align="left">
          <img src="@/assets/img/help/help_figure_Dataviewer.png" alt style="max-width:75%;" />
        </div>
        <br />
        <br />
        <p>The left panel plot is a plotly.js module that displays the integrative UMAPs of the Adult Brain, Fetal Brain, Tumour and Organoids in the Brain Cell Atlas.</p>
        <div align="left">
          <img alt style="max-width:45%;" src="@/assets/img/help/help_figure_Dataviewer_left.png" />
        </div>
        <br>
        <p>
          <b>(1)</b> By scrolling down the selection from "Colour By", you can view coloured cells from a certain attribute for the cells. Several other dimiensions to view the UMAP are described as below:
        </p>
        <p>A list of selectable attributes to display the UMAPs are shown in the left column.</p>
        <el-table :data="dataViewerData" class="level-table mt10">
          <el-table-column label="Name" width="180">
            <template slot-scope="scope">
              <span class="level-table-span" v-html="scope.row.name"></span>
            </template>
          </el-table-column>
          <el-table-column label="Description">
            <template slot-scope="scope">
              <span class="level-table-span" v-html="scope.row.desc"></span>
            </template>
          </el-table-column>
        </el-table>
        <ul class="f users-can mt10">
<li><p>The scAnnot cell type names are models that predicted cell names based on the transcriptomic expressions and known brain cell names. The model was built using a well-annotated adult human brain snRNA dataset (<a href="https://www.science.org/doi/10.1126/science.add7046">Siletti <em>et al</em>, 2023</a>) and the fetal human brain scRNA resource (<a href="https://www.biorxiv.org/content/10.1101/2022.10.24.513487v1">Braun <em>et al</em>, 2022</a>).</p>
</li>
<li><p>You can read more about scAnnot from <a href="https://github.com/rnacentre/scAnnot">scAnnot's GitHub Page</a>.</p>
</li>
</ul>
        <br />
        <p>
          <b>(2)</b> On the right panel you can view the expression of a certain gene on the UMAP from search.
        </p>
        <div align="left">
          <img alt style="max-width:45%;" src="@/assets/img/help/help_figure_Dataviewer_right.png" />
        </div>
        <br>
        <p>
          <b>(3)</b> You may download the UMAP, using selection tools to crop an area and zoom-in/out by clicking on the tool bars on the top-right of the panel (Some tools may take several seconds to load).
        </p>
      </div>
    </div>
    <div class="mtit mt10">
      <div class="t">
        <a id="Portrait" href="#TPortrait">Portrait</a>
        <span style="font-size:14px;">&nbsp;&nbsp;Click to the top</span>
      </div>
      <el-divider></el-divider>
      <div class="f">
        <p>The interactive viewer shows the adult human brain and includes all the major regions from the data used in Brain Cell Atlas.</p>
        <div align="center">
          <img src="@/assets/img/help/help_figure_portrait.png" alt style="max-width:75%;" />
        </div>
      </div>
      <div class="t1">Users can:</div>
      <p>
        <b>(1) </b>
        <i>Move</i> the mouse onto the text labels and read a brief introduction of the region from the Wikipedia site below the portrait.
      </p>
      <p>
        <b>(2) </b>
        <i>Click</i> on the text labels or click on a brain region to explore its cell resource in the <strong><a href="#TData Viewer">Data Viewer</a></strong> page.
      </p>
      <ul class="f users-can mt10">
        <li>There are three anatomical levels appeared in the interactive viewer, which are defined as below in the Brain Cell Atlas.</li>
      </ul>
      <el-table :data="levelData" class="level-table mt10">
        <el-table-column prop="Level1" label="Level1"></el-table-column>
        <el-table-column label="Level2">
          <template slot-scope="scope">
            <span class="level-table-span" v-for="item in scope.row.Level2" :key="item">
              {{item}}
              <br />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Level3">
          <template slot-scope="scope">
            <span class="level-table-span" v-for="item in scope.row.Level3" :key="item">
              {{item}}
              <br />
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mtit mt10">
      <div class="t">
        <a id="Genes" href="#TGenes">Genes</a>
        <span style="font-size:14px;">&nbsp;&nbsp;Click to the top</span>
      </div>
      <el-divider></el-divider>
      <div class="t1">
        <a id="Markers">Markers</a>
      </div>
      <div class="f">
        <p>Users can obtain a list of differentially expressed genes of the cell types from a selected brain region and the list is available for download in csv or pdf formats.</p>
        <p>The cell type name is defined by the most scored prediced cell type computed from the 8 machine-learning-based annotation methods:</p>
      </div>
      <ul class="f users-can">
        <li>
          <a href="https://doi.org/10.1093/bioinformatics/btz592">ACTINN</a>
        </li>
        <li>
          <a href="10.1093/nar/gkz543">CHETAH</a>
        </li>
        <li>
          <a href="https://www.nature.com/articles/s41587-021-01001-7">scArches</a>
        </li>
        <li>
          <a href="https://doi.org/10.1038/nmeth.4644">ScMap</a>
        </li>
        <li>
          <a href="https://doi.org/10.1186/s13059-019-1862-5">scPred</a>
        </li>
        <li>
          <a href="https://doi.org/10.1016/j.cels.2019.06.004">SingleCellNet</a>
        </li>
        <li>
          <a href="https://doi.org/10.1038/s41590-018-0276-y">SingleR</a>
        </li>
        <li>scAnnot - a hierarchical classification model trained based on scANVI.</li>
      </ul>
      <p>
        For example, choosing an atlas to start with (Adult is shown here), and compute for candidate markers within a specific region by selecting the tab
        <b>By Region</b> or find candidate markers of a cell type by selecting the tab
        <b>By CellType</b>. After selection and click on the tab
        <b>Markers</b>, a volcano plot will be shown and list of candidate markers are listed in the table available for downlod in pdf or csv format.
      </p>
      <div align="center">
        <img src="@/assets/img/help/help_figure_marker.png" alt style="max-width:75%;" />
      </div>
      <div align="center">
        <img src="@/assets/img/help/help_figure_marker2.png" alt style="max-width:75%;" />
      </div>
      <div align="center">
        <img src="@/assets/img/help/help_figure_marker3.png" alt style="max-width:75%;" />
      </div>

      <div class="t1">Region DEG</div>
      <div class="f">
        <p>Region DEG (Differential expression Genes) compares different cell types from the same region. A violin plot of the top 3 DEGs for each different cell types of the region will be shown after selection of the input.</p>
      </div>
      <div align="center">
        <img src="@/assets/img/help/help_figure_DEG.png" alt style="max-width:75%;" />
      </div>
      <div align="center">
        <img src="@/assets/img/help/help_figure_DEG2.png" alt style="max-width:75%;" />
      </div>

      <div class="t1">CellType DEG</div>
      <div class="f">
        <p>CellType DEG compares the same cell type from different regions. Likewise, a violin plot of the top 3 DEGs for this cell type across different region will be shown after selection of the input.</p>
      </div>
    </div>
    <div class="mtit mt10">
      <div class="t">
        <a id="Cell Sorting" href="#TCell Sorting">Exploration</a>
        <span style="font-size:14px;">&nbsp;&nbsp;Click to the top</span>
      </div>
      <el-divider></el-divider>
      <div class="f">
        <p>This page present the statistics of Brain Cell Atlas with various of plots.</p>
        <p>
          You can locate the relevant atlas and brain region to get summary information about the relevant resources in the Brain Cell Atlas. From the "Atlas" tab, you can choose a particular Atlas from Adult Brain, Fetal Brain, Tumour and Organoids. Then, select a brain region from the "Region" tab and click on the "Submit" button to view the statistics information.
        </p>
        <ul class="f users-can mt10">
          <li><h3 id="Cell-Proportion">Cell Proportion</h3></li>
          <p>The pie chart on the leftside shows the proportion of different cell types in the selected atlas and the barplot on the right shows the cell/nucleus counts of each cell types. The cell types are annotated with <a href="https://github.com/rnacentre/scAnnot">scAnnot</a> and using (<a href="https://www.science.org/doi/10.1126/science.add7046">Siletti <em>et al</em>, 2023</a>) and (<a href="https://www.biorxiv.org/content/10.1101/2022.10.24.513487v1">Braun <em>et al</em>, 2022</a>) as a reference.</p>

          <li><h3 id="Features">Features</h3></li>
          <p>The violin plot shows a selected gene's expression across different cell types across the atlas. You may select a gene by scrolling down or type in the gene's name to search.</p>
        </ul>
      </div>
      <div align="center">
        <img src="@/assets/img/help/help_figure_Exploration.png" alt style="max-width:70%;" />
      </div>
    </div>

    <div class="mtit mt10" id="Datasets">
      <div class="t">
        <a id="Datasets" href="#TDatasets">Dataset</a>
        <span style="font-size:14px;">&nbsp;&nbsp;Click to the top</span>
      </div>
      <el-divider></el-divider>
      <div class="f">
        <p>
          The Dataset page includes all the datasets used in the Brain Cell Atlas, a full list of the studies and authors from this page can be found
          <a
            href="https://docs.google.com/spreadsheets/d/1-EyAjwjJKCpwmAnUDTbKSAQ-yJSBHGJSej_jXxYiTjg/edit#gid=0"
          >here</a>. Processed data with re-annotated cell type metadata will be avaiable for download upon publication.
        </p>
        <div align="center">
          <img src="@/assets/img/help/help_figure_dataset.png" alt style="max-width:75%;" />
        </div>
      </div>
    </div>
    <div style="height:70px"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      levelData: [
        {
          Level1: "Cerebral cortex",
          Level2: ["Frontal lobe"],
          Level3: ["Prefrontal cortex", " Motor cortex"]
        },
        {
          Level1: "Cerebral cortex",
          Level2: ["Parietal lobe"],
          Level3: ["Somatosensory cortex"]
        },
        {
          Level1: "Cerebral cortex",
          Level2: ["Occipital lobe", "Temporal lobe", "Cingulate cortex"]
        },
        {
          Level1: "Brainstem",
          Level2: ["Midbrain", "Pons", "Medulla oblongata"]
        },
        {
          Level1: "Deep structures",
          Level2: [
            "Amygdala",
            "Basal ganglia",
            "Hippocampus",
            "Hypothalamus",
            "Olfactory bulb",
            "Pineal gland",
            "Putamen",
            "Thalamus"
          ]
        },
        {
          Level1: "Corpus callosum"
        },
        {
          Level1: "Cerebellum"
        },
        {
          Level1: "Spinal cord"
        }
      ],
      dataViewerData: [
        {
    name: "sample",
    desc: "Sample ID of the cells or nuclei."
  },
  {
    name: "donor_ID",
    desc: "Author specified donor IDs, which are indicated in the original publications."
  },
  {
    name: "gender",
    desc: "F = Female; M = Male; Unclassified = Unknown."
  },
  {
    name: "age",
    desc: `For postnatal individuals, 6 months old is denoted by 6mo; 21 years old is denoted by "21yr".<br/>
            For prenatal individuals, 9w stands for 9 gestational weeks (GW).<br/>
            For organoids, use d (days in culture)<br/>
            Eg. 10d.`
  },
  {
    name: "donor_status",
    desc: `Each donor's disease status corresponds to common names appearing in
            <a href="https://bioportal.bioontology.org/ontologies/MONDO/?p=classes&conceptid=root">MONDO Diseased Ontology</a>.`
  },
  {
    name: "region",
    desc: "Anatomical structure level 1 (Please find details in the first table of the Help Page)."
  },
  {
    name: "subregion",
    desc: "Anatomical structure level 2 (Please find details in the first table of the Help Page)."
  },
  {
    name: "sample_status",
    desc: `Each disease status corresponds to common names appearing in
            <a href="https://bioportal.bioontology.org/ontologies/MONDO/?p=classes&conceptid=root">MONDO Diseased Ontology</a>.`
  },
  {
    name: "Seq_tech",
    desc: "Sequencing platforms used."
  },
  {
    name: "project_code",
    desc: `Project codes are the data accession codes or strings of abbreviation of the study provided by the authors.<br/>
           Eg. GSE/SCP/E-MTAB-/PRJNA/EGAS/phs/PRJEB/SDY/SRP.`
  },
  {
    name: "scAnnot_Level1",
    desc: "The putative cell type level 1 prediction generated from scAnnot."
  },
  {
    name: "scAnnot_Level2",
    desc: "The putative cell type level 2 (more specific) prediction generated from scAnnot."
  }
      ]
    };
  },
  methods: {},
  mounted() {
    this.$nextTick(() => {
      const routePath = this.$route.fullPath;
      const anchorPoint = routePath.split("#")[1];
      console.log(anchorPoint);
      if (anchorPoint) {
        const anchor = document.getElementById(anchorPoint);
        anchor.scrollIntoView();
      }
    });
  }
};
</script>
<style lang="scss" scoped>
a {
  color: #034cca;
}
.wrap {
  font-size: calc(100vw * 100 / 9500);
  text-align: justify;
}
.users-can {
  padding-left: 20px;
  li {
    list-style: disc;
  }
}
.level-table {
  &-span {
    line-height: 2em;
  }
}
.title {
  font-size: calc(100vw * 100 / 7000);
  ul {
    list-style-type: none;
    margin: 0;
    margin-top: 30px;
    padding: 0;
    overflow: hidden;
    background-color: rgb(240, 240, 240); /* 修改背景颜色 */
    border: 1px solid #ccc; /* 添加边框 */
    border-radius: 5px; /* 边框圆角 */
    padding: 2px; /* 调整内边距 */
    display: inline-block; /* 按内容实际宽度填充 */
    text-align: center; /* 居中对齐 */
  }

  li {
    display: inline-block; /* 按内容实际宽度填充 */
    border-right: 1px solid #ccc; /* 添加分割线 */
    margin-right: -4px; /* 修正间隙 */
  }

  li:last-child {
    border-right: none;
  }

  li a {
    display: block;
    color: #034cca;
    text-align: center;
    padding: 6px 13px; /* 调整内边距 */
    text-decoration: none;
  }

  li a:hover:not(.active) {
    background-color: rgb(220, 220, 220); /* 修改悬停颜色 */
  }
}
</style>