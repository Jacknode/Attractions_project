/**
 * Created by leibo on 18/1/4.
 */
//登录
import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'
export default [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld
  },
]
