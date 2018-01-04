<template>
  <div>
    <div id="allmap" style="width: 100%;height: 500px"></div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="经度">
        <el-input v-model="form.x"></el-input>
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="form.y"></el-input>
      </el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    data:function(){
      return{
        form:{
          x: '',
          y:''
        }
      }
    },
    mounted(){
      var _this = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        _this.form.x = r.point.lng;
        _this.form.y = r.point.lat;
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var map = new BMap.Map("allmap");
          // var point = new BMap.Point(116.400244, 39.92556);
          map.centerAndZoom(r.point, 12); //定义地图等级，就是放大倍数
          map.enableScrollWheelZoom(true); //启用地图滚轮放大缩小
          var marker = new BMap.Marker(r.point);// 创建标注

          map.addOverlay(marker);  // 将标注添加到地图中
          map.panTo(r.point);
          // alert('您的位置：' + r.point.lng + ',' + r.point.lat);

          marker.enableDragging(); //标注可拖拽
          //marker.disableDragging();           // 不可拖拽

          // 开启事件监听
          marker.addEventListener("dragend", function (e) {

            var x = e.point.lng; //经度
            var y = e.point.lat; //纬度
//            alert("拖到的地点的经纬度：" + x + "，" + y);
            _this.form.x = x;
            _this.form.y = y;
          });
        }
        else {
          alert('failed' + this.getStatus());
        }
      }, { enableHighAccuracy: true })
    },
    methods:{
//      105.44397029
      search(){
        var map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(116.331398,39.897445),11);
        map.enableScrollWheelZoom(true);
        map.clearOverlays();
        var new_point = new BMap.Point(this.form.x,this.form.y);
        var marker = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.panTo(new_point);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body, html, #allmap {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: "微软雅黑";
  }

  #l-map {
    height: 500px;
    width: 100%;
  }

  #r-result {
    width: 100%;
  }
</style>
