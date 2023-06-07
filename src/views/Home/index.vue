<template>
  <root-page class="home-page">
    <!-- S 操作提示 -->
    <shopping-tips/>
    <!-- E 操作提示 -->

    <!-- S 直播间商品列表 -->
    <div class="x-product-outside-box">
      <div class="x-inside-box">
        <!-- S 商品类目筛选 -->
        <div class="x-category-selection flex justify-between items-center">
          <ul class="x-category-list flex flex-nowrap items-center">
            <li
            :class="['x-category-item', selectedCategoryName === item ? 'x-item-selected' : '']"
            v-for="item in data.categoryList"
            :key="item"
            @click="selectCategoryFn(item)"
          >{{ item }}</li>
          </ul>
          <div class="x-search-box flex justify-center items-center" @click="jumpSearch">
            <svg-icon name="IconSearch" size="28" />
          </div>
        </div>
         <!-- E 商品类目筛选 -->

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
            :data="item"
            @onClick="openProductDetailPopup(item)"
          />
          <div class="x-list-finished flex justify-center items-center" v-if="data.finished">
          没有您心仪的商品？
          <span class="x-search" @click="jumpSearch">搜索一下</span>
        </div>
        </van-list>
        <!-- E 商品列表 -->
      </div>
    </div>
    <!-- E 直播间商品列表 -->

    <!-- S 底部操作栏 -->
    <footer class="x-footer-operate-box safe-area-inset-bottom flex items-center justify-between">
      <van-button plain hairline type="primary" @click="jumpMy">查看我的返利</van-button>
      <van-button type="primary" size="normal" @click="openReceivePrizePopup">我已下单，领取返利</van-button>
    </footer>
    <!-- E 底部操作栏 -->

    <!-- S 领取奖励的弹框 -->
    <receive-popup
      :show="showReceivePopup"
      v-model:orderNo="data.orderNo"
      @close="closeReceivePopup"
      @onClick="applyReceivePrize"
    />
    <!-- E 领取奖励的弹框 -->

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
  import ShoppingTips from '@/views/Home/components/ShoppingTips/index.vue'
  import ProductItem from '@/views/Home/components/ProductItem/index.vue'
  import ProductDetail from '@/views/Home/components/ProductDetail/index.vue'
  import ReceivePopup from '@/views/Home/components/ReceivePopup/index.vue'
  import { routeChange, checkOrderNo } from '@/hooks'
  import { ROUTE_MAP, ACTION_TYPE } from '@/constants'
  import {
    getCategoryListServer,
    getGoodsListServer,
    receivePrizeServer,
    getUserInfoServer
  } from '@/api'
  import { showLoadingToast, closeToast, showToast } from 'vant'
  import { useUserStore } from '@/stores/modules/user'
  import { useRoute } from 'vue-router'

  const router = useRoute();
  const userStore = useUserStore()

  defineOptions({
    name: 'Home'
  })

  let data = reactive({
    isShowDialog: true,
    categoryList: [] as string[], // 类目列表
    goodsList: [] as API.GoodsInfo[], // 商品列表
    goodsListQueryParams: {
      category: '',
      keyword: '',
      pageNo: 1, // 当前第几页
      pageSize: 10 // 一页几条，默认10条
    },
    loading: false, // 是在加载中
    finished: false, // 是否加载完成
    total: 0, // 总共商品数据条数
    orderNo: '', // 返利订单号
    currentProductInfo: {} as API.GoodsCartList, // 当前查看详情的直播间信息
  })

  /******************************** S 类目相关业务逻辑 ***********************************/
  // 当前选中的类目名称
   const selectedCategoryName = ref('全部')
   /**
    * @function 选择类目事件
    */
   const selectCategoryFn =  (name: string) => {
    selectedCategoryName.value = name
    data.goodsListQueryParams.pageNo = 1
    getGoodsList()
   }
   /**
    * @function 获取类目列表
    * @param id
    */
   const getCategoryListFn = async () => {
    try {
      let resData = await getCategoryListServer()
      if (resData.success) {
        data.categoryList = resData.result
      }
    } catch (error) {
      console.log('获取类目列表失败', error)
    }
   }
  /******************************** E 类目相关业务逻辑 ***********************************/

  /******************************** S 商品相关业务逻辑 ***********************************/
  /**
   * @function 获取商品列表
   */
   const getGoodsList = async () => {
    try {
      showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 10000
      })

      let { keyword, pageNo, pageSize } = data.goodsListQueryParams
      let resData = await getGoodsListServer({
        category: selectedCategoryName.value,
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
   * @function 跳转至我的页面
   */
   const jumpSearch = () => {
    console.log('跳转进我的')
    routeChange(ROUTE_MAP.search)
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
  /******************************** E 获取用户信息业务逻辑 ***********************************/

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

  /******************************** S 底部操作栏业务逻辑 ***********************************/
  const showReceivePopup = ref(false)
  /**
   * @function 初始化领取弹框，如果链接后面有action=applyForRewards，则打开领取弹框
   */
  const initReceivePopup = () => {
    if (router.query.action === ACTION_TYPE.ApplyForRewards) {
      openReceivePopup()
    }
  }

  /**
   * @function 打开领取弹框
   */
  const openReceivePopup = () => {
    showReceivePopup.value = true
  }
   /**
   * @function 关闭领取弹框
   */
  const closeReceivePopup = () => {
    showReceivePopup.value = false
  }
  /**
   * @function 跳转至我的页面
   */
  const jumpMy = () => {
    console.log('跳转进我的')
    routeChange(ROUTE_MAP.my)
  }
  /**
   * @function 打开领取奖励弹框
   */
  const openReceivePrizePopup = () => {
    console.log('领取奖励')
    showReceivePopup.value = true
    openReceivePopup()
  }
  /**
   * @function 领取奖励
   */
   const applyReceivePrize = async () => {
    // 检查订单号是否正确，一定要符合抖音的订单号规则
    if (checkOrderNo(data.orderNo)) {
      showToast({ message: '请正确复制19位抖音订单号' })
      return false
    }

    try {
      showLoadingToast({
        message: '提交中...',
        forbidClick: true,
        duration: 10000
      })

      let resData = await receivePrizeServer({
        orderNo: data.orderNo
      })
      closeToast()
      jumpMy()
      console.log('申请领取奖励成功：', resData)
    } catch (error) {
      closeToast()
      console.log('申请领取奖励失败：', error)
    }
   }
  /******************************** E 底部操作栏业务逻辑 ***********************************/


  /******************************** S 生命周期钩子函数业务逻辑 ***********************************/
  onMounted(() => {
    getCategoryListFn()
    getUserInfo()
    initReceivePopup()
  })
  /******************************** E 生命周期钩子函数业务逻辑 ***********************************/
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
