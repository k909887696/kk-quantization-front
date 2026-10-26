/**
*  api接口
*
* @author kk
* @since 2026-10-22
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询列表分页
export function getSyDagFlowPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagFlow/getSyDagFlowPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除
export function deleteSyDagFlowById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagFlow/deleteSyDagFlowById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入
export function insertSyDagFlow(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagFlow/insertSyDagFlow',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新
export function updateSyDagFlow(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagFlow/updateSyDagFlow',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取详情
export function getSyDagFlowDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagFlow/getSyDagFlowDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
