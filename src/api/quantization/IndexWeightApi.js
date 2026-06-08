/**
* 指数成分权重 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询指数成分权重列表分页
export function getIndexWeightPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexWeight/getIndexWeightPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除指数成分权重
export function deleteIndexWeightById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexWeight/deleteIndexWeightById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入指数成分权重
export function insertIndexWeight(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexWeight/insertIndexWeight',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新指数成分权重
export function updateIndexWeight(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexWeight/updateIndexWeight',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取指数成分权重详情
export function getIndexWeightDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexWeight/getIndexWeightDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
