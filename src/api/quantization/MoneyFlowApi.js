/**
* 个股资金流向 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询个股资金流向列表分页
export function getMoneyFlowPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMoneyFlow/getMoneyFlowPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除个股资金流向
export function deleteMoneyFlowById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VMoneyFlow/deleteMoneyFlowById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入个股资金流向
export function insertMoneyFlow(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMoneyFlow/insertMoneyFlow',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新个股资金流向
export function updateMoneyFlow(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMoneyFlow/updateMoneyFlow',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取个股资金流向详情
export function getMoneyFlowDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMoneyFlow/getMoneyFlowDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
