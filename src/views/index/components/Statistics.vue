<template>
  <div>
    <div class="welcome-wrap">
      <div class="wrap">
        <br><br>
        <br><br>
        <b-pane-title label="Brain Cell Atlas" center style="color: white;margin-top:0;line-height:1em"></b-pane-title>
        <!-- <br><br> -->
        <div class="welcome-cont">
          A comprehensive and unified atlas of the brain that was built across studies, regions, diseases and sequencing platforms.
        </div>
        <br><br>
      </div>
      <div class="stats-wrap wrap">
          <div class="home-ui-media" style="height: 100%">
            <!-- <br><br> -->
            <div class="statistics-list">
              <div v-for="item in list" :key="item.content" class="statistics-item">
                <div class="item-block">
                  <img class="item-block-icon" :src="item.icon" alt="" />
                  <el-divider direction="vertical" class="statistic-divider"></el-divider>
                  <div class="item-block-cont" @click="openUri(item.uri)">
                    <p>{{ item.content }}</p>
                    <span>{{ item.num }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      list: [
        {
          num: 173,
          content: "Studies",
          icon: "img/brain/stats-icon-studies.png",
          uri: '/help#Datasets'
        },
        {
          num: "26.3M",
          // unit: "M",
          content: "Cells",
          icon: "img/brain/stats-icon-cells.png",
          uri: '/cellSorting'
        },
        {
          num: '10+',
          content: "Brain Regions",
          icon: "img/brain/stats-icon-brain.png",
          uri: '/portrait/Adult'
        },
        {
          num: 8,
          content: "Machine Learning Methods",
          icon: "img/brain/stats-icon-machine.png",
          uri: '/gene/marker'
        },
        {
          num: 9,
          content: "Diseases",
          icon: "img/brain/stats-icon-diseases.png",
          uri: '/dataSets'
        },
      ],
    };
  },
  methods: {
    openUri (uri) {
      // window.open(uri)
      this.$router.push(uri)
    }
  }
};
</script>
<style lang="scss" scoped>
$paddingBase: 40px;
.stats-wrap {
  // background: #4b5794;
  // padding-top: 5px;
  // padding-bottom: 70px;
  // height: 420px;
  padding: $paddingBase 0;
  padding-bottom: 0;
  background-size: auto 100%;
  .statistics-list {
    display: flex;
    .statistics-item {
      width: calc(20% - 20px);
      padding: 0 10px;
      margin-bottom: $paddingBase;
      margin-left: auto;
      margin-right: auto;
      .item-block {
        background: rgba($color: #f7f7f7, $alpha: .95);
        border-radius: 2px;
        box-shadow: 0px 3px 6px 1px rgba(#bee3ff, 0.16);
        padding: 20px 0;
        padding-left: 20px;
        display: flex;
        align-items: center;
        height: calc(120px - 40px);
        &:first-child {
          margin-left: 0;
        }
        &-icon {
          width: 46px;
          height: 46px;
        }
        .statistic-divider {
          background-color: #97a6ca;
          height: 80%;
          margin: 0 15px;
        }
        &-cont {
          flex: 1;
          cursor: pointer;
          p {
            font-size: 18px;
            color: $themeColor;
            line-height: 1em;
            font-weight: 600;
            margin-bottom: 8px;
            height: 40px;
            display: flex;
            align-items: center;
          }
          span {
            color: #23265f;
            font-size: 46px;
            font-weight: bold;
            line-height: 1em;
          }
        }
      }
    }
  }
}
.welcome-wrap {
  // background: url("~@/assets/img/welcome.png") no-repeat center center;
  background: url("~@/assets/img/bg.png") no-repeat center center;
  background-size: cover;
  // background: #23265f;
  color: white;
  padding: $paddingBase;
  .welcome-cont {
    text-align: center;
    font-size: 32px;
    line-height: 1.5em;
    padding: 0 $paddingBase;
  }
}
@media screen and (max-width: map-get($grid-breakpoints,"xl")) {
  .stats-wrap .statistics-list {
    flex-wrap: wrap;
    .statistics-item {
      width: calc(30% - 20px);
      .item-block-cont span {
        font-size: 42px;
      }
    }
  }
}
@media screen and (max-width: map-get($grid-breakpoints,"md")) {
  .stats-wrap .statistics-list {
    flex-wrap: wrap;
    .statistics-item {
      width: calc(50% - 20px);
      margin-left: 0;
      .item-block-cont span {
        font-size: 42px;
      }
    }
  }
}
@media screen and (max-width: map-get($grid-breakpoints,"sm")) {
  .stats-wrap .statistics-list {
    flex-wrap: wrap;
    .statistics-item {
      width: calc(80% - 20px);
      margin-left: auto;
      .item-block-cont span {
        font-size: 36px;
      }
    }
  }
}
</style>
