<template>
  <div id="wrap" class="animated rotateInUpLeft">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
             class="demo-ruleForm login-container" :class="move" v-show="move.length">
      <h3 class="title">景点管理系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        move: [],
        logining: false,
        ruleForm2: {
          account: '18583013813',
          checkPass: '123'
        },
        rules2: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
        checked: true
      };
    },
    methods: {
      newMove(){
        this.move = ['animated', 'jackInTheBox']
      },
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        this.$router.push({name: 'CateUsers'});
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = {
              "loginUserID": "huileyou",
              "loginUserPass": "123",
              "operateUserID": "",
              "operateUserName": "",
              "pcName": "",
              "userID": this.ruleForm2.account,
              "password": this.ruleForm2.checkPass
            };
            this.$http.post('http://hly.mp.1000da.com.cn/TradeInfo/GetValidateByPassword', JSON.stringify(loginParams), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
              .then(data => {
                this.logining = false;
                var data = data.data;
                if (Number(data.resultcode) == 200) {
                  sessionStorage.setItem('admin', JSON.stringify(data.data));
                  this.$router.push({name: 'CateUsers'});
                  window.location.reload()
                } else {
                  this.$message({
                    message: data.resultcontent,
                    type: 'error'
                  });
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted(){
      document.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
          this.handleSubmit2()
        }
      });
      setTimeout(() => {
        this.newMove()
      }, 700)
    }
  }

</script>

<style lang="scss" scoped>
  #wrap {
    width: 100%;
    height: 100%;
    background: url("../assets/img/bg.jpeg") no-repeat;
    background-size: cover;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
  }

  .login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -173px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

  .title {
    font-size: 16px;
    font-weight: bold;
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }

  }
</style>
