/**
* 个股周线行情 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询个股周线行情列表分页
export function getWeeklyPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VWeekly/getWeeklyPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除个股周线行情
export function deleteWeeklyById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VWeekly/deleteWeeklyById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入个股周线行情
export function insertWeekly(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VWeekly/insertWeekly',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新个股周线行情
export function updateWeekly(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VWeekly/updateWeekly',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取个股周线行情详情
export function getWeeklyDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VWeekly/getWeeklyDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
