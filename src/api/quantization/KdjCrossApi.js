/**
* kdj交叉点 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询kdj交叉点列表分页
export function getKdjCrossPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VKdjCross/getKdjCrossPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除kdj交叉点
export function deleteKdjCrossById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VKdjCross/deleteKdjCrossById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入kdj交叉点
export function insertKdjCross(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VKdjCross/insertKdjCross',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新kdj交叉点
export function updateKdjCross(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VKdjCross/updateKdjCross',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取kdj交叉点详情
export function getKdjCrossDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VKdjCross/getKdjCrossDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
