/**
* 交易日历 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询交易日历列表分页
export function getTradeCalPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VTradeCal/getTradeCalPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除交易日历
export function deleteTradeCalById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VTradeCal/deleteTradeCalById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入交易日历
export function insertTradeCal(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VTradeCal/insertTradeCal',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新交易日历
export function updateTradeCal(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VTradeCal/updateTradeCal',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取交易日历详情
export function getTradeCalDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VTradeCal/getTradeCalDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
