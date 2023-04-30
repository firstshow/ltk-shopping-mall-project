/**
 * @function 生成随机字符串，该字符串唯一
 * @param len {string} 所需生成字符串的长度
 */
export function getRandomString(len = 32) {
  const timestampStr = new Date().getTime().toString() // 当前时间戳
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  const maxPos = $chars.length
  let str = ''
  for (let i = 0, length = len - 13; i < length; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str + timestampStr
}

/**
 * @funtion 排序数组对象
 * @param arr 需要排序的数组对象
 * @param key 以什么字段排序
 */
export const sortArrayObj = (arr, key) => {
  return arr.sort((a, b) => {
    const k1 = a[key]
    const k2 = b[key]
    if (k1 < k2) {
      return -1
    } else if (k1 > k2) {
      return 1
    } else {
      return 0
    }
  })
}


/**
 * @function 判断obj中是否有值
 * @param obj
 */
export function objectHasValue(obj) {
  for (const key in obj) {
    if (obj[key]) {
      return true
    }
  }
  return false
}

/**
 * @function 判断objA和objB是否相同
 * @desc objB中有objA中的全部属性，且属性值相同
 * @param obj
 */
export function equalObj(objA, objB) {
  for (const key in objA) {
    if (objB[key] === undefined) {
      return false
    }
    if (typeof objB[key] === 'object') {
      if (JSON.stringify(objA[key]) !== JSON.stringify(objB[key])) {
        return false
      }
    } else {
      if (objA[key] !== objB[key]) {
        return false
      }
    }
  }
  return true
}
