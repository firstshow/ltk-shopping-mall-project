// OSS静态资源路径
export const OSS_URL = 'https://'

function getImageUrl(name) {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

export const LOGICAL_IMAGE = {
  iconData: getImageUrl('data.svg'),
  receiveTipsImg: getImageUrl('receiveTipsImg.svg'),
  loadError: getImageUrl('loadError.svg'),
  loading: getImageUrl('loading.png'),
  receiveMoneyPopup: getImageUrl('receive_money_popup.jpg'),
  iosEnterModel: getImageUrl('ios_enter_model.jpg')
}
