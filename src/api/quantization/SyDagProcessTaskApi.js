/**
* DAG执行实例任务 api接口
*
* @author kk
* @since 2026-10-23
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询DAG执行实例任务列表分页
export function getSyDagProcessTaskPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessTask/getSyDagProcessTaskPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除DAG执行实例任务
export function deleteSyDagProcessTaskById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessTask/deleteSyDagProcessTaskById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入DAG执行实例任务
export function insertSyDagProcessTask(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessTask/insertSyDagProcessTask',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新DAG执行实例任务
export function updateSyDagProcessTask(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessTask/updateSyDagProcessTask',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取DAG执行实例任务详情
export function getSyDagProcessTaskDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagProcessTask/getSyDagProcessTaskDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
