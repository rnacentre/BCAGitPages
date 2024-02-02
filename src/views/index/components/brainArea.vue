<template>
  <div class="brain-wrap" ref="brainwrap">
    <img src="@/assets/brain/dark/brain-bg.png" alt="" height="100%" class="img-bg">
    <img src="@/assets/brain/brain-wrap.png" usemap="#Map" id="imgMap" />
    <map name="Map" id="Map">
      <area @click="linkTo('Medulla oblongata')" @mouseover="update('Brainstem','Medulla oblongata')" title="Medulla oblongata" coords="697,908,696,934,654,1049,773,1071,798,975,815,945" shape="poly">
      <area @click="linkTo('Midbrain')" @mouseover="update('Brainstem','Midbrain')" title="Midbrain" coords="760,633,735,639,739,683,792,743,873,798,876,742,817,704" shape="poly">
      <area @click="linkTo('Pons')" @mouseover="update('Brainstem','Pons')" title="Pons" coords="739,679,738,729,680,756,644,751,638,788,702,805,708,841,699,911,815,945,840,905,850,827,878,801,811,753" shape="poly">
      <area @click="linkTo('Cerebellum')" @mouseover="update('Cerebellum')" title="Cerebellum" coords="722,751,742,729,746,689,699,611,627,583,522,634,458,703,411,763,413,849,461,905,520,911,543,908,587,947,665,964,700,928,716,871,714,799,727,802,733,776" shape="poly">
      <area @click="linkTo('Cingulate cortex')" @mouseover="update('Limbic system','Cingulate cortex')" title="Cingulate cortex" coords="669,536,711,521,747,540,761,473,840,401,987,365,1120,370,1224,392,1226,376,1322,415,1369,477,1364,519,1336,549,1304,560,1268,558,1316,580,1371,575,1408,535,1423,479,1402,410,1316,351,1207,325,1181,333,1167,316,1116,316,1055,294,1021,306,988,291,909,283,879,294,836,289,820,299,770,308,696,364,671,470" shape="poly">
      <area @click="linkTo('Frontal lobe')" @mouseover="update('Cerebral cortex','Frontal lobe')" title="Frontal lobe" coords="1318,354,1341,258,1470,345,1531,452,1422,482,1394,410,1423,494,1399,541,1350,577,1296,569,1207,533,1162,547,1159,577,1189,623,1249,651,1307,667,1363,662,1411,650,1440,651,1450,658,1433,675,1381,672,1339,672,1293,676,1201,665,1131,707,1170,751,1232,807,1296,771,1372,745,1442,709,1486,667,1528,641,1440,620,1399,608,1360,585,1388,550,1413,515,1413,434" shape="poly">
      <area @click="linkTo('Motor cortex')" @mouseover="update('Cerebral cortex','Motor cortex')" title="Motor cortex" coords="1147,197,1189,345,1245,379,1274,384,1353,263,1283,238,1212,197" shape="poly">
      <area @click="linkTo('Occipital lobe')" @mouseover="update('Cerebral cortex','Occipital lobe')" title="Occipital lobe" coords="445,718,529,637,627,589,652,588,657,549,674,530,655,443,604,365,509,285,433,327,396,406,361,445,361,471,341,594,368,661,400,698" shape="poly">
      <area @click="linkTo('Parietal lobe')" @mouseover="update('Cerebral cortex','Parietal lobe')" title="Parietal lobe" coords="1021,179,1044,236,1069,297,1070,306,1018,316,910,292,823,302,755,319,728,344,700,410,677,484,679,522,669,543,658,552,627,521,613,435,557,390,525,350,492,299,570,250,652,207,750,176,875,163,912,176,968,166" shape="poly">
      <area @click="linkTo('Prefrontal cortex')" @mouseover="update('Cerebral cortex','Prefrontal cortex','Frontal lobe')" title="Prefrontal cortex" coords="1377,484,1375,526,1346,555,1378,613,1439,648,1507,658,1545,619,1542,536,1551,493,1529,462" shape="poly">
      <area @click="linkTo('Somatosensory cortex')" @mouseover="update('Cerebral cortex','Somatosensory cortex','Parietal lobe')" title="Somatosensory cortex" coords="1004,169,1021,291,1032,302,1067,297,1120,319,1148,319,1195,336,1159,199,1122,183" shape="poly">
      <area @click="linkTo('Temporal lobe')" @mouseover="update('Cerebral cortex','Temporal lobe')" title="Temporal lobe" coords="875,770,867,805,843,821,836,920,895,924,949,914,1016,920,1066,894,1108,894,1154,871,1204,868,1237,835,1237,788,1196,726,1144,689,1092,712,1033,731,1004,776,979,776,940,801,903,788" shape="poly">
      <area @click="linkTo('Corpus callosum')" @mouseover="update('Corpus callosum')" title="Corpus callosum" coords="775,546,806,536,837,484,921,426,1016,410,1123,417,1220,446,1224,474,1167,487,1139,504,1145,521,1181,508,1257,521,1308,518,1332,491,1332,449,1265,403,1144,364,1000,354,845,389,763,462,739,512,753,533" shape="poly">
      <area @click="linkTo('Amygdala')" @mouseover="update('Limbic system','Amygdala')" title="Amygdala" coords="990,661,987,700,1016,734,1063,739,1102,711,1106,672,1078,642,1019,641" shape="poly">
      <area @click="linkTo('Basal ganglia')" @mouseover="update('Limbic system','Basal ganglia')" title="Basal ganglia" coords="859,687,789,639,773,555,820,466,926,404,1046,396,1130,431,1154,474,1151,515,1128,538,1139,485,1098,437,1066,431,1046,465,980,462,899,496,862,552,815,529,805,616" shape="poly">
      <area @click="linkTo('Hippocampus')" @mouseover="update('Limbic system','Hippocampus')" title="Hippocampus" coords="722,544,705,572,722,614,760,639,797,681,845,723,875,745,879,787,932,813,982,798,1019,782,1070,690,1078,645,1052,653,1002,718,931,725,833,653,783,578,750,549" shape="poly">
      <area @click="linkTo('Hypothalamus')" @mouseover="update('Limbic system','Hypothalamus')" title="Hypothalamus" coords="1122,543,1095,620,1144,644,1144,623,1136,597,1153,586,1137,547,1145,516,1130,499,1108,524" shape="poly">
      <area @click="linkTo('Olfactory bulb')" @mouseover="update('Limbic system','Olfactory bulb')" title="Olfactory bulb" coords="1371,669,1434,678,1456,664,1433,647" shape="poly">
      <area @click="linkTo('Pineal gland')" @mouseover="update('Limbic system','Pineal gland')" title="Pineal gland" coords="744,540,777,574,777,547,756,536,747,526" shape="poly">
      <area @click="linkTo('Pituitary gland')" @mouseover="update('Limbic system','Pituitary gland')" title="Pituitary gland" coords="1116,631,1131,644,1134,681,1151,695,1168,689,1182,673,1153,648,1139,622,1125,616" shape="poly">
      <area @click="linkTo('Putamen')" @mouseover="update('Limbic system','Putamen')" title="Putamen" coords="983,459,910,491,861,536,856,581,893,611,940,606,1005,575,1052,533,1070,496,1039,460" shape="poly">
      <area @click="linkTo('Thalamus')" @mouseover="update('Limbic system','Thalamus')" title="Thalamus" coords="833,578,847,631,901,658,966,648,1044,586,1061,608,1072,600,1058,571,1089,536,1088,473,1030,442,915,456,854,510" shape="poly">
      <area @click="linkTo('Spinal cord')" @mouseover="update('Spinal cord')" title="Spinal cord" coords="655,1048,615,1157,691,1189,764,1194,773,1074" shape="poly">
    </map>
    <img src="@/assets/brain/line.png" alt="" class="brain-img line">
    <div v-if="!activeBrain&&!activeLabel">
      <img src="@/assets/brain/light/brain.png" alt="" class="brain-img" />
    </div>
    <div class="cerebral-cortex">
      <img v-show="activeBrain=='Cerebral cortex'&&activePart(null)" src="@/assets/brain/Cerebral cortex/Cerebral cortex（组1).png" alt="" class="brain-img">
      <img v-show="activePart('Cingulate cortex')" src="@/assets/brain/Cerebral cortex/Cingulate.png" alt="" class="brain-img">
      <img v-show="activePart('Frontal lobe')" src="@/assets/brain/Cerebral cortex/Frontal lobe.png" alt="" class="brain-img">
      <img v-show="activePart('Motor cortex')" src="@/assets/brain/Cerebral cortex/Motor Cortex.png" alt="" class="brain-img">
      <img v-show="activePart('Parietal lobe')" src="@/assets/brain/Cerebral cortex/Parietal lobe.png" alt="" class="brain-img">
      <img v-show="activePart('Occipital lobe')" src="@/assets/brain/Cerebral cortex/Occipital lobe.png" alt="" class="brain-img">
      <img v-show="activePart('Temporal lobe')" src="@/assets/brain/Cerebral cortex/Temporal lobe.png" alt="" class="brain-img">
      <img v-show="activePart('Prefrontal cortex')" src="@/assets/brain/Cerebral cortex/Prefrontal Cortex.png" alt="" class="brain-img">
      <img v-show="activePart('Somatosensory cortex')" src="@/assets/brain/Cerebral cortex/Somatosensory cortex.png" alt="" class="brain-img">
    </div>
    <div class="brainstem">
      <img v-show="activeBrain=='Brainstem'&&activePart(null)" src="@/assets/brain/Brainstem/Brainstem（组3）.png" alt="" class="brain-img">
      <img v-show="activePart('Medulla oblongata')" src="@/assets/brain/Brainstem/Medulla oblongata.png" alt="" class="brain-img">
      <img v-show="activePart('Midbrain')" src="@/assets/brain/Brainstem/Midbrain.png" alt="" class="brain-img">
      <img v-show="activePart('Pons')" src="@/assets/brain/Brainstem/Pones.png" alt="" class="brain-img">
    </div>
    <div class="Cerebellum" v-if="activeBrain=='Cerebellum'">
      <img src="@/assets/brain/cerebellum/Cerebellum（组2）.png" alt="" class="brain-img">
    </div>
    <div class="corpus" v-if="activeBrain=='Corpus callosum'">
      <img src="@/assets/brain/Corpus callosum/Corpus callosum（组6）.png" alt="" class="brain-img">
    </div>
    <div class="Deepstructures">
      <img v-show="activeBrain=='Limbic system'&&activePart(null)" src="@/assets/brain/deep structures/Deep structures（组4）.png" alt="" class="brain-img">
      <img v-show="activePart('Amygdala')" src="@/assets/brain/deep structures/Amygdala.png" alt="" class="brain-img">
      <img v-show="activePart('Basal ganglia')" src="@/assets/brain/deep structures/Basal ganglia.png" alt="" class="brain-img">
      <img v-show="activePart('Hippocampus')" src="@/assets/brain/deep structures/Hippocambus.png" alt="" class="brain-img">
      <img v-show="activePart('Hypothalamus')" src="@/assets/brain/deep structures/Hypothalamus.png" alt="" class="brain-img">
      <img v-show="activePart('Olfactory bulb')" src="@/assets/brain/deep structures/Olfactory bulb.png" alt="" class="brain-img">
      <img v-show="activePart('Pineal gland')" src="@/assets/brain/deep structures/Pineal gland.png" alt="" class="brain-img">
      <img v-show="activePart('Pituitary gland')" src="@/assets/brain/deep structures/Pituitary gland.png" alt="" class="brain-img">
      <img v-show="activePart('Putamen')" src="@/assets/brain/deep structures/putamen.png" alt="" class="brain-img">
      <img v-show="activePart('Thalamus')" src="@/assets/brain/deep structures/Thalamus.png" alt="" class="brain-img">
    </div>
    <div class="Spinal" v-if="activeBrain=='Spinal cord'">
      <img src="@/assets/brain/Spinal cord/Spinal cord（组5).png" alt="" class="brain-img">
    </div>
    <ul class="brain-nav">
      <li class="nav" id="nav_1" @click="linkTo('Brainstem')" @mouseover="update('Brainstem')" :class="activeBrain=='Brainstem' ? 'actived ' : ''">Brainstem</li>
      <li class="nav" id="nav_2" @click="linkTo('Limbic system')" @mouseover="update('Limbic system')" :class="activeBrain=='Limbic system' ? 'actived ' : ''">Limbic system</li>
      <li class="nav" id="nav_3" @click="linkTo('Cerebral cortex')" @mouseover="update('Cerebral cortex')" :class="activeBrain=='Cerebral cortex' ? 'actived ' : ''">Cerebral cortex</li>
      <li class="nav" id="nav_4" @click="linkTo('Corpus callosum')" @mouseover="update('Corpus callosum')" :class="activeBrain=='Corpus callosum' ? 'actived ' : ''">Corpus callosum</li>
      <li class="nav" id="nav_5" @click="linkTo('Cerebellum')" @mouseover="update('Cerebellum')" :class="activeBrain=='Cerebellum' ? 'actived ' : ''">Cerebellum</li>
      <li class="nav" id="nav_6" @click="linkTo('Spinal cord')" @mouseover="update('Spinal cord')" :class="activeBrain=='Spinal cord' ? 'actived ' : ''">Spinal cord</li>
    </ul>
    <div class="nav-list cerebral-list">
      <ul class="brain-nav cerebral-nav">
        <li v-for="(item,index) in cerebralNav" :key="item" :class="(`nav_3_${index}`)+' '+ (activedLabel(item,activedMLabel) ? 'actived ' : '')" @click="linkTo(item)" @mouseover="update('Cerebral cortex',item)">{{item}}</li>
      </ul>
    </div>
    <div class="nav-list frontal-list">
      <ul class="brain-nav frontal-nav">
        <li v-for="(item,index) in frontalNav" :key="item" :class="(`nav_31_${index}`)+' '+ (activedLabel(item) ? 'actived ' : '')" @click="linkTo(item)" @mouseover="update('Cerebral cortex',item,'Frontal lobe')">{{item}}</li>
      </ul>
    </div>
    <div class="nav-list prefrontal-list">
      <ul class="brain-nav prefrontal-nav">
        <li class="nav_32_0" :class="activedLabel('Somatosensory cortex') ? 'actived ' : ''" @click="linkTo('Somatosensory cortex')" @mouseover="update('Cerebral cortex','Somatosensory cortex','Parietal lobe')">Somatosensory cortex</li>
      </ul>
    </div>
    <div class="nav-list deep-list">
      <ul class="brain-nav deep-nav">
        <li v-for="(item,index) in deepNav" :key="item" :class="(`nav_2_${index}`)+' '+(activedLabel(item) ? 'actived ' : '')" @click="linkTo(item)" @mouseover="update('Limbic system',item)">{{item}}</li>
      </ul>
    </div>
    <div class="nav-list brainstem-list">
      <ul class="brain-nav brainstem-nav">
        <li v-for="(item,index) in brainstemNav" :key="item" :class="(`nav_1_${index}`)+' '+(activedLabel(item) ? 'actived ' : '')" @click="linkTo(item)" @mouseover="update('Brainstem',item)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "BrainArea",
  data () {
    return {
      showImg: "brain",
      activeBrain: null,
      activeLabel: null,
      activedMLabel: null,
      brainstemNav: ['Midbrain', 'Pons', 'Medulla oblongata'],
      deepNav: ['Amygdala', 'Basal ganglia', 'Hippocampus', 'Hypothalamus', 'Olfactory bulb', 'Pineal gland', 'Pituitary gland', 'Putamen', 'Thalamus', 'Cingulate cortex'],
      cerebralNav: ['Frontal lobe', 'Occipital lobe', 'Parietal lobe', 'Temporal lobe'],
      frontalNav: ['Prefrontal cortex', 'Motor cortex']
    };
  },
  computed: {
    activePart () {
      return (label) => {
        return this.activeLabel === label;
      };
    },
    activedLabel () {
      // 展开的文字是否高亮显示
      return (label, mLabel) => {
        return this.activeLabel === label || mLabel === label;
      };
    },
    initActiveBrain () {
      // (初始化&当前)显示的大脑部位、线条、文字
      return (label) => {
        return !this.activeBrain || this.activeBrain === label;
      };
    },
    initUnactiveBrain () {
      // 初始化不高亮
      return (label) => {
        return !this.activeBrain || (this.activeBrain && this.activeBrain !== label);
      };
    },
  },
  methods: {
    update (pLabel = null, label = null, mLabel = null) {
      this.activeBrain = pLabel;
      this.activeLabel = label;
      this.activedMLabel = mLabel;
      this.$emit("brainAreaUpdate", label || mLabel || pLabel);
      this.showImg = label;
    },
    linkTo (areaName) {
      this.$router.push({ path: "/dataBrowser?sample_type=" + areaName });
      // this.$router.push({ path: "/cellSorting?sample_type=" + areaName });
    },
    // 点击div外部事件
    handleOutsideClick (e) {
      this.activeBrain = null;
      this.activeLabel = null;
      this.activedMLabel = null;
      this.$emit("brainAreaUpdate", null);
    },
  },
  mounted () {
    const imgMap = document.getElementById("imgMap");
    this.$nextTick(() => {
      imgMap.onload = () => {
        const naturalW = imgMap.naturalWidth;
        const scale = (imgMap.width / naturalW).toFixed(2);
        this.scale = scale;
        setTimeout(() => {
          const areas = document.getElementById("Map").childNodes;
          areas.forEach((area) => {
            let coords = area.coords.split(",");
            coords = coords.map((coord) => {
              return Math.floor(parseFloat(coord) * scale);
            });
            area.coords = coords.join(",");
          });
        }, 300);

      };
    });

  },
};
</script>
<style lang="scss" scoped>
.brain-wrap {
  position: relative;
  z-index: 2;
  width: 1000px;
  transform: scale(0.7);
  height: 700px;
  margin: 0 auto;
  transition: all 0.3s;
  #imgMap,
  .img-bg,
  .brain-img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    height: 100%;
  }
  .line {
    z-index: 99;
  }
  #imgMap {
    z-index: 333;
  }

  area {
    cursor: pointer;
  }
  .nav-list {
    position: absolute;
    z-index: 999;
    &.cerebral-list {
      top: 6px;
      left: 988px;
    }
    &.frontal-list {
      top: -30px;
      left: 1208px;
    }
    &.prefrontal-list {
      top: 156px;
      left: 1208px;
    }
    &.brainstem-list {
      bottom: 17px;
      left: 742px;
    }
    &.deep-list {
      top: 18px;
      left: -210px;
    }
  }
  .brain-nav {
    width: 100%;
    li {
      position: absolute;
      z-index: 999;
      font-size: 14px;
      background: #eff5ff;
      color: #406b9b;
      cursor: pointer;
      padding: 10px 0px;
      border-radius: 4px;
      min-width: 140px;
      text-align: center;
      border: 1px solid #d9e1f1;
      font-weight: bold;
      line-height: 1.2em;
      &:hover,
      &.actived {
        background: #3a5c93;
        color: #fff;
      }

      &#nav_1 {
        left: 606px;
        top: 547px;
      }
      &#nav_2 {
        left: 30px;
        top: 223px;
      }
      &#nav_3 {
        left: 846px;
        top: 145px;
      }
      &#nav_4 {
        left: 318px;
        top: 10px;
      }
      &#nav_5 {
        left: 70px;
        top: 486px;
      }
      &#nav_6 {
        left: 480px;
        top: 658px;
      }
    }
    &.cerebral-nav {
      background: url("~@/assets/brain/dark/Cerebral cortex（线）.png") left
        no-repeat;
      background-size: auto 90%;
      min-width: 256px;
      height: 320px;

      position: relative;
      li {
        left: 82px;
        &.nav_3_0 {
          top: 0px;
        }
        &.nav_3_1 {
          top: 88px;
        }
        &.nav_3_2 {
          top: 189px;
        }
        &.nav_3_3 {
          top: 283px;
        }
        // &.nav_3_4 {
        //   top: 286px;
        // }
      }
    }
    &.frontal-nav {
      background: url("~@/assets/brain/dark/Parietal lobe-Motor cortex.png")
        left no-repeat;
      background-size: auto 70%;
      min-width: 200px;
      height: 120px;
      position: relative;
      li {
        left: 70px;
        &.nav_31_0 {
          top: 0px;
        }
        &.nav_31_1 {
          top: 75px;
        }
      }
    }
    &.prefrontal-nav {
      background: url("~@/assets/brain/dark/Somatosensory.png") left center
        no-repeat;
      min-width: 200px;
      height: 120px;
      position: relative;
      li {
        left: 60px;
        padding: 4px 0px;
        &.nav_32_0 {
          top: 35px;
        }
      }
    }
    &.brainstem-nav {
      background: url("~@/assets/brain/dark/Brainstem（线）.png") left no-repeat;
      background-size: auto 70%;
      width: 140px;
      height: 230px;
      // left: 638px;
      // top: -360px;
      position: relative;
      li {
        left: 60px;
        &.nav_1_0 {
          top: 22px;
        }
        &.nav_1_1 {
          top: 96px;
        }
        &.nav_1_2 {
          top: 170px;
        }
      }
    }
    &.deep-nav {
      background: url("~@/assets/brain/dark/deep structures（线）.png") right
        no-repeat;
      background-size: auto 100%;
      width: 240px;
      height: 450px;
      // top: -146px;
      // left: 844px;
      position: relative;
      li {
        left: 10px;
        &.nav_2_0 {
          top: -22px;
        }
        &.nav_2_1 {
          top: 26px;
        }
        &.nav_2_2 {
          top: 75px;
        }
        &.nav_2_3 {
          top: 126px;
        }
        &.nav_2_4 {
          top: 176px;
        }
        &.nav_2_5 {
          top: 230px;
        }
        &.nav_2_6 {
          top: 284px;
        }
        &.nav_2_7 {
          top: 333px;
        }
        &.nav_2_8 {
          top: 382px;
        }
        &.nav_2_9 {
          top: 430px;
        }
      }
    }
  }
}
</style>
