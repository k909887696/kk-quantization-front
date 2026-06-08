/**
* 概念日线行情 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询概念日线行情列表分页
export function getConceptDailyPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptDaily/getConceptDailyPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除概念日线行情
export function deleteConceptDailyById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptDaily/deleteConceptDailyById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入概念日线行情
export function insertConceptDaily(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptDaily/insertConceptDaily',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新概念日线行情
export function updateConceptDaily(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptDaily/updateConceptDaily',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取概念日线行情详情
export function getConceptDailyDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VConceptDaily/getConceptDailyDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
