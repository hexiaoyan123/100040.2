<template>
  <div class="container">
    <Vheader name="扫描详情"></Vheader>

    <div class="Carddetails">
      <div class="Carddetails-bg">
        <div class="Cardcontent-left">
          <p>卡号：{{voucher.voucher}}</p>
          <p>类型：{{voucher.payTypeName}}</p>
          <div class="Cardcontent-valid">有效期：{{voucher.expDate}}</div>
        </div>
        <div class="Cardcontent-right">
          <span style="color:#D3D3D3">余额</span>
          <div class="Cardcontent-money">
            <i>￥</i>
           {{voucher.balance}} 
          </div>
        </div>
      </div>

      <div class="tips" @click="goPath('/movie/usableRange?voucherNo=' + voucherNo)">
        <div class="tips-tit">
          查看线上使用范围
          <!-- <span style="color:#FF5162">697</span>
          家影院-->
        </div>
        <div class="tips-right">
          <i class="icon-more"></i>
        </div>
      </div>
    </div>

    <!-- 优惠购票 -->
    <div class="updata-cont">
      <div class="updata-right" @click="goPath($init.channel.indexUrl)">优惠购票</div>
    </div>
  </div>
</template>

<script>
import Vheader from "../HeaderV";
export default {
  name: "ScanCode",
  components: {
    Vheader
  },
  data() {
    return {
      // 凭证号
      voucherNo: this.$route.query.voucherNo,

      // 凭证
      voucher: {
        balance: "",
        expDate: "",
        payType: "",
        payTypeName: "",
        realValue: "",
        saleId: "",
        voucher: ""
      }
    };
  },
  created() {
    this.getVoucher();
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

    // 获取凭证
    getVoucher() {
      let vm = this;
      vm.$http
        .get("/panda-payment-api/v1/getVoucher/" + vm.voucherNo)
        .then(function(response) {
          if (response.data.code == "1000") {
            vm.voucher = response.data.result;
          } else {
            vm.$toast(response.data.msg);
          }
        })
        .catch(function(error) {
          vm.$toast("请求超时，请稍后再试！");
        });
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #fff;
}
.Carddetails {
  background-color: #fff;
  position: relative;
  top: 8%;
  padding-top: 20px;
  margin-right: 20px;
  margin-left: 20px;
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.Carddetails-bg {
  margin: 0px 26px 20px 26px;
  background-image: url(../../assets/Carddetails-bg.png);
  background-size: 100% 100%;
  height: 260px;
  color: #fff;
}
.Cardcontent-left {
  float: left;
  margin-top: 40px;
  margin-left: 40px;
}
.Cardcontent-valid {
  margin-top: 80px;
}
.Cardcontent-right {
  float: right;
  margin-top: 40px;
  text-align: right;
  margin-right: 30px;
}
.Cardcontent-money {
  color: #ff5162;
  font-size: 28px;
  margin-top: 115px;
}
.tips {
  margin-left: 20px;
  color: #808080;
  padding-bottom: 15px;
}
.tips-tit {
  display: inline-block;
}
.tips-right {
  display: inline-block;
  position: absolute;
  right: 20px;
}
.updata-cont {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
}

.updata-right {
  flex: 10;
  text-align: center;
  line-height: 100px;
  color: #fff;
  background: -webkit-gradient(linear, 0 0, 100% 0, from(#ff8e62), to(#fd4471));
  background: -webkit-linear-gradient(left, #ff8e62, #fd4471);
  background: -moz-linear-gradient(left, #ff8e62, #fd4471);
  background: -o-linear-gradient(left, #ff8e62, #fd4471);
  background: linear-gradient(90deg, #ff8e62, #fd4471);
  font-size: 28px;
}
</style>
