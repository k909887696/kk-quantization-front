/**
* 概念分类 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询概念分类列表分页
export function getConceptPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConcept/getConceptPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除概念分类
export function deleteConceptById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VConcept/deleteConceptById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入概念分类
export function insertConcept(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConcept/insertConcept',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新概念分类
export function updateConcept(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConcept/updateConcept',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取概念分类详情
export function getConceptDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConcept/getConceptDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
