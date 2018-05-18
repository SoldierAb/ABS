
/**
 * @description 滚动条距离底部距离计算
 * @author GJ-Chen
 * 
 * 
 * use:
 * 
 *   import _AllHeight from '../util/getAllHeight';
 *   
 *  _AllHeight.windowScroll((dis)=>{
 *     if(dis===0){
 *        _this.$store.dispatch('addMore');
 *     }
 *   })
 */


const _getAllHeight = {

  /**
   * @description 窗口可视化范围高度
   * @returns px
   */
  getDocumentHeight: function () {
    let clientHeight = 0;
    if (document.documentElement.clientHeight && document.body.clientHeight) {
      clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
      clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
  },


  /**
   * @description 窗口滚动条高度
   * @returns px
   */
  getScrollTop: function () {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollTop = document.body.scrollTop;
    }
    return scrollTop;
  },

  /**
   * @description 文档内容高度
   * @returns px
   */
  getDeviceHeight: function () {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  },



  /**
   * @description 窗口滚动事件
   * @author GJ-Chen
   */
  windowScroll: function (callback, time) {
    const _this = this;
    var scroll = null;
    window.onscroll = function () {
      if (scroll) return;
      scroll = setTimeout(function () {
        _this.getAllHeight(callback);
        scroll = null;
      }, time || 200);
    }
  },

  /**
   * @description 自适应参数获取
   * @author GJ-Chen
   */
  windowResize: function () {
    const _this = this;

    window.onresize = function () {
      _this.getAllHeight();
    }
  },



  /**
   * @description 高度参数获取
   */
  getAllHeight: function (callback) {
    var deviceHeight = this.getDocumentHeight();
    var scrollTop = this.getScrollTop();
    var contentHeight = this.getDeviceHeight();
    var disBottom = contentHeight - scrollTop - deviceHeight;
    callback(disBottom);
  },
}

export default _getAllHeight

