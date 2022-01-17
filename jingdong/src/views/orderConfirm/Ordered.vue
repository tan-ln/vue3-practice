<template>
  <div class="ordered_wrapper">
    <div class="order">
      <div class="order__price">实付金额
        <strong>
          <span class="yen">&yen;</span>
          {{caculation.price}}
        </strong>
      </div>
      <div class="order__btn" @click="() => handleShowConfirm(true)">提交订单</div>
    </div>
    <div class="mask" v-show="showConfirm" @click="() => handleShowConfirm(false)">
      <div class="mask__content" @click.stop>
        <h3 class="mask__title">确认要离开收银台？</h3>
        <p class="mask__desc">请尽快完成支付，否则将被取消！</p>
        <div class="mask__btns">
          <div class="mask__btn btn__cancel" @click="() => handleConfirmOrder(true)">取消订单</div>
          <div class="mask__btn btn__confirm" @click="() => handleConfirmOrder()">确认支付</div>
        </div>
      </div>
    </div>
    <Toast v-if="isshowToast" :message="toastMsg" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import Toast, { useToastEffect } from '@/components/Toast'
import { useCommonCartEffect } from '../../effects/cartEffect'
import { post } from '@/utils/request.js'

const useMakeOrderEffect = (shopId, shopName, goodList, showToast) => {
  const router = useRouter()
  const store = useStore()
  const handleConfirmOrder = async (isCanceled = false) => {
    const list = []
    for (const key in goodList.value) {
      const item = goodList.value[key]
      list.push({ id: Number(item._id), num: item.count })
    }
    const res = await post('/api/order', {
      addressId: 1,
      shopId,
      shopName: shopName.value,
      isCanceled,
      goodList: list
    })
    if (res?.errorno === 0) {
      showToast('支付成功')
      store.commit('clearCartData', { shopId })
      router.push({ name: 'OrderList' })
    } else {
      showToast('支付失败')
    }
  }
  return { handleConfirmOrder }
}

const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleShowConfirm = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleShowConfirm }
}

export default {
  name: 'Ordered',
  components: { Toast },
  setup () {
    const route = useRoute()
    const shopId = Number(route.params.id)
    const { caculation, shopName, goodList } = useCommonCartEffect(shopId)
    const { isshowToast, toastMsg, showToast } = useToastEffect()
    const { handleConfirmOrder } = useMakeOrderEffect(shopId, shopName, goodList, showToast)
    const { showConfirm, handleShowConfirm } = useShowMaskEffect()
    return { caculation, handleConfirmOrder, showConfirm, handleShowConfirm, isshowToast, toastMsg }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
.ordered_wrapper {
  width: 100%;
}
.yen {
  font-size: 0.12rem;
  display: inline-block;
  transform: scale(.85);
  transform-origin: right center;
}
.order {
  position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  background-color: #fff;

  &__price {
    flex: 1;
    font-size: 0.14rem;
    color: #333 ;
    margin-left: .24rem;
    strong {
      font-size: 0.16rem;
      text-align: left;
      color: $hightlight-fontColor;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: $btn-bgColor;
    color: #fff;
    font-size: 0.14rem;
    text-align: center;
  }
}
.mask {
  content: "";
  z-index: 1;
  position: absolute;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
  &__content {
    width: 3rem;
    height: 1.56rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: .04rem;
    text-align: center;
  }
  &__title {
    margin: 0.24rem 0 0 0;
    line-height: 0.26rem;
    font-size: 0.18rem;
    color: #333;
  }
  &__desc {
    font-size: 0.14rem;
    color: #666;
    margin: 0.08rem 0 0 0;
  }
  &__btns {
    display: flex;
    margin: 0.24rem .58rem;
  }
  &__btn {
    flex: 1;
    width: 0.8rem;
    line-height: 0.32rem;
    border: .01rem solid $btn-bgColor;
    border-radius: .16rem;
    font-size: 0.14rem;
  }
  .btn__cancel {
    margin-right: 0.24rem;
    color: $btn-bgColor;
    border: .01rem solid $btn-bgColor;
  }
  .btn__confirm {
    margin-left: 0.24em;
    color: #FFF;
    background-color: $btn-bgColor;
  }
}
</style>
