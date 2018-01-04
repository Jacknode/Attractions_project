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
  cateUsers:[],
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
  }
};

export default {
  getters,
  state,
  mutations
}
