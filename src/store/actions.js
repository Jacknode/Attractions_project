/**
 * Created by leibo on 18/1/4.
 */
import axios from 'axios';
export default {
  //初始化景区商户信息
  initCateUsers({commit},data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/GetSceneryBussinessInfoList', {
        paramJson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.backCode)==200){
            commit('initCateUsers',data.tm_SceneryBussinessInfoList);
            relove(Number(data.total))
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //添加景区商户
  addCatelUserSubmit(store,data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:762/GateTicketService.asmx/AddSceneryBussinessInfo', {
        paramJson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if (Number(data.backCode) == 200) {
            relove(Number(data.total))
          } else {
            reject(data.backResult)
          }
        })
    })
  }
}
