<template>
  <div class="container">
    <!-- 省 -->
    <div v-for="(province, provinceKey) in usableRange" :key="provinceKey">
      <div class="city-name" @click="clickCity(provinceKey)">
        {{provinceKey}}
        <i :class="provinceKey === citIndex? 'icon-down':'icon-top'"></i>
      </div>

      <!-- 市 -->
      <div v-for="(city, cityKey) in province" :key="cityKey" v-show="provinceKey === citIndex">
        <div class="first-city">{{cityKey}}</div>

        <!-- 区 -->
        <div v-for="(area, areaKey) in city" :key="areaKey">
          <div class="first-city" @click="clickArea(areaKey)">
            {{areaKey}}
            <i :class="areaKey === thisIndex? 'icon-down':'icon-top'"></i>
          </div>

          <div class="ca-list" v-show="areaKey === thisIndex">
            <div
              class="cs-item"
              v-for="(cinema, cinemaKey) in area"
              :key="cinemaKey"
              @click="clickCinema(cinema)"
            >
              <h4>
                <div class="cs-item-name-right">{{cinema.cinemaName}}</div>
              </h4>
              <p>{{cinema.areaName}}{{cinema.cinemaAddress}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h3 class="noData">
      <i class="keguan">
        <img src="@/assets/keguan.png" width="100%" />
      </i>
      <span>客官，没有更多了！</span>
    </h3>
  </div>
</template>

<script>
export default {
  name: "UsableRange",
  data() {
    return {
      // 凭证号
      voucherNo: this.$route.query.voucherNo,
      // 使用范围
      usableRange: {},
      // 影院列表显示隐藏
      thisIndex: -1,
      citIndex: -1
    };
  },
  created() {
    this.getVoucherUsableRange();
    this.$store.commit("ctrlLoader", true);
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.back(-1);
    },

    // 跳转路径
    goPath(path) {
      this.$router.push(path);
    },

    // 获取凭证使用范围
    getVoucherUsableRange() {
      let vm = this;
      vm.$http
        .get("/panda-cinema-api/v2/getVoucherUsableRange/" + vm.voucherNo)
        .then(function(response) {
          if (response.data.code == "1000") {
            vm.$store.commit("ctrlLoader", false);
            vm.usableRange = response.data.result;
          } else {
            vm.$toast(response.data.msg);
          }
        })
        .catch(function(error) {
          vm.$toast("请求超时，请稍后再试！");
        });
    },

    // 点击影院
    clickCinema(obj) {
      window.localStorage.setItem(
        this.$init.key.cinemaSelectedCinema,
        JSON.stringify(obj)
      );
      this.$router.push({
        path: "/movie/field",
        query: {
          cinema: obj
        }
      });
    },
    // 点击收起影院列表
    clickArea(areaKey) {
      if (this.thisIndex == -1) {
        this.thisIndex = areaKey;
      } else if (this.thisIndex == null) {
        this.thisIndex = areaKey;
      } else {
        this.thisIndex = null;
      }
    },
    // 点击收起区
    clickCity(provinceKey) {
      if (this.citIndex == -1) {
        this.citIndex = provinceKey;
      } else if (this.citIndex == null) {
        this.citIndex = provinceKey;
      } else {
        this.citIndex = null;
      }
    }
  }
};
</script>

<style scoped>
.container {
  color: #4d4d4d;
}
.city-name {
  height: 80px;
  line-height: 80px;
  font-size: 3.5vw;
  text-align: center;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  margin-top: 10px;
}
.first-city {
  text-align: left;
  padding-left: 30px;
  margin-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #f5f5f5;
}
.first-city i {
  float: right;
  margin-right: 30px;
}

.Cinemasum {
  height: 60px;
  background-color: #f5f5f5;
  padding-top: 20px;
  padding-left: 24px;
}
.cs-item:first-child {
  border-top: 1px solid #e6e6e6;
}

.cs-item {
  padding: 10px 23px;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
}

.cs-item h4 {
  font-size: 28px;
  color: #4d4d4d;
  line-height: 50px;
  /* padding-left: 40px; */
  position: relative;
  display: flex;
}
.cs-item-name-right {
  flex: 10;
}

.cs-item p {
  font-size: 22px;
  color: #c1c1c1;
  line-height: 38px;
  width: calc(100% - 100px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.noData {
  position: relative;
  margin-top: 40px;
}

.keguan {
  position: absolute;
  top: 15px;
  left: 36%;
  display: inline-block;
  height: 40px;
  width: 40px;
}

.noData span {
  position: absolute;
  top: 5px;
  left: calc(36% + 50px);
}
</style>
