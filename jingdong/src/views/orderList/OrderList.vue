<template>
  <div>
    <div class="wrapper">
      <div class="title">我的订单</div>
      <div class="orderList">
        <div class="order" v-for="(item, i) in list" :key="i">
          <div class="order__title__shopName">{{item.shopName}}
            <span class="order__status">{{item.isCanceled ? '已取消' : '已下单'}}</span>
          </div>
          <div class="order__content__goods">
            <div class="order__goods__imgs">
              <template v-for="(good, j) in item.products" :key="j">
                <img :src="require(`@/assets/goodList/${good.product.img}`)" :alt="good.product.name" class="goods__img" v-if="j < 4" />
              </template>
            </div>
            <div class="order__info">
              <div class="order__info__price">￥{{item.amountPrice}}</div>
              <div class="order__info__count">共 {{item.totalNum}} 件</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部导航栏 -->
    <Docker :curIndex="2" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Docker from '../../components/Docker'
import { get } from '@/utils/request.js'

const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getOrderList = async () => {
    const res = await get('/api/order')
    let totalNum = 0
    if (res?.errno === 0 && res?.data?.length) {
      res.data.forEach(i => {
        i.products.forEach(j => {
          totalNum += j.orderSales
        })
        i.totalNum = totalNum
      })
      data.list = res.data
    }
  }
  getOrderList()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: .5rem;
  background-color: $wrapper-bgColor;
}
.title {
  line-height: 0.44rem;
  background-color: #fff;
  font-size: 0.16rem;
  color: $content-fontcolor;
  text-align: center;
  margin-bottom: 0.16rem;
}
.orderList {
  .order {
    margin: 0.16rem .18rem;
    padding: 0.16rem;
    background-color: #fff;

    &__title__shopName {
      font-size: 0.16rem;
      color: $content-fontcolor;
      line-height: 0.22rem;
      margin-bottom: 0.16rem;
    }

    &__status {
      float: right;
      font-size: 0.14rem;
      color: $light-fontColor;
    }

    &__content__goods {
      display: flex;

      .order__goods__imgs {
        flex: 1;
        .goods__img {
          width: 0.4rem;
          height: 0.4rem;
          margin-right: 0.12rem;
        }
      }

      .order__info {
        width: 0.7rem;

        &__price {
          line-height: 0.2rem;
          font-size: 0.14rem;
          color: $hightlight-fontColor;
          text-align: right;
          margin-bottom: 0.04rem;
        }

        &__count {
          font-size: 0.12rem;
          color: $content-fontcolor;
          line-height: 0.14rem;
          text-align: right;
        }
      }
    }
  }
}
</style>
