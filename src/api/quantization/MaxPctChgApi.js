/**
* 各个市场涨跌幅限制 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询各个市场涨跌幅限制列表分页
export function getMaxPctChgPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMaxPctChg/getMaxPctChgPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除各个市场涨跌幅限制
export function deleteMaxPctChgById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VMaxPctChg/deleteMaxPctChgById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入各个市场涨跌幅限制
export function insertMaxPctChg(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMaxPctChg/insertMaxPctChg',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新各个市场涨跌幅限制
export function updateMaxPctChg(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMaxPctChg/updateMaxPctChg',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取各个市场涨跌幅限制详情
export function getMaxPctChgDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VMaxPctChg/getMaxPctChgDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
