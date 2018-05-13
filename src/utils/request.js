import prefixAdaptive, {env} from '../config/env';
// import '../3rd/seed';
const prefix = prefixAdaptive(env);
const isNative = !!env.match(/native/i);

Promise.prototype.done = function(onFulfilled, onRejected) {
  this.then(onFulfilled)
    .catch(function(reason) {
      setTimeout(() => {
        throw reason;
      }, 0)
    })
};

const resolveQuery = (params) => {
  let p = '?';
  for (let o in params) {
    if(params.hasOwnProperty(o)) {
      p += o + '=' + params[o] + '&';
    }
  }
  p = p.slice(0, -1);
  return p;
};

const request = (type, url, params) => {
  let hasCanceled_ = false;
  let promise = new Promise((resolve, reject) => {
    type = typeof type === 'string' && type.toUpperCase();
    params = params || {};
    // select request type
    switch (true) {
      case type === 'GET':
        let query = resolveQuery(params);
        url = `${prefix}${url}${query}`;
        break;
      case type === 'POST':
        url = `${prefix}${url}`;
        break;
      default:
        url = `${prefix}${url}`;
    }

    /**
     * 区分环境执行Request
     */
    const execute = () => {

      if (isNative) {
        const reqBody = {
          url    : url,
          type   : type,
          data   : params,
          success: resolve,
          error  : reject
        };
        import(/* webpackChunkName: "seed" */ '../3rd/seed')
          .then(rsp => {
            typeof $$.Native.request === 'function' && $$.Native.request(reqBody);
          });
      } else {

        const handler = function() {

          if (this.readyState !== 4) return;
          // console.log('XMLHttpRequest::: ', this);
          if (this.status === 200 || this.status === 304) {
            resolve(this.response);
          } else {
            reject({hasCanceled_: true, msg: this.statusText})
          }
        };
        let client = new XMLHttpRequest();
        client.open(type, url);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        // client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        client.setRequestHeader('Accept', 'application/json');
        client.setRequestHeader('Content-Type', 'application/json');
        // client.setRequestHeader('Token', token);
        // client.setRequestHeader('zoneCode', zoneCode);
        client.send(type === 'POST' ? JSON.stringify(params) : null);
      }
    };
    execute();
  });

  return {
    promise: promise,
    cancel() {
      hasCanceled_ = true;
    }
  };

};

export default request;
