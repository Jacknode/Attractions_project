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
  }
}
