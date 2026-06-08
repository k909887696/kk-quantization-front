/**
* 指数日线行情 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询指数日线行情列表分页
export function getIndexDailyPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexDaily/getIndexDailyPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除指数日线行情
export function deleteIndexDailyById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexDaily/deleteIndexDailyById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入指数日线行情
export function insertIndexDaily(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexDaily/insertIndexDaily',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新指数日线行情
export function updateIndexDaily(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexDaily/updateIndexDaily',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取指数日线行情详情
export function getIndexDailyDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexDaily/getIndexDailyDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
