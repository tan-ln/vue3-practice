<template>
  <div class="wrapper">
    <img src="@/assets/user.png" alt="头像" class="wrapper__img">
    <div :class="(illegal && username.length === 0) ? 'illegal' : ''" class="wrapper__input input__username">
      <input type="username" placeholder="请输入用户名" v-model="username" class="wrapper__input--content" />
    </div>
    <div :class="(illegal && password.length === 0) ? 'illegal' : ''" class="wrapper__input input__password">
      <input type="password" placeholder="请输入密码" v-model="password" class="wrapper__input--content" />
    </div>
    <div class="wrapper__login-btn" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="this.$router.push({ name: 'Register' })">立即注册</div>
  <!-- 弹窗 -->
    <Toast v-if="isshowToast" :message="toastMsg" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import Toast, { useToastEffect } from '@/components/Toast'
import { post } from '@/utils/request.js'

// 登录
const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '', illegal: '' })
  const handleLogin = async () => {
    const { username, password } = data
    if (username.length === 0 || password.length === 0) {
      const { illegal } = toRefs(data)
      illegal.value = 'true'
      return { illegal }
    }
    const res = await post('/api/user/login', data)
    if (res?.errorno === 0) {
      localStorage.isLogin = true
      router.push({ name: 'Home' })
    } else {
      showToast('登录失败')
    }
  }
  const { username, password, illegal } = toRefs(data)
  return { username, password, illegal, handleLogin }
}

export default {
  name: 'Login',
  components: {
    Toast
  },
  setup () {
    // 只显示代码执行流程，抽离业务逻辑
    const { isshowToast, toastMsg, showToast } = useToastEffect()
    const { username, password, handleLogin, illegal } = useLoginEffect(showToast)

    return { username, password, isshowToast, toastMsg, handleLogin, illegal }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/mixins.scss";
@import "@/style/variables.scss";

.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  &__img {
    width: 0.66rem;
    height: 0.66rem;
    display: block;
    margin: 0 auto .1rem  auto;
  }

  &__input {
    box-sizing: border-box;
    height: 0.48rem;
    background-color: #F9F9F9;
    border: .01rem solid rgba(0, 0, 0, .1);
    border-radius: .06rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;

    &--content {
      @include cleaninput;

      width: 100%;
      line-height: 0.48rem;
      font-size: 0.16rem;
      color: #222;

      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }

  &__login-btn {
    background-color: #0091FF;
    box-shadow: 0 04rem .08rem rgba(0, 145, 255, .32);
    border-radius: .04rem;
    color: #FFF;
    margin: 0.32rem .4rem .16rem .4rem;
    line-height: 0.48rem;
    font-size: 0.16rem;
    text-align: center;
  }

  &__login-link {
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
    text-align: center;
  }
}
.illegal input::placeholder {
  color: red;
}
.illegal {
  border-color: red;
}
</style>
