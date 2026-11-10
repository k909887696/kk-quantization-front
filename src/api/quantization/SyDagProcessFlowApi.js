/**
* DAG执行实例流程表 api接口
*
* @author kk
* @since 2026-10-28
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询DAG执行实例流程表列表分页
export function getSyDagProcessFlowPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessFlow/getSyDagProcessFlowPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除DAG执行实例流程表
export function deleteSyDagProcessFlowById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessFlow/deleteSyDagProcessFlowById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入DAG执行实例流程表
export function insertSyDagProcessFlow(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessFlow/insertSyDagProcessFlow',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新DAG执行实例流程表
export function updateSyDagProcessFlow(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessFlow/updateSyDagProcessFlow',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取DAG执行实例流程表详情
export function getSyDagProcessFlowDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessFlow/getSyDagProcessFlowDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
