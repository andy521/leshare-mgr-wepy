const WxNotificationCenter = require('./WxNotificationCenter.js');

export default class Event {
  // 模板列表更新事件
  static TEMPLATE_LIST_UPDATE = 'TEMPLATE_LIST_UPDATE';
  // 小程序列表更新事件
  static APP_LIST_UPDATE = 'APP_LIST_UPDATE';
  // 应用管理更新事件
  static SYSTEM_LEAPP_UPDATE = 'SYSTEM_LEAPP_UPDATE';
  // 用户列表更新事件
  static USER_LIST_UPDATE = 'USER_LIST_UPDATE';
  // 店铺信息列表更新事件
  static SHOP_LIST_UPDATE = 'SHOP_LIST_UPDATE';
  // 店铺管理员信息列表更新事件
  static SHOP_ADMIN_LIST_UPDATE = 'SHOP_ADMIN_LIST_UPDATE';
  // 店铺编辑页面更新事件
  static EDIT_SHOP_UPDATE = 'EDIT_SHOP_UPDATE';
  // 应用管理页面关联店铺刷新事件
  static ASSOCIATED_SHOP_LIST = 'ASSOCIATED_SHOP_LIST';
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
