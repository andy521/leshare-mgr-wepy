import base from './base'
import wepy from 'wepy';

export default class open extends base {
  /**
   * 查询所有草稿
   */
  static drafts() {
    const url = `${open.baseUrl}/code/draft_list`;
    return this.get(url);
  }
  /**
   * 查询所有模板
   */
  static templates() {
    const url = `${open.baseUrl}/code/template_list`;
    return this.get(url);
  }
}
