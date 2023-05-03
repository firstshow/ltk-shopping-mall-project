import { DOUYIN_ORDER_NO_REG } from '@/constants'
/**
 * @function 检测订单号是否正确
 */
export  const checkOrderNo = (val: string) => {
  console.log(val)
  if (!DOUYIN_ORDER_NO_REG.test(val)) {
    return true
  }
  return false
}
