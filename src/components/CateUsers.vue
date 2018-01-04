<template>
  <section id="wrap">
    <h1 class="userClass">商户信息</h1>
    <!--工具条-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true" :model="userSearch">
        <el-form-item>
          <span>商户名称筛选:</span>
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
            <el-form-item label="景区商户名称:">
              <span>{{ props.row.tbi_SceneryName }}</span>
            </el-form-item>
            <el-form-item label="联系电话号码:">
              <span>{{ props.row.tbi_Phone }}</span>
            </el-form-item>
            <el-form-item label="商家开户银行:">
              <span>{{ props.row.tbi_Bank }}</span>
            </el-form-item>
            <el-form-item label="商家对公银行卡号:">
              <span>{{ props.row.tbi_CardNo }}</span>
            </el-form-item>
            <el-form-item label="所属省市县:">
              <span>{{ props.row.tbi_Provice+"省"+props.row.tbi_Provice+"市"+props.row.tbi_Provice +"县"}}</span>
            </el-form-item>
            <el-form-item label="景区详细地址:">
              <span>{{ props.row.tbi_Address }}</span>
            </el-form-item>
            <el-form-item label="创建时间:">
              <span>{{ props.row.tbi_CreateTime | getNewDate }}</span>
            </el-form-item>
            <el-form-item label="景区简介:">
              <span>{{ props.row.tbi_Introduce }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="商户编码"
        prop="tbi_SceneryID">
      </el-table-column>
      <el-table-column
        label="商户名称"
        prop="tbi_SceneryName">
      </el-table-column>
      <el-table-column
        label="备注"
        prop="tbi_Remark">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.tbi_SceneryID)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.tbi_SceneryID)">删除
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

    <!--添加商户信息-->
    <el-dialog title="添加商户信息" :visible.sync="addCateUserDialog">
      <el-form :model="AddOptions">
        <el-form-item label="景区商户编码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddOptions.sceneryID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户密码" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddOptions.password" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="checkPassword" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="景区名称" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="AddOptions.sceneryName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话号码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddOptions.phone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCateUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="addCatelUserSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        isOff:true,
        formLabelWidth:'120px',
        total: 0,
        addCateUserDialog:false,//添加弹窗
        userSearch: {
          name: ''
        },
        listLoading: false,
        checkPassword:'',
        //添加参数
        AddOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "sceneryID": "",
          "password": "",
          "sceneryName": "",
          "phone": ""
        }
      }
    },
    computed: mapGetters([
      'cateUsers'
    ]),
    methods: {
      initData(name, page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "sceneryName": name ? name : '',
          "page": page ? page : '1',
          "rows": 5
        };
        this.listLoading = true;
        this.$store.dispatch('initCateUsers', options)
        .then((total => {
          this.listLoading = false;
          this.total = total;
        }),err=>{
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
        this.initData()
      },
      //添加
      addHotelUser(){
        this.addCateUserDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addCatelUserSubmit(){
        var arrValue = Object.entries(this.AddOptions);
        for(var i=0;i<arrValue.length;i++){
          if(!arrValue[i][1].trim()){
            this.$notify({
              message: '输入内容不能为空！',
              type: 'error'
            });
            this.addCateUserDialog = false;
            return;
          }
        }
        if(isNaN(this.AddOptions.phone.trim())){
          this.$notify({
            message: '电话号码或商户编码必须为数字!',
            type: 'error'
          });
          this.addCateUserDialog = false;
          return;
        }
        if(this.AddOptions.password.trim()!==this.checkPassword.trim()){
          this.$notify({
            message: '两次输入密码不一致!',
            type: 'error'
          });
          this.addCateUserDialog = false;
          return;
        }
        this.$store.dispatch('addCatelUserSubmit',this.AddOptions)
        .then(()=>{
          this.$notify({
            message: '添加成功',
            type: 'success'
          });
          this.initData('',1)
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.addCateUserDialog = false;
      }
    },
  }
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  #wrap {
    background: #fff;
  }

  .formSearch {
    padding: 20px 0 0 20px;
  }

  .userClass {
    padding: 20px 0 0 20px;
    font-size: 18px;
  }

</style>
