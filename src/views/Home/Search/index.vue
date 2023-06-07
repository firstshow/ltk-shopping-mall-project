<template>
  <root-page class="home-page">
    <van-search class="x-search-box" placeholder="请输入搜索关键词" v-model="data.goodsListQueryParams.keyword" @search="search" />

    <!-- S 直播间商品列表 -->
    <div class="x-product-outside-box">
      <div class="x-inside-box">
        <!-- S 商品列表 -->
        <van-list
          class="x-list"
          v-model="data.loading"
          :finished="data.finished"
          finished-text="- 我是有底线的呦 -"
          @load="onGoodsListLoad"
        >
          <product-item
            v-for="(item, index) in data.goodsList"
            :key="index"
            :data="item"
            @onClick="openProductDetailPopup(item)"
          />
        </van-list>
        <!-- E 商品列表 -->
      </div>
    </div>

    <!-- S 商品详情的弹框 -->
    <product-detail
      ref="productDetailRef"
      :show="showProductDetailPopup"
      :productInfo="data.currentProductInfo"
      @close="closeProductDetailPopup"
    />
    <!-- E 商品详情的弹框 -->
  </root-page>

</template>

<script setup lang="ts">
  import ProductItem from '@/views/Home/Search/components/ProductItem/index.vue'
  import ProductDetail from '@/views/Home/Search/components/ProductDetail/index.vue'
  import {
    searchGoodsListServer,
    getUserInfoServer
  } from '@/api'
  import { showLoadingToast, closeToast } from 'vant'
  import { useUserStore } from '@/stores/modules/user'

  const userStore = useUserStore()

  defineOptions({
    name: 'Home'
  })

  let data = reactive({
    searchVal: '', // 搜索的值
    isShowDialog: true,
    categoryList: [] as string[], // 类目列表
    goodsList: [] as API.SearchGoodsInfo[], // 商品列表
    goodsListQueryParams: {
      category: '',
      keyword: '',
      pageNo: 1, // 当前第几页
      pageSize: 10, // 一页几条，默认10条
      sortType: '1' // 排序方式
    },
    loading: false, // 是在加载中
    finished: false, // 是否加载完成
    total: 0, // 总共商品数据条数
    orderNo: '', // 返利订单号
    currentProductInfo: {} as API.SearchGoodsInfo, // 当前选择的商品详情信息
  })

  /******************************** S 商品相关业务逻辑 ***********************************/
  /**
   * @function 重置请求参数
   */
  const resetRequestParams = () => {
    data.goodsListQueryParams.pageNo = 1
    data.goodsList = []
  }
  /**
   * @function 搜索商品
   */
  const search = () => {
    resetRequestParams()
    searchGoodsList()
  }
  /**
   * @function 获取商品列表
   */
   const searchGoodsList = async () => {
    try {
      showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 10000
      })
      let { keyword, pageNo, pageSize } = data.goodsListQueryParams
      let resData = await searchGoodsListServer({
        category: '',
        keyword,
        pageNo,
        pageSize,
      })
      let goodsList = [] as API.SearchGoodsInfo[]
      for (let i = 0; i < resData.result.card_list.length; i++) {
        const card_data = JSON.parse(resData.result.card_list[i].card_data)
        card_data.commissionAmount = ((resData.result.card_list[i].commissionRate * card_data.commission_num) / 10000).toFixed(2)
        goodsList.push({
          ...resData.result.card_list[i],
          card_data
        })
      }

      console.log('当前的商品列表：', goodsList)
      if (data.goodsListQueryParams.pageNo === 1) {
        data.goodsList = goodsList
      } else {
        data.goodsList = data.goodsList.concat(goodsList)
      }
      console.log('当前的商品列表：', data.goodsList)
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
    searchGoodsList()
   }
  /******************************** E 商品相关业务逻辑 ***********************************/

  /******************************** S 商品详情弹框业务逻辑 ***********************************/
  const productDetailRef = ref();
  const showProductDetailPopup = ref(false)

  /**
   * @function 关闭商品详情弹框
   */
  const closeProductDetailPopup = () => {
    showProductDetailPopup.value = false
  }

  /**
   * @function 打开商品详情弹框
   * @param liveRoomInfo 直播间信息
   * @param liveRoomUrl
   */
  const openProductDetailPopup = async (productInfo: any) => {
     console.log('||||', productInfo)
     data.currentProductInfo = productInfo
     nextTick(async () => {
      await productDetailRef.value.getProductDetail()
      showProductDetailPopup.value = true
     })
  }
  /******************************** E 商品详情弹框业务逻辑 ***********************************/


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
