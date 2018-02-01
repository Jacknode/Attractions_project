/**
 * Created by leibo on 18/1/4.
 */
import axios from 'axios';
export default {
  //初始化景点信息
  initCateUsers({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://hly.mp.1000da.com.cn/TourSite/GetTourSite', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          for (var i = 0; i < data.data.length; i++) {
            data.data[i].tm_ts_ShowImage = data.data[i].tm_ts_ShowImage.split(',')
          }
          commit('initCateUsers', data.data);
          relove(Number(data.totalrows))
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //添加景点
  addCatelUserSubmit(store, data){
    return new Promise(function (relove, reject) {
      axios.post('http://hly.mp.1000da.com.cn/TourSite/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove()
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //商户上传图片
  uploadImgs(store, data){
    return new Promise((relove, reject) => {
      // $.post('http://image.1000da.com.cn/ImageOperate.asmx/ImageDeal',data,data=>{
      //   console.log(data)
      // })
      axios.post('http://image.1000da.com.cn/PostImage/PostToService', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        relove(data.data)
      })
    })
  },
  //修改景点
  updateCatelUser({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://hly.mp.1000da.com.cn/TourSite/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove()
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //删除景点
  deleteCate(store, data){
    return new Promise(function (relove, reject) {
      axios.post('http://hly.mp.1000da.com.cn/TourSite/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove()
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //搜索景点
  GetAdminAttractionsTrafficSearch({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://hly.mp.1000da.com.cn/TourSite/GetTourSite', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          for (var i = 0; i < data.data.length; i++) {
            data.data[i].tm_ts_ShowImage = data.data[i].tm_ts_ShowImage.split(',')
          }
          commit('GetAdminAttractionsTrafficSearch', data.data);
          relove(data.data)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //初始化景点交通
  initAdminAttractionsTraffic({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://hly.mp.1000da.com.cn/Transport/GetTransPort', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          if (data.data) {
            commit('initAdminAttractionsTraffic', data.data);
            relove(data.resultcontent)
          } else {
            relove(data.resultcontent + ',但数据不存在')
          }
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //添加景点交通
  AddAdminAttractionsTraffic(store, data){
    return new Promise(function (relove, reject) {
      axios.post('http://hly.mp.1000da.com.cn/Transport/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //修改景点交通
  UpdateAdminAttractionsTraffic(store,data){
    return new Promise(function (relove, reject) {
      axios.post('http://hly.mp.1000da.com.cn/Transport/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //删除景点交通
  DeleteAdminAttractionsTraffic(store,data){
    return new Promise(function (relove, reject) {
      axios.post('http://hly.mp.1000da.com.cn/Transport/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //查询商户信息
  initAdminAffiliationInformation({commit},data){
    return new Promise(function (relove, reject) {
      axios.post('http://hly.mp.1000da.com.cn/TradeInfo/GetTradeInfoList', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            for (var i = 0; i < data.data.length; i++) {
              data.data[i].tm_ti_ShowImage = data.data[i].tm_ti_ShowImage.split(',')
              data.data[i].tm_ti_StoreImageURL = data.data[i].tm_ti_StoreImageURL.split(',')
            }
            commit('initAdminAffiliationInformation',data.data);
            relove(Number(data.totalrows));
          } else {
            reject(data.resultcontent)
          }
        })
    })
  }
}
