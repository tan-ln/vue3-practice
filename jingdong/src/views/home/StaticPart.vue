<template>
  <div>
    <!-- 定位地址 -->
    <div class="position">
      <span class="iconfont position__icon position__icon--location">&#xe610;</span>
      天安门地安门广安门朝阳门
      <span class="iconfont position__icon position__icon--message">&#xe602;</span>
    </div>
    <!-- 搜索 -->
    <div class="search">
      <span class="iconfont search__icon">&#xe6d2;</span>
      <input
        type="search"
        placeholder="响应性基础 API"
        class="search__input"
      />
    </div>
    <!-- 广告 banner -->
    <div class="banner">
      <img
        class="banner__img"
        src="@/assets/banner.jpg"
      />
    </div>
    <!-- 分类 -->
    <div class="categories">
      <div
        class="cate__item"
        v-for="(item, index) in cateList"
        :key="index"
      >
        <img
          :src="item.url"
          :alt="item.desc"
          class="cate__item--img"
        />
        <p class="cate__item--desc">{{item.desc}}</p>
      </div>
    </div>
    <!-- 分割栏 -->
    <div class="gap"></div>
  </div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    return {
      cateList: [
        {
          url: require('@/assets/caishichang.png'),
          desc: '菜市场'
        },
        {
          url: require('@/assets/chaoshi.png'),
          desc: '超市'
        },
        {
          url: require('@/assets/dangao.png'),
          desc: '烘焙蛋糕'
        },
        {
          url: require('@/assets/dapai.png'),
          desc: '大牌免运'
        },
        {
          url: require('@/assets/hongbao.png'),
          desc: '红包套餐'
        },
        {
          url: require('@/assets/jiaju.png'),
          desc: '家居时尚'
        },
        {
          url: require('@/assets/qiandao.png'),
          desc: '签到'
        },
        {
          url: require('@/assets/shuiguo.png'),
          desc: '水果'
        },
        {
          url: require('@/assets/xianhua.png'),
          desc: '鲜花绿植'
        },
        {
          url: require('@/assets/yiyao.png'),
          desc: '医药健康'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

// 地址
.position {
  padding: 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  position: relative;
  padding-right: 0.26rem;
  color: $content-fontcolor;

  @include ellipse;

  .position__icon {
    font-size: 0.2rem;

    &--location {
      position: relative;
      top: 0.01rem;
      margin-right: 0.04rem;
    }

    &--message {
      margin-left: 0.08rem;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateY(0.1rem);
    }
  }
}
// 搜索
.search {
  line-height: 0.32rem;
  background-color: #f5f5f5;
  color: #b7b7b7;
  border-radius: 0.16rem;
  font-size: 0.14rem;
  margin-bottom: 0.12rem;

  &__icon {
    font-size: 0.2rem;
    position: relative;
    top: 0.02rem;
    padding-left: 0.1rem;
  }

  &__input {
    @include cleaninput;
    margin-left: 0.04rem;
    width: 80vw;
  }
}
// banner
.banner {
  height: 0;
  overflow: hidden;
  // 占位
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
// 分类
.categories {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;

  .cate__item {
    width: 20%;
    text-align: center;

    &--img {
      width: 0.4rem;
      height: 0.4rem;
      display: block;
      margin: 0 auto;
    }
    &--desc {
      margin: 0.06rem 0 0.16rem 0;
      color: $content-fontcolor;
    }
  }
}
// 分割栏
.gap {
  height: 0.1rem;
  background-color: $content-bgColor;
  margin: 0 -0.18rem;
}
</style>
