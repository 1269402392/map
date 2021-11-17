<template>
  <div class="home">
    <div class="wrapper" ref="wrapper">
      <!-- 搜索区域 -->
      <van-search
          class="search"
          show-action
          :label="cityName"
          @click="searchClick"
          placeholder="点击选择地址">
        <template #action>
          <van-icon name="wap-home-o" @click="homeClick"/>
        </template>
      </van-search>
      <!-- 轮播图 -->
      <Banners :banners="banners"/>
      <!-- 功能区域 -->
      <ul class="fun-box">
        <li v-for="item in funcList" @click="funcClick(item.path)">
          <div class="icon">
            <van-icon :name="item.icon" />
          </div>
          <div class="txt">{{item.txt}}</div>
        </li>
      </ul>
      <!-- 租房小组 -->
      <div class="group">
        <div class="title">
          <h5>租房小组</h5>
          <span>更多</span>
        </div>
        <ul class="group-ul">
          <li v-for="item in groupList">
            <div class="left">
              <h5>{{item.title}}</h5>
              <span>{{ item.desc }}</span>
            </div>
            <van-image
                width="50"
                height="50"
                border-radius="50%"
                :src="'http://122.112.218.153:8095' + item.imgSrc"/>
          </li>
        </ul>
      </div>
      <!-- 最新资讯 -->
      <div class="news">
        <h5 class="title">最新资讯</h5>
        <ul>
          <li v-for="item in newList">
            <img :src="'http://122.112.218.153:8095' + item.imgSrc"/>
            <div class="txt">
              <div class="top-txt">{{ item.title }}</div>
              <div class="txt-info">
                <span>{{ item.from }}</span>
                <span>{{ item.date }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- TabBar-->
      <tab-bar/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Banners from "../../components/common/banners/Banners";
export default {
  name: 'Home',
  components: {Banners},
  data() {
    return {
      banners: [],
      funcList: [
        {
          icon: 'wap-home-o',
          txt: '整租',
          path: ''
        },
        {
          icon: 'friends-o',
          txt: '合租',
          path: ''
        },
        {
          icon: 'guide-o',
          txt: '地图找房',
          path: ''
        },
        {
          icon: 'wap-home-o',
          txt: '去出租',
          path: '/publish'
        }
      ],
      groupList: [],
      newList: [],
    }
  },
  methods: {
    searchClick() {
      this.$router.push('/chooseCity')
    },
    funcClick(path) {
      this.$router.push(path)
    },
    homeClick() {
      this.$router.push(({
        path: '/map',
        query: {
          cityId: this.cityId,
          cityName: this.cityName
        }
      }))
    }
  },
  computed: {
    ...mapState({
      cityName: 'cityName',
      cityId: 'cityId'
    })
  },
  async created() {
    const data = await this.$axios.get('home/swiper')
    this.banners = data.body
    const res = await this.$axios.get('home/groups')
    this.groupList = res.body
    const result = await this.$axios.get('home/news')
    this.newList = result.body
  }
}
</script>

<style lang="less" scoped>
  .home {
    height: 100%;
    background-color: rgba(245,244,246,1);
    padding-bottom: 40px;
    .fun-box{
      background: white;
      display: flex;
      justify-content: space-around;
      padding: 15px 0px;
      li{
        text-align: center;
        >.icon{
          width: 35px;
          height: 35px;
          line-height: 35px;
          margin: auto;
          background: rgba(241,250,246,1);
          border-radius: 50%;
          color: rgba(94,193,158,1);
        }
        .txt{
          font-size: 13px;
          margin-top: 10px;
        }
      }
    }
    .group{
      .title{
        font-size: 17px;
        display: flex;
        justify-content: space-between;
        padding: 10px 10px 2px 10px;
        span{
          font-size: 14px;
        }
      }
      .group-ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0px 8px;
        li{
          display: flex;
          width: 42%;
          background-color: white;
          align-items: center;
          padding: 10px 10px 10px 10px;
          justify-content: space-between;
          margin-top: 8px;
          .left{
            font-size: 15px;
            span{
              font-size: 12px;
            }
          }
          /deep/.van-image{
            img{
              border-radius: 50%;
            }
          }
        }
      }
    }
    .news{
      background-color: white;
      margin-top: 10px;
      padding: 10px;
      .title{
        font-size: 14px;
      }
      >ul{
        >li{
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          border-bottom: 1px solid rgba(245,246,245,1);
          padding-bottom: 10px;
          &:last-of-type{
            border: none;
          }
          >img{
            width: 100px;
            height: 70px;
            margin-right: 10px;
          }
          .txt{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .top-txt{
              font-size: 13px;
              font-weight: bold;
            }
            .txt-info{
              font-size: 13px;
              color: #999999;
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }

  .search{
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    background-color: unset;
    .van-search__content{
      height: 30px;
      line-height: 30px;
      *{
        font-size: 13px;
      }
      .van-search__label{
        line-height: 30px;
      }
      .van-cell{
        padding: 3px 8px 5px 0;
      }
    }
    .van-search__action{
      .van-icon{
        font-size: 20px;
        position: relative;
        top: 3px;
        color: white;
      }
    }
  }
</style>