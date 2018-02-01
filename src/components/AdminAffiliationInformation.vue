<template>
  <div>
    <section id="wrap" style="overflow: hidden">
      <h1 class="userClass">商户信息</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>商户名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input v-model="name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addAdminAffiliationInformation">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="adminAffiliationInformationList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商户编码:">
                <span>{{ props.row.tm_ti_TradeID }}</span>
              </el-form-item>
              <el-form-item label="商户简称:">
                <span>{{ props.row.tm_ti_Name }}</span>
              </el-form-item>
              <el-form-item label="商家身份证号码:">
                <span>{{ props.row.tm_ti_CertNo }}</span>
              </el-form-item>
              <el-form-item label="联系电话号码:">
                <span>{{ props.row.tm_ti_TelePhone }}</span>
              </el-form-item>
              <el-form-item label="固定电话:">
                <span>{{ props.row.tm_ti_FixPhone }}</span>
              </el-form-item>
              <el-form-item label="所属省市县:">
                <span>{{ props.row.tm_ti_Contries+props.row.tm_ti_Provice+"省"+props.row.tm_ti_City+"市"+props.row.tm_ti_Contry+"县"}}</span>
              </el-form-item>
              <el-form-item label="详细地址:">
                <span>{{ props.row.tm_ti_Address }}</span>
              </el-form-item>
              <el-form-item label="地址描述:">
                <el-popover
                  ref="popover1"
                  placement="top-start"
                  trigger="hover"
                  :content="props.row.tb_AddressDescribe">
                </el-popover>
                <el-button v-popover:popover1>移入查看</el-button>
              </el-form-item>
              <el-form-item label="经度:">
                <span>{{ props.row.tm_ti_Longitude + "°"  }}</span>
              </el-form-item>
              <el-form-item label="纬度:">
                <span>{{ props.row.tm_ti_Latitude + "°"  }}</span>
              </el-form-item>
              <el-form-item label="级别:">
                <span>{{ props.row.tm_ti_Level }}</span>
              </el-form-item>
              <el-form-item label="到期时间:">
                <span>{{ props.row.tm_ti_EndTime.replace('T',' ') }}</span>
              </el-form-item>
              <el-form-item label="营业执照编码:">
                <span>{{ props.row.tm_ti_LicenceCode }}</span>
              </el-form-item>
              <el-form-item label="商家展示图片:">
                <img :src="item" alt="" v-for="item in props.row.tm_ti_ShowImage"
                     style="width: 100px;height: 100px">
                <!--<span>{{ props.row.tm_ts_ShowImage }}</span>-->
              </el-form-item>
              <el-form-item label="商家门店图片:">
                <img :src="item" alt="" v-for="item in props.row.tm_ti_StoreImageURL"
                     style="width: 100px;height: 100px">
                <!--<span>{{ props.row.tm_ts_ShowImage }}</span>-->
              </el-form-item>
              <el-form-item label="商家开户银行:">
                <span>{{ props.row.tm_ti_Bank }}</span>
              </el-form-item>
              <el-form-item label="商家对公银行卡号:">
                <span>{{ props.row.tm_ti_CardNo }}</span>
              </el-form-item>
              <el-form-item label="商家创建时间:">
                <span>{{ props.row.tm_ti_CreateTime.replace('T',' ') }}</span>
              </el-form-item>
              <el-form-item label="审核状态:">
                <span>{{ props.row.tm_ti_Check | getCheck}}</span>
              </el-form-item>
              <el-form-item label="备注:">
                <el-popover
                  ref="popover1"
                  placement="top-start"
                  trigger="hover"
                  :content="props.row.tm_ti_Remark">
                </el-popover>
                <el-button v-popover:popover1>移入查看</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="商户编码"
          prop="tm_ti_TradeID">
        </el-table-column>
        <el-table-column
          label="商户全称"
          prop="tm_ti_FullName">
        </el-table-column>
        <el-table-column
          label="审核状态">
          <template slot-scope="scope">
            <span>{{ scope.row.tm_ti_Check | getCheck }}</span>
          </template>
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
    data(){
      return {
        name:'',
        isMap:false,
        ImageURL: [],
        total: 0,
        isLoading:false,
        addDialog: false,//添加弹窗
        updateDialog: false,//修改弹窗
        formLabelWidth: '120px',
        form:{
          x:'',
          y:''
        }
      }
    },
    computed: mapGetters([
      'adminAffiliationInformationList'
    ]),
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData('',num)
      },
      //地图提交
      mapSubmit(){
        this.isMap = false;
        this.AddOptions.data.tm_ts_Longitude = this.form.x;
        this.AddOptions.data.tm_ts_Latitude = this.form.y;
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
      initData(name,page){
        this.isLoading = true;
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_ti_TradeID": "",
          "tm_ti_Name": "",
          "tm_ti_Check": '',
          "page": page?page:1,
          "rows": 5,
          "tm_ti_IsDelete": 0
        };
        this.$store.dispatch('initAdminAffiliationInformation',options)
          .then((total)=>{
            this.isLoading =false;
            this.total = total;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search(){
        this.initData()
      },
      //添加
      addAdminAffiliationInformation(){

      }
    },
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
</style>
