"use strict";(self["webpackChunkbrain_web"]=self["webpackChunkbrain_web"]||[]).push([[917],{6428:function(e,a,t){t.r(a),t.d(a,{default:function(){return m}});var l=function(){var e=this,a=e._self._c;return a("div",{staticClass:"custom-body-container"},[a("div",{staticClass:"wrap"},[a("HeaderParams",{attrs:{datasetParams:e.datasetParams},on:{submitParams:e.submitParams}}),a("div",{staticClass:"scatter-container"},[a("div",{staticClass:"params-container"},[a("span",{staticClass:"params-text"},[e._v("Color By")]),a("el-select",{staticClass:"select-space",attrs:{clearable:"",filterable:"","filter-method":e.filterValue,placeholder:"please select color"},on:{change:function(a){return e.switchUmapType(e.colorBy)}},model:{value:e.colorBy,callback:function(a){e.colorBy=a},expression:"colorBy"}},e._l(e.colorByOptions,(function(e){return a("el-option",{key:e["value"],attrs:{label:e["label"],value:e["value"]}})})),1),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.plotLoading,expression:"plotLoading"}],staticClass:"left-scatter"},[a("div",{ref:"scatterChartRefLeft",attrs:{id:"scatterChartRefLeft"}})])],1),a("div",{staticClass:"params-container"},[a("span",{staticClass:"params-text"},[e._v("Features")]),a("el-select",{ref:"geneSelect",staticClass:"select-space",attrs:{loading:e.loading,placeholder:"please select gene",filterable:""},on:{change:function(a){return e.switchUmapGene(e.geneFeatures)}},model:{value:e.geneFeatures,callback:function(a){e.geneFeatures=a},expression:"geneFeatures"}},e._l(e.sliceGeneOptions,(function(e){return a("el-option",{key:e["value"],attrs:{label:e["label"],value:e["value"]}})})),1),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.plotLoading,expression:"plotLoading"}],staticClass:"right-scatter"},[a("div",{ref:"scatterChartRefRight",attrs:{id:"scatterChartRefRight"}})])],1)])],1)])},s=[],o=(t(8937),t(6361)),n=t.n(o),r=t(8307),i=t(2585),c=JSON.parse('{"Adult":[{"label":"Cell Type","value":"cell_type"},{"label":"Sample","value":"sample_ID"},{"label":"Donor ID","value":"donor_ID"},{"label":"Gender","value":"donor_gender"},{"label":"Age","value":"donor_age"},{"label":"Donor Status","value":"donor_status"},{"label":"Region","value":"region"},{"label":"Subregion","value":"subregion"},{"label":"Sample Status","value":"sample_status"},{"label":"Sequencing Methods","value":"seq_method"},{"label":"Sequencing Technology","value":"seq_tech"},{"label":"Project Code","value":"project_code"},{"label":"scAnnot Leve 1","value":"Siletti_modf_SCANVI_L1"},{"label":"scAnnot Level 2","value":"Siletti_modf_SCANVI_L2"}],"Fetal":[{"label":"Cell Type","value":"cell_type"},{"label":"Sample","value":"sample_ID"},{"label":"Donor ID","value":"donor_ID"},{"label":"Gender","value":"donor_gender"},{"label":"Age","value":"donor_age"},{"label":"Donor Status","value":"donor_status"},{"label":"Region","value":"region"},{"label":"Subregion","value":"subregion"},{"label":"Sample Status","value":"sample_status"},{"label":"Sequencing Methods","value":"seq_method"},{"label":"Sequencing Technology","value":"seq_tech"},{"label":"Project Code","value":"project_code"},{"label":"scAnnot Leve 1","value":"Braun_L1"},{"label":"scAnnot Level 2","value":"Braun_L2"}],"Tumour":[{"label":"Cell Type","value":"cell_type"},{"label":"Sample","value":"sample_ID"},{"label":"Donor ID","value":"donor_ID"},{"label":"Gender","value":"donor_gender"},{"label":"Age","value":"donor_age"},{"label":"Donor Status","value":"donor_status"},{"label":"Region","value":"region"},{"label":"Subregion","value":"subregion"},{"label":"Sample Status","value":"sample_status"},{"label":"Sequencing Methods","value":"seq_method"},{"label":"Sequencing Technology","value":"seq_tech"},{"label":"Project Code","value":"project_code"},{"label":"scAnnot Leve 1","value":"Siletti_modf_SCANVI_L1"},{"label":"scAnnot Level 2","value":"Siletti_modf_SCANVI_L2"}],"Organiod":[{"label":"Cell Type","value":"cell_type"},{"label":"Sample","value":"sample_ID"},{"label":"Donor ID","value":"donor_ID"},{"label":"Gender","value":"donor_gender"},{"label":"Age","value":"donor_age"},{"label":"Donor Status","value":"donor_status"},{"label":"Region","value":"region"},{"label":"Subregion","value":"subregion"},{"label":"Sample Status","value":"sample_status"},{"label":"Sequencing Methods","value":"seq_method"},{"label":"Sequencing Technology","value":"seq_tech"},{"label":"Project Code","value":"project_code"},{"label":"scAnnot Leve 1","value":"Siletti_modf_SCANVI_L1"},{"label":"scAnnot Level 2","value":"Siletti_modf_SCANVI_L2"}],"Mouse":[{"label":"Sequencing Methods","value":"seq_tech"},{"label":"Cell Type","value":"cell_type"},{"label":"Sample","value":"sample"},{"label":"Donor ID","value":"donor_ID"},{"label":"Gender","value":"donor_sex"},{"label":"Age","value":"donor_age"},{"label":"Donor Status","value":"donor_status"},{"label":"Region","value":"region"},{"label":"Subregion","value":"subregion"},{"label":"Sample Status","value":"sample_status"},{"label":"Project Code","value":"project_code"}]}'),u=t(8416),d=t.n(u),h={name:"dataBrowser",components:{HeaderParams:r.A},data(){return{chartInfo:{selectedGroupIndex:-1,selectedGeneGroupIndex:-1},colorBy:"cell_type",geneFeatures:"MALAT1",colorByOptions:[],geneOptions:[],datasetParams:{atlas:"Adult",region:"all"},sliceGeneOptions:[],loading:!1,noMore:!1,plotLoading:!0}},watch:{$route:{handler(e){let{region:a,atlas:t}=e["query"];a&&(this.datasetParams["region"]=a,this.datasetParams["atlas"]=t,this.getLoadData(this.datasetParams,this.colorBy,this.geneFeatures))},immediate:!0,deep:!0}},methods:{filterValue(e){if(""!==e){let a=this.geneOptions.filter((a=>a.value.toLowerCase().indexOf(e.toLowerCase())>-1)),t=a.slice(0,20);this.$set(this,"sliceGeneOptions",t)}else this.sliceGeneOptions=[]},async loadMore(){if(this.loading)return;this.loading=!0;let e=this.geneOptions.slice(this.sliceGeneOptions.length,this.sliceGeneOptions.length+4);this.sliceGeneOptions=this.sliceGeneOptions.concat(e),this.timer=setTimeout((()=>{this.loading=!1}),500),this.geneOptions.length===this.sliceGeneOptions.length&&(this.$refs.geneSelect.$refs.scrollbar.$refs.wrap.removeEventListener("scroll",this.scolling()),this.noMore=!0)},scolling(){let e=this.$refs.geneSelect.$refs.scrollbar.$refs.wrap;if(this.noMore)return;let a=e.scrollHeight-e.scrollTop-5<e.clientHeight;a&&this.loadMore()},async switchUmapGene(e){this.chartInfo.selectedGeneGroupIndex=-1,await this.getLoadData(this.datasetParams,this.colorBy,e)},async switchUmapType(e){this.chartInfo.selectedGroupIndex=-1,await this.getLoadData(this.datasetParams,e)},submitParams(e){this.$set(this,"datasetParams",e),"Mouse"===this.datasetParams.atlas?this.geneFeatures="Malat1":this.geneFeatures="MALAT1",this.$set(this,"colorByOptions",c[e["atlas"]]),this.plotLoading=!0,this.getLoadData(e,this.colorBy,this.geneFeatures)},async getLoadData(e,a,t){let l=await d().get(`${apiBaseUrl}/json/${e["atlas"]}_${e["region"]}_umap.json`);console.log(166,`/json/${e["atlas"]}_${e["region"]}_umap.json`,l.data);let s=l.data;const o=this.dealUmapData(s,a,[]);if(this.drawUMAPChart(o,this.$refs.scatterChartRefLeft,"selectedGroupIndex",a),t){const a=await d().get(`${apiBaseUrl}/json/gene/${e["atlas"]}/${e["region"]}/${t}.json`);console.log(177,`/json/gene/${e["atlas"]}/${e["region"]}/${t}.json`);let l=a.data,o=l.exps.split(",").map((e=>Number(e)));await this.selectUmapGene(t,s,"cell_type",o)}let n=await d().get(`${apiBaseUrl}/json/geneIndex/${e["atlas"]}.json`);console.log(187,`/json/geneIndex/${e["atlas"]}.json`);let r=n.data;this.sliceGeneOptions=r.slice(0,20),this.$set(this,"geneOptions",r),this.plotLoading=!1},async selectUmapGene(e,a,t,l){const s=this.dealUmapData(a,"cell_type",l);this.drawUMAPChart(s,this.$refs.scatterChartRefRight,"selectedGeneGroupIndex",e)},drawUMAPChart(e,a,t,l){const s=document.getElementsByClassName("left-scatter");let o={toImageButtonOptions:{format:"svg",filename:"image",scale:1}},r={legend:{x:0,y:-.15,itemsizing:"constant",orientation:"h",traceorder:"reversed"},margin:{t:50,r:0},aspectratio:{x:.5,y:1},hovermode:"closest",width:s[0]?.offsetWidth,height:s[0]?.offsetHeight};n().newPlot(a,e,r,o),a.on("plotly_legendclick",(e=>{const l=e.data.length,s=_.range(l),o=s.filter((e=>e!==this.chartInfo[t]));return e.expandedIndex===this.chartInfo[t]?(n().restyle(a,{opacity:1},o),this.chartInfo[t]=-1):(-1!==this.chartInfo[t]?n().restyle(a,{opacity:.1},[this.chartInfo[t]]):n().restyle(a,{opacity:.1},o),n().restyle(a,{opacity:1},[e.expandedIndex]),this.chartInfo[t]=e.expandedIndex),!1})),window.addEventListener("resize",(()=>{const e=s[0]?.offsetWidth,a=s[0]?.offsetHeight;n().relayout("scatterChartRefLeft",{width:e,height:a})}))},dealUmapData(e,a,t){let l=_.max(t),s=[],o={};if(e.forEach(((e,l)=>{if(o[e[a]])o[e[a]][0].push(e.x),o[e[a]][1].push(e.y),"cell_type"===a&&t.length&&o[e[a]][2].push(t[l]);else{let s=_.get(t,l,null);o[e[a]]=[[e.x],[e.y],[s]]}})),"cell_type"===a&&t.length)for(let i in o)o[i][2].unshift(_.mean(o[i][2]));let n={size:2,symbol:"circle",opacity:1},r={};Object.keys(o).sort().forEach((function(e){r[e]=o[e]}));let c=[],u={};for(let i in r)c.push(i);for(let d=0;d<c.length;d++)u[c[d]]=i.chartColor[d];for(let i in r)t.length&&"cell_type"===a&&(n={color:o[i][2],size:2,cmin:0,cmax:l,colorscale:"Reds"}),s.push({x:o[i][0],y:o[i][1],mode:"markers",type:"scatter",name:i,hovertemplate:o[i][0].map(((e,l)=>"cell_type"===a&&t.length?`Expression: ${o[i][2][l]}<br>x:${e}<br>y:${o[i][1][l]}<br>`:`x:${e}<br>y:${o[i][1][l]}<br>`)),marker:n});return s}},mounted(){this.$refs.geneSelect.$refs.scrollbar.$refs.wrap.addEventListener("scroll",this.scolling),this.getLoadData(this.datasetParams,this.colorBy,this.geneFeatures),this.$set(this,"colorByOptions",c[this.datasetParams["atlas"]])}},g=h,p=t(6367),v=(0,p.A)(g,l,s,!1,null,null,null),b=v.exports,m=b}}]);