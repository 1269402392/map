<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
import PullDown from '@better-scroll/pull-down';
BScroll.use(PullUp)
BScroll.use(PullDown)
export default {
  name: "Scroll",
  data() {
    return {
      bs: null
    }
  },
  mounted() {
    this.bs = new BScroll(this.$refs.wrapper, {
      click: true,
      pullUpLoad: true,
      pullDownRefresh: {
        scrollY: true, //滚动方向为Y轴
        threshold: 70, //配置下拉距离来决定刷新时机
        stop: 60, //回弹悬停的距离
      }
    })

    this.$nextTick(() => {
      this.bs.refresh();
    })
    //上拉
    this.bs.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
    //获取滚动位置
    this.bs.on('scroll', position => {
      this.$emit('scrollPosition',position)
    })
    //下拉
    this.bs.on('pullingDown', _ => {
      this.$emit('pullingDown')
    })
    this.bs.on('enterThreshold', () => {
      this.$emit('enterThreshold',`<svg width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M367.997 338.75l-95.998 95.997V17.503h-32v417.242l-95.996-95.995l-22.627 22.627L256 496l134.624-134.623l-22.627-22.627z"></path></svg>还差一点点`)
    })
    this.bs.on('leaveThreshold', () => {
      this.$emit('leaveThreshold','好了请放手')
    })
  },
  created() {
  },
  methods: {
    refresh() {
      this.bs.refresh()
    },
    //结束下拉刷新行为,为下一次做准备
    finishPullDown() {
      this.bs.finishPullDown()
    },
    //结束上拉刷新行为,为下一次做准备
    finishPullUp() {
      this.bs.finishPullUp();
    }
  }
}
</script>

<style lang="less" scoped>
  .wrapper{
    height: calc(100vh - 50px);
    overflow: hidden;
  }
</style>