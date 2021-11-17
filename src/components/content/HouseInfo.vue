<template>
  <div class="house-info">
    <nav-bar :nav-info="navInfo" class="house-nav-bar"/>
    <banners :banners="houseInfo.houseImg" class="banner"/>
    <div class="house-div">
      <!-- 房屋信息 -->
      <div class="title">
        <div>{{ houseInfo.title }}</div>
        <ul class="tag-ul">
          <li v-for="item in houseInfo.tags">{{ item }}</li>
        </ul>
      </div>
      <!-- 租金/房型/面积 -->
      <div class="page">
        <div class="page-box">
          <div>{{ houseInfo.price }}/月</div>
          <span>租金</span>
        </div>
        <div class="page-box">
          <div>{{ houseInfo.roomType }}</div>
          <span>房型</span>
        </div>
        <div class="page-box">
          <div>{{ houseInfo.size }}平米</div>
          <span>面积</span>
        </div>
      </div>
      <!-- 装修/朝向 -->
      <ul class="orient">
        <li>
          <span class="label">装修：</span>
          <span>精装</span>
        </li>
        <li>
          <span class="label">朝向：</span>
          <span v-for="item in houseInfo.oriented">{{item}}</span>
        </li>
        <li>
          <span class="label">楼层：</span>
          <span>{{ houseInfo.floor }}</span>
        </li>
        <li>
          <span class="label">类型：</span>
          <span>{{ houseInfo.roomType }}</span>
        </li>
      </ul>
    </div>
    <!-- Map -->
    <div class="map">
      <div class="title"><span>小区</span> : &nbsp;{{houseInfo.community}}</div>
      <div id="container"></div>
    </div>
    <!-- 房屋配套 -->
    <div class="mating">
      <div class="title">房屋配套</div>
      <ul v-if="supportingList.length > 0" class="tag-ul">
        <li v-for="item in supportingList">{{ item }}</li>
      </ul>
      <div class="none-div" v-else>暂无数据</div>
    </div>
    <!-- 房源概况 -->
    <div class="general">
      <div class="title">房源概况</div>
      <div class="content">
        <div class="title-info">
          <div class="info-left">
            <img src="https://img01.yzcdn.cn/vant/cat.jpeg">
            <div class="left-txt">
              <p>王女士</p>
              <div>
                <van-icon name="passed" />
                <span>已认证房主</span>
              </div>
            </div>
          </div>
          <van-button size="small" plain type="primary">发消息</van-button>
        </div>
        <div class="con-info">{{houseInfo.description}}</div>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="like">
      <div class="title">猜你喜欢</div>
      <sheet-content v-for="item in likeList" :house="item"/>
    </div>
    <!-- TabBar -->
    <ul class="tab-bar">
      <li @click="collectClick">
        <van-icon v-show="!isCollect" name="star-o" />
        <van-icon name="star" v-show="isCollect" class="red"/>
        收藏
      </li>
      <li>在线资讯</li>
      <li>电话预约</li>
    </ul>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
import NavBar from "../common/navBar/NavBar";
import Banners from "../common/banners/Banners";
import SheetContent from "./SheetContent";
export default {
  name: "houseInfo",
  components: {SheetContent, Banners, NavBar},
  data() {
    return {
      navInfo: {
        title: '',
      },
      supportingList: [], //房屋配套列表
      likeList: [], //猜你喜欢列表
      houseInfo: {}, //房屋对象
      isCollect: false
    }
  },
  async activated() {
    const { body : res } = await this.$axios.get('houses/' + this.$route.query.id)
    this.houseInfo = res
    this.supportingList = res.supporting
    this.navInfo.title = res.community
    //查找收藏是否包含当前对象
    this.findCollectHouse(this.houseInfo) ? this.isCollect = true : this.isCollect= false
    //手动搜寻猜你喜欢
    this.$axios.get(`houses?cityId=${this.$store.state.cityId}`).then(res => {
      this.likeList = []
      let index = Math.ceil(Math.random() * 5) - 1
      console.log(index)
      this.likeList.push(res.body.list[index])
      if(index != 0) {
        this.likeList.push(res.body.list[index - 1])
      }
    })
  },
  mounted() {
    setTimeout(() => {
      let map = new BMapGL.Map("container");
      // 创建地图实例
      let point = new BMapGL.Point(this.houseInfo.coord.longitude, this.houseInfo.coord.latitude);
      // 创建点坐标
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
      // 初始化地图，设置中心点坐标和地图级别
      var content = `
        <div style="padding: 5px;background: red;color: white;border: none">${this.houseInfo.community}</div>
      `;
      var label = new BMapGL.Label(content, {       // 创建文本标注
        position: point,                          // 设置标注的地理位置
        offset: new BMapGL.Size(10, 20)           // 设置标注的偏移量
      })
      map.addOverlay(label);                        // 将标注添加到地图中
    }, 1000)
  },
  methods: {
    ...mapMutations(['addCollect','delCollect']),
    async refresh() {

    },
    collectClick() {
      console.log('执行')
      let houseInfo = this.houseInfo
      if(this.findCollectHouse(houseInfo)) {
        this.delCollect(houseInfo)
        this.isCollect = false
      } else {
        this.addCollect(houseInfo)
        this.isCollect = true
      }
    },
    findCollectHouse(house) {
      // console.log('-----')
      // console.log('collectList',this.collectList)
      // console.log('house',house)
      let flag = false
      this.collectList.forEach(item => {
        if(item.houseCode === house.houseCode) {
          flag = true
        }
      })
      return flag
    }
  },
  computed: {
    ...mapState(['collectList'])
  }
}
</script>

<style lang="less" scoped>
  .house-info{
    .house-nav-bar{
      background-color: white;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 99;
    }
    .banner{
      margin-top: 46px;
    }
    *{
      font-size: 13px;
    }
    padding-bottom: 49px;
    background-color: rgba(245,244,246,1);
    //height: 100vh;
    .mating{
      padding: 0px 15px;
      background-color: white;
      .title{
        font-weight: bold;
        font-size: 14px;
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
        margin-bottom: 10px;
      }
      .none-div{
        padding-bottom: 10px;
      }
      .tag-ul{
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 10px;
        li{
          &:first-child{

          }
          &:nth-child(even){
            color: rgba(87,184,145,1);
            background: rgba(218,241,230,1);
          }
          margin-top: 10px;
          font-size: 12px;
          margin-right: 8px;
          flex-wrap: wrap;
          //width: 40px;
          padding: 2px 8px;
          text-align: center;
          border-radius: 5px;
          color: rgba(102,194,207,1);
          background: rgba(222,246,246,1);
          line-height: 18px;
          height: 18px;
        }
      }
    }
    .general{
      padding: 8px 15px;
      background-color: white;
      margin-top: 8px;
      .title{
        font-weight: bold;
        font-size: 14px;
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
        margin-bottom: 10px;
      }
      .content{
        .title-info{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .info-left{
            display: flex;
            align-items: center;
            >img{
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
            .left-txt{
              margin-left: 10px;
              p{
                font-size: 14px !important;
              }
              >div{
                margin-top: 5px;
                color: red;
              }
            }
          }
        }
        .con-info{
          margin-top: 15px;
          line-height: 19px;
        }
      }
    }
    .like{
      padding: 8px 15px;
      background-color: white;
      margin-top: 8px;
      .title{
        font-weight: bold;
        font-size: 14px;
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
        margin-bottom: 10px;
      }
    }
    .house-div{
      background-color: white;
      padding: 10px 15px 0px 15px;
      .title{
        padding: 0px 0px 15px 0px;
        margin: 0px 0px 10px 0px;
        border-bottom: 1px solid #eeeeee;
        >div:first-child{
          font-size: 14px;
          margin-bottom: 8px;
        }
        .tag-ul{
          display: flex;
          li{
            &:first-child{
              margin-left: 0px;
            }
            &:nth-child(even){
              color: rgba(87,184,145,1);
              background: rgba(218,241,230,1);
            }
            font-size: 12px;
            margin-left: 5px;
            flex-wrap: wrap;
            //width: 40px;
            padding: 0px 5px;
            text-align: center;
            border-radius: 5px;
            color: rgba(102,194,207,1);
            background: rgba(222,246,246,1);
            line-height: 18px;
            height: 18px;
          }
        }
      }
      .page{
        display: flex;
        justify-content: space-around;
        border-bottom: 2px solid #eeeeee;
        padding: 0px 0px 15px 0px;
        margin: 10px 0px;
        .page-box{
          text-align: center;
          *{
            font-size: 16px;
          }
          div{
            font-weight: bold;
            color: rgba(248,93,76,1);
          }
          span{
            font-size: 14px !important;
            color: #999999;
          }
        }
      }
      .orient{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-bottom: 15px;
        *{
          font-size: 13px;
        }
        li{
          width: 50%;
          margin-top: 10px;
          .label{
            color: #999999;
          }
          span{
            margin-right: 8px;
          }
        }
      }
    }
    .map{
      margin-top: 8px;
      background-color: white;
      padding: 10px 15px 10px 15px;
      .title{
        span{
          color: #999999;
        }
        margin-bottom: 8px;
      }
      #container{
        height: 170px;
      }
    }
    .tab-bar{
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 99;
      justify-content: space-between;
      li{
        .van-icon{
          margin-right: 5px;
        }
        width: 34%;
        background-color: red;
        background-color: rgba(246,247,246,1);
        text-align: center;
        color: #999999;
        border-top: 1.5px solid #eeeeee;
        border-right: 1px solid #eeee;
        &:last-of-type{
          background-color: #5ec19e;
          color: white;
        }
      }
      *{
        font-size: 13px;
      }
      height: 49px;
      line-height: 49px;
    }
  }
  .red{
    color: red;
  }
  /deep/.van-nav-bar__left{
    .van-icon,.van-nav-bar__text{
      color: rgba(94,193,158,1);
      font-size: 14px;
    }
  }
  /deep/.van-swipe{
    height: 181px;
  }
  /deep/.van-ellipsis{
    color: rgba(94,193,158,1);
    font-size: 14px;
  }
</style>