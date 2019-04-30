import Vue from 'vue'
import Router from 'vue-router'
import Post from '@/components/page/Post'
import leftNav from '@/components/common/leftNav'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'post',
      component: Post
    }
  ]
})
