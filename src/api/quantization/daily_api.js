/**
* 个股日线行情 api接口
*
* @author kk
* @since 2023-05-17
*/
import request from '@/utils/request4Quantization'
import config from '@/config'

// 查询列表分页
export function get_daily_page_list(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/daily/get_daily_page_list',
    method: 'post',
    data: params,
    isLoading
  })
}
// 删除
export function deleteById(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/daily/delete',
    method: 'post',
    data: params,
    isLoading
  })
}
// 插入
export function insert(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/daily/insert',
    method: 'post',
    data: params,
    isLoading
  })
}
// 更新
export function update(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/daily/update',
    method: 'post',
    data: params,
    isLoading
  })
}
// 获取详情
export function get_details(params, isLoading) {
  return request({
    url: config.quantization_api_url + '/quantization/api/v1/daily/get_details',
    method: 'post',
    data: params,
    isLoading
  })
}
