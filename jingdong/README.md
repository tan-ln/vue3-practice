# jingdong

## 引入 css/scss 变量
```css
@import "./style/variables.scss";
@import "./style/mixins.scss";

/* 1 */
@include ellipse;

/* 2 */
.text {
  color: $content-fontcolor;
}
```

## 自动转义
```js
<div class="iconfont">{{item.icon}}</div>
<div class="iconfont" v-html="item.icon" />
```

## scss 属性
```scss
.app {
  &::placeholder {
    color: $content-notice-fontcolor;
  }
}
```

## resize

## 打包上线
新建 vue.config.js