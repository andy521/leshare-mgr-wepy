import base from './base';
import Page from '../utils/Page';

export default class UserAdmin extends base {
  /**
   * 系统查找所有卖家信息
   **/
  static async userList () {
    const url = `${this.systemUrl}/sellers`;
    return new Page(url);
  }
  /**
   * 系统新增用户
   **/
  static async addUser (seller) {
    const url = `${this.systemUrl}/sellers`;
    return await this.post(url, seller);
  }
  /**
   * 系统修改用户信息
   **/
  static async updataUser (seller, userId) {
    const url = `${this.systemUrl}/sellers/${userId}`;
    return await this.put(url, seller);
  }
  /**
   * 系统根据id查询用户信息
   **/
  static async user (userId) {
    const url = `${this.systemUrl}/sellers/${userId}`;
    return this.get(url);
  }
  /**
   * 系统根据id删除用户信息
   **/
  static async deleteUser (userId) {
    const url = `${this.systemUrl}/sellers/${userId}`;
    return this.delete(url);
  }
}
