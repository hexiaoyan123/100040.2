<template>
  <div class="botton-bar-cont" v-show="show">
    <div
      class="botton-bar-item"
      :class="{'botton-bar-item-on': $route.path == item.path}"
      @click="goPath(item.path)"
      v-for="(item, index) in $init.channel.bottomBar"
      :key="index"
    >
      <i class="iconfont">
        <img width="100%" height="100%" v-if="$route.path == item.path" :src="item.iconActive" />
        <img width="100%" height="100%" v-else :src="item.icon" />
      </i>
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomBar",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  watch: {
    $route(to, from) {
      // 监听路由是否变化
      if (to.path == "/movie/cinema") {
        location.reload();
      }
    }
  },
  methods: {
    goPath(path) {
      this.$router.push(path);
    },
    //监听页面实时刷新
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  computed: {
    show() {
      if (this.$route.meta.bottomBar) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.iconfont {
  width: 40px;
  height: 40px;
  display: inline-block;
  margin-top: 6px;
}

.botton-bar-cont {
  /* position: absolute; */
  position: fixed;
  /* -webkit-overflow-scroll: touch; */
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  width: 100%;
  height: 88px;
  display: flex;
  box-shadow: 0 1px 6px #ccc;
  box-sizing: border-box;
  padding-top: 3px;
  z-index: 90;
}

.botton-bar-item {
  flex: 3;
  text-align: center;
}

.botton-bar-item .iconfont {
  font-size: 36px;
  line-height: 50px;
}

.botton-bar-item p {
  font-size: 24px;
  line-height: 30px;
  color: #a5a5a5;
}

.botton-bar-cont .botton-bar-item-on p {
  color: #ff5162;
}
</style>
