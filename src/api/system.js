import base from './base';
import Page from '../utils/Page';

export default class system extends base {
  /***
   * 查询应用列表
   */
  static getLeApp() {
    const url = `${this.systemUrl}/leApp`;
    return new Page(url, this.processLeAppItem.bind(this));
  }
  static processLeAppItem(item) {
    this.replaceNullValue(item, [
      'auditVersion', 'demoVersion', 'prodVersion'
    ], '未知');
    this.replaceNullValue(item, [
      'remark', 'auditInfo', 'appCode', 'wxAppid', 'wxSecret', 'createTime'
    ], '无');
  }
  static replaceNullValue(leApp, fields, defaultValue) {
    fields.forEach(field => {
      const value = leApp[field];
      leApp[field + '_text'] = value == null ? defaultValue : value;
    })
  }
  /***
   * 获取单条应用信息
   */
  static async getLeAppId(id) {
    const list = await this.getLeApp();
    return list.find((item) => item.id == id);
  }

  /***
   * 创建应用
   */
  static async createLeApp(app) {
    const url = `${this.systemUrl}/leApp`;
    return this.post(url, app)
  }

  /***
   * 修改应用
   */
  static async updateLeApp(id, app) {
    const url = `${this.systemUrl}/leApp?id=${id}`;
    return await this.put(url, app);
  }

  /***
   * 查询店铺信息
   */
  static async getShopList() {
    const url = `${this.systemUrl}/shops`;
    return new Page(url)
  }
}
