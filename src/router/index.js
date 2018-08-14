import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import CreateArticle from '@/pages/CreateArticle'
import ModifyArticle from '@/pages/ModifyArticle'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/:pageRouter?/:articleUuid?',
      name: 'Index',
      component: Index
    },
    {
      path: '/create/wzj/93327',
      name: 'CreateArticle',
      component: CreateArticle
    },
    {
      path: '/modify/wzj/93327/:articleUuid',
      name: 'ModifyArticle',
      component: ModifyArticle
    },
  ]
})
