/**
* 个股日线行情 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询个股日线行情列表分页
export function getDailyPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDaily/getDailyPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除个股日线行情
export function deleteDailyById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VDaily/deleteDailyById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入个股日线行情
export function insertDaily(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDaily/insertDaily',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新个股日线行情
export function updateDaily(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDaily/updateDaily',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取个股日线行情详情
export function getDailyDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VDaily/getDailyDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
