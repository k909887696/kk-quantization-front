import Cookies from 'js-cookie'
import { valid_platform_jurisdiction } from '@/api/meiya/common/login'

const TokenKey = 'kk_quantization_front_token_' + process.env.NODE_ENV

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function validPlatformJurisdiction(permission) {
  valid_platform_jurisdiction({ jurisdictionIds: [permission] }).then(response => {
    return response.data.jurisdictions[permission] && response.data.jurisdictions[permission] === '1'
  })
}
