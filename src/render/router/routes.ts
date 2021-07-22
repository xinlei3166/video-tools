import { RouteRecordRaw } from 'vue-router'

const layout = () => import('@/components/layout/index.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {},
    component: layout,
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: '首页'
        },
        redirect: { name: 'video_convert' },
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/video_convert',
        name: 'video_convert',
        meta: {
          title: '视频转换'
        },
        component: () => import('@/views/video/index.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' }
  }
]

export default routes
