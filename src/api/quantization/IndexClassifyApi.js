/**
* 申万行业分类 api接口
*
* @author kk
* @since 2026-06-08
*/
import request from '@/utils/request4View'
import config from '@/config'

// 查询申万行业分类列表分页
export function getIndexClassifyPageList(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexClassify/getIndexClassifyPageList',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除申万行业分类
export function deleteIndexClassifyById(params, isLoading) {
  return request({
      url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexClassify/deleteIndexClassifyById',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入申万行业分类
export function insertIndexClassify(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexClassify/insertIndexClassify',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新申万行业分类
export function updateIndexClassify(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexClassify/updateIndexClassify',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取申万行业分类详情
export function getIndexClassifyDetails(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/v/vapi/v1/VIndexClassify/getIndexClassifyDetails',
    method: 'post',
    data: params,
    isLoading
  })
}
