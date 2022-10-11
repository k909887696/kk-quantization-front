import Cookies from 'js-cookie'

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
