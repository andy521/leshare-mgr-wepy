import wepy from 'wepy';
import http from '../utils/Http'

export default class base {
  static openUrl = wepy.$instance.globalData.openUrl;
  static systemUrl = wepy.$instance.globalData.systemUrl;
  static get = http.get.bind(http);
  static put = http.put.bind(http);
  static post = http.post.bind(http);
  static delete = http.delete.bind(http);
}
