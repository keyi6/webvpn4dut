# WebVpn4DUT

## 说明

DUT 之前推出了 WebVpn 方便大家无法使用校园网时也能访问校内网站，但是它支持的网址有限。

它的原理是通过一个函数 encode 这个你要访问的网址，然后把编码出来的网址加在`webvpn.dlut.edu.cn/`后，就能访问校内才能访问的地址了。比如说在 WebVpn 里访问教务处，实际是访问的 https://webvpn.dlut.edu.cn/http/77726476706e69737468656265737421e4f2409f2f7e6c5c6b1cc7a99c406d3690/ 。

那么后面这串 777 开头的什么编码是怎么算出来的呢？比较奇葩的是，它之前把 encode 的函数放在了前端代码里，打开控制台就能看到。现在已经下掉了，换成写死的encode 后的网址（在 `data-url`）里。![Screen Shot 2020-01-30 at 15.22.17](./doc/screenshot-1.png)

## 项目结构

这是一个简单的由 [Create React App](https://github.com/facebook/create-react-app) 创建的项目。（偷个懒不写了）

```
.
├── README.md
├── node_modules
├── package.json
├── public
├── src
│   ├── components
│   ├── hooks
│   ├── utils
│   ├── App.scss
│   ├── App.tsx
│   ├── index.scss
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   └── serviceWorker.ts
└── tsconfig.json
```
