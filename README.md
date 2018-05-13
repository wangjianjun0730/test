[![Build Status](https://travis-ci.org/Ironsub/react-cavalier-cli.svg?branch=master)](https://travis-ci.org/Ironsub/react-cavalier-cli)
[![npm](https://img.shields.io/npm/v/react-cavalier-cli.svg)](https://www.npmjs.com/package/react-cavalier-cli)
[![npm](https://img.shields.io/npm/dm/react-cavalier-cli.svg)](https://www.npmjs.com/package/react-cavalier-cli)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [起步](#%E8%B5%B7%E6%AD%A5)
- [依赖版本](#%E4%BE%9D%E8%B5%96%E7%89%88%E6%9C%AC)
- [修改配置](#%E4%BF%AE%E6%94%B9%E9%85%8D%E7%BD%AE)
- [目录结构](#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)
- [环境切换](#%E7%8E%AF%E5%A2%83%E5%88%87%E6%8D%A2)
- [路由](#%E8%B7%AF%E7%94%B1)
- [转场动画](#%E8%BD%AC%E5%9C%BA%E5%8A%A8%E7%94%BB)
- [多端打包](#%E5%A4%9A%E7%AB%AF%E6%89%93%E5%8C%85)
- [store配置依据开发环境](#store%E9%85%8D%E7%BD%AE%E4%BE%9D%E6%8D%AE%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)
- [Redux DevTools的使用](#redux-devtools%E7%9A%84%E4%BD%BF%E7%94%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

样板工程基于`create-react-app` `webpack3.x` `React16.x`搭建而成。所有的打包构建都遵循`webpack3.x`的轻量化原则，支持多端(native，web)输出，并自带serviceWorker（PWA）做纯web端的简单离线处理。可使用`yarn`安装，搭配`Jest`进行单元测试。

## 起步

安装
```shell
# download cli
npm install react-cavalier-cli -g

# create a project
react-cavalier init <my-project-name>
```

运行
```shell
npm start or yarn start
```

构建
```shell
npm run build or yarn build
```

构建 Native
```shell
npm run build:native
```

构建 Web
```shell
npm run build:web
```

测试
 ```shell
npm run test or yarn test
 ```
 
 
## 依赖版本

```javascript
"dependencies": {
  "antd-mobile": "^2.1.2",
  "object-assign": "4.1.1",
  "promise": "8.0.1",
  "whatwg-fetch": "2.0.3",
  "rc-animate": "^2.4.4",
  "react": "^16.2.0",
  "react-dom": "^16.2.0",
  "react-redux": "^5.0.6",
  "react-router": "^4.2.0",
  "react-router-dom": "^4.2.2",
  "redux": "^3.7.2",
  "redux-logger": "^3.0.6",
  "redux-thunk": "^2.2.0"
}
```
## 修改配置

开发之前请先修改`src/config/env.js`文件。请将`STAGE_NAME` 和`PROD_NAME`修改为实际的测试环境域名和生产环境域名。

```diff
- const STAGE_NAME = 'test.hostname';
- const PROD_NAME = 'prod.hostname';
+ const STAGE_NAME = 'your stage hostname';
+ const PROD_NAME = 'your prod hostname';
  const LOCAL_NAME = 'localhost';
```

## 目录结构

目录结构与`react-orcrist`保持基本一致。业务代码集中在`src`内，`components`内依然存放木偶组件，`container`内的组件依然与`redux`绑定，开发环境切换和路由配置则交给了`src/config`内的`env.js`和`route.js`，`css`为共用样式目录，除此之外皆为配置文件。

```
my-app/
  public/           --静态目录
    index.html
    favicon.ico
  src/
    3rd/
    components/     --木偶组件
    container/      --动态组件
    utils/          --工具目录
    css/            --公共样式
    router/         --路由组件
    store/          --store组件
      dev.js          --开发环境
      prod.js.        --生产环境
      index.js
    config/         --配置目录
      env.js.         --环境配置
      reducer.js      --公用数据源
      route.js.       --路由配置
```


## 环境切换

一共分为6个切换环境。

 - `stage` 测试域名
 - `web` 用于依据域名自适应接口前缀
 - `native` 依然使用native端的请求转发
 - `prod` 生产前缀
 - `mock` 本地mock数据
 - `proxy` 使用node或者docker之类mock数据
 - `rn` 用于对接React Native的一个预留环境

```javascript
const mock   = 'mock';
const proxy  = 'proxy';
const stage  = 'stage';
const prod   = 'prod';
const web    = 'web';
const native = 'native';
const rn   = 'rn' //为RN预留;

const env = stage; //mock, proxy, prod, web, native
const port = '3000';
```


## 路由

路由的配置写在`src/config/route.js`

```javascript
import App from '../container/App';
const routes = [
  { path: '/app', component: App }
];
export default routes;
```

工程使用`react-router4.x`来管理页面转场。单页面跳转依然使用hash，转场动画使用`rc-animate`。工程内路由的所有功能都集中在`RouterCombiner`组件内，`RouterCombiner`是根据`src/config/route.js`中配置的`path`和`component`来匹配需要输出的页面

```jsx
const RouterCombiner = (props) => {
  return (
    <Router>
      <Route render={getRoutes}/>
    </Router>
  )
}
```

## 转场动画

转场动画使用`rc-animate`。通过自定义`AniComponent`组件将转场动作`transLeftAction``transRightAction`分发到所有在`src/config/route.js`中存在的组件上，这样可以省去在开发业务中再手动绑定一遍转场动作

```jsx

// src/config/route.js
const routes = [
  { path: '/app',   component: App },
  { path: '/login', component: Login }
];

// src/container/router.js
const RouterCombiner = (props) => {
  // do...
  const AniComponent = () => (
    <div className="transition-content">
      <Component
        {...props}
        transLeftAction={transLeftAction}
        transRightAction={transRightAction}/>
    </div>
  );
  // do...
}
```

 
 如果需要依据浏览器的`pop` `push`事件来决定转场动画的方向，可以手动在`src/router.js`中做如下修改
 
```diff
const RouterCombiner = () => {
  const getRoutes = (props) => {
    const _Component = routes.filter(route => props.location.pathname === route.path);
    const Component = _Component.length > 0 ? _Component[0].component : () => <div
      className="EmptyComponent">{null}</div>;
    const AniComponent = () => (
      <div className="transition-content">
        <Component
          {...props}
-          transLeftAction={transLeftAction}
-          transRightAction={transRightAction}
        />
      </div>
    );
    
+   const action = props.history.action;
+   transName = action.toUpperCase() == 'POP' ? TRANSITION_RIGHT : TRANSITION_LEFT;

    return (
      <div>
        <div className="transition-container">
          <Animate transitionName={transName} component="div">
            <Route
              location={props.location}
              key={props.location.pathname}
              path="*"
              component={AniComponent}/>
          </Animate>
        </div>
      </div>
    )
  };

  return (
    <Router>
      <Route render={getRoutes}/>
    </Router>
  );
};

```

如果依据浏览器的`pop` `push`事件来决定转场动画的方向，那么在业务组件中的路由跳转则需要使用react-router的API或<Link/>组件，两个转场动作（transLeftAction，transRightAction）将不再起作用

```jsx
// 使用react-router的API进行跳转
class App extends React.Component {
  linkToPage = (path) => {
    const {history} = this.props;
    history.push(path);
  };
  
  backTo = () => {
    const {history} = this.props;
    history.back();
  };
  
  render() {
    //do...
    
  }
}

// 使用<Link/>进行跳转
import {Link} from 'react-router-dom';

class App extends React.Component {
  render() {
    //do...
    <Link to="/nextPath">next</Link>
  }
}
```

## 多端打包

```shell
npm run build:native //构建native本地zip格式
npm run build:web    //构建浏览器环境的纯H5格式
```

 - 在native模式下将打包成以时间戳命名的zip格式，并存放在根目录下的`native`目录（如果没有则自动生成）
 - 在web模式下会将初次打包生成的代码复制`web`目录（如果没有则自动生成）下，并且也已时间戳命名
 - 执行构建native的时候，请将`src/env/config`的`env`设置为`native`，执行构建web的时候，则设置为`web`
 

## store配置依据开发环境

`store/index.js`会依据node的开发环境而动态选择引入`dev`还是`prod`，这里仅作说明，无需手动操作

```javascript
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
```

`dev.js`在`applyMiddleware`中组合了一整套的调试工具

```javascript
const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, createLogger()),
      devTool(),
    )
  );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../config/reducer', () => {
      const nextRootReducer = require('../config/reducer');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};
```

`prod.js`中仅保留业务中所使用的模块。这样做的目的是为了不把`createLogger`,`devToolsExtension`等这类调试中间件工具引入生产代码，从而减轻生产环境的代码体积

```javascript
const configureStore = (initialState) => createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunkMiddleware)
);
```

## Redux DevTools的使用

> 详见`src/store/dev.js`的注释

```jsx
// devTool方法用于浏览器调起 Redux DevTools调试工具，前提是需要浏览器安装chrome插件Redux DevTools
// 如果浏览器安装了该插件可以将devTool注入到compose内:
// 如果浏览器尚未安装Redux DevTools，请将compose内的devTool()注释掉
// const devTool = () => window.devToolsExtension ? window.devToolsExtension() : undefined;

const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, createLogger()),
      //devTool(),
    )
  );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../config/reducer', () => {
      const nextRootReducer = require('../config/reducer');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};
export default configureStore;
```



