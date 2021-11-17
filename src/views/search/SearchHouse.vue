<template>
  <div class="search">
    <van-dropdown-menu>
      <van-dropdown-item ref="dropdown1" title="区域">
        <van-picker
            show-toolbar
            :columns="columnsArea"
            value-key="label"
            @confirm="onConfirm"
            @change="handleArea"
            @cancel="onCancel1"/>
      </van-dropdown-item>
      <van-dropdown-item ref="dropdown2" title="方式">
        <van-picker
            show-toolbar
            :columns="columnsRent"
            @confirm="onConfirm"
            @change="handleRent"
            value-key="label"
            @cancel="onCancel2"/>
      </van-dropdown-item>
      <van-dropdown-item ref="dropdown3" title="价格">
        <van-picker
            show-toolbar
            :columns="columnsPrice"
            @confirm="onConfirm"
            @change="handlePrice"
            value-key="label"
            @cancel="onCancel3"/>
      </van-dropdown-item>
      <van-dropdown-item ref="dropdown4" title="筛选">
        <condition :condition-list="conditionList"
                   @conditionSubmit="conRef" @callOf="conCancel"/>
      </van-dropdown-item>
    </van-dropdown-menu>
    <div v-if="houseList.length !== 0" class="house-list">
      <sheet-content :house="item" v-for="item in houseList"/>
    </div>
    <van-empty v-if="houseList.length === 0" description="描述文字" />
    <tab-bar/>
  </div>
</template>

<script>
import SheetContent from "../../components/content/SheetContent";
import Condition from "./searchChildren/Condition";
export default {
  name: "SearchHouse",
  components: {Condition, SheetContent},
  data() {
    return {
      columnsArea: [
        {
          label: '请选择',
          children: [
            {
              label: '',
              children: [{ label: '' }, { label: '' }],
            },
          ],
        },
      ], //区域下拉
      columnsRent: [], //方式下拉
      columnsPrice: [], //价格下拉
      houseList: [], //展示列表
      conditionList: [],
      // oriented: {},// 筛选-朝向
      // floor: {},// 筛选-楼层
      // room: {},//筛选-结构
      // characteristic: {},//筛选-配套设备
      filterObj: {
        cityId: 'AREA|88cff55c-aaa4-e2e0', // 地区的id
        area: 'AREA|cef41633-b0d9-c3f2',// 地区
        subway: '',// 地铁
        rentType: '',// 整租
        price: null,// 价格
        more: '',// 复合查询
        roomType: '',// 房屋类型
        oriented: '',// 朝向
        characteristic: '',//标签
        floor: '',// 楼层
        start: 1,//开始项
        end: 20,// 结束项
      }
    };
  },
  methods: {
    //确定按钮
    onConfirm() {
      this.refresh();
      this.allOnCancel();
    },
    conRef(...params) {
      console.log('params',params)
      this.filterObj.characteristic = params[0].characteristic.value
      this.filterObj.floor = params[0].floor.value
      this.filterObj.oriented = params[0].oriented.value
      this.filterObj.roomType = params[0].roomType.value
      this.refresh();
      this.allOnCancel();
    },
    //区域下拉框改变
    handleArea(picker, value, index) {
      console.log(value, index)
      if(value[0] === '区域') {
        if(index === 2) {
          const area = value[value.length - 1]
          const val = value[value.length - 2]
          this.columnsArea[1].children.forEach(item => {
            if(item.label === val) {
              item.children.map(group => {
                if(group.label === area) {
                  this.filterObj.area = group.value
                  this.filterObj.subway = ""
                }
              })
            }
          })
        }
      }else if(value[0] === '地铁') {
        if(index === 2) {
          const subway = value[value.length - 1]
          const val = value[value.length - 2]
          this.columnsArea[2].children.forEach(item => {
            if(item.label === val) {
              item.children.map(group => {
                if(group.label === subway) {
                  this.filterObj.subway = group.value
                  this.filterObj.area = ""
                }
              })
            }
          })
        }
      }

    },
    //方式下拉框改变
    handleRent(picker, value, index) {
      this.filterObj.rentType = value.value
    },
    handlePrice(picker, value) {
      this.filterObj.price = value.value
    },
    refresh() {
      this.filterObj.cityId = this.$store.state.cityId
      this.$axios.get('houses', {
        params: this.filterObj
      }).then(res => {
        this.houseList = res.body.list
        console.log(res.body)
      })
    },
    //收起下拉框
    onCancel1() {
      this.$refs.dropdown1.toggle()
    },
    onCancel2() {
      this.$refs.dropdown2.toggle()
    },
    onCancel3() {
      this.$refs.dropdown3.toggle()
    },
    conCancel() {
      this.$refs.dropdown4.toggle()
    },
    allOnCancel() {
      this.$refs.dropdown1.toggle(false)
      this.$refs.dropdown2.toggle(false)
      this.$refs.dropdown3.toggle(false)
      this.$refs.dropdown4.toggle(false)
    }
  },
  activated() {
    Object.keys(this.filterObj).forEach(item => {
      if(item != 'start' && item != 'end') {
        this.filterObj[item] = ''
      }
    })
    this.refresh(); //请求展示数据列表
  },
  async created() {
    this.refresh(); //请求展示数据列表
    // 请求筛选信息
    const { body : res } = await this.$axios.get('houses/condition?id=AREA%7C88cff55c-aaa4-e2e0')
    console.log('res',res)
    this.columnsArea.push(res.area,res.subway)
    this.columnsRent = res.rentType
    this.columnsPrice = res.price

    this.conditionList.push({
      label: '房屋亮点',
      list: res.characteristic
    })
    this.conditionList.push({
      label: '楼层',
      list: res.floor
    })
    this.conditionList.push({
      label: '朝向',
      list: res.oriented
    })
    this.conditionList.push({
      label: '房屋结构',
      list: res.roomType
    })
  }
}
</script>

<style lang="less" scoped>
  .search{
    padding-bottom: 40px;
  }
  /deep/ .van-ellipsis{
    font-size: 14px !important;
  }
</style>