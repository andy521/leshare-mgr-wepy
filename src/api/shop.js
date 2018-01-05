import base from './base';
import Page from '../utils/Page';
import wepy from 'wepy';

export default class shop extends base {
  /***
   * 查询店铺信息
   */
  static async getShopList() {
    const url = `${this.systemUrl}/shops`;
    return new Page(url)
  }

  /***
   * 更新店铺信息
   */
  static async updateShop (shop) {
    const url = `${this.systemUrl}/shops`;
    return await this.put(url, shop)
  }

  /**
   * 上传图片
   */
  static async image (filePath, shopId) {
    const url = `${this.systemUrl}/images`;
    const param = {
      url,
      filePath,
      name: 'image',
      header: {
        'shop_id': shopId,
        'Content-Type': 'multipart/form-data'
      }
    };
    return await wepy.uploadFile(param);
  }

  /***
   * 新增店铺信息
   */
  static async addShop (shop) {
    const url = `${this.systemUrl}/shops`;
    return await this.post(url, shop)
  }

  /**
   * 系统根据id查询店铺信息
   **/
  static async shop (shopId) {
    const url = `${this.systemUrl}/shops/${shopId}`;
    return this.get(url);
  }

  /**
   * 店铺分类
   */
  static async getShopCategories () {
    const url = `${this.systemUrl}/shop_parent_categories/0`;
    return await this.get(url);
  }

  /***
   * 删除店铺
   */
  static deleteShop(shopId) {
    const url = `${this.systemUrl}/shops/${shopId}`;
    return this.delete(url, shop);
  }

  /***
   * 查询商铺管理员列表
   */
  static async getShopAdminList(shopId) {
    const url = `${this.systemUrl}/sellers/shop_rel?shop_id=${shopId}`;
    return await this.get(url)
  }

  /**
   * 系统查找所有卖家信息
   **/
  static userList () {
    const url = `${this.systemUrl}/sellers`;
    return new Page(url);
  }

  /***
   * 增加店铺管理员
   */
  static async addShopAdmin (param) {
    const url = `${this.systemUrl}/sellers/rel`;
    return await this.post(url, param);
  }

  /***
   * 删除店铺管理员
   */
  static async deleteShopAdmin (sellerId, shopId) {
    const url = `${this.systemUrl}/sellers/rel?seller_id=${sellerId}&shop_id=${shopId}`;
    return await this.delete(url)
  }
}
