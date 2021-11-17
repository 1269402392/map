<template>
  <div>
    <div class="con-box">
      <div class="title">{{ conditionList[0].label }}</div>
      <div class="tags">
        <van-tag
            plain
            :class="{activeColor: element.label === characteristic.label}"
            size="medium"
            @click="itemClick(conditionList[0].label, element)"
            type="primary" v-for="element in conditionList[0].list"
            :key="element.value">{{ element.label }}</van-tag>
      </div>
    </div>

    <div class="con-box">
      <div class="title">{{ conditionList[1].label }}</div>
      <div class="tags">
        <van-tag
            plain
            :class="{activeColor: element.label === floor.label}"
            size="medium"
            @click="itemClick(conditionList[1].label, element)"
            type="primary" v-for="element in conditionList[1].list"
            :key="element.value">{{ element.label }}</van-tag>
      </div>
    </div>

    <div class="con-box">
      <div class="title">{{ conditionList[2].label }}</div>
      <div class="tags">
        <van-tag
            plain
            :class="{activeColor: element.label === oriented.label}"
            size="medium"
            @click="itemClick(conditionList[2].label, element)"
            type="primary" v-for="element in conditionList[2].list"
            :key="element.value">{{ element.label }}</van-tag>
      </div>
    </div>

    <div class="con-box">
      <div class="title">{{ conditionList[3].label }}</div>
      <div class="tags">
        <van-tag
            plain
            :class="{activeColor: element.label === roomType.label}"
            size="medium"
            @click="itemClick(conditionList[3].label, element)"
            type="primary" v-for="element in conditionList[3].list"
            :key="element.value">{{ element.label }}</van-tag>
      </div>
    </div>
    <div class="util">
      <van-button size="small" @click="submit" type="info">确定</van-button>
      <van-button size="small" @click="reset" type="primary">重置</van-button>
      <van-button size="small" @click="cancel" type="default">取消</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Condition",
  data() {
    return {
      floor: {},
      oriented: {},
      characteristic: {},
      roomType: {},
    }
  },
  methods: {
    itemClick(label, element) {
      if(label === '楼层') {
        if(Object.keys(this.floor).length !== 0) {
          this.floor = {}
          return
        }
        this.conditionList[1].list.map(item => {
          if(item.label === element.label) {
            this.floor = element
          }
        })
      }else if(label === '房屋亮点') {
        if(Object.keys(this.characteristic).length !== 0) {
          this.characteristic = {}
          return
        }
        this.conditionList[0].list.map(item => {
          if(item.label === element.label) {
            this.characteristic = element
          }
        })
      }else if(label === '朝向') {
        if(Object.keys(this.oriented).length !== 0) {
          this.oriented = {}
          return
        }
        this.conditionList[2].list.map(item => {
          if(item.label === element.label) {
            this.oriented = element
          }
        })
      }
      else if(label === '房屋结构') {
        if(Object.keys(this.roomType).length !== 0) {
          this.roomType = {}
          return
        }
        this.conditionList[3].list.map(item => {
          if(item.label === element.label) {
            this.roomType = element
          }
        })
      }
    },
    reset() {
      this.roomType = ''
      this.oriented = ''
      this.characteristic = ''
      this.floor = ''
    },
    cancel(){
      this.$emit('callOf')
    },
    submit() {
      this.$emit('conditionSubmit',{
        floor: this.floor,
        oriented: this.oriented,
        characteristic: this.characteristic,
        roomType: this.roomType,
      })
    }
  },
  props: {
    conditionList: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="less" scoped>
  .con-box{
    padding: 15px 15px;
    .title{
      font-size: 15px;
      font-weight: bold;
      padding: 0px 0px 10px 0px;
      border-bottom: 1px solid #eeeeee;
    }
    .tags{
      display: flex;
      flex-wrap: wrap;
      /deep/.van-tag--primary.van-tag--plain{
        margin-right: 10px;
        margin-top: 10px;
      }
    }
  }
  .util{
    margin-bottom: 20px;
    /deep/.van-button{
      margin-left: 30px;
      padding: 0px 20px;
    }
  }
  .activeColor{
    color: red;
  }
</style>