import Vue from 'vue'
import routes from './router'
// 使用normalize.css reset 默认样式
import 'normalize.css';

// components
import App from './pages/App'
import VueRouter from 'vue-router';
import components from './components';
import './assets/css/media.css';

Vue.use(VueRouter);
const router = new VueRouter(routes);

// 注册全局组件，子组件引用时无需重复注册
Object.keys(components).forEach(function(key){
  let value = components[key];
  console.log(key, value);
  Vue.component(key, value);
});

// (function (win,doc){
//   if (!win.addEventListener) return;
//   var html=document.documentElement;
//   function setFont()
//   {var cliWidth=html.clientWidth;
//       html.style.fontSize=100*(cliWidth/640)+'px';    
//   }   
//   win.addEventListener('resize',setFont,false)
//   doc.addEventListener('DOMContentLoaded',setFont,false)
// })(window,document);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})