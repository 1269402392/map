<template>
  <div class="search-box">
    <div class="top">
      <search-bar/>
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
    </div>

    <Scroll ref="scroll" class="scroll-search"
            @pullingDown="searchPullDown"
            @pullingUp="searchPullUp"
            @enterThreshold="enterShould"
            @leaveThreshold="leaveShould">
      <div class="list">
        <div class="pulldown-wrapper">
          <div v-html="tipText"></div>
        </div>
        <div v-if="houseList.length !== 0" class="house-list">
          <sheet-content :house="item" v-for="item in houseList"/>
        </div>
        <van-empty v-if="houseList.length === 0" description="空空如也" />
      </div>
    </Scroll>

    <tab-bar/>
  </div>
</template>

<script>
import SheetContent from "../../components/content/SheetContent";
import Condition from "./searchChildren/Condition";
import SearchBar from "../../components/content/SearchBar";
export default {
  name: "SearchHouse",
  components: {SearchBar, Condition, SheetContent},
  data() {
    return {
      isLoading: false,//下拉加载更多
      loading: false, // 上拉加载
      finished: false,// (上拉)是否还有更多数据
      timer: null,
      pageNum: 1,
      pageSize: 10,
      tipText: '',
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
        end: 5,// 结束项
      }
    };
  },
  methods: {
    //添加下拉提示 - scroll
    enterShould(txt) {
      this.tipText = txt
    },
    //添加松手提示 - scroll
    leaveShould(txt) {
      this.tipText = txt
    },
    searchPullDown() {
      this.tipText = '努力加载中...'
      setTimeout(async () => {
        await this.refreshBtn();
        this.tipText = '成功!'
        this.$refs.scroll.finishPullDown()
        this.$refs.scroll.refresh();
      }, 1500)

    },
    searchPullUp() {
      this.refresh();
      this.$refs.scroll.finishPullUp()
    },
    //确定按钮
    onConfirm() {
      this.refreshBtn();
      this.allOnCancel();
    },
    //子组件传过来筛选的条件
    conRef(...params) {
      this.filterObj.characteristic = params[0].characteristic.value
      this.filterObj.floor = params[0].floor.value
      this.filterObj.oriented = params[0].oriented.value
      this.filterObj.roomType = params[0].roomType.value
      this.refresh();
      this.allOnCancel();
    },
    //区域下拉框改变
    handleArea(picker, value, index) {
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
    //价格下拉框改变
    handlePrice(picker, value) {
      this.filterObj.price = value.value
    },
    //下拉刷新
    refresh() {
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$toast.loading('玩命加载中');
        this.pageNum++;
        this.filterObj.start = (this.pageNum - 1) * this.pageSize + 1
        this.filterObj.end = (this.pageNum - 1) * this.pageSize + this.pageSize
        this.filterObj.cityId = this.$store.state.cityId

        this.$axios.get('houses', {
          params: this.filterObj
        }).then(res => {
          this.houseList.push(...res.body.list)
          console.log(res.body)
          if (this.houseList.length >= res.body.count) {
            this.finished = true;
          }
          this.$toast.clear();
        })
      }, 100)
    },
    //筛选条件确定按钮刷新
    async refreshBtn() {
      this.pageNum = 1;
      this.filterObj.start = (this.pageNum - 1) * this.pageSize + 1
      this.filterObj.end = (this.pageNum - 1) * this.pageSize + this.pageSize
      this.filterObj.cityId = this.$store.state.cityId
      const {body : res } = await this.$axios.get('houses', {
        params: this.filterObj
      })
      this.houseList = res.list
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
    this.$bus.on('imgLoadOver',() => {
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$refs.scroll.refresh();
        console.log('search-scroll-refresh执行了')
      }, 400)
    })
    //统一清空所有对象的值
    Object.keys(this.filterObj).forEach(item => {
      if(item != 'start' && item != 'end') {
        this.filterObj[item] = ''
      }
    })
    this.refreshBtn(); //请求展示数据列表
  },
  async created() {
    this.refresh(); //请求展示数据列表
    // 请求筛选信息
    const { body : res } = await this.$axios.get('houses/condition?id=AREA%7C88cff55c-aaa4-e2e0')
    this.columnsArea.push(res.area,res.subway)
    this.columnsRent = res.rentType
    this.columnsPrice = res.price

    this.conditionList.push({
      label: '房屋亮点',
      list: res.characteristic
    },{
      label: '楼层',
      list: res.floor
    },{
      label: '朝向',
      list: res.oriented
    },{
      label: '房屋结构',
      list: res.roomType
    })
  }
}
</script>

<style lang="less" scoped>
  .pulldown-wrapper{
    position: absolute;
    width :100%;
    padding :20px;
    font-size: 15px;
    box-sizing:border-box;
    transform :translateY(-100%) translateZ(0);
    text-align :center;
    color: black;
  }
  .scroll-search{
    height: calc(100vh - 152px);
  }
  .search-box {
    position: unset;
    background-color: white;
    padding-bottom: 50px;
    .top{
      .search{
        position: unset;
      }
      .house-list {
        padding: 0px 10px;
      }
    }

    /deep/ .van-icon {
      color: black;
    }

    /deep/ .van-ellipsis {
      font-size: 14px !important;
    }

    /deep/ .van-dropdown-menu__bar {
      box-shadow: none;
    }
  }
</style>