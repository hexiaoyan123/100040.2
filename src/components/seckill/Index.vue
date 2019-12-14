<template>
  <div class="ac-cont">
    <div class="ac-cont-in">
      <!-- <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <figure class="img-cont">
            <img :src="$init.imgIp + item">
          </figure>
        </van-swipe-item>
      </van-swipe>-->

      <figure class="img-cont">
        <!-- <img src="@/assets/ac/banner.jpg" /> -->
      </figure>

      <div class="info">
        <div class="info-left">
          <div class="meany">
            <span class="now">
              <small>￥</small>
              {{seckill.seckillPrice | moneyFormat}}
            </span>
            <!-- <del>￥{{seckill.originalPrice | moneyFormat}}</del> -->
          </div>
        </div>
        <div class="info-right">
          <div class="info-btn btn1" v-show="! runSeckill">未开始</div>
          <div class="info-btn btn2" @click="checkSeckill" v-show="runSeckill">立即抢票</div>
        </div>
      </div>

      <!-- <div class="opne-btn-cont">
        <span class="opne-btn" @click="goHome"></span>
      </div>-->

      <figure class="img-cont">
        <!-- <img src="@/assets/ac/info.jpg" /> -->
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [], // banner图
      seckill: {}, // 活动信息
      currentTimestamp: new Date().getTime(), // 当前时间戳
      runSeckill: false, // 开始
      // 毫秒时间
      time: {
        currentTimestamp: 0, // 当前时间戳
        seckillStartTime: 0, // 活动开始时间
        seckillEndTime: 0, // 活动结束时间
        seckillStartDate: 0, // 活动开始日期
        seckillEndDate: 0 // 活动结束日期
      }
    };
  },
  created() {
    // this.$store.commit("ctrlLoader", true);
    // this.getListSeckill();
  },
  methods: {
    // 到电影
    goHome() {
      this.$router.push("/movie/home");
    },
    // 获得渠道信息
    getListSeckill() {
      let vm = this;
      this.$http
        .get("/panda-activity-seckill/v1/listSeckill")
        .then(function(response) {
          if (response.data.code == "1000") {
            if (response.data.result) {
              vm.seckill = response.data.result[0];
              vm.$init.seckill = response.data.result[0];
              console.log(JSON.stringify(vm.$init.seckill));
              vm.$cookies.set("seckill", JSON.stringify(vm.seckill), "30d");
              // vm.bannerList = vm.seckill.bannerImageUrl.split(',');
            }
          } else {
            vm.$toast(response.data.msg);
          }
          vm.initTime();
        })
        .catch(function(error) {
          vm.$toast("请求超时，请稍后再试！");
        });
    },
    // 验证秒杀权限
    checkSeckill() {
      let vm = this;
      this.$store.commit("ctrlLoader", true);
      this.$http
        .get("/panda-activity-seckill/v1/checkSeckill/" + this.seckill.id)
        .then(function(response) {
          vm.$store.commit("ctrlLoader", false);
          if (response.data.code == "1000") {
            vm.$init.seckill.flag = response.data.result;
            vm.$cookies.set("seckill", JSON.stringify(vm.$init.seckill), "30d");
            vm.$router.push("/movie/acOrder?flag=" + response.data.result);
          } else {
            vm.$toast(response.data.msg);
          }
        })
        .catch(function(error) {
          vm.$toast("请求超时，请稍后再试！");
        });
    },
    // 初始化
    initTime() {
      this.time.currentTimestamp = this.getTimestamp();
      this.time.seckillStartTime = this.getTime(this.seckill.seckillStartTime);
      this.time.seckillEndTime = this.getTime(this.seckill.seckillEndTime);
      this.time.seckillStartDate = this.getTimestamp(
        this.seckill.seckillStartDate
      ); // 活动开始时间
      this.time.seckillEndDate = this.getTimestamp(this.seckill.seckillEndDate); // 获得结束时间
      setTimeout(() => {
        this.$store.commit("ctrlLoader", false);
      }, 1000);
      // 倒计时
      setInterval(() => {
        this.time.currentTimestamp = this.getTimestamp();
        if (
          this.time.currentTimestamp >= this.time.seckillStartDate &&
          this.time.currentTimestamp <= this.time.seckillEndDate
        ) {
          this.getWeek();
        } else {
          this.runSeckill = false;
        }
      }, 1000);
    },
    // 获得时间的毫秒
    getTime(str) {
      let num = 0;
      str.split(":").map((e, i) => {
        if (i == 0) {
          num += (e - 0) * 60 * 60 * 1000;
        } else if (i == 1) {
          num += (e - 0) * 60 * 1000;
        } else if (i == 2) {
          num += (e - 0) * 1000;
        }
      });
      return num;
    },
    // 计算出本周的活动时间段
    getWeek() {
      let vm = this;
      let seckillList = []; // 本周活动时间
      let nowDay = new Date(); // 现在时间
      let day = new Date().getDay() || 7; // 今天周几
      let runSeckill = false;
      this.seckill.seckillWeek.split(",").map((e, i) => {
        let day0 = new Date(
          nowDay.getFullYear(),
          nowDay.getMonth(),
          nowDay.getDate() + (e - 0) - day
        ).getTime();
        let obj = {
          start: day0 + vm.time.seckillStartTime,
          end: day0 + vm.time.seckillEndTime
        };
        if (
          obj.start <= vm.time.currentTimestamp &&
          vm.time.currentTimestamp <= obj.end
        ) {
          runSeckill = true;
        }
        seckillList.push(obj);
      });
      if (this.runSeckill != runSeckill) {
        this.runSeckill = runSeckill;
      }
    },
    // 获得时间戳
    getTimestamp(time) {
      if (time) {
        if (time.indexOf("-") >= 0) {
          let newTime = time.split("-").join("/");
          return new Date(newTime).getTime();
        } else {
          return new Date(time).getTime();
        }
      } else {
        return new Date().getTime();
      }
    }
  },
  filters: {
    // 金钱格式化
    moneyFormat(value) {
      if (value) {
        return value / 100;
      } else if (value === 0) {
        return "0";
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped>
.ac-cont {
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 88px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.ac-cont-in {
  min-height: 101%;
}
.img-cont {
  display: block;
  width: 100%;
}
.img-cont img {
  display: block;
  width: 100%;
}
.info {
  padding: 60px 78px;
  display: flex;
}
.info-left {
  flex: 10;
}
.info-btn {
  width: 230px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-radius: 8px;
  font-size: 28px;
}
.btn1 {
  color: #d8d8d8;
  background-color: #f0f0f0;
}
.btn2 {
  color: #fff;
  background: -webkit-linear-gradient(left, #ffa262, #ff3666);
  background: -o-linear-gradient(left, #ffa262, #ff3666);
  background: -moz-linear-gradient(left, #ffa262, #ff3666);
  background: -ms-linear-gradient(left, #ffa262, #ff3666);
  background: linear-gradient(to right, #ffa262 0%, #ff3666 100%);
}
.info-right {
  /* padding-top: 20px; */
}
.meany {
  line-height: 70px;
}
.meany .now {
  font-size: 60px;
  color: #de4548;
}
.meany .now small {
  font-size: 33px;
}
.meany del {
  font-size: 33px;
  color: #d8d8d8;
}
.nums {
  line-height: 38px;
  font-size: 24px;
}
.nums span {
  color: #de4548;
}
.opne-btn-cont {
  width: 100%;
  background-color: #e3007f;
  box-sizing: border-box;
  height: 140px;
  padding-top: 30px;
}
.opne-btn {
  display: block;
  margin: 0 auto;
  /* background: url(../../assets/open-btn.png) no-repeat; */
  background-size: 100% 100%;
  height: 84px;
  width: 322px;
}
</style>