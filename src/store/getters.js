/**
 * Created by leibo on 18/1/4.
 */
export default {
  //初始化动画
  transtionActive(state) {
    return state.transtionActive
  },
  cateUsers: state => state.cateUsers,
  updateCateUserObj: state => state.updateCateUserObj,
  adminAttractionsTrafficSearchList: state => state.adminAttractionsTrafficSearchList,
  adminAttractionsTrafficList: state => state.adminAttractionsTrafficList,
  updateAdminAttractionsTrafficObj: state => state.updateAdminAttractionsTrafficObj,
  adminAffiliationInformationList: state => state.adminAffiliationInformationList,
}
