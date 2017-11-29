import base from './base'
import wepy from 'wepy';

export default class open extends base {
  /**
   * 查询所有草稿
   */
  static async drafts() {
    const url = `${open.baseUrl}/code/draft_list`;
    const drafts = await this.get(url);
    drafts.forEach(draft => {
      draft.create_time = this.convertToTime(draft.create_time);
    });
    return drafts;
  }
  /**
   * 查询所有模板
   */
  static templates() {
    const url = `${open.baseUrl}/code/template_list`;
    return this.get(url);
  }

  // 处理时间
  static convertToTime (time) {
    const d = new Date(time * 1000);
    return `${d.getFullYear()}/${d.getMonth()}/${d.getDay()} ${d.getHours()}:${d.getMinutes()}`;
  }
}
