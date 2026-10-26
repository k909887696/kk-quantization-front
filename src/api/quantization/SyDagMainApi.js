/**
* DAG主表 api接口
*
* @author kk
* @since 2026-10-22
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询DAG主表列表分页
export function getSyDagMainPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagMain/getSyDagMainPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除DAG主表
export function deleteSyDagMainById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagMain/deleteSyDagMainById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入DAG主表
export function insertSyDagMain(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagMain/insertSyDagMain',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新DAG主表
export function updateSyDagMain(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagMain/updateSyDagMain',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取DAG主表详情
export function getSyDagMainDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VSyDagMain/getSyDagMainDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
