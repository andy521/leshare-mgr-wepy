import base from './base'
import Page from '../utils/Page';

export default class open extends base {
  /**
   * 查询所有草稿
   */
  static async drafts() {
    const url = `${this.openUrl}/code/draft_list`;
    const drafts = await this.get(url);
    drafts.sort((a, b) => b.create_time - a.create_time);
    drafts.forEach(draft => {
      draft.create_time_text = this.convertToTime(draft.create_time);
    });
    return drafts;
  }
  /**
   * 查询所有模板
   */
  static async templates() {
    const url = `${this.openUrl}/code/template_list`;
    const templates = await this.get(url);
    templates.sort((a, b) => b.create_time - a.create_time);
    templates.forEach(template => {
      // 这里要加一个字段，表示是否被勾选，默认为false
      template.create_time_text = this.convertToTime(template.create_time);
      template.check = false;
    });
    return templates;
  }
  /**
   * 查询小程序列表
   */
  static async apps(key) {
    const url = `${this.openUrl}/code/app_list?app_template=${key}`;
    const apps = await this.get(url);
    apps.forEach(app => {
      app.check = false;
      if (app.auditVersion == null) {
        app.auditVersion_text = '未知';
      } else {
        app.auditVersion_text = app.auditVersion;
      }
      if (app.demoVersion == null) {
        app.demoVersion_text = '未知';
      } else {
        app.demoVersion_text = app.demoVersion;
      }
      if (app.prodVersion == null) {
        app.prodVersion_text = '未知';
      } else {
        app.prodVersion_text = app.prodVersion;
      }
    });
    return apps;
  }

  /***
   * 查询系统管理
   */
  static manageSystem () {
    const url = `${this.openUrl}/users`;
    return new Page(url, this.processManageSystemItem.bind(this));
  }
  static processManageSystemItem(item) {
    item.verify_type_info_text = this._processVerifyType(item.verify_type_info);
    item.is_use_text = this._processIsUse(item.is_use);
    item.service_type_info_text = this._processServiceType(item.service_type_info);
    item.type_text = this._processType(item.type);
    item.business_info_text = this._processBusiness(item.business_info);
    item.func_info_text = this._processFunc(item.func_info);
    item.head_img = item.head_img === null ? '/images/icons/img.png' : item.head_img;
    item.nick_name = item.nick_name === '' ? '未知' : item.nick_name;
    return item
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
    const url = `${this.openUrl}/code/template`;
    return this.post(url, draft);
  }
  /***
   * 删除模板
   * */
  static deleteTemplate(template) {
    const url = `${this.openUrl}/code/template`;
    return this.delete(url, template);
  }
  /**
   * 提交审核
   */
  static submitAudit(apps) {
    const url = `${this.openUrl}/code/submit_audit`;
    return this.post(url, apps);
  }

  /****
   * 提交体验版
   */
  static submitDemo(apps) {
    const url = `${this.openUrl}/code/submit_demo`;
    return this.post(url, apps);
  }
  /****
   * 查询审核结果
   */
  static statusAudit(apps) {
    const url = `${this.openUrl}/code/audit/status`;
    return this.post(url, apps);
  }

  /***
   * 版本发布
   */
  static publish(apps) {
    const url = `${this.openUrl}/code/publish`;
    return this.post(url, apps)
  }

  /***
   * 处理认证状态
   */
  static _processVerifyType(verify) {
    if (verify == 0) {
      verify = '已认证'
    } else if (verify == 1) {
      verify = '未认证'
    } else {
      verify = '其他'
    }
    return verify;
  }

  /***
   * 处理授权状态
   */
  static _processIsUse(isUse) {
    const type = {
      '0': '未授权',
      '1': '已授权'
    };
    return type[isUse];
  }

  /***
   *处理公众号类型
   */
  static _processServiceType(service) {
    const type = {
      '0': '订阅号',
      '1': '订阅号',
      '2': '服务号'
    };
    return type[service]
  }

  /***
   * 处理授权类型
   */
  static _processType(proType) {
    const type = {
      '0': '公众号',
      '1': '小程序'
    };
    return type[proType];
  }

  /***
   * 处理业务信息
   */
  static _processBusiness(business) {
    const type = {
      '0': '没权限',
      '1': '有权限'
    };
    const arr = business.split('#');
    return arr.map(item => {
      return type[item];
    });
  }

  /***
   * 处理授权信息
   */
  static _processFunc(func) {
    const type = {
      '1': '消息管理权限',
      '2': '用户管理权限',
      '3': '账号服务权限',
      '4': '网页服务权限',
      '5': '微信小店权限',
      '6': '微信多客服权限',
      '7': '群发与通知权限',
      '8': '微信卡卷权限',
      '9': '微信扫一扫权限',
      '10': '微信连WIFI权限',
      '11': '素材管理权限',
      '12': '微信摇周边权限',
      '13': '微信门店权限',
      '14': '微信支付权限',
      '15': '自定义菜单权限',
      '16': '获取认证状态及信息',
      '17': '账号管理权限（小程序）',
      '18': '开发管理与数据分析权限（小程序）',
      '19': '客服消息管理权限（小程序）',
      '20': '微信登录权限（小程序）',
      '21': '数据分析权限（小程序）',
      '22': '城市服务接口权限',
      '23': '广告管理权限',
      '24': '开放平台账号管理权限',
      '25': '开放平台账号管理权限（小程序）',
      '26': '微信电子发票权限'
    };
    const arr = func.split('#');
    return arr.map(item => {
      return type[item];
    });
  }
}
