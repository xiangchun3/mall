export default {
  mode: 'history',
  routes: [
    // 首页
    {
      name: 'homepage',
      path: '/',
      component: () => import(/* webpackChunkName: "index" */'../pages/Index')
    },
    // 分类
    {
      name: 'cateList',
      path: '/cateList',
      component: () => import(/* webpackChunkName: "cateList" */'../pages/CateList')
    },
    // 识物
    {
      name: 'topic',
      path: '/topic',
      component: () => import(/* webpackChunkName: "topic" */'../pages/Topic')
    },
    // 购物车
    {
      name: 'cart',
      path: '/cart',
      component: () => import(/* webpackChunkName: "cart" */'../pages/Cart')
    },
    // 个人
    {
      name: 'user',
      path: '/user',
      component: () => import(/* webpackChunkName: "user" */'../pages/User')
    }
  ]
}
