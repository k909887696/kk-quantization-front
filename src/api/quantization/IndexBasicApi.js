/**
* 指数基本信息 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询指数基本信息列表分页
export function getIndexBasicPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexBasic/getIndexBasicPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除指数基本信息
export function deleteIndexBasicById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexBasic/deleteIndexBasicById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入指数基本信息
export function insertIndexBasic(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexBasic/insertIndexBasic',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新指数基本信息
export function updateIndexBasic(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexBasic/updateIndexBasic',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取指数基本信息详情
export function getIndexBasicDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexBasic/getIndexBasicDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
