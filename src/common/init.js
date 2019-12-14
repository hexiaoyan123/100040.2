/* eslint-disable */
"use strict";
export default {
  // 渠道配置信息
  channel: {
    // 接口地址
    apiUrl: "//zpyl.piaowutong.cc",
    // 静态文件地址
    staticUrl: "//zpyl.static.piaowutong.cc",
    // 项目地址
    itemUrl: "http://192.168.1.5:9090/#/",
    // 首页地址
    indexUrl: "/seckill/index",
    // 支付授权地址
    payAuthUrl: "http://192.168.1.5:9090/#/payment/payChannel",
    // 未登录重定向地址
    notLoginRedirectUrl: "http://192.168.1.5:9090/#/user/loginPhoneCode",
    // 渠道编码
    id: "100042",
    // 渠道名称
    name: "测试渠道",
    // 秘钥
    secret: "8R1ODIEQJCIJ47S000BA1FNAZB19XCZG",
    // 登录方法（
    // 1：手机号验证码；
    // 2：手机号密码；
    // 3：中影凭证密码；
    // 4：中行接口授权；
    // 5：微信登录；
    // 6：湖北客户接口授权；
    // ）
    loginMethod: "1",
    // 默认城市
    defaultCity: {
      id: "110100",
      hot: 1,
      parentId: "110000",
      grade: "2",
      name: "北京",
      abbr: "B"
    },
    // 客服电话
    serviceTel: "4007001314",
    // 渠道logo
    channelLogo:
      "//zpyl.static.piaowutong.cc/201912/FF16208A947747E3AD3E08982A8A17B3.png",
    // 是否可修改电影出票手机号
    isUpdateCinemaVoucherPhone: false,
    // 秒杀提示
    seckillHint: {
      show: false,
      imgUrl: ""
    },
    // 限制座位数
    buyNumLimit: 1,
    // 底部菜单栏
    bottomBar: [
      {
        name: "首页",
        path: "/seckill/index",
        icon: "/static/icon/home.png",
        iconActive: "/static/icon/homeActive.png"
      },
      {
        name: "影片",
        path: "/movie/home",
        icon: "/static/icon/film.png",
        iconActive: "/static/icon/filmActive.png"
      },
      {
        name: "影院",
        path: "/movie/cinema",
        icon: "/static/icon/cinema.png",
        iconActive: "/static/icon/cinemaActive.png"
      },
      {
        name: "我的",
        path: "/user/home",
        icon: "/static/icon/my.png",
        iconActive: "/static/icon/myActive.png"
      }
    ]
  },

  // 登录信息
  login: {
    // 登录标识
    accessToken: "",
    // 登录用户
    user: {
      // id: "",
      // createTime: "",
      // updateTime: "",
      // dataStatus: "",
      // groupId: "",
      // channelId: "",
      // phone: "",
      // password: "",
      // nickname: "",
      // imageUrl: "",
      // other: ""
    },
    // 登录渠道
    channel: {
      // id: "",
      // createTime: "",
      // updateTime: "",
      // dataStatus: "",
      // groupId: "",
      // channelCategory: "",
      // name: "",
      // secret: "",
      // indexUrl: "",
      // printVoucher: "",
      // configurationMap: "",
      // payChannelMap: "",
      // loginCheckMap: "",
      // searchTagList: ""
    }
  },

  // 键定义
  key: {
    // 登录信息
    login: "100042_DATA_LOGIN",

    // 电影模块
    // 选中城市
    cinemaSelectedCity: "100042_DATA_CINEMA_SELECTED_CITY",
    // 选中影院
    cinemaSelectedCinema: "100042_DATA_CINEMA_SELECTED_CINEMA",
    // 选中影片
    cinemaSelectedFilm: "100042_DATA_CINEMA_SELECTED_FILM",
    // 选中场次
    cinemaSelectedShow: "100042_DATA_CINEMA_SELECTED_SHOW",
    // 选中订单
    cinemaSelectedOrder: "100042_DATA_CINEMA_SELECTED_ORDER",

    // 聚合支付模块
    // 支付渠道
    payChannel: "100042_DATA_PAYMENT_PAY_CHANNEL",
    // 订单支付信息
    orderPay: "100042_DATA_PAYMENT_ORDER_PAY"
  },

  // 超时定义
  overtime: {
    // 登录信息
    login: 60 * 60 * 24 * 7
  },

  channelCategory: {
    WAP_SHOP: {
      code: 1,
      msg: "WAP商城"
    },
    WAP_CINEMA: {
      code: 2,
      msg: "WAP电影票"
    },
    WAP_TICKET: {
      code: 3,
      msg: "WAP票务"
    },
    WAP_ACTIVITY: {
      code: 4,
      msg: "WAP活动"
    },
    WAP_SECKILL: {
      code: 5,
      msg: "WAP秒杀"
    },
    WAP_TRAVEL: {
      code: 6,
      msg: "WAP旅游"
    },
    ADMIN: {
      code: 7,
      msg: "管理后台"
    }
  }
};
