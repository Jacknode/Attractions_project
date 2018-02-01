<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">景点交通信息</h1>
      <!--查询-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>景点交通名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-autocomplete
              v-model="userName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入景点交通名称"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="addAdminAttractionsTraffic">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="adminAttractionsTrafficList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="主键编号"
          prop="tm_tm_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="景点名称">
          <template slot-scope="scope">
            <span>{{userName?userName:scope.row.tm_tm_TourSiteID}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="自驾线路"
        >
          <template slot-scope="props">
            <el-popover
              ref="popover1"
              placement="top-start"
              trigger="hover"
              :content="props.row.tm_tm_Drive">
            </el-popover>
            <el-button v-popover:popover1>移入查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="公交线路"
        >
          <template slot-scope="props">
            <el-popover
              ref="popover1"
              placement="top-start"
              trigger="hover"
              :content="props.row.tm_tm_Bus">
            </el-popover>
            <el-button v-popover:popover1>移入查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminAttractionsTraffic(scope.row.tm_tm_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAdminAttractionsTraffic(scope.row.tm_tm_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--添加景点交通-->
      <el-dialog title="添加景点交通" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="景点交通名称" :label-width="formLabelWidth">
            <el-autocomplete
              v-model="userName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入景点交通名称"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="自驾线路" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.tm_tm_Drive" auto-complete="off"  type="textarea"
                      :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="公交线路" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.tm_tm_Bus" auto-complete="off"  type="textarea"
                      :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCateUserDialog = false">取 消</el-button>
          <el-button type="primary" @click="addAdminAttractionsTrafficSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改景点交通-->
      <el-dialog title="修改景点交通" :visible.sync="updateDialog">
        <el-form :model="updateAdminAttractionsTrafficObj">
          <el-form-item label="景点交通名称" :label-width="formLabelWidth">
            <el-autocomplete
              v-model="userName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入景点交通名称"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="自驾线路" :label-width="formLabelWidth">
            <el-input v-model="updateAdminAttractionsTrafficObj.tm_tm_Drive" auto-complete="off"  type="textarea"
                      :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="公交线路" :label-width="formLabelWidth">
            <el-input v-model="updateAdminAttractionsTrafficObj.tm_tm_Bus" auto-complete="off"  type="textarea"
                      :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAdminAttractionsTrafficSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        formLabelWidth: '120px',
        restaurants: [],
        userName: '',
        searchID: '',
        isLoading: false,
        addDialog: false,
        updateDialog: false,
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "tm_tm_TourSiteID": "",
            "tm_tm_Drive": "",
            "tm_tm_Bus": ""
          }
        }
      }
    },
    computed: mapGetters([
      'adminAttractionsTrafficSearchList',//搜索景点信息
      'adminAttractionsTrafficList',//初始化景点交通信息
      'updateAdminAttractionsTrafficObj'
    ]),
    methods: {
      //选中商家
      handleSelect(item) {
        this.userName = item.value;
        this.searchID = item.id;
        this.addOptions.data.tm_tm_TourSiteID = item.id;
      },
      //加载完
      loadAll(page, name) {
        return new Promise((relove, reject) => {
          let GetAdminAttractionsTrafficList = {
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
          //旅行社商户查询
          this.$store.dispatch('GetAdminAttractionsTrafficSearch', GetAdminAttractionsTrafficList)
          .then(data => {
            relove(data)
          }, err => {
            this.$message({
              message: err,
              type: 'error'
            });
          })
        })
      },
      //选择
      querySearchAsync(queryString, cb) {
        this.loadAll(1, queryString).then(data => {
          data = data.map(item => {
            return {
              id: item.tm_ts_Code,
              value: item.tm_ts_Name
            }
          });
          this.restaurants = data;
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(this.restaurants);
          }, 10);
        })
      },
      initData(off){
        this.isLoading = true;
        this.$store.commit('clearAdminAttractionsTraffic')
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "siteName": this.searchID
        };
        if (!off) {
          this.$store.dispatch('initAdminAttractionsTraffic', options)
          .then((suc) => {
            this.isLoading = false;
            this.$notify({
              message: suc,
              type: 'success'
            });
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        } else {
          this.$store.dispatch('initAdminAttractionsTraffic', options)
          .then(() => {
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
        }
      },
      //查询
      search(){
        this.initData()
      }
      ,
      //添加
      addAdminAttractionsTraffic(){
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      }
      ,
      //添加提交
      addAdminAttractionsTrafficSubmit(){
        this.$store.dispatch('AddAdminAttractionsTraffic',this.addOptions)
          .then(() => {
            this.$notify({
              message: '添加成功!',
              type: 'success'
            });
            this.initData(1);
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },
      //修改
      updateAdminAttractionsTraffic(id){
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.$store.commit('initUpdateAdminAttractionsTrafficObj',id)
      },
      //修改提交
      updateAdminAttractionsTrafficSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdminAttractionsTrafficObj
        };
        this.$store.dispatch('UpdateAdminAttractionsTraffic',updateOptions)
        .then(() => {
          this.$notify({
            message: '修改成功!',
            type: 'success'
          });
          this.initData( 1);
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.updateDialog = false;
      },
      //删除
      deleteAdminAttractionsTraffic(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tmID": id
        };
        this.$store.dispatch('DeleteAdminAttractionsTraffic',deleteOptions)
        .then(() => {
          this.$notify({
            message: '删除成功!',
            type: 'success'
          });
          this.initData(1);
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
      }
    },
  }
</script>
<style scoped>

</style>
