// OSS静态资源路径
export const OSS_URL = 'https://'

function getImageUrl(name) {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

export const LOGICAL_IMAGE = {
  iconData: getImageUrl('data.svg'), // TODO 示例图片，请删除
  receiveTipsImg: getImageUrl('receiveTipsImg.svg'), // TODO 示例图片，请删除
  loadError: getImageUrl('loadError.svg'), // TODO 示例图片，请删除
  loading: getImageUrl('loading.png') // TODO 示例图片，请删除
}
