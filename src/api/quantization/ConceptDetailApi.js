/**
* 概念明细 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询概念明细列表分页
export function getConceptDetailPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptDetail/getConceptDetailPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除概念明细
export function deleteConceptDetailById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptDetail/deleteConceptDetailById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入概念明细
export function insertConceptDetail(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptDetail/insertConceptDetail',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新概念明细
export function updateConceptDetail(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptDetail/updateConceptDetail',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取概念明细详情
export function getConceptDetailDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptDetail/getConceptDetailDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
