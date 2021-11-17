<template>
  <div class="news-item">
    <img :src="URL + item.imgSrc">
    <div class="content">
      <h4>{{item.title}}</h4>
      <div class="un">
        <span>{{item.from}}</span>
        <span>{{item.date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsItem",
  props: {
    item: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="less" scoped>
  .news-item{
    display: flex;
    border-bottom: 2px solid #e5dfdf;
    padding-bottom: 12px;
    margin-bottom: 12px;
    &:last-of-type{
      border: none;
    }
    img{
      width: 120px;
      margin-right: 10px;
    }
    .content{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h4{
        font-size: 14px;
      }
      .un{
        display: flex;
        justify-content: space-between;
        span{
          font-size: 13px;
          color: #777373;
        }
      }
    }
  }
</style>