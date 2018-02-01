/**
 * Created by leibo on 18/1/4.
 */
import getters from './getters'

const state = {
//初始化动画
  transtionActive: {
    isActive: false,
    isRotateInDownRight: false
  },
  cateUsers:[],//初始化景点信息
  updateCateUserObj:{},//修改景点信息obj
  adminAttractionsTrafficSearchList:[],//搜索景点信息
  adminAttractionsTrafficList:[],//初始化景点交通
  updateAdminAttractionsTrafficObj:{},//修改景点交通obj
  adminAffiliationInformationList:[],//商户信息
};

const mutations = {
  //初始化动画
  setTranstionFalse(state){
    state.transtionActive = {
      isActive: false,
      isRotateInDownRight: false
    }
  },
  oPTranstionFalse(){
    state.transtionActive = {
      isActive: !state.transtionActive.isActive,
      isRotateInDownRight: !state.transtionActive.isRotateInDownRight
    }
  },
  //初始化景区商户
  initCateUsers(state,data){
    state.cateUsers = data;
  },
  //修改景区商户obj
  initupdateCateUserObj(state,id){
    state.updateCateUserObj = state.cateUsers.filter(item=>{
      if(item.tm_ts_Code==id){
        return true
      }
      return false
    })[0]
  },
  GetAdminAttractionsTrafficSearch(state,data){
    state.adminAttractionsTrafficSearchList = data;
  },
  initAdminAttractionsTraffic(state,obj){
    state.adminAttractionsTrafficList.push(obj);
  },
  clearAdminAttractionsTraffic(state){
    state.adminAttractionsTrafficList = [];
  },
  initUpdateAdminAttractionsTrafficObj(state,id){
    state.updateAdminAttractionsTrafficObj = state.adminAttractionsTrafficList.filter(item=>{
      if(item.tm_tm_ID==id){
        return true;
      }
      return false;
    })[0]
  },
  initAdminAffiliationInformation(state,data){
    state.adminAffiliationInformationList = data;
  }
};

export default {
  getters,
  state,
  mutations
}
