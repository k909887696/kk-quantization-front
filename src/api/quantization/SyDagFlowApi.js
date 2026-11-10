/**
* DAG执行流 api接口
*
* @author kk
* @since 2026-10-28
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询DAG执行流列表分页
export function getSyDagFlowPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagFlow/getSyDagFlowPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除DAG执行流
export function deleteSyDagFlowById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagFlow/deleteSyDagFlowById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入DAG执行流
export function insertSyDagFlow(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagFlow/insertSyDagFlow',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新DAG执行流
export function updateSyDagFlow(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagFlow/updateSyDagFlow',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取DAG执行流详情
export function getSyDagFlowDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagFlow/getSyDagFlowDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
