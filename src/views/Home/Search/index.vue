<template>
  <root-page class="home-page">
    <van-search placeholder="请输入搜索关键词" v-model="data.searchVal" />

    <!-- S 直播间商品列表 -->
    <div class="x-product-outside-box">
      <div class="x-inside-box">
        <!-- S 商品列表 -->
        <van-list
          class="x-list"
          v-model="data.loading"
          :finished="data.finished"
          finished-text=""
          @load="onGoodsListLoad"
        >
          <product-item
            v-for="(item, index) in data.goodsList"
            :key="index"
            :data="item.list[0]"
            @onClick="enterLiveRoom(item, item.liveRoomUrl)"
          />
        </van-list>
        <!-- E 商品列表 -->
      </div>
    </div>
  </root-page>

</template>

<script setup lang="ts">
  import ProductItem from '@/views/Home/components/ProductItem/index.vue'
  import { routeChange, checkOrderNo, getLiveRoomUrlByPlatform, setClipboardContent } from '@/hooks'
  import { ROUTE_MAP, MOBILE_PLATFORM, ACTION_TYPE } from '@/constants'
  import {
    getGoodsListServer,
    enterLiveRoomServer,
    getUserInfoServer
  } from '@/api'
  import { showLoadingToast, closeToast, showToast, showDialog } from 'vant'
  import { getMobilePlatform } from '@/utils/device'
  import { useUserStore } from '@/stores/modules/user'
  import { useRoute } from 'vue-router'

  const router = useRoute();
  const userStore = useUserStore()

  defineOptions({
    name: 'Home'
  })

  let data = reactive({
    searchVal: '', // 搜索的值
    isShowDialog: true,
    categoryList: [] as string[], // 类目列表
    goodsList: [
      {
        shopInfo: '11111', // 商品id
        list: [
          {
            anchorName: '111', // 商品id
            cardData: {
              actual_amount: 'string,', // 实际支付价格
              actual_amount_num: 111, // 实际支付价格
              source: 'string', // 商品名称
              origin_amount: 'string', // 原价
              sold_count: 212, // 已售数量
              image_info: [
                {
                  width: 100, // 图片宽度
                  height: 100, // 图片高度
                  web_uri: 'string,', // 图片的uri
                  web_url: '"https://p6-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/4aa5e473217d43fbb360ebd2483533d8?x-expires=1685520000&x-signature=PPXEYMxCnxVukO5m6KZfmcs3VBU%3D&from=521828180&se=false&biz_tag=life_commerce_pack&l=20230531100406E1F7B96BB1FEB437DA8B"' // 图片url
                }
              ],
              execution_plan: {
                activityId: 11222, // 活动id
                goodId: 11222, // 商品ID
              },
              groupon_id: 'string' // 商品ID
            }, // 列表数据
            category: '21212', // 类目
            commissionAmount: 123, // 佣金
            commissionRate: 0.5, // 返佣率
            poiAddress: '21212', // 门店地址
            sortNo: 1 // 商品排名
          }
        ],
        liveRoomId: 2221212121, // 直播间ID
        liveRoomUrl: '12212112' // 直播间链接
      },
      {
        shopInfo: '11111', // 商品id
        list: [
          {
            anchorName: '111', // 商品id
            cardData: {
              actual_amount: 'string,', // 实际支付价格
              actual_amount_num: 111, // 实际支付价格
              source: 'string', // 商品名称
              origin_amount: 'string', // 原价
              sold_count: 212, // 已售数量
              image_info: [
                {
                  width: 100, // 图片宽度
                  height: 100, // 图片高度
                  web_uri: 'string,', // 图片的uri
                  web_url: '"https://p6-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/4aa5e473217d43fbb360ebd2483533d8?x-expires=1685520000&x-signature=PPXEYMxCnxVukO5m6KZfmcs3VBU%3D&from=521828180&se=false&biz_tag=life_commerce_pack&l=20230531100406E1F7B96BB1FEB437DA8B"' // 图片url
                }
              ],
              execution_plan: {
                activityId: 11222, // 活动id
                goodId: 11222, // 商品ID
              },
              groupon_id: 'string' // 商品ID
            }, // 列表数据
            category: '21212', // 类目
            commissionAmount: 123, // 佣金
            commissionRate: 0.5, // 返佣率
            poiAddress: '21212', // 门店地址
            sortNo: 1 // 商品排名
          }
        ],
        liveRoomId: 2221212121, // 直播间ID
        liveRoomUrl: '12212112' // 直播间链接
      },
      {
        shopInfo: '11111', // 商品id
        list: [
          {
            anchorName: '111', // 商品id
            cardData: {
              actual_amount: 'string,', // 实际支付价格
              actual_amount_num: 111, // 实际支付价格
              source: 'string', // 商品名称
              origin_amount: 'string', // 原价
              sold_count: 212, // 已售数量
              image_info: [
                {
                  width: 100, // 图片宽度
                  height: 100, // 图片高度
                  web_uri: 'string,', // 图片的uri
                  web_url: '"https://p6-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/4aa5e473217d43fbb360ebd2483533d8?x-expires=1685520000&x-signature=PPXEYMxCnxVukO5m6KZfmcs3VBU%3D&from=521828180&se=false&biz_tag=life_commerce_pack&l=20230531100406E1F7B96BB1FEB437DA8B"' // 图片url
                }
              ],
              execution_plan: {
                activityId: 11222, // 活动id
                goodId: 11222, // 商品ID
              },
              groupon_id: 'string' // 商品ID
            }, // 列表数据
            category: '21212', // 类目
            commissionAmount: 123, // 佣金
            commissionRate: 0.5, // 返佣率
            poiAddress: '21212', // 门店地址
            sortNo: 1 // 商品排名
          }
        ],
        liveRoomId: 2221212121, // 直播间ID
        liveRoomUrl: '12212112' // 直播间链接
      },
      {
        shopInfo: '11111', // 商品id
        list: [
          {
            anchorName: '111', // 商品id
            cardData: {
              actual_amount: 'string,', // 实际支付价格
              actual_amount_num: 111, // 实际支付价格
              source: 'string', // 商品名称
              origin_amount: 'string', // 原价
              sold_count: 212, // 已售数量
              image_info: [
                {
                  width: 100, // 图片宽度
                  height: 100, // 图片高度
                  web_uri: 'string,', // 图片的uri
                  web_url: '"https://p6-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/4aa5e473217d43fbb360ebd2483533d8?x-expires=1685520000&x-signature=PPXEYMxCnxVukO5m6KZfmcs3VBU%3D&from=521828180&se=false&biz_tag=life_commerce_pack&l=20230531100406E1F7B96BB1FEB437DA8B"' // 图片url
                }
              ],
              execution_plan: {
                activityId: 11222, // 活动id
                goodId: 11222, // 商品ID
              },
              groupon_id: 'string' // 商品ID
            }, // 列表数据
            category: '21212', // 类目
            commissionAmount: 123, // 佣金
            commissionRate: 0.5, // 返佣率
            poiAddress: '21212', // 门店地址
            sortNo: 1 // 商品排名
          }
        ],
        liveRoomId: 2221212121, // 直播间ID
        liveRoomUrl: '12212112' // 直播间链接
      },
      {
        shopInfo: '11111', // 商品id
        list: [
          {
            anchorName: '111', // 商品id
            cardData: {
              actual_amount: 'string,', // 实际支付价格
              actual_amount_num: 111, // 实际支付价格
              source: 'string', // 商品名称
              origin_amount: 'string', // 原价
              sold_count: 212, // 已售数量
              image_info: [
                {
                  width: 100, // 图片宽度
                  height: 100, // 图片高度
                  web_uri: 'string,', // 图片的uri
                  web_url: '"https://p6-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/4aa5e473217d43fbb360ebd2483533d8?x-expires=1685520000&x-signature=PPXEYMxCnxVukO5m6KZfmcs3VBU%3D&from=521828180&se=false&biz_tag=life_commerce_pack&l=20230531100406E1F7B96BB1FEB437DA8B"' // 图片url
                }
              ],
              execution_plan: {
                activityId: 11222, // 活动id
                goodId: 11222, // 商品ID
              },
              groupon_id: 'string' // 商品ID
            }, // 列表数据
            category: '21212', // 类目
            commissionAmount: 123, // 佣金
            commissionRate: 0.5, // 返佣率
            poiAddress: '21212', // 门店地址
            sortNo: 1 // 商品排名
          }
        ],
        liveRoomId: 2221212121, // 直播间ID
        liveRoomUrl: '12212112' // 直播间链接
      },
      {
        shopInfo: '11111', // 商品id
        list: [
          {
            anchorName: '111', // 商品id
            cardData: {
              actual_amount: 'string,', // 实际支付价格
              actual_amount_num: 111, // 实际支付价格
              source: 'string', // 商品名称
              origin_amount: 'string', // 原价
              sold_count: 212, // 已售数量
              image_info: [
                {
                  width: 100, // 图片宽度
                  height: 100, // 图片高度
                  web_uri: 'string,', // 图片的uri
                  web_url: '"https://p6-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/4aa5e473217d43fbb360ebd2483533d8?x-expires=1685520000&x-signature=PPXEYMxCnxVukO5m6KZfmcs3VBU%3D&from=521828180&se=false&biz_tag=life_commerce_pack&l=20230531100406E1F7B96BB1FEB437DA8B"' // 图片url
                }
              ],
              execution_plan: {
                activityId: 11222, // 活动id
                goodId: 11222, // 商品ID
              },
              groupon_id: 'string' // 商品ID
            }, // 列表数据
            category: '21212', // 类目
            commissionAmount: 123, // 佣金
            commissionRate: 0.5, // 返佣率
            poiAddress: '21212', // 门店地址
            sortNo: 1 // 商品排名
          }
        ],
        liveRoomId: 2221212121, // 直播间ID
        liveRoomUrl: '12212112' // 直播间链接
      },
      {
        shopInfo: '11111', // 商品id
        list: [
          {
            anchorName: '111', // 商品id
            cardData: {
              actual_amount: 'string,', // 实际支付价格
              actual_amount_num: 111, // 实际支付价格
              source: 'string', // 商品名称
              origin_amount: 'string', // 原价
              sold_count: 212, // 已售数量
              image_info: [
                {
                  width: 100, // 图片宽度
                  height: 100, // 图片高度
                  web_uri: 'string,', // 图片的uri
                  web_url: '"https://p6-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/4aa5e473217d43fbb360ebd2483533d8?x-expires=1685520000&x-signature=PPXEYMxCnxVukO5m6KZfmcs3VBU%3D&from=521828180&se=false&biz_tag=life_commerce_pack&l=20230531100406E1F7B96BB1FEB437DA8B"' // 图片url
                }
              ],
              execution_plan: {
                activityId: 11222, // 活动id
                goodId: 11222, // 商品ID
              },
              groupon_id: 'string' // 商品ID
            }, // 列表数据
            category: '21212', // 类目
            commissionAmount: 123, // 佣金
            commissionRate: 0.5, // 返佣率
            poiAddress: '21212', // 门店地址
            sortNo: 1 // 商品排名
          }
        ],
        liveRoomId: 2221212121, // 直播间ID
        liveRoomUrl: '12212112' // 直播间链接
      },{
        shopInfo: '11111', // 商品id
        list: [
          {
            anchorName: '111', // 商品id
            cardData: {
              actual_amount: 'string,', // 实际支付价格
              actual_amount_num: 111, // 实际支付价格
              source: 'string', // 商品名称
              origin_amount: 'string', // 原价
              sold_count: 212, // 已售数量
              image_info: [
                {
                  width: 100, // 图片宽度
                  height: 100, // 图片高度
                  web_uri: 'string,', // 图片的uri
                  web_url: '"https://p6-sign.douyinpic.com/obj/tos-cn-i-hf2m9xxmck/4aa5e473217d43fbb360ebd2483533d8?x-expires=1685520000&x-signature=PPXEYMxCnxVukO5m6KZfmcs3VBU%3D&from=521828180&se=false&biz_tag=life_commerce_pack&l=20230531100406E1F7B96BB1FEB437DA8B"' // 图片url
                }
              ],
              execution_plan: {
                activityId: 11222, // 活动id
                goodId: 11222, // 商品ID
              },
              groupon_id: 'string' // 商品ID
            }, // 列表数据
            category: '21212', // 类目
            commissionAmount: 123, // 佣金
            commissionRate: 0.5, // 返佣率
            poiAddress: '21212', // 门店地址
            sortNo: 1 // 商品排名
          }
        ],
        liveRoomId: 2221212121, // 直播间ID
        liveRoomUrl: '12212112' // 直播间链接
      }
    ] as API.GoodsInfo[], // 商品列表
    goodsListQueryParams: {
      category: '',
      keyword: '',
      pageNo: 1, // 当前第几页
      pageSize: 10 // 一页几条，默认10条
    },
    loading: false, // 是在加载中
    finished: false, // 是否加载完成
    total: 0, // 总共商品数据条数
    orderNo: '' // 返利订单号
  })

  /******************************** S 商品相关业务逻辑 ***********************************/
  /**
   * @function 获取商品列表
   */
   const getGoodsList = async () => {
    try {
      showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 500
      })

      let { keyword, pageNo, pageSize } = data.goodsListQueryParams
      let resData = await getGoodsListServer({
        category: '',
        keyword,
        pageNo,
        pageSize,
      })
      if (data.goodsListQueryParams.pageNo === 1) {
        data.goodsList = resData.result.records
      } else {
        data.goodsList = data.goodsList.concat(resData.result.records)
      }
      console.log('当前的商品列表：', data.total, data.goodsList.length, data.goodsListQueryParams.pageNo, data.goodsList)
      data.loading = false
      data.total = resData.result.total
      data.goodsListQueryParams.pageNo++
      data.finished = data.goodsList.length >= data.total
      closeToast()
    } catch (error) {
      data.loading = false
      closeToast()
      console.log('获取商品列表失败', error)
    }
   }

   /**
    * @function 商品列表上拉加载回调事件
    */
   const onGoodsListLoad = async () => {
    if (data.loading || data.finished) {
      return
    }
    data.loading = true
    getGoodsList()
   }

   /**
    * @function 进入直播间，直播间商品切换成当前商品
    * @param id 商品ID
    */
   const enterLiveRoom = async (liveRoomInfo: any, liveRoomUrl: string) => {
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      duration: 500
    })

    let url = getLiveRoomUrlByPlatform(liveRoomUrl)
    console.log('|||{{{}}}}}}', url)
    try {
      let id = liveRoomInfo.id
      let resData = await enterLiveRoomServer({
        id
      })
      closeToast()
      setTimeout(() => jumpToLiveRoom(url), 200);
      console.log('获取直播间参数成功：', resData)
    } catch (error) {
      closeToast()
      console.log('进入直播间失败：', error)
    }
   }

   /**
    * @function 跳转到直播间，这边安卓和IOS处理不一样
    * @param url 直播间地址
    */
   const jumpToLiveRoom = async (url: string) => {
    switch (getMobilePlatform()) {
      case MOBILE_PLATFORM.android:
        await setClipboardContent(url)
        showDialog({
          title: '复制成功',
          message: '请打开抖音APP，出现直播间弹框提示后，进入直播间下单',
        })
        break
      case MOBILE_PLATFORM.ios:
      case MOBILE_PLATFORM.windows:
        window.location.href = url
        break
      default:
        console.error('不属于任何一个平台')
    }
   }

  /******************************** E 商品相关业务逻辑 ***********************************/


 /******************************** S 获取用户信息业务逻辑 ***********************************/
 /**
  * @function 获取用户信息
  */
const getUserInfo = async () => {
  try {
    let resData = await getUserInfoServer()
      userStore.setUserInfo({
        nickname: resData.result.nickname,
        avatar: resData.result.avatar
      })
    console.log('获取直播间参数成功：', resData)
  } catch (error) {
    console.log('进入直播间失败：', error)
  }
}

  /******************************** S 生命周期钩子函数业务逻辑 ***********************************/
  onMounted(() => {
    getUserInfo()
  })
  /******************************** E 生命周期钩子函数业务逻辑 ***********************************/
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
