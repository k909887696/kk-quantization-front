/**
* 个人自选股 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询个人自选股列表分页
export function getSecuritySelectionPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSecuritySelection/getSecuritySelectionPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除个人自选股
export function deleteSecuritySelectionById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VSecuritySelection/deleteSecuritySelectionById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入个人自选股
export function insertSecuritySelection(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSecuritySelection/insertSecuritySelection',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新个人自选股
export function updateSecuritySelection(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSecuritySelection/updateSecuritySelection',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取个人自选股详情
export function getSecuritySelectionDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSecuritySelection/getSecuritySelectionDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
