import request from '@/utils/request4Meiya'
import config from '@/config'

export function getProjectList(params, isLoading) {
  return request({
    url: config.meiya_maintenanceplatform_api_url + '/ProjectManageNew/Schedule/getProjectList',
    method: 'post',
    data: params,
    headers: { 'source': config.meiya_platform_api_source, 'version': '1', 'Accept': '*/*' },
    isLoading
  })
}
