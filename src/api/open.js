import base from './base'
import wepy from 'wepy';

export default class open extends base {
  /**
   * 查询所有草稿
   */
  static async drafts() {
    const url = `${this.baseUrl}/code/draft_list`;
    const drafts = await this.get(url);
    drafts.sort((a, b) => b.create_time - a.create_time);
    drafts.forEach(draft => {
      draft.create_time = this.convertToTime(draft.create_time);
    });
    return drafts;
  }
  /**
   * 查询所有模板
   */
  static async templates() {
    const url = `${this.baseUrl}/code/template_list`;
    const templates = await this.get(url);
    templates.sort((a, b) => b.create_time - a.create_time);
    templates.forEach(template => {
      template.create_time = this.convertToTime(template.create_time);
    });
    return templates;
  }

  // 处理时间
  static convertToTime (time) {
    const d = new Date(time * 1000);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
  }
  /****
   *提交草稿
   */
  static submitDraft(draft) {
    const url = `${this.baseUrl}/code/template`;
    return this.post(url, draft);
  }
  static deleteTemplate(template) {
    const url = `${this.baseUrl}/code/template`;
    return this.delete(url, template);
  }
}
