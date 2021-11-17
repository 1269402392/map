<template>
  <div class="house-info">
    <nav-bar :nav-info="navInfo" class="house-nav-bar"/>
    <banners :banners="houseInfo.houseImg"/>
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
    <!-- TabBar -->
    <ul class="tab-bar">
      <li>收藏</li>
      <li>在线资讯</li>
      <li>电话预约</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "../common/navBar/NavBar";
import Banners from "../common/banners/Banners";
export default {
  name: "houseInfo",
  components: {Banners, NavBar},
  data() {
    return {
      navInfo: {
        title: ''
      },
      houseInfo: {}
    }
  },
  created() {
    console.log()
    this.$axios.get('http://122.112.218.153:8095/houses/5cc4494549926d0e2b94c816').then(res => {
      console.log(res);
      this.houseInfo = res.body
      this.navInfo.title = res.body.community
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
  }
}
</script>

<style lang="less" scoped>
.house-info{
  *{
    font-size: 14px;
  }
  padding-bottom: 49px;
  height: 1000px;
  background-color: rgba(245,244,246,1);
  //height: 100vh;
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
    justify-content: space-between;
    li{
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
      font-size: 14px;
    }
    height: 49px;
    line-height: 49px;
  }
}
/deep/.van-nav-bar{
  position: absolute;
  top: 0;
  background-color: unset;
  width: 100%;
}
/deep/.van-nav-bar__left{
  .van-icon,.van-nav-bar__text{
    color: white;
    font-size: 14px;
  }
}
/deep/.van-swipe{
  height: 181px;
}
/deep/.van-ellipsis{
  color: white;
  font-size: 14px;
}
</style>