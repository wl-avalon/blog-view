import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import CreateArticle from '@/pages/CreateArticle'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/create/wzj/93327',
      name: 'CreateArticle',
      component: CreateArticle
    }
  ]
})
