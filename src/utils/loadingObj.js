import ElementUI from 'element-ui'

// loading参数配置
export const loadingConfig = {
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
}
var loading = null
const loadingShow = () => {
  loading = ElementUI.Loading.service(loadingConfig)
}

const loadingHide = () => {
  loading.close()
}

const loadingObj = {
  loadingShow,
  loadingHide
}

export default loadingObj
