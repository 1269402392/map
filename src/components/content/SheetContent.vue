<template>
  <div class="content" @click="houseClick">
    <div class="img-box">
      <img :src="'http://122.112.218.153:8095' + house.houseImg">
    </div>
    <div class="right">
      <div class="title">
        <h5>{{house.title}}</h5>
        <span>{{ house.desc }}</span>
      </div>
      <ul class="tag-ul">
        <li v-for="item in house.tags">{{ item }}</li>
      </ul>
      <span class="price">￥ {{ house.price }} <span class="price-info">元/月</span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SheetContent",
  props: {
    house: {
      type: Object,
      default: {}
    }
  },
  methods: {
    houseClick() {
      this.$router.push({
        path: '/houseInfo',
        query: {
          house: this.house
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .content{
    padding: 0px 10px 10px 10px;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    .img-box{
      width: 30%;
      height: 80px;
      overflow: hidden;
      border-radius: 5px;
      margin-right: 10px;
      >img{
        width: 100px;
        height: 100px;
      }
    }
    .right{
      width: 65%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 93px;
      .tag-ul{
        display: flex;
        flex-wrap: wrap;
        li{
          &:first-child{

          }
          &:nth-child(even){
            color: rgba(87,184,145,1);
            background: rgba(218,241,230,1);
          }
          margin-top: 5px;
          font-size: 12px;
          margin-right: 5px;
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
      .title{
        width: 100%;
        h5{
          white-space: nowrap;//强制为一行
          text-overflow: ellipsis;//变点12:54 2021/4/15
          overflow: hidden;
        }
        span{
          font-size: 12px;
          color: #999999;
        }
        font-size: 16px;
      }
      .price{
        font-size: 17px;
        font-weight: bold;
        color: rgba(242,105,77,1);
        .price-info{
          font-size: 12px;
          position: relative;
          top: -1px;
          font-weight: 500;
          letter-spacing: 2px;
        }
      }
    }
  }
</style>