/**
* 人民币货币总量对象 api接口
*
* @author kk
* @since 2026-06-05
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询人民币货币总量对象列表分页
export function getCnMPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/VCnM/getCnMPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除人民币货币总量对象
export function deleteCnMById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/VCnM/deleteCnMById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入人民币货币总量对象
export function insertCnM(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/VCnM/insertCnM',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新人民币货币总量对象
export function updateCnM(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/VCnM/updateCnM',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取人民币货币总量对象详情
export function getCnMDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/VCnM/getCnMDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
