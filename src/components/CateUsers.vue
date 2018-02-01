<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">景点信息</h1>
      <!--工具条-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true" :model="userSearch">
          <el-form-item>
            <span>景点名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input v-model="userSearch.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addHotelUser">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table
        :data="cateUsers"
        highlight-current-row
        v-loading="listLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="景点名称:">
                <span>{{ props.row.tm_ts_Name }}</span>
              </el-form-item>
              <el-form-item label="联系电话号码:">
                <span>{{ props.row.tm_ts_Phone }}</span>
              </el-form-item>
              <el-form-item label="所属省市县:">
                <span>{{ props.row.tm_ts_Provice+"省"+props.row.tm_ts_City+"市"}}</span>
              </el-form-item>
              <el-form-item label="详细地址:">
                <span>{{ props.row.tm_ts_Address }}</span>
              </el-form-item>
              <el-form-item label="介绍:">
                <el-popover
                  ref="popover1"
                  placement="top-start"
                  trigger="hover"
                  :content="props.row.tm_ts_Introduce">
                </el-popover>
                <el-button v-popover:popover1>移入查看</el-button>
              </el-form-item>
              <el-form-item label="详细介绍:">
                <el-popover
                  ref="popover1"
                  placement="top-start"
                  trigger="hover"
                  :content="props.row.tm_ts_Detailedintroduction">
                </el-popover>
                <el-button v-popover:popover1>移入查看</el-button>
              </el-form-item>
              <el-form-item label="经度:">
                <span>{{ props.row.tm_ts_Longitude + "°"  }}</span>
              </el-form-item>
              <el-form-item label="纬度:">
                <span>{{ props.row.tm_ts_Latitude + "°"  }}</span>
              </el-form-item>
              <el-form-item label="建议价格 (元) :">
                <span>{{ props.row.tm_ts_SuggestPrice }}</span>
              </el-form-item>
              <el-form-item label="开放时间止:">
                <span>{{ props.row.tm_ts_Opentimetermination }}</span>
              </el-form-item>
              <el-form-item label="建议游玩时间（以小时为单位）:">
                <span>{{ props.row.tm_ts_Time }}</span>
              </el-form-item>
              <el-form-item label="展示图片:">
                <img :src="item" alt="" v-for="item in props.row.tm_ts_ShowImage"
                     style="width: 100px;height: 100px">
                <!--<span>{{ props.row.tm_ts_ShowImage }}</span>-->
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{ props.row.tm_ts_CreateTime.replace('T',' ') }}</span>
              </el-form-item>
              <el-form-item label="备注:">
                <el-popover
                  ref="popover1"
                  placement="top-start"
                  trigger="hover"
                  :content="props.row.tm_ts_Remark">
                </el-popover>
                <el-button v-popover:popover1>移入查看</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="景点编码"
          prop="tm_ts_Code">
        </el-table-column>
        <el-table-column
          label="景点名称"
          prop="tm_ts_Name">
        </el-table-column>
        <el-table-column
          label="备注"
          prop="tm_ts_Remark">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateCateUser(scope.row.tm_ts_Code)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.tm_ts_Code)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="5" :total="total"
                       style="float:right;" v-show="total">
        </el-pagination>
      </el-col>

      <!--添加景点信息-->
      <el-dialog title="添加景点信息" :visible.sync="addCateUserDialog">
        <el-form :model="AddOptions">
          <el-form-item label="景点编码" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="AddOptions.data.tm_ts_Code" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="景点名称" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="AddOptions.data.tm_ts_Name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="国" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="AddOptions.data.tm_ts_Countrie" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="省" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="AddOptions.data.tm_ts_Provice" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="市" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="AddOptions.data.tm_ts_City" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="县" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="AddOptions.data.tm_ts_Contry" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="AddOptions.data.tm_ts_Address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="介绍" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="AddOptions.data.tm_ts_Introduce" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="详细介绍" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="AddOptions.data.tm_ts_Detailedintroduction" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="建议游玩时间(以小时为单位)" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="AddOptions.data.tm_ts_Time" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话号码" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="AddOptions.data.tm_ts_Phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="展示图片地址:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">展示图片上传
              <input type="file" name="" ref="upload" accept="image/*" multiple>
            </a>
            <p v-for="item in ImageURL" v-show="ImageURL.length">{{item?item:""}}</p>
          </el-form-item>
          <el-form-item label="开放时间从" :label-width="formLabelWidth">
            <!--<el-time-picker-->
              <!--v-model="AddOptions.data.tm_ts_Opentimefrom"-->
              <!--value-format="HH:mm"-->
              <!--:picker-options="{-->
      <!--selectableRange: '5:30:00 - 20:30:00'-->
    <!--}"-->
              <!--placeholder="开放时间从">-->
            <!--</el-time-picker>-->

            <el-time-select
              placeholder="起始时间"
              v-model="AddOptions.data.tm_ts_Opentimefrom"
              :picker-options="{
                start: '05:30',
                step: '00:15',
                end: '12:30'
              }">
            </el-time-select>
          </el-form-item>
          <el-form-item label="开放时间止" :label-width="formLabelWidth">
            <!--<el-time-picker-->
              <!--v-model="AddOptions.data.tm_ts_Opentimetermination"-->
              <!--value-format="HH:mm"-->
              <!--:picker-options="{-->
      <!--selectableRange: '5:30:00 - 20:30:00'-->
    <!--}"-->
              <!--placeholder="开放时间止">-->
            <!--</el-time-picker>-->
            <el-time-select
              placeholder="开放时间止"
              v-model="AddOptions.data.tm_ts_Opentimetermination"
              :picker-options="{
                start: '12:30',
                step: '00:15',
                end: '18:30'
              }">
            </el-time-select>
          </el-form-item>
          <el-form-item label="获取经纬度" :label-width="formLabelWidth" :required="isOff">
            <!--<el-input v-model="AddOptions.data.tm_ts_Longitude" auto-complete="off"></el-input>-->
            <el-button type="primary" @click="openMap">获取经纬度</el-button>
            <span style="padding-right: 20px">经度:{{form.x}}°</span><span>纬度:{{form.y}}°</span>
          </el-form-item>
          <!--<el-form-item label="经度" :label-width="formLabelWidth" :required="isOff">-->
          <!--<el-input v-model="AddOptions.data.tm_ts_Longitude" auto-complete="off"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="纬度" :label-width="formLabelWidth" :required="isOff">-->
          <!--<el-input v-model="AddOptions.data.tm_ts_Latitude" auto-complete="off"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="建议价格" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="AddOptions.data.tm_ts_SuggestPrice" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="AddOptions.data.tm_ts_Remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCateUserDialog = false">取 消</el-button>
          <el-button type="primary" @click="addCatelUserSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改景点信息-->
      <el-dialog title="修改景点信息" :visible.sync="updateCateUserDialog">
        <el-form :model="updateCateUserObj">
          <el-form-item label="景点编码" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateCateUserObj.tm_ts_Code" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="景点名称" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateCateUserObj.tm_ts_Name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="国" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateCateUserObj.tm_ts_Countrie" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="省" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateCateUserObj.tm_ts_Provice" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="市" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateCateUserObj.tm_ts_City" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="县" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateCateUserObj.tm_ts_Contry" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="介绍" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateCateUserObj.tm_ts_Introduce" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="详细介绍" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateCateUserObj.tm_ts_Detailedintroduction" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="建议游玩时间" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateCateUserObj.tm_ts_Time" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话号码" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateCateUserObj.tm_ts_Phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="展示图片地址:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">展示图片上传
              <input type="file" name="" ref="upload1" accept="image/*" multiple>
            </a>
            <p v-for="item in ImageURL" v-show="ImageURL.length">{{item?item:""}}</p>
          </el-form-item>
          <el-form-item label="开放时间从" :label-width="formLabelWidth">
            <el-time-select
              placeholder="起始时间"
              v-model="updateCateUserObj.tm_ts_Opentimefrom"
              :picker-options="{
                start: '05:30',
                step: '00:15',
                end: '12:30'
              }">
            </el-time-select>
          </el-form-item>
          <el-form-item label="开放时间止" :label-width="formLabelWidth">
            <el-time-select
              placeholder="开放时间止"
              v-model="updateCateUserObj.tm_ts_Opentimetermination"
              :picker-options="{
                start: '18:30',
                step: '00:15',
                end: '00:00'
              }">
            </el-time-select>
          </el-form-item>
          <el-form-item label="获取经纬度" :label-width="formLabelWidth" :required="isOff">
            <!--<el-input v-model="AddOptions.data.tm_ts_Longitude" auto-complete="off"></el-input>-->
            <el-button type="primary" @click="openMap">获取经纬度</el-button>
            <span style="padding-right: 20px">经度:{{updateCateUserObj.tm_ts_Longitude}}°</span><span>纬度:{{updateCateUserObj.tm_ts_Latitude}}°</span>
          </el-form-item>
          <!--<el-form-item label="经度" :label-width="formLabelWidth" :required="isOff">-->
          <!--<el-input v-model="AddOptions.data.tm_ts_Longitude" auto-complete="off"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="纬度" :label-width="formLabelWidth" :required="isOff">-->
          <!--<el-input v-model="AddOptions.data.tm_ts_Latitude" auto-complete="off"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="建议价格" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateCateUserObj.tm_ts_SuggestPrice" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateCateUserObj.tm_ts_Remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateCateUserDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateCatelUserSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </section>
    <div class="mapJW" v-show="isMap">
      <div id="allmap">
      </div>
      <el-form ref="form" :model="form"
               style="z-index: 9990;position: absolute;background: #fff;bottom: 30px;left: 0;padding: 10px 30px;">
        <el-form-item label="经度">
          <el-input v-model="form.x"></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="form.y"></el-input>
        </el-form-item>
        <el-button type="primary" @click="searchMap">查询</el-button>
        <el-button type="success" @click="mapSubmit">提交</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    components: {},
    data(){
      return {
        form: {
          x: '',
          y: ''
        },
        isMap: false,
        isOff: true,
        formLabelWidth: '120px',
        ImageURL: [],
        total: 0,
        addCateUserDialog: false,//添加弹窗
        updateCateUserDialog: false,//修改弹窗
        userSearch: {
          name: ''
        },
        listLoading: false,
        checkPassword: '',
        //添加参数
        AddOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          data: {
            "tm_ts_Code": "",
            "tm_ts_Name": "",
            "tm_ts_ThemeTypeID": '',
            "tm_ts_Countrie": "",
            "tm_ts_Provice": "",
            "tm_ts_City": "",
            "tm_ts_Contry": "",
            "tm_ts_ShowImage": "",
            "tm_ts_Introduce": "",
            "tm_ts_Detailedintroduction": "",
            "tm_ts_Address": "",
            "tm_ts_Opentimefrom": "",
            "tm_ts_Opentimetermination": "",
            "tm_ts_Time": "",
            "tm_ts_Phone": "",
            "tm_ts_Longitude": "",
            "tm_ts_Latitude": "",
            "tm_ts_SuggestPrice": "",
            "tm_ts_Remark": ""
          }
        }
      }
    },
    created(){
//      window.location.reload();
    },
    computed: mapGetters([
      'cateUsers',
      'updateCateUserObj'
    ]),
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
      }, {enableHighAccuracy: true})
    },
    methods: {
      //提交
      mapSubmit(){
        this.isMap = false;
        this.AddOptions.data.tm_ts_Longitude = this.form.x;
        this.updateCateUserObj.tm_ts_Longitude = this.form.x;
        this.updateCateUserObj.tm_ts_Latitude = this.form.y;
        this.AddOptions.data.tm_ts_Latitude = this.form.y;
      },
      initData(name, page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tsCode": "",
          "tsName": name ? name : '',
          "isDelete": 0,
          "page": page ? page : '',
          "rows": 5
        };
        this.listLoading = true;
        this.$store.dispatch('initCateUsers', options)
        .then((total => {
          this.listLoading = false;
          this.total = total;
        }), err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      //分页
      handleCurrentChange(num){
        this.initData('', num)
      },
      //查询
      search(){
        this.initData(this.userSearch.name, 1)
      },
      //查询地图
      searchMap(){
        var map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(116.331398, 39.897445), 11);
        map.enableScrollWheelZoom(true);
        map.clearOverlays();
        var new_point = new BMap.Point(this.form.x, this.form.y);
        var marker = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.panTo(new_point);
      },
      openMap(){
        this.isMap = true
      },
      //添加
      addHotelUser(){
        this.addCateUserDialog = true;
        this.$store.commit('setTranstionFalse');
        this.uploaNode()
      },
      //图片转二进制
      uploadImg(file){
        return new Promise(function (relove, reject) {
          lrz(file)
          .then(data => {
            relove(data.base64.split(',')[1])
          })
        })
      },
      uploaNode(){
        setTimeout(() => {
          if(this.$refs.upload){
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                this.uploadImg(this.$refs.upload.files[i]).then(data => {
                  this.$store.dispatch('uploadImgs', {
                    imageData: data
                  })
                  .then(data => {
                    if (data) {
                      this.ImageURL.push(data.data);
                    } else {
                      this.$notify({
                        message: '图片地址不存在!',
                        type: 'error'
                      });
                    }
                  })
                })
              }
            })
          }
          if(this.$refs.upload1){
            this.$refs.upload1.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload1.files.length; i++) {
                this.uploadImg(this.$refs.upload1.files[i]).then(data => {
                  this.$store.dispatch('uploadImgs', {
                    imageData: data
                  })
                  .then(data => {
                    if (data) {
                      this.ImageURL.push(data.data);
                    } else {
                      this.$notify({
                        message: '图片地址不存在!',
                        type: 'error'
                      });
                    }
                  })
                })
              }
            })
          }
        }, 30)
      },
      //添加提交
      addCatelUserSubmit(){
        console.log(this.AddOptions.data)
        this.AddOptions.data.tm_ts_ShowImage = this.ImageURL.join(',')
//        var arrValue = Object.entries(this.AddOptions);
//        for (var i = 0; i < arrValue.length; i++) {
//          if (!arrValue[i][1].trim()) {
//            this.$notify({
//              message: '输入内容不能为空！',
//              type: 'error'
//            });
//            this.addCateUserDialog = false;
//            return;
//          }
//        }
        this.$store.dispatch('addCatelUserSubmit', this.AddOptions)
        .then(() => {
          this.$notify({
            message: '添加成功',
            type: 'success'
          });
          this.initData('', 1)
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.addCateUserDialog = false;
      },
      //修改
      updateCateUser(id){
        this.updateCateUserDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initupdateCateUserObj', id)
        this.uploaNode()
      },
      //修改提交
      updateCatelUserSubmit(){
        this.updateCateUserObj.tm_ts_ShowImage = this.ImageURL.join(',');
        console.log(this.updateCateUserObj)
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateCateUserObj
        };
        this.$store.dispatch('updateCatelUser',updateOptions)
        .then((total)=>{
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          });
          this.initData('',1)
        },err=>{
          this.$message({
            message: err,
            type: 'error'
          });
        });
        this.updateCateUserDialog = false;
      },
      //删除
      handleDelete(code){
        let deteleOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tsCode": code
        };
        this.$store.dispatch('deleteCate',deteleOptions)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
            this.initData('',1)
          },err=>{
            this.$message({
              message: err,
              type: 'error'
            });
          })
      }
    }
  }
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }





  #l-map {
    height: 500px;
    width: 100%;
  }

  #r-result {
    width: 100%;
  }



</style>
