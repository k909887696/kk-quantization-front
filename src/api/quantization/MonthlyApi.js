/**
* 个股月线行情 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询个股月线行情列表分页
export function getMonthlyPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMonthly/getMonthlyPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除个股月线行情
export function deleteMonthlyById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VMonthly/deleteMonthlyById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入个股月线行情
export function insertMonthly(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMonthly/insertMonthly',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新个股月线行情
export function updateMonthly(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMonthly/updateMonthly',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取个股月线行情详情
export function getMonthlyDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMonthly/getMonthlyDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
