/**
 * @description 如果navigator.clipboard属性返回undefined，就说明当前浏览器不支持这个 API。Chrome 浏览器规定，只有 HTTPS 协议的页面才能使用这个 API。不过，开发环境（localhost）允许使用非加密协议。其次，调用时需要明确获得用户的许可。权限的具体实现使用了 Permissions API，跟剪贴板相关的有两个权限：clipboard-write（写权限）和clipboard-read（读权限）。"写权限"自动授予脚本，而"读权限"必须用户明确同意给予。也就是说，写入剪贴板，脚本可以自动完成，但是读取剪贴板时，浏览器会弹出一个对话框，询问用户是否同意读取。具体看：https://www.ruanyifeng.com/blog/2021/01/clipboard-api.html
 */
import { showToast } from 'vant'
/**
 * @function 获取剪切板文案，做黏贴操作；
 * @param isShowToast 复制成功后，是否toast提示，默认提示
 * @returns
 */
export const getClipboardContent = async (isShowToast: boolean = true): Promise<string> => {
  try {
    const text = await navigator.clipboard?.readText()
    console.log('Pasted content: ', text)
    isShowToast && showToast('黏贴成功')
    return text || ''
  } catch (err) {
    showToast('黏贴失败')
    console.error('Failed to read clipboard contents: ', err)
    return ''
  }
}

/**
 * @function 复制操作；
 * @param data 需要复制的内容
 * @param isShowToast 复制成功后，是否toast提示，默认提示
 */
export const setClipboardContent = async (data: string, isShowToast: boolean = true) => {
  // 数字没有 .length 不能执行selectText 需要转化成字符串
  const textString = data.toString();
  let input:any = document.querySelector('#copy-input');
  if (!input) {
    input = document.createElement('input');
    input.id = "copy-input";
    input.readOnly = "readOnly";        // 防止ios聚焦触发键盘事件
    input.style.position = "absolute";
    input.style.left = "-1000px";
    input.style.zIndex = "-1000";
    document.body.appendChild(input)
  }

  input.value = textString;
  // ios必须先选中文字且不支持 input.select();
  selectText(input, 0, textString.length);
  console.log(document.execCommand('copy'), 'execCommand');
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    isShowToast && showToast('复制成功')
  } else {
    isShowToast && showToast('复制失败')
  }
  input.blur();

  // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
  // 选择文本。createTextRange(setSelectionRange)是input方法
  function selectText(textbox, startIndex, stopIndex) {
    if (textbox.createTextRange) {//ie
      const range = textbox.createTextRange();
      range.collapse(true);
      range.moveStart('character', startIndex);//起始光标
      range.moveEnd('character', stopIndex - startIndex);//结束光标
      range.select();//不兼容苹果
    } else {//firefox/chrome
      textbox.setSelectionRange(startIndex, stopIndex);
      textbox.focus();
    }
  }
}


