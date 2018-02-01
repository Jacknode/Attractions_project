/**
 * Created by leibo on 18/1/4.
 */
//登录
import Login from '@/components/Login'
import Home from '@/components/Home'
//景点信息
import CateUsers from '@/components/CateUsers'
//景点交通
import AdminAttractionsTraffic from '@/components/AdminAttractionsTraffic'
//商户信息
import AdminAffiliationInformation from '@/components/AdminAffiliationInformation'
export default [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    components: {
      default: Home
    },
    children: [
      {
        path: 'adminAffiliationInformation',
        components: {
          default: Home,
          User: AdminAffiliationInformation
        },
        name: 'AdminAffiliationInformation'
      },
      {
        path: 'cateUsers',
        components: {
          default: Home,
          User: CateUsers
        },
        name: 'CateUsers'
      },
      {
        path: 'adminAttractionsTraffic',
        components: {
          default: Home,
          User: AdminAttractionsTraffic
        },
        name: 'AdminAttractionsTraffic'
      },
    ]
  },
  // {path: '*', redirect: {name: 'Login'}}
]
