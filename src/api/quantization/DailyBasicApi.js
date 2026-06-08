/**
* 个股每日指标 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询个股每日指标列表分页
export function getDailyBasicPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDailyBasic/getDailyBasicPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除个股每日指标
export function deleteDailyBasicById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VDailyBasic/deleteDailyBasicById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入个股每日指标
export function insertDailyBasic(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDailyBasic/insertDailyBasic',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新个股每日指标
export function updateDailyBasic(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDailyBasic/updateDailyBasic',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取个股每日指标详情
export function getDailyBasicDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDailyBasic/getDailyBasicDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
