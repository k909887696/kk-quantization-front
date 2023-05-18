import Layout from '@/layout'
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
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
    meta: { title: 'quantization', icon: 'el-icon-data-analysis', menus: 'menu_quantization', check_permission: false },
    children: [
      {
        path: 'basedata',
        name: 'quantization_basedata',
        component: () => import('@/layout/components/MultiLevelMenu'),
        meta: { title: '基础数据', icon: 'table', menus: 'menu_quantization_basedata', check_permission: false },
        children: [
          {
            path: 'trade_cal_list',
            name: 'quantization_trade_cal_list',
            component: () => import('@/views/quantization/basedata/trade_cal_list'),
            meta: { title: '交易日历', icon: 'el-icon-date', menus: 'menu_quantization_trade_cal_list', check_permission: false }
          },
          {
            path: 'cn_m_list',
            name: 'quantization_basedata_cn_m_list',
            component: () => import('@/views/quantization/basedata/cn_m_list'),
            meta: { title: '人民币总量', icon: 'el-icon-date', menus: 'menu_quantization_basedata_cn_m_list', check_permission: false }
          },
          {
            path: 'stock_basic_list',
            name: 'quantization_stock_basic_list',
            component: () => import('@/views/quantization/basedata/stock_basic_list'),
            meta: { title: '个股基本信息	', icon: 'el-icon-date', menus: 'menu_quantization_stock_basic_list', check_permission: false }
          },
          {
            path: 'daily_list',
            name: 'quantization_basedata_daily_list',
            component: () => import('@/views/quantization/basedata/daily_list'),
            meta: { title: '个股日线行情', icon: 'el-icon-data-line', menus: 'menu_quantization_basedata_daily_list', check_permission: false }
          },
          {
            path: 'concept_list',
            name: 'quantization_concept_list',
            component: () => import('@/views/quantization/basedata/concept_list'),
            meta: { title: '概念分类	', icon: 'el-icon-date', menus: 'menu_quantization_concept_list', check_permission: false }
          },
          {
            path: 'concept_detail_list',
            name: 'quantization_concept_detail_list',
            component: () => import('@/views/quantization/basedata/concept_detail_list'),
            meta: { title: '概念明细', icon: 'el-icon-date', menus: 'menu_quantization_concept_detail_list', check_permission: false }
          },
          {
            path: 'concept_daily_list',
            name: 'quantization_concept_daily_list',
            component: () => import('@/views/quantization/basedata/concept_daily_list'),
            meta: { title: '概念日线行情	', icon: 'el-icon-date', menus: 'menu_quantization_concept_daily_list', check_permission: false }
          },
          {
            path: 'concept_money_flow_list',
            name: 'quantization_concept_money_flow_list',
            component: () => import('@/views/quantization/basedata/concept_money_flow_list'),
            meta: { title: '概念资金流向	', icon: 'el-icon-date', menus: 'menu_quantization_concept_money_flow_list', check_permission: false }
          },
          {
            path: 'index',
            name: 'QuantizationBaseDataIndex',
            component: () => import('@/views/tree/index'),
            meta: { title: '行业分类', icon: 'el-icon-office-building', menus: 'menu_QuantizationBaseDataIndex', check_permission: false }
          },
          {
            path: 'moneyflow',
            name: 'QuantizationBaseDataMoneyFlow',
            component: () => import('@/views/tree/index'),
            meta: { title: '资金流水', icon: 'el-icon-money', menus: 'menu_QuantizationBaseDataMoneyFlow', check_permission: false }
          }
        ]
      },
      {
        path: 'systemsetting',
        name: 'QuantizationSystemSetting',
        component: () => import('@/layout/components/MultiLevelMenu'),
        meta: { title: '系统设置', icon: 'el-icon-setting', menus: 'menu_QuantizationSystemSetting', check_permission: false },
        children: [
          {
            path: 'InvokeType',
            name: 'QuantizationSystemSettingInvokeType',
            component: () => import('@/views/quantization/settings/invoke_type_list'),
            meta: { title: '调度类型', icon: 'el-icon-cloudy', menus: 'menu_QuantizationSystemSettingInvokeType', check_permission: false }
          },
          {
            path: 'CollectionPolicyList',
            name: 'QuantizationSystemSettingCollectionPolicyList',
            component: () => import('@/views/quantization/settings/collection_policy_list'),
            meta: { title: '调度策略', icon: 'el-icon-cloudy', menus: 'menu_QuantizationSystemSettingCollectionPolicyList', check_permission: false }
          },
          {
            path: 'CollectionTaskList',
            name: 'QuantizationSystemSettingCollectionPolicyList',
            component: () => import('@/views/quantization/settings/collection_task_list'),
            meta: { title: '调度任务', icon: 'el-icon-cloudy', menus: 'menu_QuantizationSystemSettingCollectionTaskList', check_permission: false }
          },
          {
            path: 'CollectionTaskHistoryList',
            name: 'QuantizationSystemSettingCollectionPolicyList',
            component: () => import('@/views/quantization/settings/collection_task_history_list'),
            meta: { title: '调度任务历史', icon: 'el-icon-cloudy', menus: 'menu_QuantizationSystemSettingCollectionTaskHistoryList', check_permission: false }
          }
        ]
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    name: 'Permission',
    meta: { title: '权限系统', icon: 'password' },
    children: [
      {
        path: 'usermanage',
        name: 'PermissionUserManage',
        component: () => import('@/views/tree/index'),
        meta: { title: '用户管理', icon: 'user', menus: 'menu_PermissionUserManage', check_permission: false }
      },
      {
        path: 'authmanage',
        name: 'PermissionAuthManage',
        component: () => import('@/views/tree/index'),
        meta: { title: '授权管理', icon: 'eye-open', menus: 'menu_PermissionAuthManage', check_permission: false }
      },
      {
        path: 'objectmanage',
        name: 'PermissionObjectManage',
        component: () => import('@/views/tree/index'),
        meta: { title: '权限定义', icon: 'example', menus: 'menu_PermissionObjectManage', check_permission: false }
      },
      {
        path: 'nodemanage',
        name: 'PermissionNodeManage',
        component: () => import('@/views/tree/index'),
        meta: { title: '组织架构', icon: 'tree', menus: 'menu_PermissionNodeManage', check_permission: false }
      },
      {
        path: 'systemsetting',
        name: 'PermissionSystemSetting',
        component: () => import('@/views/tree/index'),
        meta: { title: '系统设置', icon: 'el-icon-setting', menus: 'menu_PermissionSystemSetting', check_permission: false }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    name: 'Report',
    meta: { title: '报表系统', icon: 'el-icon-pie-chart' },
    children: [
      {
        path: 'versionnumber',
        name: 'ReportVersionNumber',
        component: () => import('@/views/meiya/report/VersionNumberList'),
        meta: { title: '版本号管理', icon: 'el-icon-monitor', menus: 'menu_ReportVersionNumber', check_permission: false }
      },
      {
        path: 'queuedatamanage',
        name: 'ReportQueueData',
        component: () => import('@/views/tree/index'),
        meta: { title: '队列数据管理', icon: 'el-icon-s-data', menus: 'menu_ReportQueueData', check_permission: false }
      }
    ]
  },
  {
    path: '/infoservice',
    component: Layout,
    name: 'Infoservice',
    meta: { title: '信息服务系统', icon: 'el-icon-message' },
    children: [
      {
        path: 'infotask',
        name: 'InfoserviceInfoTask',
        component: () => import('@/views/tree/index'),
        meta: { title: '信息任务队列', icon: 'el-icon-cloudy', menus: 'menu_InfoserviceInfoTask', check_permission: false }
      },
      {
        path: 'infotaskemail',
        name: 'InfoserviceInfoTaskEmail',
        component: () => import('@/views/tree/index'),
        meta: { title: '邮件信息任务队列', icon: 'el-icon-chat-square', menus: 'menu_InfoserviceInfoTaskEmail', check_permission: false }
      },
      {
        path: 'infotasksms',
        name: 'InfoserviceInfoTaskSms',
        component: () => import('@/views/tree/index'),
        meta: { title: '短信信息任务队列', icon: 'el-icon-mobile', menus: 'menu_InfoserviceInfoTaskSms', check_permission: false }
      }
    ]
  },
  {
    path: '/charging',
    component: Layout,
    name: 'Charging',
    alwaysShow: true,
    meta: { title: '计费系统', icon: 'el-icon-coin' },
    children: [
      {
        path: 'systask',
        name: 'ChargingSystask',
        component: () => import('@/views/tree/index'),
        meta: { title: '队列调度任务', icon: 'el-icon-cloudy', menus: 'menu_ChargingSystask', check_permission: false }
      }
    ]
  },
  {
    path: '/invoice',
    component: Layout,
    name: 'Invoice',
    meta: { title: '发票系统', icon: 'el-icon-s-ticket' },
    children: [
      {
        path: 'splitorder',
        name: 'InvoiceSplitOrder',
        component: () => import('@/views/tree/index'),
        meta: { title: '订单拆分调度队列', icon: 'el-icon-cloudy', menus: 'menu_InvoiceSplitOrder', check_permission: false }
      },
      {
        path: 'psorder',
        name: 'InvoicePsOrder',
        component: () => import('@/views/tree/index'),
        meta: { title: '配送单调度队列', icon: 'el-icon-cloudy', menus: 'menu_InvoicePsOrder', check_permission: false }
      },
      {
        path: 'imagepushdwh',
        name: 'InvoiceImagePushDwh',
        component: () => import('@/views/tree/index'),
        meta: { title: '影像推送中间表队列', icon: 'el-icon-cloudy', menus: 'menu_InvoiceImagePushDwh', check_permission: false }
      }
    ]
  },
  {
    path: '/platform',
    component: Layout,
    name: 'Platform',
    alwaysShow: true,
    meta: { title: '平台后台', icon: 'el-icon-s-platform' },
    children: [
      {
        path: 'sysfiletask',
        name: 'PlatformSysFileTask',
        component: () => import('@/views/tree/index'),
        meta: { title: '文件导出导入任务', icon: 'el-icon-cloudy', menus: 'menu_PlatformSysFileTask', check_permission: false }
      }
    ]
  },
  {
    path: '/paycenter',
    component: Layout,
    name: 'Paycenter',
    alwaysShow: true,
    meta: { title: '支付系统', icon: 'el-icon-wallet' },
    children: [
      {
        path: 'checkbill',
        name: 'PaycenterCheckBill',
        component: () => import('@/views/tree/index'),
        meta: { title: '账单生成调度', icon: 'el-icon-cloudy', menus: 'menu_PaycenterCheckBill', check_permission: false }
      }
    ]
  },
  {
    path: '/gantt-elastic',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'gantt-elastic',
        component: () => import('@/views/meiya/project_manage/project_gantt'),
        meta: { title: '项目甘特表', icon: 'el-icon-date' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link', menus: 'dddddd', check_permission: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

function filterAsyncMenus(routes) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.meta) {
      if (tmp.meta.menus && tmp.meta.menus !== '') {
        // console.log('generateMenus-forEach:' + tmp.meta.menus)
        res.push(tmp.meta.menus)
      }
    }
    if (tmp.children) {
      const tmpmenus = filterAsyncMenus(tmp.children)
      if (tmpmenus && tmpmenus.length > 0) {
        tmpmenus.forEach(menu => {
          res.push(menu)
        })
      }
    }
  })
  return res
}

function generateMenus() {
  const res = filterAsyncMenus(constantRoutes)
  // console.log('generateMenus' + JSON.stringify(res))
  return res
}

const allmenus = generateMenus()

const rootrouters = {
  allmenus,
  constantRoutes
}

export default rootrouters
