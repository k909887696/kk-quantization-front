/**
* 个股kdj数据 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询个股kdj数据列表分页
export function getStockDayKdjPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockDayKdj/getStockDayKdjPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除个股kdj数据
export function deleteStockDayKdjById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockDayKdj/deleteStockDayKdjById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入个股kdj数据
export function insertStockDayKdj(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockDayKdj/insertStockDayKdj',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新个股kdj数据
export function updateStockDayKdj(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockDayKdj/updateStockDayKdj',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取个股kdj数据详情
export function getStockDayKdjDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VStockDayKdj/getStockDayKdjDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
