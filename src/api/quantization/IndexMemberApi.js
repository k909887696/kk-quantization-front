/**
* 申万行业明细 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询申万行业明细列表分页
export function getIndexMemberPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexMember/getIndexMemberPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除申万行业明细
export function deleteIndexMemberById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexMember/deleteIndexMemberById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入申万行业明细
export function insertIndexMember(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexMember/insertIndexMember',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新申万行业明细
export function updateIndexMember(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexMember/updateIndexMember',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取申万行业明细详情
export function getIndexMemberDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexMember/getIndexMemberDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
