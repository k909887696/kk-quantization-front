/**
* DAG执行实例历史任务 api接口
*
* @author kk
* @since 2026-10-23
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询DAG执行实例历史任务列表分页
export function getSyDagProcessTaskHisPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessTaskHis/getSyDagProcessTaskHisPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除DAG执行实例历史任务
export function deleteSyDagProcessTaskHisById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessTaskHis/deleteSyDagProcessTaskHisById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入DAG执行实例历史任务
export function insertSyDagProcessTaskHis(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessTaskHis/insertSyDagProcessTaskHis',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新DAG执行实例历史任务
export function updateSyDagProcessTaskHis(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessTaskHis/updateSyDagProcessTaskHis',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取DAG执行实例历史任务详情
export function getSyDagProcessTaskHisDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessTaskHis/getSyDagProcessTaskHisDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
