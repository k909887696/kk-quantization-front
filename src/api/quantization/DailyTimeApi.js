/**
* 个股分钟行情 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询个股分钟行情列表分页
export function getDailyTimePageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDailyTime/getDailyTimePageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除个股分钟行情
export function deleteDailyTimeById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VDailyTime/deleteDailyTimeById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入个股分钟行情
export function insertDailyTime(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDailyTime/insertDailyTime',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新个股分钟行情
export function updateDailyTime(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDailyTime/updateDailyTime',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取个股分钟行情详情
export function getDailyTimeDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDailyTime/getDailyTimeDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
