<template>
  <div class="map">
    <nav-bar :nav-info="{title: '查看城市'}"/>
    <div id="container"></div>
    <van-action-sheet
        v-model="show"
        title="房屋列表">
      <sheet-list :house="item" v-for="item in houseList.list" :key="item.houseCode"/>
    </van-action-sheet>
  </div>

</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import SheetList from "components/content/SheetContent";
export default {
  name: "Map",
  components: {NavBar,SheetList},
  data() {
    return {
      show: false,
      houseList: [],
      labelStyle: {
        color: '#000',
        fontSize: '15px',
        border: '2px solid #1E90FF',
        width: '60px',
        height: '60px',
        lineHeight: '48px',
        textAlign: 'center',
        borderRadius: '50%',
      }
    }
  },
  async mounted() {
    const res = await this.$axios.get('area/map?id=' + this.$route.query.cityId)

    let map = new BMapGL.Map("container"); // 创建地图实例,

    map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
    map.centerAndZoom(new BMapGL.Point(res.body[0].coord.longitude, res.body[0].coord.latitude), 11);

    res.body.forEach(item => {
      let {coord, count, value} = item
      const { label: areaName } = item
      let point = new BMapGL.Point(coord.longitude, coord.latitude); // 初始化地图，设置中心点坐标和地图级别
      let content = `<div style="position: relative;"><p>${areaName}</p> <span style="position: absolute;top: 20px;left: 18px;"> ${count}</span></div>`
      let label = new BMapGL.Label(content, { // 创建文本标注
        position: point, // 设置标注的地理位置
        offset: new BMapGL.Size(10, 20) // 设置标注的偏移量
      })

      label.setStyle(this.labelStyle)// 设置label的样式
      label.addEventListener('click',async () => {
        const res = await this.$axios.get('area/map?id=' + value)
        map.centerAndZoom(point, 13);
        map.clearOverlays() // 清除地图标注

        res.body.forEach(item => {
          let obj = this.renderInMap(item, map)
          obj.label.addEventListener('click',async () => {
            const res1 = await this.$axios.get('area/map?id=' + item.value)
            map.centerAndZoom(obj.point, 15);
            map.clearOverlays() // 清除地图标注

            res1.body.forEach(item => {
              let obj1 = this.renderInMap(item, map)
              obj1.label.addEventListener('click',async () => {
                const res2 = await this.$axios.get(`houses?cityId=${item.value}`)
                this.houseList = res2.body
                this.show = true
              })
            })
          })
        })
      })

      map.addOverlay(label); // 将标注添加到地图中
    })
  },
  methods: {
    renderInMap(item, map) {
      let {coord, count} = item
      const { label: areaName } = item
      let point = new BMapGL.Point(coord.longitude, coord.latitude); // 初始化地图，设置中心点坐标和地图级别
      let content = `<div style="position: relative;"><p>${areaName}</p> <span style="position: absolute;top: 20px;left: 18px;"> ${count}</span></div>`
      let label = new BMapGL.Label(content, { // 创建文本标注
        position: point, // 设置标注的地理位置
        offset: new BMapGL.Size(10, 20) // 设置标注的偏移量
      })
      label.setStyle(this.labelStyle)// 设置label的样式
      map.addOverlay(label); // 将标注添加到地图中
      return {
        label,
        point
      }
    },
  }
}
</script>

<style scoped>
  html{height:100%}
  body{height:100%;margin:0px;padding:0px}
  #container{height:100vh}
</style>