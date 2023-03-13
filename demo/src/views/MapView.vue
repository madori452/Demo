<template>

  <!-- 地圖渲染 -->
  <div class="map" ref="map-root">
    <!-- showList -->
    <div class="side-bar">
      <ul class="showList">
      </ul>
    </div>

  </div>

  <!-- pop up -->
  <div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content"></div>
  </div>

</template>

<style>
.map {
  height: 100vh;
  width: 100%;
  position: relative;
}

/* sidebar0------- */
.side-bar{
  position: absolute;
  width: 200px;
  height: 100vh;
  background-color: #fff;
  right: 0;
  overflow-y: auto;
  z-index: 8;
}
.showList{
  padding-left: 0px;
  border-left: 1px solid #bfbfbf;
  top: 0px;
  position: absolute;
  width: 100%;
}

h5.name{
  font-size: 15px;
  font-weight: 900;
  color: #01bcd5;
}
p.road{
  font-size: 14px;
}
.showList li{
  border-bottom: 1px solid #bfbfbf;
}
 /* popup--------- */
 .ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  padding: 10px 0px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 32px;
  left: -60px;
  z-index: 33333;
  min-width: 230px;
}
.ol-popup h3{
  font-size: 14px;
  margin: 0px;
}
.ol-popup h4{
  font-size: 12px;
  font-weight: normal;
  margin: 0px;
  padding: 0 10px;
}
h4.address{
  font-size: 12px;
  color: #01bcd5;
  font-weight: 900;
}
h4.popup-name{
  font-size: 14px;
  font-weight: 900;
  padding: 10px 10px 0px 10px;
}
.ol-popup:after, .ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup p{
  font-size: 12px;
  color: #454545;
  margin-bottom: 0px;
}

.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
  color: #616161;
  padding: 0 5px;
  border-radius: 50%;
  background-color: #01bcd5;
  font-weight: normal;
}
</style>
<script>
import Map from 'ol/Map'
import View from 'ol/View'
import Point from 'ol/geom/Point.js'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import 'ol/ol.css'
import { Icon, Style } from 'ol/style.js'
import VectorSource from 'ol/source/Vector.js'
import Feature from 'ol/Feature.js'
import { Vector as VectorLayer } from 'ol/layer'
import Overlay from 'ol/Overlay.js'
import Station from '../assets/busStation.json'

export default {
  data () {
    return {
      Station,
      mapInit: '',
      stationLayer: [],
      // mapStaion:'',
      stopData: [],
      carData: [],
      allStaionXY: [],
      pointStation: [],
      openMap: null
    }
  },
  methods: {
    // 地圖初始化
    createMap () {
      // eslint-disable-next-line no-new
      this.mapInit = new Map({
        target: this.$refs['map-root'],
        layers: [
          new TileLayer({
            source: new XYZ({ url: 'https://download.localking.com.tw/CacheMap/{z}/{x}/{y}.PNG' })
          })
        ],
        view: new View({
          center: [120.26196633562192, 23.116173707269617],
          projection: 'EPSG:4326',
          zoom: 17,
          rotation: 5.199015133585546,
          tileSize: [256, 256]
        })
      })
    },
    // 站牌
    allStaion () {
      const url = ' https://wa-smart-busstop.azurewebsites.net/api/Infos/GetAllBusStop '
      this.$http.get(url)
        .then((res) => {
          this.stopData = res.data
          this.Render(this.stopData)
          // 臨時站牌
          const temporaryStion = this.stopData.filter(e => { return e.type === '臨時站牌' })
          temporaryStion.forEach((e) => {
            const staions = new Feature({
              geometry: new Point([e.lon, e.lat]),
              name: e.name
            })
            staions.setStyle(
              new Style({
                image: new Icon({
                  src: 'https://wa-smart-busstop.azurewebsites.net/Pages/images/img_m_marker_bus_dynamic.png'
                })
              })
            )
            const vectorSource = new VectorSource({
              features: [staions]
            })
            this.stationLayer = new VectorLayer({
              source: vectorSource
            })
            this.mapInit.addLayer(this.stationLayer)
            // 點選功能
            this.mapInit.on('click', ev => {
              const pixel = ev.pixel // 滑鼠點擊的位置
              const feature = this.mapInit.forEachFeatureAtPixel(pixel, (feature) => {
                return feature
              })
              if (feature) {
                const content = document.getElementById('popup-content')
                content.innerHTML = '<p>' + '站點名稱：' + staions.get('name') + '</p>'
              }
            })
          })
          // 固定站牌
          const staticStion = this.stopData.filter(e => { return e.type === '固定站牌' })
          staticStion.forEach((e) => {
            const staions = new Feature({
              geometry: new Point([e.lon, e.lat]),
              name: e.name
            })
            staions.setStyle(
              new Style({
                image: new Icon({
                  src: 'https://wa-smart-busstop.azurewebsites.net/Pages/images/img_m_marker_bus.png'
                })
              })
            )
            const vectorSource = new VectorSource({
              features: [staions]
            })
            this.stationLayer = new VectorLayer({
              source: vectorSource
            })
            this.mapInit.addLayer(this.stationLayer)
            // 點選功能
            this.mapInit.on('click', ev => {
              const pixel = ev.pixel // 滑鼠點擊的位置
              const feature = this.mapInit.forEachFeatureAtPixel(pixel, (feature) => {
                return feature
              })
              if (feature) {
                const content = document.getElementById('popup-content')
                content.innerHTML = '<p>' + '站點名稱：' + staions.get('name') + '</p>'
              }
            })
          })
        }).catch(err => {
          console.log(err)
        })
    },
    // 車輛
    allCar () {
      const url = 'https://wa-smart-busstop.azurewebsites.net/api/Infos/GetAllBus'

      this.$http.get(url)
        .then((res) => {
          this.carData = res.data
          this.carData.forEach(e => {
            if (e.speed === 0 && e.positionStatus === 'arrived') {
              const cars = new Feature({
                geometry: new Point([e.lon, e.lat])
              })
              cars.setStyle(
                new Style({
                  image: new Icon({
                    src: 'https://wa-smart-busstop.azurewebsites.net/Pages/images/img_m_marker_carCondition_selfDriving_idling.png'
                  })
                })
              )
              const vectorSource = new VectorSource({
                features: [cars]
              })
              const vectorLayer = new VectorLayer({
                source: vectorSource
              })
              this.mapInit.addLayer(vectorLayer)
            } else if (e.speed > 0 && e.positionStatus === 'arrived') {
              const cars = new Feature({
                geometry: new Point([e.lon, e.lat])
              })
              cars.setStyle(
                new Style({
                  image: new Icon({
                    src: 'https://wa-smart-busstop.azurewebsites.net/Pages/images/img_m_marker_carCondition_car_driving.png'
                  })
                })
              )
              const vectorSource = new VectorSource({
                features: [cars]
              })
              const vectorLayer = new VectorLayer({
                source: vectorSource
              })
              this.mapInit.addLayer(vectorLayer)
            }
          })
        }).catch(err => {
          console.log(err)
        })
    },

    // Popup
    addPopup () {
      // Popup DOM
      const container = document.getElementById('popup')
      const closer = document.getElementById('popup-closer')
      const content = document.getElementById('popup-content')

      // Overlay
      this.overlay = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      })
      // 將poup加入map中
      this.mapInit.addOverlay(this.overlay)
      const _that = this
      // 關閉視窗
      closer.onclick = function () {
        _that.overlay.setPosition(undefined)
        closer.blur()
        return false
      }
      this.mapInit.on('click', function (evt) {
        content.innerHTML = `
        <p>這邊沒有站點${[this.stopData]}</p>`
        _that.overlay.setPosition(evt.coordinate) // 把 overlay 显示到指定的 x,y坐标
      })
    },
    // Render
    Render (arr) {
      const showList = document.querySelector('.showList')
      let str = ''
      arr.forEach(i => {
        str +=
            `<li class="col-12">
              <div class="col-12">
                <h5 class="mt-3 mb-1 name">${i.name}</h5>
                <p class="road">${i.type}</p>
              </div>
            </li>`
      })
      showList.innerHTML = str
    }
  },

  mounted () {
    this.$http.get('https://wa-smart-busstop.azurewebsites.net/api/Infos/GetAllBusStop')
      .then((res) => {
        this.stopData = res.data
        this.allStaion()
      })
    this.createMap()
    this.allStaion()
    this.allCar()
    this.addPopup()
    setTimeout(this.allCar(), 1000)
  }
}
</script>

<style>
*{
    /* border: 1px solid #ddd; */
}
</style>
