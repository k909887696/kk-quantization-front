/**
* 市场基本信息 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询市场基本信息列表分页
export function getMarketBasicPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMarketBasic/getMarketBasicPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除市场基本信息
export function deleteMarketBasicById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VMarketBasic/deleteMarketBasicById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入市场基本信息
export function insertMarketBasic(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMarketBasic/insertMarketBasic',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新市场基本信息
export function updateMarketBasic(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMarketBasic/updateMarketBasic',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取市场基本信息详情
export function getMarketBasicDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMarketBasic/getMarketBasicDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
