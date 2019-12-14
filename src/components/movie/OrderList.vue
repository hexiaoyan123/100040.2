<template>
  <div class="movie-conter">
    <!-- 瀑布流滚动加载 -->
    <div class="list-content" id="list-content" :style="{'height': contentheight+'px'}">
      <div v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :offset="10"
        >
          <div class="movie-list">
            <movie-item v-for="(item, index) in list" :key="index" :obj="item"></movie-item>
            <div class="noOrderContent" v-if="list.length < 1 " :finished="finished == true">
              <ul>
                <li>
                  <i>
                    <img src="@/assets/noThing/order.png" width="100%" />
                  </i>
                </li>
                <li>
                  <span>您还没有相关订单！</span>
                </li>
                <li>
                  <i>
                    <img
                      src="@/assets/noThing/gwc-button.png"
                      width="100%"
                      @click="goPath('/movie/home')"
                    />
                  </i>
                </li>
              </ul>
            </div>
          </div>
        </van-list>
      </div>
    </div>
    <!-- 瀑布流滚动加载 -->
  </div>
</template>

<script>
import OrderMovieListItem from "./OrderListItem";
export default {
  name: "OrderMovieList",
  components: {
    "movie-item": OrderMovieListItem
  },
  props: ["dataStatu"],
  data() {
    return {
      list: [],
      pageNum: 1,
      // 是否处于加载状态
      loading: false,
      // 是否已加载完所有数据
      finished: false,
      // 是否处于下拉刷新状态
      isLoading: false,
      contentheight: ""
    };
  },
  created() {},
  methods: {
    // 跳转路径
    goPath(path) {
      this.$router.push(path);
    },
    // 上拉加载
    onLoad() {
      if (this.list.length == 0) {
        this.list = [];
        this.pageNum = 1;
      } else {
        this.pageNum += 1;
      }
      let vm = this;
      vm.$http
        .get(
          "/panda-cinema-api/v2/pageOrder/" +
            this.pageNum +
            "/5?dataStatus=" +
            this.dataStatu
        )
        .then(function(response) {
          if (response.data.code == "1000") {
            if (response.data.result && response.data.result.length > 0) {
              // console.log(JSON.stringify(response.data.result));
              for (let i = 0; i < response.data.result.length; i++) {
                vm.list.push(response.data.result[i]);
                // console.log(JSON.stringify(vm.list.length));
              }
              //vm.list = response.data.result;
              vm.loading = false;
              if (vm.list.length >= 100) {
                vm.finished = true;
              }
            } else {
              vm.finished = true;
              vm.loading = false;
              vm.isLoading = true;
            }
          } else {
            vm.$toast(response.data.msg);
          }
        })
        .catch(function(error) {
          vm.$toast("请求超时，请稍后再试！");
        });
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        // this.pageNum++;
        this.onLoad();
      }, 500);
    }
  },
  mounted() {
    // 视口大小
    let winHeight = document.documentElement.clientHeight;
    // 调整上拉加载框高度
    this.contentheight = winHeight - 46;
  }
};
</script>

<style scoped>
.movie-list {
  padding: 20px;
}
.movie-conter {
  height: 100%;
  overflow: auto;
}
.noOrderContent ul {
  margin-top: 80px;
}
.noOrderContent ul li {
  text-align: center;
}
.noOrderContent ul li:nth-child(1) i {
  width: 160px;
  height: 160px;
  display: inline-block;
}
.noOrderContent ul li:nth-child(2) span {
  font-size: 30px;
  color: #969696;
}
.noOrderContent ul li:nth-child(3) {
  margin-top: 30px;
}
.noOrderContent ul li:nth-child(3) i {
  display: inline-block;
  width: 240px;
}
.noData {
  position: relative;
  height: 50px;
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
.van-tabs__content {
  background-color: #f8f8f8;
}
</style>
<style>
.movie-conter .van-tabs {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #f8f8f8;
}
.list-content {
  overflow: scroll;
}
.list-item {
  text-align: center;
}
</style>