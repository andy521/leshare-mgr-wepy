import base from './base'
import Page from '../utils/Page';
export default class UserAdmin extends base {
  /**
   * 查找所有卖家信息
  **/
  static async user() {
    const url = `${UserAdmin.systemUrl}/sellers`;
    return new Page(url)
  }
}