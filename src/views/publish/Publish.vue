<template>
  <div class="publish">
    <van-nav-bar
        title="发布房源"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"/>
    <van-cell title="房源信息" style="color: rgba(25,137,250,1)"/>
    <van-form @submit="onSubmit">
      <!--小区名称-->
      <van-field
          v-model="communityName"
          name="communityName"
          label="小区名称"
          is-link
          readonly
          placeholder="请选择所在小区"
          @click="goSearchArea"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <!--租金-->
      <van-field
          v-model="communityObj.price"
          name="money"
          label="租金"
          placeholder="请输入租金/月"
          :clearable="true"
          :rules="[{ required: true, message: '请填写租金' }]"
      />
      <!--建筑面积-->
      <van-field
          v-model="communityObj.size"
          name="size"
          label="建筑面积"
          :clearable="true"
          placeholder="建筑面积"
          :rules="[{ required: true, message: '请填写建筑面积' }]"
      />
      <!--房屋标题-->
      <van-field
          v-model="communityObj.title"
          name="title"
          label="房屋标题"
          :clearable="true"
          placeholder="房屋标题"
          :rules="[{ required: true, message: '请填写房屋标题' }]"
      />
      <!--房屋描述-->
      <van-field
          v-model="communityObj.description"
          type="textarea"
          name="description"
          rwos="2"
          :clearable="true"
          maxlength="50"
          show-word-limit
          label="房屋描述"
          placeholder="房屋描述"
          :rules="[{ required: true, message: '请填写房屋描述' }]"
      />
      <!--户型选择-->
      <van-field
          readonly
          clickable
          name="roomType"
          :value="communityObj.roomType.name"
          label="户型"
          is-link
          placeholder="点击选择户型"
          @click="showPicker.house.showHouse = true"
      />
      <van-action-sheet v-model="showPicker.house.showHouse" :actions="showPicker.house.houseColumns" @select="houseConfirm" />

      <!--所在楼层-->
      <van-field
          readonly
          clickable
          name="floor"
          :value="communityObj.floor.name"
          label="所在楼层"
          is-link
          placeholder="点击选择楼层"
          @click="showPicker.floor.showFloor = true"/>
      <van-action-sheet v-model="showPicker.floor.showFloor" :actions="showPicker.floor.floorColumns" @select="floorConfirm" />

      <!--朝向-->
      <van-field
          readonly
          clickable
          name="oriented"
          :value="communityObj.oriented.name"
          label="朝向"
          is-link
          placeholder="点击选择朝向"
          @click="showPicker.orient.showOrient = true"/>
      <van-action-sheet v-model="showPicker.orient.showOrient" :actions="showPicker.orient.orientColumns" @select="orientConfirm" />

      <!--房屋配置-->
      <van-field name="switch" label="房屋配置">
        <template #input>
          <ul class="item-ul">
            <li
                v-for="(item) in housePackage"
                :key="item.id"
                @click="iconClick(item.name)"
                :class="checkedList.includes(item.name) ? 'active-icon' : ''">
              <i :class="item.icon"></i>
              <div>{{ item.name }}</div>
            </li>
          </ul>
        </template>
      </van-field>
      <!--文件上传-->
      <van-field name="file" label="上传图片">
        <template #input>
          <van-uploader v-model="fileList" multiple />
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
export default {
  name: "Publish",
  components: {NavBar},
  data() {
    return {
      communityName: '',
      communityObj: {
        title: "",
        description: "",
        houseImg: "",
        oriented: {},
        price: " ",
        roomType: {},
        size: "",
        floor: {},
        community: ""
      },
      housePackage: [
        {
          id: 1,
          name: '衣柜',
          icon: 'iconfont icon-wardrobe'
        },
        {
          id: 2,
          name: '洗衣机',
          icon: 'iconfont icon-wash'
        },
        {
          id: 3,
          name: '空调',
          icon: 'iconfont icon-air'
        },
        {
          id: 4,
          name: '天然气',
          icon: 'iconfont icon-gas'
        },
        {
          id: 5,
          name: "冰箱",
          icon: "iconfont icon-ref",
        },
        {
          id: 6,
          name: "暖气",
          icon: "iconfont icon-Heat",
        },
        {
          id: 7,
          name: "电视",
          icon: "iconfont icon-vid",
        },
        {
          id: 8,
          name: "热水器",
          icon: "iconfont icon-heater",
        },
        {
          id: 9,
          name: "宽带",
          icon: "iconfont icon-broadband",
        },
        {
          id: 10,
          name: "沙发",
          icon: "iconfont icon-sofa",
        }
      ],
      showPicker: {
        house: {
          houseColumns: [
            { name: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
            { name: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
            { name: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
            { name: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
            { name: '四室+',value: 'ROOM|2731c38c-5b19-ff7f' }
          ],
          showHouse: false,
        },
        floor: {
          floorColumns: [
            { name: '高楼层', value: 'FLOOR|1' },
            { name: '中楼层', value: 'FLOOR|2' },
            { name: '低楼层', value: 'FLOOR|3' }
          ],
          showFloor: false,
        },
        orient: {
          orientColumns: [
            { name: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
            { name: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
            { name: '南', value: 'ORIEN|61e99445-e95e-7f37' },
            { name: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
            { name: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
            { name: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
            { name: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
            { name: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
          ],
          showOrient: false,
        }
      },
      currentIndex: -1,
      checkedList: [],
      fileList: [],
    }
  },
  activated() {
    if(this.$route.params){
      this.communityName = this.$route.params.communityName
      this.communityObj.community = this.$route.params.community
    }
  },
  methods: {
    async onSubmit() {
      let form = new FormData();
      this.fileList.forEach(item => {
        console.log(item)
        form.append('file',item.file)
      })
      const { body : res } = await this.$axios({
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        url: 'houses/image',
        method: 'post',
        data: form
      })
      let houseImg = res.join('|')
      const result = await this.$axios({
        headers: {
          'Authorization': localStorage.token
        },
        url: 'user/houses',
        method: 'post',
        data: {
          title: this.communityObj.title,
          description: this.communityObj.description,
          houseImg: houseImg,
          oriented: this.communityObj.oriented.value,
          supporting: this.checkedList.join('|'),
          price: this.communityObj.price,
          roomType: this.communityObj.roomType.value,
          size: this.communityObj.size,
          floor: this.communityObj.floor.value,
          community: this.communityObj.community
        }
      })
      if (result.status !== 200) return this.$toast.fail(result.description)
      this.$toast.success(result.description)
      this.clearValue()
    },
    iconClick(name) {
      if (!this.checkedList.includes(name)) {
        this.checkedList.push(name)
      } else {
        this.checkedList.splice(this.checkedList.indexOf(name), 1)
      }
    },
    houseConfirm(value) {
      this.communityObj.roomType = value;
      this.showPicker.house.showHouse = false;
    },
    orientConfirm(value) {
      this.communityObj.oriented = value;
      this.showPicker.orient.showOrient = false;
    },
    floorConfirm(value) {
      this.communityObj.floor = value;
      this.showPicker.floor.showFloor = false;
    },
    clearValue() {
      this.communityObj.title=""
      this.communityObj.description=""
      this.communityObj.houseImg=""
      this.communityObj.oriented= {}
      this.communityObj.price=""
      this.communityObj.roomType= {}
      this.communityObj.size=""
      this.communityObj.community=""
      this.communityObj.floor= {}
      this.communityName= ""
      this.checkedList = []
      this.fileList = []
    },
    goSearchArea() {
      this.$router.push('/searchArea')
    },
    onClickLeft() {
      this.$router.push('/home')
    }
  },
  created() {
    // this.$axios.get()
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__content {


}
.item-ul{
  display: flex;
  flex-wrap: wrap;
  li{
    width: 25%;
    text-align: center;
    height: 50px;
  }
}
.active-icon{
  color: blue;
}
</style>