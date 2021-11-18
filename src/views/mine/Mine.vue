<template>
  <div class="mine">
    <header>
      <img src="../../assets/img/newli.jpg">
    </header>

    <section>
        <div class="profile">
          <div class="head">
            <img src="../../assets/img/gougousuisui.jpg">
          </div>
          <div class="head-info">
            <div class="title">故河十九年春</div>
            <van-button block round  size="mini" type="primary" @click="back">退出</van-button>
            <span class="update-info">编辑个人资料<van-icon name="play" /></span>
          </div>
        </div>
        <ul class="menu">
          <li v-for="item in menuList" @click="goPage(item.path)">
            <van-icon :name="item.icon" />
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </section>

    <footer>
      <img src="../../assets/img/hellohaoke.png">
    </footer>
    <tab-bar/>
  </div>
</template>

<script>
export default {
  name: "Mine",
  data() {
    return {
      menuList: [
        {
          icon: 'star-o',
          path: '/collect',
          label: '我的收藏'
        },
        {
          icon: 'wap-home-o',
          path: '',
          label: '我的出租'
        },
        {
          icon: 'underway-o',
          path: '',
          label: '看房记录'
        },
        {
          icon: 'debit-pay',
          path: '',
          label: '成为房主'
        },
        {
          icon: 'user-o',
          path: '',
          label: '个人资料'
        },
        {
          icon: 'service-o',
          path: '',
          label: '联系我们'
        }
      ]
    }
  },
  methods: {
    back() {
      this.$router.replace('/login')
    },
    goPage(path) {
      this.$router.push(path)
    },

  }
}
</script>

<style lang="less" scoped>
  .mine{
    position: relative;
    padding-top: 170px;
    header{
      position: fixed;
      top: 0;left: 0;right: 0;
      z-index: 1;
      img{
        width: 100%;
      }
    }
    section{
      position: relative;
      z-index: 9;
      width: 85%;
      margin: auto;
      background: white;
      .profile{
        box-shadow: 0 -3px 6px #999b9c;
        border-radius: 8px;
        position: relative;
        padding-top: 40px;
        padding-bottom: 8px;
        .head{
          width: 50px;
          height: 50px;
          padding: 4px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #999999;
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translate(-50%,0px);
          background: white;
          img{
            width: 100%;
            border-radius: 50%;
          }
        }
        .head-info{
          text-align: center;
          .title{
            font-size: 14px;
            text-align: center;
          }
          .van-button{
            width: 20%;
            margin: 5px auto;
          }
          .update-info{
            font-size: 12px;
            text-align: center;
          }
        }
      }
      .menu{
        display: flex;
        flex-wrap: wrap;
        li{
          width: 33%;
          margin-top: 25px;
          font-size: 13px;
          text-align: center;
          span{
            display: block;
          }
        }
      }
    }
    footer{
      margin-top: 20px;
      img{
        width: 83%;
        display: block;
        margin: auto;
        border-radius: 10px;
      }
    }
  }

  /**/
</style>