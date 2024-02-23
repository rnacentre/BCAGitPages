<template>
  <div>
    <Statistics />
    <div class="wrap">
      <b-pane-title label="ATLAS" center></b-pane-title>
      <atlasBrains @change="changeAtlas" />
      <div class="atlas-umap" align="center">
        <router-link
          v-if="atlasName === 'Adult Brain'"
          :to="{ path: '/dataBrowser', query: { region: 'all', atlas: 'Adult' } }"
        >
          <img src="@/assets/umap-img/Adult.png" alt />
        </router-link>
        <router-link
          v-else-if="atlasName === 'Fetal Brain'"
          :to="{ path: '/dataBrowser', query: { region: 'all', atlas: 'Fetal' } }"
        >
          <img src="@/assets/umap-img/Fetal.png" alt />
        </router-link>
        <router-link
          v-else-if="atlasName === 'Tumour'"
          :to="{ path: '/dataBrowser', query: { region: 'all', atlas: 'Tumour' } }"
        >
          <img src="@/assets/umap-img/Tumour.png" alt />
        </router-link>
        <router-link
          v-else-if="atlasName === 'Organoid'"
          :to="{ path: '/dataBrowser', query: { region: 'all', atlas: 'Organoid' } }"
        >
          <img src="@/assets/umap-img/Organoid.png" alt />
        </router-link>
        <router-link
          v-else-if="atlasName === 'Mouse'"
          :to="{ path: '/dataBrowser', query: { region: 'all', atlas: 'Mouse' } }"
        >
          <img src="@/assets/umap-img/Mouse.png" alt />
        </router-link>
        <el-empty v-else description="Not available in current version of Brain Cell Atals"></el-empty>
      </div>
    </div>
  </div>
</template>
<script>
import ATLAS from "@/utils/Atlas.js";
const BrainUrl = {
  Fetal:
    "https://en.wikipedia.org/wiki/Development_of_the_nervous_system_in_humans#Development_of_the_human_brain",
  Organoid: "https://en.wikipedia.org/wiki/Cerebral_organoid",
  Tumour: "https://en.wikipedia.org/wiki/Brain_tumor"
};
export default {
  name: "indexComp",
  components: {
    Statistics: () => import("./Statistics.vue"),
    atlasBrains: () => import("./atlasBrains.vue")
  },
  data() {
    return {
      ATLAS,
      atlasName: "Adult Brain"
    };
  },
  methods: {
    changeAtlas(item) {
      this.atlasName = item.name;
      // if (item.name === "Adult Brain") {
      //   this.$router.push({ path: "/index", query: { atlasName: item.name } });
      // } else {
      //   let a = document.createElement('a')
      //   a.href = BrainUrl[item.name.split(" ")[0]]
      //   a.target = '_blank'
      //   a.click()
      //   return;
      // }
    },
    linkTo(areaName) {
      this.$router.push({
        path: "/dataBrowser",
        query: {
          region: "all",
          atlas: areaName // Additional parameter
        }
      });
      // this.$router.push({ path: "/cellSorting?sample_type=" + areaName });
    }
  }
};
</script>
<style lang="scss" scoped>
body {
  background: white;
}
.atlas-umap {
  margin-top: 20px;
  img {
    max-width: 100%;
    max-height: 430px;
  }
}
</style>
