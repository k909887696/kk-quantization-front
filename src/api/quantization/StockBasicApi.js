/**
* 个股基本信息 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询个股基本信息列表分页
export function getStockBasicPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockBasic/getStockBasicPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除个股基本信息
export function deleteStockBasicById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockBasic/deleteStockBasicById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入个股基本信息
export function insertStockBasic(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockBasic/insertStockBasic',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新个股基本信息
export function updateStockBasic(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockBasic/updateStockBasic',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取个股基本信息详情
export function getStockBasicDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockBasic/getStockBasicDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
