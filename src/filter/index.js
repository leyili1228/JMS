// 全局过滤器的相关函数


export function date(timestamp) {
  // 接口返回的时间戳是字符串类型: 具体看后台打印
  // Date() 只接收数字类型
  timestamp = parseInt(timestamp);
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}-${month}-${day}`;
}