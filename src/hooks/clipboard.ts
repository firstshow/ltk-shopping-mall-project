/**
 * @description 如果navigator.clipboard属性返回undefined，就说明当前浏览器不支持这个 API。Chrome 浏览器规定，只有 HTTPS 协议的页面才能使用这个 API。不过，开发环境（localhost）允许使用非加密协议。其次，调用时需要明确获得用户的许可。权限的具体实现使用了 Permissions API，跟剪贴板相关的有两个权限：clipboard-write（写权限）和clipboard-read（读权限）。"写权限"自动授予脚本，而"读权限"必须用户明确同意给予。也就是说，写入剪贴板，脚本可以自动完成，但是读取剪贴板时，浏览器会弹出一个对话框，询问用户是否同意读取。具体看：https://www.ruanyifeng.com/blog/2021/01/clipboard-api.html
 */

/**
 * @function 获取剪切板文案；
 */
export async function getClipboard(): Promise<string> {
  try {
    const text = await navigator.clipboard?.readText()
    console.log('Pasted content: ', text)
    return text || ''
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err)
    return ''
  }
}
