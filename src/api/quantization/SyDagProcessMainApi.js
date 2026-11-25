/**
* DAG执行实例主表 api接口
*
* @author kk
* @since 2026-10-23
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询DAG执行实例主表列表分页
export function getSyDagProcessMainPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessMain/getSyDagProcessMainPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除DAG执行实例主表
export function deleteSyDagProcessMainById(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessMain/deleteSyDagProcessMainById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入DAG执行实例主表
export function insertSyDagProcessMain(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessMain/insertSyDagProcessMain',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新DAG执行实例主表
export function updateSyDagProcessMain(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessMain/updateSyDagProcessMain',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取DAG执行实例主表详情
export function getSyDagProcessMainDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessMain/getSyDagProcessMainDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
// 重新执行DAG执行实例（状态置待执行并清空执行次数）
export function restartSyDagProcessMain(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessMain/restartSyDagProcessMain',
    method: 'post',
    data: params,
    isLoading
  })
}
// 批量重新执行DAG执行实例
export function batchRestartSyDagProcessMain(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessMain/batchRestartSyDagProcessMain',
    method: 'post',
    data: params,
    isLoading
  })
}
