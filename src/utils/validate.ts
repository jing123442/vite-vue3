// 验证网址
export function isExternal(path: any): boolean {
  return /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(path)
}

// 手机号校验
export function isPhone(tel: any): boolean {
    return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(tel)
  }

// 身份证号校验
export function isIdCard(id: any): boolean {
    return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(id)
  }

// 验证固定电话
export function isTel(tel: any): boolean {
    return /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(tel)
  }

// element+ 手机号校验
export function validatePhone(rule:any, value:any, callback:any): void {
    if (value && !(/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value))) {
        callback(new Error('手机号码格式不正确'))
    } else {
        callback()
    }
}