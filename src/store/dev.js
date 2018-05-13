import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../config/reducer';

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
