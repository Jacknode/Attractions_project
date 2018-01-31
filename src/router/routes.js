/**
 * Created by leibo on 18/1/4.
 */
//登录
import Login from '@/components/Login'
import Home from '@/components/Home'
import CateUsers from '@/components/CateUsers'
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
        path: 'cateUsers',
        components: {
          default: Home,
          User: CateUsers
        },
        name: 'CateUsers'
      },
    ]
  },
  // {path: '*', redirect: {name: 'Login'}}
]
