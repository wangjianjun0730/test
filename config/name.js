const packAge = require('../package.json');

function nameControl(name) {
  // if (name.indexOf('-') === 0 || name.substring(name.length - 1) === '-') {
  //   let msg = '项目命名不规范, 请将 package.json中的' +
  //     'name字段值以 "-" 将语义化的字段隔开代替驼峰式命名,' +
  //     '如"Apple-Watch-Color" \n ' +
  //     '因为项目命名不规范，本次构建将不会生成zip格式';
  //   console.log(msg);
  //   return false;
  // }
  let nameArray = name.split('-');
  let nameString = '';
  for (let i = 0, len = nameArray.length; i < len; i++) {
    if (!!nameArray[i] && typeof nameArray[i] === 'string') {
      let first = (i === 0 ? nameArray[i].substring(0, 1).toLowerCase() : nameArray[i].substring(0, 1).toUpperCase());
      let remain = nameArray[i].substring(1, nameArray[i].length).toLowerCase();
      let item = first + remain;
      nameString = nameString + item;
    }
  }
  return nameString;
}

function getDateTime() {
  let d = new Date(),
    year = d.getFullYear() + '',
    month = d.getMonth() >= 9 ? (d.getMonth() + 1) + '' : '0' + (d.getMonth() + 1),
    day = d.getDate() > 9 ? d.getDate() + '' : '0' + d.getDate(),
    hours = d.getHours() > 9 ? d.getHours() + '' : '0' + d.getHours(),
    min = d.getMinutes() > 9 ? d.getMinutes() + '' : '0' + d.getMinutes();
  return year + month + day + '_' + hours + min;
}

module.exports = nameControl(packAge.name) + '_' + getDateTime();
