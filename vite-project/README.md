# Try Vite

Vite 构建工具，，使用 ，插件丰富

优势：
- 冷服务，基于 ESModule 通过 script 标签 （webpack 需要先打包）
```html
<script type="module" src="/src/main.ts"></script>
```
- HMR 模块热更新
- Rollup 打包，支持 Rollup 插件


## 异步组件
打包过程中的阻塞，单独打包，异步加载