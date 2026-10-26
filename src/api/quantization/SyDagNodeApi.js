/**
* DAG执行节点 api接口
*
* @author kk
* @since 2026-10-22
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询DAG执行节点列表分页
export function getSyDagNodePageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagNode/getSyDagNodePageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除DAG执行节点
export function deleteSyDagNodeById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagNode/deleteSyDagNodeById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入DAG执行节点
export function insertSyDagNode(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagNode/insertSyDagNode',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新DAG执行节点
export function updateSyDagNode(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagNode/updateSyDagNode',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取DAG执行节点详情
export function getSyDagNodeDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagNode/getSyDagNodeDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
