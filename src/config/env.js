const mock = 'mock';
const proxy = 'proxy';
const stage = 'stage';
const prod = 'prod';
const web = 'web';
const native = 'native';
// const rn     = 'rn';

const env = stage; //环境
const port = '3000';

const STAGE_NAME = 'test.hostname';
const PROD_NAME = 'prod.hostname';
const LOCAL_NAME = 'localhost';

const PREPOINT = window.location.origin;

const webAdaptive = () => {
  switch (window.location.hostname) {
    case STAGE_NAME:
      return `https://${STAGE_NAME}/static/city`;
    case PROD_NAME:
      return `https://${PROD_NAME}/city`;
    case LOCAL_NAME:
      return `http://${LOCAL_NAME}:${port}`;
    default:
      return `https://${STAGE_NAME}`;
  }
};

const prefixAdaptive = (env) => {
  let prefix = '';
  switch (env) {
    case mock:
      // prefix = 'http://localhost:7709';
      prefix = 'http://10.28.40.2:8090';
      break;
    case stage:
      prefix = `https://${STAGE_NAME}/static/city`;
      break;
    case prod:
      prefix = `https://${PROD_NAME}/city`;
      break;
    case web:
      prefix = webAdaptive();
      break;
    case native:
    case proxy:
      prefix = '';
      break;
    default:
      prefix = `https://${STAGE_NAME}/static/city`;
  }
  return prefix;
};

export {env, PREPOINT};
export default prefixAdaptive;
