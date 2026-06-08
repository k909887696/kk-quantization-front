/**
* 个股异常波动信息 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询个股异常波动信息列表分页
export function getStockFluctuationPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockFluctuation/getStockFluctuationPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除个股异常波动信息
export function deleteStockFluctuationById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockFluctuation/deleteStockFluctuationById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入个股异常波动信息
export function insertStockFluctuation(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockFluctuation/insertStockFluctuation',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新个股异常波动信息
export function updateStockFluctuation(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockFluctuation/updateStockFluctuation',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取个股异常波动信息详情
export function getStockFluctuationDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockFluctuation/getStockFluctuationDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
