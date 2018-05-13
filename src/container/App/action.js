import request from '../../utils/request';
const REQUEST_APP_START = 'REQUEST_APP_START';
const REQUEST_APP_SUCCESS = 'REQUEST_APP_SUCCESS';
const REQUEST_APP_FAIL = 'REQUEST_APP_FAIL';

const requestAppStart = () => ({
  type: REQUEST_APP_START
});

const requestAppSuccess = (data) => ({
  type: REQUEST_APP_SUCCESS,
  data
});

const requestAppFail = (err) => ({
  type: REQUEST_APP_FAIL,
  data: err
});

export default (type, url, params) => (dispatch, getState) => {
  dispatch(requestAppStart());
  let _promise = request(type, url, params).promise;
  _promise
    .then(data => {
      console.log(data);
      if(data.resultCode === '10000')
        dispatch(requestAppSuccess(data.body));
      else
        dispatch(requestAppFail(data.body));
    })
    .catch(err => {
      dispatch(requestAppFail(err));
    });
  return _promise;
}
