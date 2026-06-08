/**
* 概念资金流向 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询概念资金流向列表分页
export function getConceptMoneyFlowPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptMoneyFlow/getConceptMoneyFlowPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除概念资金流向
export function deleteConceptMoneyFlowById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptMoneyFlow/deleteConceptMoneyFlowById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入概念资金流向
export function insertConceptMoneyFlow(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptMoneyFlow/insertConceptMoneyFlow',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新概念资金流向
export function updateConceptMoneyFlow(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptMoneyFlow/updateConceptMoneyFlow',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取概念资金流向详情
export function getConceptMoneyFlowDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptMoneyFlow/getConceptMoneyFlowDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
