import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    // redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/table/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/quantization',
    component: Layout,
    name: 'quantization',
    meta: { title: 'quantization', icon: 'el-icon-data-analysis' },
    children: [
      {
        path: 'basedata',
        name: 'quantization-base-data',
        component: () => import('@/layout/components/MultiLevelMenu'),
        meta: { title: '基础数据', icon: 'table' },
        children: [
          {
            path: 'tradecal',
            name: 'quantization-trade-cal',
            component: () => import('@/views/table/index'),
            meta: { title: '交易日历', icon: 'el-icon-date' }
          },
          {
            path: 'stockbasic',
            name: 'quantization-stock-basic',
            component: () => import('@/views/tree/index'),
            meta: { title: '股票列表', icon: 'table' }
          },
          {
            path: 'daily',
            name: 'quantization-daily',
            component: () => import('@/views/tree/index'),
            meta: { title: '个股日线行情', icon: 'el-icon-data-line' }
          },
          {
            path: 'concept',
            name: 'quantization-concept',
            component: () => import('@/views/tree/index'),
            meta: { title: '概念分类', icon: 'nested' }
          },
          {
            path: 'index',
            name: 'quantization-index',
            component: () => import('@/views/tree/index'),
            meta: { title: '行业分类', icon: 'el-icon-office-building' }
          },
          {
            path: 'moneyflow',
            name: 'quantization-money-flow',
            component: () => import('@/views/tree/index'),
            meta: { title: '资金流水', icon: 'el-icon-money' }
          }
        ]
      },
      {
        path: 'systemsetting',
        name: 'quantization-system-setting',
        component: () => import('@/layout/components/MultiLevelMenu'),
        meta: { title: '系统设置', icon: 'el-icon-setting' },
        children: [
          {
            path: 'InvokeType',
            name: 'quantization-system-setting-InvokeType',
            component: () => import('@/views/quantization/settings/InvokeType'),
            meta: { title: '调度类型', icon: 'el-icon-cloudy' }
          }, // CollectionPolicyList
          {
            path: 'CollectionPolicyList',
            name: 'quantization-system-setting-CollectionPolicyList',
            component: () => import('@/views/quantization/settings/CollectionPolicyList'),
            meta: { title: '调度策略', icon: 'el-icon-cloudy' }
          }
        ]
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    name: 'permission',
    meta: { title: '权限系统', icon: 'password' },
    children: [
      {
        path: 'usermanage',
        name: 'permission-user-manage',
        component: () => import('@/views/tree/index'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'authmanage',
        name: 'permission-auth-manage',
        component: () => import('@/views/tree/index'),
        meta: { title: '授权管理', icon: 'eye-open' }
      },
      {
        path: 'objectmanage',
        name: 'permission-object-manage',
        component: () => import('@/views/tree/index'),
        meta: { title: '权限定义', icon: 'example' }
      },
      {
        path: 'nodemanage',
        name: 'permission-node-manage',
        component: () => import('@/views/tree/index'),
        meta: { title: '组织架构', icon: 'tree' }
      },
      {
        path: 'systemsetting',
        name: 'permission-system-setting',
        component: () => import('@/views/tree/index'),
        meta: { title: '系统设置', icon: 'el-icon-setting' }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    name: 'report',
    meta: { title: '报表系统', icon: 'el-icon-pie-chart' },
    children: [
      {
        path: 'versionnumber',
        name: 'report-versionnumber',
        component: () => import('@/views/tree/index'),
        meta: { title: '版本号管理', icon: 'el-icon-monitor' }
      },
      {
        path: 'queuedatamanage',
        name: 'report-queuedata',
        component: () => import('@/views/tree/index'),
        meta: { title: '队列数据管理', icon: 'el-icon-s-data' }
      }
    ]
  },
  {
    path: '/infoservice',
    component: Layout,
    name: 'infoservice',
    meta: { title: '信息服务系统', icon: 'el-icon-message' },
    children: [
      {
        path: 'infotask',
        name: 'infoservice-infotask',
        component: () => import('@/views/tree/index'),
        meta: { title: '信息任务队列', icon: 'el-icon-cloudy' }
      },
      {
        path: 'infotaskemail',
        name: 'infoservice-infotaskemail',
        component: () => import('@/views/tree/index'),
        meta: { title: '邮件信息任务队列', icon: 'el-icon-chat-square' }
      },
      {
        path: 'infotasksms',
        name: 'infoservice-queuedata',
        component: () => import('@/views/tree/index'),
        meta: { title: '短信信息任务队列', icon: 'el-icon-mobile' }
      }
    ]
  },
  {
    path: '/charging',
    component: Layout,
    name: 'charging',
    alwaysShow: true,
    meta: { title: '计费系统', icon: 'el-icon-coin' },
    children: [
      {
        path: 'systask',
        name: 'charging-systask',
        component: () => import('@/views/tree/index'),
        meta: { title: '队列调度任务', icon: 'el-icon-cloudy' }
      }
    ]
  },
  {
    path: '/invoice',
    component: Layout,
    name: 'invoice',
    meta: { title: '发票系统', icon: 'el-icon-s-ticket' },
    children: [
      {
        path: 'splitorder',
        name: 'invoice-splitorder',
        component: () => import('@/views/tree/index'),
        meta: { title: '订单拆分调度队列', icon: 'el-icon-cloudy' }
      },
      {
        path: 'psorder',
        name: 'invoice-psorder',
        component: () => import('@/views/tree/index'),
        meta: { title: '配送单调度队列', icon: 'el-icon-cloudy' }
      },
      {
        path: 'imagepushdwh',
        name: 'invoice-imagepushdwh',
        component: () => import('@/views/tree/index'),
        meta: { title: '影像推送中间表队列', icon: 'el-icon-cloudy' }
      }
    ]
  },
  {
    path: '/platform',
    component: Layout,
    name: 'platform',
    alwaysShow: true,
    meta: { title: '平台后台', icon: 'el-icon-s-platform' },
    children: [
      {
        path: 'sysfiletask',
        name: 'platform-sysfiletask',
        component: () => import('@/views/tree/index'),
        meta: { title: '文件导出导入任务', icon: 'el-icon-cloudy' }
      }
    ]
  },
  {
    path: '/paycenter',
    component: Layout,
    name: 'paycenter',
    alwaysShow: true,
    meta: { title: '支付系统', icon: 'el-icon-wallet' },
    children: [
      {
        path: 'checkbill',
        name: 'paycenter-checkbill',
        component: () => import('@/views/tree/index'),
        meta: { title: '账单生成调度', icon: 'el-icon-cloudy' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
