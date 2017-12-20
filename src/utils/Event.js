const WxNotificationCenter = require('./WxNotificationCenter.js');

export default class Event {
  // 模板列表更新事件
  static TEMPLATE_LIST_UPDATE = 'TEMPLATE_LIST_UPDATE';
  // 小程序列表更新事件
  static APP_LIST_UPDATE = 'APP_LIST_UPDATE';
  // 用户列表更新事件
  static USER_LIST_UPDATE = 'USER_LIST_UPDATE';
  static listen(eventName, callback, observer) {
    WxNotificationCenter.addNotification(eventName, callback, observer);
  }

  static emit(eventName, params) {
    WxNotificationCenter.postNotificationName(eventName, params);
  }

  static remove(eventName, observer) {
    WxNotificationCenter.removeNotification(eventName, observer);
  }
}
